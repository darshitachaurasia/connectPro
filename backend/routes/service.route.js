import { Router } from "express";
const serviceController = require("../../controllers/service.controller");
const asyncHandler = require("../../helper/asyncHandler");
const validate = require("../../middleware/validate");
const authMiddleware = require("../../middleware/auth")
const serviceRouter = Router();
router.post("/", validate(createServiceSchema), authMiddleware.protect, 
                            authMiddleware.restricTo("mentor"),
                            asyncHandler(serviceController.createService))

router.post("/:serviceId", validate(createServiceSchema), authMiddleware.protect, 
                            authMiddleware.restricTo("mentor"),
                            asyncHandler(serviceController.updateService))

router.get("/", authMiddleware.protect, 
                            authMiddleware.restricTo("mentor"),
                            asyncHandler(serviceController.getServiceByMentor))

router.get("/:serviceId", authMiddleware.protect, 
                                authMiddleware.restricTo("mentor"),
                                asyncHandler(serviceController.getServiceById));



export default serviceRouter;
    
