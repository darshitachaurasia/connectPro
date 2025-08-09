import ApiError from "../utils/ApiError.js";
import * as mentorService from "../services/mentor.service.js";
import httpStatus from "../utils/httpStatus.js";
import mongoose from "mongoose";

export const getAllMentors = async (req, res, next) => {
    try {
        const { fullname, expertise, rating, priceRange } = req.query;
        const filters = {
            fullname,
            expertise,
            rating,
            priceRange,
        };
        const mentors = await mentorService.getAllMentors(filters);
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
        const mentor = await mentorService.getMentorByUsername(username);
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

export const getMentorById = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return next(new ApiError(httpStatus.badRequest, "Invalid mentor ID"));
        }
        const mentor = await mentorService.getMentorById(id);
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
