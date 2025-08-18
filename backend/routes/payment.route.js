import { Router } from "express";
import * as paymentController from "../controllers/payment.controller.js";

const paymentRouter = Router();

paymentRouter.post("/create-order", paymentController.createOrder);
paymentRouter.post("/verify-payment", paymentController.verifyPayment);
paymentRouter.post("/stripe/create-intent", paymentController.createStripePaymentIntent);

export default paymentRouter;
