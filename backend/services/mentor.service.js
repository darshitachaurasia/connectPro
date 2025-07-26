import UserModel from "../models/user.model.js";
import ServiceModel from "../models/service.model.js";

const getAllMentors = async () => {
    return await UserModel.find({ role: "mentor" });
};

const getMentorById = async (id) => {
    return await UserModel.findOne({ _id: id, role: "mentor" });
};

const getMentorByUsername = async (username) => {
    const mentor = await UserModel.findOne({ username, role: "mentor" });
    if (!mentor) return null;
    console.log("Mentor found: ", mentor);
    return mentor;

}

export { getAllMentors, getMentorByUsername, getMentorById };