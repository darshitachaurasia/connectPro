import { Router } from "express";
import * as serviceController from "../controllers/service.controller.js";
import asyncHandler from "../utils/asyncHandler.js";
import verifyJWT from "../middlewares/auth.js";  // ✅ Updated import

const serviceRouter = Router();

// ✅ Create Service
serviceRouter.post(
  "/",
  verifyJWT, // ✅ Authentication middleware
  asyncHandler(serviceController.createService)
);

// ✅ Update Service
serviceRouter.put(
  "/:serviceId",
  verifyJWT,
  asyncHandler(serviceController.updateService)
);

// ✅ Get all services for a mentor
serviceRouter.get(
  "/",
  verifyJWT,
  asyncHandler(serviceController.getServiceByMentor)
);

// ✅ Get service by ID
serviceRouter.get(
  "/:serviceId",
  verifyJWT,
  asyncHandler(serviceController.getServiceById)
);

// ✅ Delete service
serviceRouter.delete(
  "/:serviceId",
  verifyJWT,
  asyncHandler(serviceController.deleteService)
);

export default serviceRouter;
