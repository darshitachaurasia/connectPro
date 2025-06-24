import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchBookingsByUser } from '../../redux/bookingSlice';

export default function BookingDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const bookings = useSelector((state) => state.booking.list);
  const user = useSelector((state) => state.user.profile);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      dispatch(fetchBookingsByUser(user.$id));
    }
  }, [user, navigate, dispatch]);

  const userBookings = bookings.filter((b) => b.userId === user?.$id);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Your Bookings</h2>
      {userBookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <ul className="space-y-4">
          {userBookings.map((booking) => (
            <li key={booking.$id} className="border p-4 rounded">
              <p><strong>Service:</strong> {booking.service}</p>
              <p><strong>Mentor ID:</strong> {booking.mentorId}</p>
              <p><strong>Date & Time:</strong> {booking.dateTime}</p>
              <p><strong>Status:</strong> {booking.status}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

