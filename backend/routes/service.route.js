import { Router } from "express";
import * as serviceController from "../../controllers/service.controller.js";
import asyncHandler from "../../helper/asyncHandler.js";
import validate from "../../middleware/validate.js";
import authMiddleware from "../../middleware/auth.js";
// import createServiceSchema from the appropriate location if needed

const serviceRouter = Router();

// You need to import or define createServiceSchema for validation to work
// import createServiceSchema from "../../schemas/service.schema.js";

serviceRouter.post("/", validate(createServiceSchema), authMiddleware.protect, 
    authMiddleware.restricTo("mentor"),
    asyncHandler(serviceController.createService));

serviceRouter.post("/:serviceId", validate(createServiceSchema), authMiddleware.protect, 
    authMiddleware.restricTo("mentor"),
    asyncHandler(serviceController.updateService));

serviceRouter.get("/", authMiddleware.protect, 
    authMiddleware.restricTo("mentor"),
    asyncHandler(serviceController.getServiceByMentor));

serviceRouter.get("/:serviceId", authMiddleware.protect, 
    authMiddleware.restricTo("mentor"),
    asyncHandler(serviceController.getServiceById));

export default serviceRouter;
    
