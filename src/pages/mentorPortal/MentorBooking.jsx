import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchBookingsByUser } from "../../redux/bookingSlice";
import { fetchMentors } from "../../redux/mentorSlice";
import service from "../../appwrite/services";

export default function MentorBooking() {
  const { mentorId } = useParams();
  const dispatch = useDispatch();

  const bookings = useSelector((state) => state.booking.list);
  const bookingStatus = useSelector((state) => state.booking.status);
  const mentors = useSelector((state) => state.mentor.list);
  const mentorStatus = useSelector((state) => state.mentor.status);

  const [usersMap, setUsersMap] = useState({});

  useEffect(() => {
    const loggedInMentorId = mentorId;
    if (loggedInMentorId) {
      dispatch(fetchBookingsByUser(loggedInMentorId));
    }
    if (mentorStatus === "idle") {
      dispatch(fetchMentors());
    }
  }, [dispatch, mentorId, mentorStatus]);

  useEffect(() => {
    async function fetchUsers() {
      const userIds = [...new Set(bookings.map((b) => b.userId))];
      const map = {};
      for (const id of userIds) {
        try {
          const user = await service.getUserProfile(id);
          map[id] = user.name || id;
        } catch {
          map[id] = id;
        }
      }
      setUsersMap(map);
    }

    if (bookings.length > 0) {
      fetchUsers();
    }
  }, [bookings]);

  const mentor = mentors.find((m) => m.$id === mentorId);

  const mentorBookings = bookings.filter((b) => b.mentorId === mentorId);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        Bookings for {mentor ? mentor.name : "Loading..."}
      </h2>

      {bookingStatus === "loading" ? (
        <p>Loading bookings...</p>
      ) : (
        <ul className="space-y-4">
          {mentorBookings.map((booking) => (
            <li key={booking.$id} className="border p-4 rounded-xl shadow">
              <p><strong>Service:</strong> {booking.service}</p>
              <p><strong>Date:</strong> {booking.dateTime}</p>
              <p><strong>Status:</strong> {booking.status}</p>
              <p><strong>Booked By:</strong> {usersMap[booking.userId] || booking.userId}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
