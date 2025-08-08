import { Router } from "express";
import { counsellor, skill } from "../controllers/ai.controller.js";

const aiRouter = Router();

// Use aiRouter, not app
aiRouter.post("/langchain-chat", counsellor);
aiRouter.post("/career-suggestions", skill);

export default aiRouter;
