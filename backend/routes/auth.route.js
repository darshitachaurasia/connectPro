import { Router } from "express";
import { registerUser, loginUser, logoutUser, sendOtp, verifyOtp } from "../controllers/auth.controller.js";
import { verifyJWT } from "../middlewares/auth.js";

const authRouter = Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.post("/logout", verifyJWT, logoutUser);
authRouter.post("/send-otp", verifyJWT, sendOtp);
authRouter.post("/verify-otp", verifyJWT, verifyOtp);

export default authRouter;