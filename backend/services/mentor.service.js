import UserModel from "../models/user.model.js";
import ServiceModel from "../models/service.model.js";

export const getAllMentors = async (filters) => {
    console.log("Filters received in service:", filters);
    const query = { role: "mentor" };

    if (filters.fullname) {
        query.fullname = { $regex: filters.fullname, $options: "i" };
    }
    if (filters.expertise) {
        query.expertise = { $regex: filters.expertise, $options: "i" };
    }
    if (filters.rating) {
        query.rating = { $gte: Number(filters.rating) };
    }
    if (filters.priceRange) {
        const [min, max] = filters.priceRange.split("-").map(Number);
        const services = await ServiceModel.find({ price: { $gte: min, $lte: max } }).select("mentor");
        const mentorIds = services.map(service => service.mentor);
        query._id = { $in: mentorIds };
    }

    const mentors = await UserModel.find(query).select("-password -__v -refreshToken -otp -otpExpiry").lean();
    for (let mentor of mentors) {
        const services = await ServiceModel.find({ mentor: mentor._id, }).select("name description price duration active");
        mentor.services = services;
    }
    
    // Ensure _id is a string for reliable use on the frontend.
    const mentorsWithIdAsString = mentors.map(mentor => {
        return { ...mentor, _id: mentor._id.toString() };
    });

    return mentorsWithIdAsString;
};

export const getMentorById = async (id) => {
    const mentor = await UserModel.findOne({ _id: id, role: "mentor" }).select("-password -__v -refreshToken -otp -otpExpiry").lean();
    if (mentor) {
        const services = await ServiceModel.find({ mentor: id,}).select("name description price duration active");
        mentor.services = services;
        mentor.experience = "5+ years";
    }
    return mentor;
};

export const getMentorByUsername = async (username) => {
    const mentor = await UserModel.findOne({ username, role: "mentor" }).select("-password -__v -refreshToken -otp -otpExpiry");
    if (!mentor) return null;
    return mentor;
};

export const getAllServicesByMentorId = async (id) => {
    const services = await ServiceModel.find({ mentor: id }).select("name description price duration active");
    return services;
};
