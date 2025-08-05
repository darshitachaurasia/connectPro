import Booking from "../models/booking.model.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

// Create Booking
export const createBooking = asyncHandler(async (req, res) => {
  const { service, dateTime, mentorId, price } = req.body;
  const userId = req.user._id;

  if (!service || !dateTime || !mentorId) {
    throw new ApiError(400, "All fields are required");
  }

  const booking = await Booking.create({
    userId,
    mentorId,
    service,
    dateTime,
    price: price || 0,
  });

  res.status(201).json({ success: true, booking });
});

// Get bookings for a user
export const getUserBookings = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const bookings = await Booking.find({ userId }).sort({ dateTime: -1 });
  res.json({ success: true, bookings });
});

// Get bookings for a mentor
export const getMentorBookings = asyncHandler(async (req, res) => {
  const mentorId = req.user._id;
  const bookings = await Booking.find({ mentorId }).sort({ dateTime: -1 });
  res.json({ success: true, bookings });
});
