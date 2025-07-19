import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchBookingsByUser } from '../../redux/bookingSlice';
import { motion } from 'framer-motion';
import { getCurrentUser } from '../../redux/authSlice';

export default function BookingDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const bookings = useSelector((state) => state.booking.list);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (!user) {
       dispatch(getCurrentUser());
    } else {
      dispatch(fetchBookingsByUser(user.$id));
    }
  }, [ navigate, dispatch]);

  const userBookings = bookings.filter((b) => b.userId === user?.$id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0c0822] to-[#2d0727] text-white py-12 px-6 flex flex-col items-center">
      <motion.h2
        className="text-4xl font-bold text-pink-300 mb-10 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Your Bookings
      </motion.h2>

      {userBookings.length === 0 ? (
        <motion.p
          className="text-lg text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          No bookings found.
        </motion.p>
      ) : (
        <motion.ul
          className="space-y-6 w-full max-w-3xl"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { delayChildren: 0.2, staggerChildren: 0.1 },
            },
          }}
        >
          {userBookings.map((booking) => (
            <motion.li
              key={booking.$id}
              className="bg-[#1e0e2f] border border-white/10 p-6 rounded-xl shadow-lg"
              variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
            >
              <p className="mb-1">
                <span className="text-pink-200 font-medium">Service:</span>{' '}
                {booking.service}
              </p>
              <p className="mb-1">
                <span className="text-pink-200 font-medium">Mentor ID:</span>{' '}
                {booking.mentorId}
              </p>
              <p className="mb-1">
                <span className="text-pink-200 font-medium">Date & Time:</span>{' '}
                {new Date(booking.dateTime).toLocaleString()}
              </p>
              <p>
                <span className="text-pink-200 font-medium">Status:</span>{' '}
                {booking.status || 'Pending'}
              </p>
            </motion.li>
          ))}
        </motion.ul>
      )}
    </div>
  );
}


