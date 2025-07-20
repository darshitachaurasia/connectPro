// --- MentorBooking.jsx ---
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchBookingsByMentor } from "../../redux/bookingSlice";
import { fetchMentors } from "../../redux/mentorSlice";
import { Link } from "react-router-dom";

export default function MentorBooking() {
  const { mentorId } = useParams();
  const dispatch = useDispatch();

  const bookings = useSelector((state) => state.booking.list);
  const bookingStatus = useSelector((state) => state.booking.status);
  const mentors = useSelector((state) => state.mentor.list);
  const mentorStatus = useSelector((state) => state.mentor.status);

  useEffect(() => {
    if (mentorId) {
      dispatch(fetchBookingsByMentor(mentorId));
    }
    if (mentorStatus === "idle") {
      dispatch(fetchMentors());
    }
  }, [dispatch, mentorId, mentorStatus]);

  const mentor = mentors.find((m) => m.id === mentorId);

  return (
    <div className="min-h-screen px-8 py-16 bg-gradient-to-br from-[#0c0822] to-[#2d0727] text-white">
      <h2 className="text-4xl font-bold mb-10 text-center text-pink-400">
        Bookings for {mentor?.name || "..."}
      </h2>

      {bookingStatus === "loading" ? (
        <p className="text-center text-xl">Loading bookings...</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <li
              key={booking.id}
              className="bg-[#1e0e2f] p-6 rounded-lg shadow-md border border-pink-500/20"
            >
              <p>
                <strong>📌 User ID:</strong> {booking.userId}
              </p>
              <p>
                <strong>📅 Date:</strong> {booking.dateTime}
              </p>
              <p>
                <strong>📍 Status:</strong> {booking.status}
              </p>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-10 text-center">
        <Link
          to="/mentor-login"
          className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-[#2d0727] text-white border border-pink-500 hover:bg-pink-600 hover:shadow-lg transition duration-300"
        >
          ⬅️ Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
