import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserBookings } from "../../redux/bookingSlice";
import { motion } from "framer-motion";

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
        <ul className="max-w-3xl mx-auto space-y-4">
          {bookings.map((booking) => {
            const { _id, service, mentorId, dateTime, price, status } = booking;
            return (
              <motion.li
                key={_id}
                className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-blue-900">{service?.serviceName}</h3>
                  <span
                    className={`px-3 py-1 text-sm font-semibold rounded-full ${status === "confirmed"
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
                <div className="text-gray-700 space-y-2">
                  <p>
                    <strong>Mentor:</strong> {mentorId?.fullname
                    }
                  </p>
                  <p>
                    <strong>Date & Time:</strong>{" "}
                    {new Date(dateTime).toLocaleString()}
                  </p>
                  <p>
                    <strong>Price:</strong> ₹{service?.price}
                  </p>
                </div>
              </motion.li>
            );
          })}
        </ul>
      )}

    </div>
  );
}
