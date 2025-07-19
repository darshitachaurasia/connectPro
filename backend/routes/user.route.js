import { Router } from "express";
import { getCurrentUser } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.js";

const userRouter = Router();

userRouter.get("/profile", verifyJWT, getCurrentUser);

export default userRouter;
