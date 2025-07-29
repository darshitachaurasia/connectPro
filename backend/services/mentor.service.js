import UserModel from "../models/user.model.js";
import ServiceModel from "../models/service.model.js";

export const getAllMentors = async () => {
    return await UserModel.find({ role: "mentor" });
};

export const getMentorById = async (id) => {
    return await UserModel.findOne({ _id: id, role: "mentor" });
};

export const getMentorByFullname = async (fullname) => {
    const mentor = await UserModel.findOne({ fullname, role: "mentor" });
    if (!mentor) return null;
    console.log("Mentor found: ", mentor);
    return mentor;
};
