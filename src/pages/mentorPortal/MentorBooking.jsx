// pages/mentor/MentorBookingDetailsPage.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMentorBookings, updateBookingStatus } from '../../redux/bookingSlice';
import { fetchMentorById } from '../../redux/mentorSlice';

function MentorBooking() {
  const dispatch = useDispatch();
  const mentor = useSelector(state => state.auth.userData); // assuming this is the logged-in mentor
  const bookings = useSelector(state => state.booking.bookings);
  const loading = useSelector(state => state.booking.loading);

  useEffect(() => {
    if (mentor?.id) {
      dispatch(fetchMentorById(mentor.id)); // Load mentor if needed
      dispatch(fetchMentorBookings(mentor.id)); // Load bookings for this mentor
    }
  }, [mentor?.id, dispatch]);

  const handleStatusChange = (bookingId, status) => {
    dispatch(updateBookingStatus({ bookingId, status }));
    // Optional: Also update backend with asyncThunk or API call
  };

  const filteredBookings = bookings.filter(b => b.mentorId === mentor?.id);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Your Bookings</h2>

      {loading ? (
        <p>Loading bookings...</p>
      ) : filteredBookings.length === 0 ? (
        <p>No bookings available.</p>
      ) : (
        <div className="space-y-4">
          {filteredBookings.map(booking => (
            <div key={booking.id} className="border p-4 rounded shadow-sm bg-white">
              <p><strong>User:</strong> {booking.userName}</p>
              <p><strong>Date:</strong> {booking.date}</p>
              <p><strong>Notes:</strong> {booking.notes || 'No notes provided'}</p>
              <p><strong>Status:</strong> <span className="capitalize">{booking.status}</span></p>

              {booking.status === 'pending' && (
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => handleStatusChange(booking.id, 'accepted')}
                    className="bg-green-500 text-white px-3 py-1 rounded"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleStatusChange(booking.id, 'rejected')}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MentorBooking;



