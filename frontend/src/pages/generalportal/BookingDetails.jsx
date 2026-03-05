import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserBookings } from "../../redux/bookingSlice";
import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // ✅ Import Link

export default function BookingDetails() {
  const dispatch = useDispatch();
  const bookings = useSelector((state) => state.booking.bookings);

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
        <ul className="max-w-3xl mx-auto space-y-6">
          {bookings.map((booking) => {
            const { _id, service, mentorId, dateTime, status } = booking;
            return (
              <li
                key={_id}
                className="p-5 bg-white rounded-lg shadow-md border hover:shadow-lg transition"
              >
                {/* Header */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-2">
                  <h3 className="text-xl font-semibold text-blue-900">
                    {service?.serviceName}
                  </h3>
                  <span
                    className={`px-3 py-1 text-sm font-semibold rounded-full ${
                      status === "confirmed"
                        ? "bg-green-100 text-green-800"
                        : status === "completed"
                        ? "bg-blue-100 text-blue-800"
                        : status === "cancelled"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {status}
                  </span>
                </div>

                {/* Details */}
                <div className="text-gray-700 space-y-2 text-sm sm:text-base">
                  <p>
                    <strong>Mentor:</strong> {mentorId?.fullname}
                  </p>
                  <p>
                    <strong>Date & Time:</strong>{" "}
                    {new Date(dateTime).toLocaleString()}
                  </p>
                  <p>
                    <strong>Price:</strong> ₹{service?.price}
                  </p>
                  <Link
                    to="/send-email"
                    className="inline-block mt-2 text-blue-600 font-medium hover:underline"
                  >
                    Get Booking Link
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

