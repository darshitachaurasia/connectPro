import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import crypto from "crypto";
import nodemailer from "nodemailer";

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
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
        throw new ApiError(400, "No refresh token provided.");
    }

    const user = await User.findOne({ refreshToken });
    if (!user) {
        throw new ApiError(404, "User not found.");
    }

    user.refreshToken = null;
    await user.save({ validateBeforeSave: false });

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    return res.status(200).json(new ApiResponse(200, null, "User Logged Out Successfully."));
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

    user.otp = crypto.randomInt(100000, 1000000).toString(); // Secure 6-digit OTP
    user.otpExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes
    await user.save({ validateBeforeSave: false });

    const transporter = nodemailer.createTransport({
        host: "smtp-relay.brevo.com",
        port: 587,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
        },
    });

    const mailOptions = {
        from: process.env.SENDER_EMAIL,
        to: user.email,
        subject: "Your OTP Code",
        text: `Your OTP code is ${user.otp}. It is valid for 10 minutes.`,
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
