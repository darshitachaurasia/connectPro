import UserModel from "../models/user.model.js";
import ServiceModel from "../models/service.model.js";

export const getAllMentors = async () => {
    return await UserModel.find({ role: "mentor" }).select("-password -__v -refreshToken -otp -otpExpiry");
};

export const getMentorById = async (id) => {
    return await UserModel.findOne({ _id: id, role: "mentor" }).select("-password -__v -refreshToken -otp -otpExpiry");
};

export const getMentorByFullname = async (fullname) => {
    const mentor = await UserModel.findOne({ fullname, role: "mentor" }).select("-password -__v -refreshToken -otp -otpExpiry");
    if (!mentor) return null;
    return mentor;
};
