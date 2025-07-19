import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBookings } from "../../redux/adminSlice";

import { Link } from "react-router-dom";
export default function BookingManagement() {
  const dispatch = useDispatch();
  const bookings = useSelector((state) => state.admin.bookings);

  useEffect(() => {
    dispatch(fetchAllBookings());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-700 to-purple-800 text-white p-6">
      <h1 className="text-3xl font-bold mb-4">📅 Booking Management</h1>
      <table className="w-full bg-white text-purple-900 rounded shadow-md">
        <thead className="bg-purple-200">
          <tr>
            <th className="p-3">User</th>
            <th className="p-3">Mentor</th>
            <th className="p-3">Service</th>
            <th className="p-3">DateTime</th>
            <th className="p-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b.$id} className="text-center">
              <td className="p-2 border-b border-purple-300">{b.userId}</td>
              <td className="p-2 border-b border-purple-300">{b.mentorId}</td>
              <td className="p-2 border-b border-purple-300">{b.serviceName}</td>
              <td className="p-2 border-b border-purple-300">{new Date(b.dateTime).toLocaleString()}</td>
              <td className="p-2 border-b border-purple-300">{b.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link
        to={'/admin-login'}
        className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-[#2d0727] text-white border border-pink-500 hover:bg-pink-600 hover:shadow-lg transition duration-300"
      >
        
        Back to Dashboard
      </Link>
    </div>
  );
}
