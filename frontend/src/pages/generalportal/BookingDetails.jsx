import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {  fetchUserBookings } from "../../redux/bookingSlice";
import { motion } from "framer-motion";

export default function BookingDetails() {
  const dispatch = useDispatch();
  const bookings = useSelector((state) => state.booking.list);

  useEffect(() => {
    dispatch(fetchUserBookings());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white text-blue-800 py-12 px-6">
      <motion.h2
        className="text-4xl font-bold mb-10 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Your Bookings
      </motion.h2>
      {bookings.length === 0 ? (
        <p className="text-center text-gray-500">No bookings found.</p>
      ) : (
        <ul className="max-w-3xl mx-auto space-y-4">
          {bookings.map((b) => (
            <li key={b._id} className="p-6 bg-white rounded-lg shadow-md">
              <p><strong>Service:</strong> {b.service}</p>
              <p><strong>Date & Time:</strong> {new Date(b.dateTime).toLocaleString()}</p>
              <p><strong>Status:</strong> {b.status || "Pending"}</p>
            </li>
          ))}
        </ul>
      )}
     
    </div>
  );
}
