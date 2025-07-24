import { Router } from "express";
const mentorController =require("../../controllers/mentor.controller");
const asyncHandler=require("../../helper/asyncHandler");

const mentorRouter=Router();

router.get("/",asyncHandler(mentorController.getAllMentors))
router.get("/:username",asyncHandler(mentorController.getMentorinfoByUsername))


export default mentorRouter;