import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import  User from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import crypto from "crypto";
import nodemailer from "nodemailer";

// Build a branded HTML email for OTP delivery
const buildOtpEmailHtml = ({ fullname = "there", otp, appName = "ConnectPro", supportEmail, frontendUrl }) => {
    const verifyUrl = `${frontendUrl?.replace(/\/$/, "")}/verify-email`;
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${appName} | Verify your email</title>
        <style>
            /* Basic email client resets */
            body { margin: 0; padding: 0; background: #f5f7fb; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, 'Helvetica Neue', 'Noto Sans', sans-serif; color: #111827; }
            .container { width: 100%; background: #f5f7fb; padding: 24px 8px; }
            .card { max-width: 560px; margin: 0 auto; background: #ffffff; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); overflow: hidden; }
            .header { padding: 20px 24px; background: linear-gradient(135deg, #3b82f6, #8b5cf6); color: #fff; }
            .brand { font-size: 18px; font-weight: 700; letter-spacing: 0.3px; }
            .content { padding: 24px; }
            .greeting { font-size: 16px; margin: 0 0 12px; }
            .lead { font-size: 14px; color: #374151; margin: 0 0 16px; }
            .otp-box { display: inline-block; font-size: 28px; font-weight: 800; letter-spacing: 6px; color: #1f2937; background: #f3f4f6; padding: 12px 16px; border-radius: 10px; border: 1px solid #e5e7eb; }
            .cta { display: inline-block; margin-top: 18px; background: #3b82f6; color: #fff !important; text-decoration: none; padding: 12px 18px; border-radius: 10px; font-weight: 600; font-size: 14px; }
            .meta { font-size: 12px; color: #6b7280; margin-top: 16px; }
            .footer { padding: 16px 24px; font-size: 12px; color: #6b7280; background: #fafafa; border-top: 1px solid #f3f4f6; }
            .muted { color: #9ca3af; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="card">
                <div class="header">
                    <div class="brand">${appName}</div>
                </div>
                <div class="content">
                    <p class="greeting">Hi ${fullname},</p>
                    <p class="lead">Use the verification code below to complete your sign-in and verify your email address. This code expires in <strong>10 minutes</strong>.</p>
                    <div>
                        <span class="otp-box">${otp}</span>
                    </div>
                    <p class="meta">If you didn’t request this, you can safely ignore this email.</p>
                </div>
                <div class="footer">
                    Need help? Contact us at ${supportEmail || "support@example.com"}.<br/>
                    <span class="muted">&copy; ${new Date().getFullYear()} ${appName}. All rights reserved.</span>
                </div>
            </div>
        </div>
    </body>
    </html>`;
};

const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating access and refresh token.");
    }
};

const registerUser = asyncHandler(async (req, res) => {
    const { fullname, email, password, role } = req.body;

    if ([fullname, email, password, role].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required.");
    }

    if (await User.findOne({ email })) {
        throw new ApiError(400, "User already exists with this email.");
    }

    const user = await User.create({ fullname, email, password, role });
    const createdUser = await User.findById(user._id).select("-password -refreshToken");
    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while creating user.");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);


    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    };

    return res
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .status(201)
        .json(new ApiResponse(200, createdUser, "User Registered Successfully."));
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new ApiError(400, "Email and password are required.");
    }

    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError(404, "User not found.");
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password);
    if (!isPasswordCorrect) {
        throw new ApiError(401, "Password is incorrect.");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    };
    return res
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .status(200)
        .json(
            new ApiResponse(
                200,
                { user: loggedInUser, accessToken, refreshToken },
                "User Logged In Successfully."
            )
        );
});

const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out"))
})

const sendOtp = asyncHandler(async (req, res) => {
    // const { email } = req.body;
    const userId = req.user?._id;
    if(!userId) {
        throw new ApiError(401, "Unauthorized access. Please log in.");
    }
    // if (!email) {
    //     throw new ApiError(400, "Email is required.");
    // }

    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(404, "User not found.");
    }

    user.otp = crypto.randomInt(100000, 1000000).toString(); 
    user.otpExpiry = Date.now() + 10 * 60 * 1000; 
    await user.save({ validateBeforeSave: false });

    const transporter = nodemailer.createTransport({
        host: "smtp-relay.brevo.com",
        port: 587,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
        },
    });

    const appName = process.env.APP_NAME || "ConnectPro";
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    const fromName = process.env.SENDER_NAME || appName;
    const supportEmail = process.env.SUPPORT_EMAIL || process.env.SENDER_EMAIL;

    const mailOptions = {
        from: `${fromName} <${process.env.SENDER_EMAIL}>`,
        to: user.email,
        subject: `${appName} Verification Code`,
        text: `Hi ${user.fullname || 'there'}, your ${appName} verification code is ${user.otp}. It is valid for 10 minutes.`,
        html: buildOtpEmailHtml({ fullname: user.fullname, otp: user.otp, appName, supportEmail, frontendUrl })
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json(new ApiResponse(200, null, "OTP sent to email."));
})

const verifyOtp = asyncHandler(async (req, res) => {
    const { otp } = req.body;
    if (!otp) {
        throw new ApiError(400, "OTP is required.");
    }
    const user = await User.findById(req.user?._id);
    if (!user) {
        throw new ApiError(404, "User not found.");
    }
    if (user.otp !== otp || user.otpExpiry < Date.now()) {
        throw new ApiError(400, "Invalid or expired OTP.");
    }
    user.otp = null;
    user.otpExpiry = null;
    user.isEmailVerified = true;
    await user.save({ validateBeforeSave: false });
    return res.status(200).json(new ApiResponse(200, null, "OTP verified successfully."));
})

export { registerUser, loginUser, logoutUser, sendOtp, verifyOtp };
