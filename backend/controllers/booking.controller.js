import Booking from "../models/booking.model.js";
import Service from "../models/service.model.js";
import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

// Create Booking
export const createBooking = asyncHandler(async (req, res) => {
  const { service, dateTime, mentorId, message, paymentDetails } = req.body;
  const userId = req.user._id;

  if (!dateTime || !mentorId) {
    throw new ApiError(400, "All fields are required");
  }

  const parsedDateTime = new Date(dateTime);
  if (Number.isNaN(parsedDateTime.getTime()) || parsedDateTime <= new Date()) {
    throw new ApiError(400, "Choose a valid future date and time");
  }

  const mentor = await User.findOne({ _id: mentorId, role: "mentor" }).select("hourlyRate");
  if (!mentor) {
    throw new ApiError(404, "Mentor not found");
  }

  let selectedService = null;
  let price;
  if (service) {
    selectedService = await Service.findOne({
      _id: service,
      mentor: mentorId,
      active: true,
    });
    if (!selectedService) {
      throw new ApiError(400, "This service is unavailable");
    }
    price = selectedService.price;
  } else {
    price = mentor.hourlyRate;
    if (!Number.isFinite(price) || price <= 0) {
      throw new ApiError(400, "This mentor has not set a session rate yet");
    }
  }

  // Check if the slot is already booked
  const existingBooking = await Booking.findOne({ mentorId, dateTime: parsedDateTime });
  if (existingBooking) {
    throw new ApiError(409, "This slot is already booked");
  }

  const booking = await Booking.create({
    userId,
    mentorId,
    service: selectedService?._id,
    dateTime: parsedDateTime,
    price,
    message,
    paymentDetails,
  });

  res.status(201).json({ success: true, booking });
});

// Get bookings for a user
export const getUserBookings = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const bookings = await Booking.find({ userId })
    .populate("mentorId", "fullname email")
    .populate("service", "serviceName price") // Populate service name and price
    .sort({ dateTime: -1 });
  res.json({ success: true, bookings });
});

// Get bookings for a mentor
export const getMentorBookings = asyncHandler(async (req, res) => {
  const mentorId = req.user._id;
  const bookings = await Booking.find({ mentorId })
    .populate("userId", "fullname email")
    .populate("service", "price")
    .sort({ dateTime: -1 });
  res.json({ success: true, bookings });
});

// Get booked slots for a mentor on a specific date
export const getBookedSlots = asyncHandler(async (req, res) => {
  const { mentorId } = req.params;
  const { date } = req.query;

  if (!date) {
    throw new ApiError(400, "Date is required");
  }

  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  const bookings = await Booking.find({
    mentorId,
    dateTime: {
      $gte: startOfDay,
      $lt: endOfDay,
    },
  });

  const bookedSlots = bookings.map((booking) => {
    return new Date(booking.dateTime).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  });

  res.json({ success: true, bookedSlots });
});
