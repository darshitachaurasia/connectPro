import ApiError from "../utils/ApiError.js";
import * as mentorService from "../services/mentor.service.js";
import httpStatus from "../utils/httpStatus.js";

export const getAllMentors = async (req, res, next) => {
    try {
        const mentors = await mentorService.getAllMentors();
        if (!mentors || mentors.length === 0) {
            return next(new ApiError(httpStatus.notFound, "No mentors found"));
        }
        res.status(httpStatus.ok).json({
            success: true,
            mentors
        });
    } catch (error) {
        next(error);
    }
};

export const getMentorInfoByUsername = async (req, res, next) => {
    try {
        const { username } = req.params;
        const mentor = await mentorService.getMentorById(username);
        if (!mentor) {
            return next(new ApiError(httpStatus.notFound, "Mentor not found"));
        }
        res.status(httpStatus.ok).json({
            success: true,
            mentor
        });
    } catch (error) {
        next(error);
    }
};
