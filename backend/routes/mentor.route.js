import { Router } from "express";
import * as mentorController from "../controllers/mentor.controller.js";
import asyncHandler from "../utils/asyncHandler.js"

const mentorRouter = Router();

mentorRouter.get("/", asyncHandler(mentorController.getAllMentors));
mentorRouter.get("/:username", asyncHandler(mentorController.getMentorInfoByUsername));

export default mentorRouter;
