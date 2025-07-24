import { Router } from "express";
const paymentRouter = Router();
const paymentController = require("../../controllers/payment.controller");

router.post("/create-order", paymentController.createOrder);
router.post("/verify-payment", paymentController.verifyPayment);


export default paymentRouter;
