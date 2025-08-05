import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { createBooking } from "../../redux/bookingSlice";
import { motion } from "framer-motion";

export default function BookingPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { mentorId } = useParams();
  const user = useSelector((state) => state.auth.user);

  const [formData, setFormData] = useState({ serviceName: "", dateTime: "" });
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!user) navigate("/login");
    if (!mentorId) navigate("/mentors");
  }, [user, mentorId, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createBooking({
        userId: user._id,
        mentorId,
        serviceName: formData.serviceName,
        dateTime: formData.dateTime,
      })
    );
    setSuccess(true);
    setTimeout(() => navigate("/booking-details"), 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-blue-700 px-4 py-10">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white p-8 rounded-xl shadow-xl max-w-md w-full text-gray-800 space-y-6"
      >
        <h2 className="text-3xl font-bold text-blue-700 text-center">
          Book a Session
        </h2>
        {success && (
          <p className="text-green-500 text-center">✅ Booking successfully created!</p>
        )}
        <div>
          <label className="block text-sm text-gray-600">Service Name</label>
          <input
            type="text"
            className="w-full p-3 rounded-lg border border-gray-300"
            value={formData.serviceName}
            onChange={(e) => setFormData({ ...formData, serviceName: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600">Date & Time</label>
          <input
            type="datetime-local"
            className="w-full p-3 rounded-lg border border-gray-300"
            value={formData.dateTime}
            onChange={(e) => setFormData({ ...formData, dateTime: e.target.value })}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
        >
          {success ? "Booked!" : "Confirm Booking"}
        </button>
      </motion.form>
    </div>
  );
}
