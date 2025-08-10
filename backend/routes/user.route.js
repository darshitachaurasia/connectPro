import { Router } from "express";
import { getCurrentUser, updateUserProfile, rateMentor, updateProfilePicture } from "../controllers/user.controller.js";
import  verifyJWT from "../middlewares/auth.js";
import upload from "../middlewares/multer.js";

const userRouter = Router();

userRouter.get("/profile", verifyJWT, getCurrentUser);
userRouter.put("/update", verifyJWT, updateUserProfile);
userRouter.post("/rate-mentor/:mentorId", verifyJWT, rateMentor);
userRouter.post("/update-profile-picture", verifyJWT, upload.single("profilePicture"), updateProfilePicture);

export default userRouter;
