import { useSelector } from 'react-redux';

function BookingDetails() {
  const bookings = useSelector(state => state.booking.bookings);
  const user = useSelector(state => state.user.profile);

  const userBookings = bookings.filter(b => b.userName === user?.name);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Your Bookings</h2>
      {userBookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <ul className="space-y-4">
          {userBookings.map(booking => (
            <li key={booking.id} className="border p-4 rounded">
              <p><strong>Mentor:</strong> {booking.mentorId}</p>
              <p><strong>Date:</strong> {booking.date}</p>
              <p><strong>Status:</strong> {booking.status}</p>
              <p><strong>Notes:</strong> {booking.notes}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BookingDetails;

