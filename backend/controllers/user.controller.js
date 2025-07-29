import asyncHandler from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import  User from "../models/user.model.js";

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

export { getCurrentUser };
