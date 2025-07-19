import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { createBooking } from "../../redux/bookingSlice";
import { motion } from "framer-motion";

export default function BookingPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  const user = useSelector((state) => state.auth.user);
  
const { mentorId } = useParams();
 
  const [formData, setFormData] = useState({
    serviceName: "",
    dateTime: "",
  });

  const [success, setSuccess] = useState(false);

  // Redirect if user not logged in
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // Redirect if no mentor selected (e.g., accessed directly)
  useEffect(() => {
    if (!mentorId) {
      navigate("/mentors");
    }
  }, [mentorId, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      createBooking({
        userId: user.$id,
        mentorId,
        serviceName: formData.serviceName,
        dateTime: formData.dateTime,
      })
    );

    setSuccess(true);
    setFormData({ serviceName: "", dateTime: "" });
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Optional: Navigate away after a short delay
    setTimeout(() => navigate("/booking-details"), 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0c0822] to-[#2d0727] px-4 py-10">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-[#1e0e2f] border border-white/10 p-8 rounded-2xl shadow-xl max-w-md w-full text-white space-y-6"
      >
        <h2 className="text-3xl font-bold text-pink-300 text-center">
          Book a Session
        </h2>

        {success && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-green-400 text-center text-sm font-medium"
          >
            ✅ Booking successfully created!
          </motion.div>
        )}

        <div className="space-y-2">
          <label className="block text-sm text-pink-200">Purpose</label>
          <input
            type="text"
            placeholder="e.g. Career Guidance"
            className="w-full p-3 rounded-lg bg-[#2d0727] border border-pink-400/20 focus:outline-none focus:ring-2 focus:ring-pink-400 text-white"
            value={formData.serviceName}
            onChange={(e) =>
              setFormData({ ...formData, serviceName: e.target.value })
            }
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm text-pink-200">Date & Time</label>
          <input
            type="datetime-local"
            className="w-full p-3 rounded-lg bg-[#2d0727] border border-pink-400/20 focus:outline-none focus:ring-2 focus:ring-pink-400 text-white"
            value={formData.dateTime}
            onChange={(e) =>
              setFormData({ ...formData, dateTime: e.target.value })
            }
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-pink-600 hover:bg-pink-700 transition py-3 rounded-lg font-semibold text-white"
        >
          {success ? "Booked!" : "Confirm Booking"}
        </button>
      </motion.form>
    </div>
  );
}
