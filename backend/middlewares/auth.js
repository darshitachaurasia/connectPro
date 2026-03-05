import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const verifyJWT = asyncHandler(async (req, _, next) => {
  const authHeader = req.header("Authorization");

  let token = null;

  if (req.cookies?.accessToken) {
    token = req.cookies.accessToken;
  } else if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  }

  // 🚨 Prevent malformed tokens
  if (!token || token === "undefined" || token === "null") {
    throw new ApiError(401, "Unauthorized Access - Invalid token");
  }

  try {
    const decodedToken = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      throw new ApiError(401, "Invalid Access Token");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, "Invalid or expired access token");
  }
});

export default verifyJWT;