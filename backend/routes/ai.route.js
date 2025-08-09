import { Router } from "express";
import {  skill } from "../controllers/ai.controller.js";

const aiRouter = Router();

// Use aiRouter, not app

aiRouter.post("/career-suggestions", skill);

export default aiRouter;
