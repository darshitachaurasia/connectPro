import { Router } from "express";
import { createBooking, getUserBookings, getMentorBookings } from "../controllers/booking.controller.js";
import verifyJWT from "../middlewares/auth.js";

const router = Router();

router.post("/", verifyJWT, createBooking); // Create booking
router.get("/user", verifyJWT, getUserBookings); // Fetch user bookings
router.get("/mentor", verifyJWT, getMentorBookings); // Fetch mentor bookings

export default router;
