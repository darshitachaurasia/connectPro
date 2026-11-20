import { Router } from "express";
import * as mentorController from "../controllers/mentor.controller.js";
import asyncHandler from "../utils/http/asyncHandler.js"

const mentorRouter = Router();

mentorRouter.get("/", asyncHandler(mentorController.getAllMentors));
mentorRouter.get("/username/:username", asyncHandler(mentorController.getMentorInfoByUsername));
mentorRouter.get("/:id", asyncHandler(mentorController.getMentorById));

export default mentorRouter;
