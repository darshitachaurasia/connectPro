import asyncHandler from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import  User from "../models/user.model.js";
import httpStatus from "../utils/httpStatus.js";
import ApiError from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

// This endpoint returns the current authenticated user if the access token cookie is valid
const getCurrentUser = asyncHandler(async (req, res) => {
    // req.user should be set by your JWT auth middleware
    if (!req.user) {
        return res.status(401).json({ message: "Not authenticated" });
    }
    // Remove sensitive fields
    const user = await User.findById(req.user._id).select("-password -refreshToken");
    return res.status(200).json(new ApiResponse(200, user, "User fetched successfully"));
});

const updateUserProfile = asyncHandler(async (req, res) => {
    const { body: updateData } = req;
    const userId = req.user._id;

    const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $set: updateData },
        { new: true, runValidators: true }
    ).select("-password -refreshToken");

    if (!updatedUser) {
        throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }

    return res.status(200).json(new ApiResponse(200, updatedUser, "Profile updated successfully"));
});

const rateMentor = asyncHandler(async (req, res) => {
    const { mentorId } = req.params;
    const { rating } = req.body;
    const userId = req.user._id;

    if (!rating || rating < 1 || rating > 5) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Invalid rating value. Must be between 1 and 5.");
    }

    const mentor = await User.findById(mentorId);
    if (!mentor || mentor.role !== "mentor") {
        throw new ApiError(httpStatus.NOT_FOUND, "Mentor not found");
    }

    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }

    const currentRating = mentor.rating || 0;
    const ratingCount = mentor.ratingCount || 0;

    const newRating = ((currentRating * ratingCount) + rating) / (ratingCount + 1);
    mentor.rating = newRating;
    mentor.ratingCount = ratingCount + 1;

    await mentor.save({ validateBeforeSave: false });

    return res.status(200).json(new ApiResponse(200, mentor, "Mentor rated successfully"));
});

const updateProfilePicture = asyncHandler(async (req, res) => {
    console.log("Updating profile picture");
    const localPath = req.file?.path;
    if (!localPath) {
        throw new ApiError(httpStatus.BAD_REQUEST, "File not found");
    }

    const cloudinaryResponse = await uploadOnCloudinary(localPath);
    if (!cloudinaryResponse) {
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Failed to upload image to Cloudinary");
    }

    const userId = req.user._id;
    const user = await User.findByIdAndUpdate(
        userId,
        {
            $set: {
                profilePicture: cloudinaryResponse.url,
            },
        },
        { new: true }
    ).select("-password -refreshToken");

    return res.status(200).json(new ApiResponse(200, user, "Profile picture updated successfully"));
});

export { getCurrentUser, updateUserProfile, rateMentor, updateProfilePicture };
