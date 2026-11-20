import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminStats } from "../../redux/adminSlice";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const stats = useSelector((state) => state.admin.stats);

  useEffect(() => {
    dispatch(fetchAdminStats());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-blue-800 text-white p-6">
      <h1 className="text-4xl font-extrabold mb-6 text-center">📊 Admin Dashboard</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center mb-8">
        {stats ? (
          <>
            <div className="bg-blue-600 p-6 rounded-xl shadow-lg">Users<br /><span className="text-2xl font-bold">{stats.totalUsers}</span></div>
            <div className="bg-blue-600 p-6 rounded-xl shadow-lg">Mentors<br /><span className="text-2xl font-bold">{stats.totalMentors}</span></div>
            <div className="bg-blue-600 p-6 rounded-xl shadow-lg">Bookings<br /><span className="text-2xl font-bold">{stats.totalBookings}</span></div>
            <div className="bg-blue-600 p-6 rounded-xl shadow-lg">Recent Signups<br /><span className="text-2xl font-bold">{stats.recentSignups}</span></div>
          </>
        ) : (
          <p>Loading stats...</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
        <Link to="/manage-users" className="bg-white text-blue-800 py-4 px-6 rounded-xl shadow hover:bg-blue-100 transition text-lg font-semibold">👤 User Management</Link>
        <Link to="/manage-mentors" className="bg-white text-blue-800 py-4 px-6 rounded-xl shadow hover:bg-blue-100 transition text-lg font-semibold">👨‍🏫 Mentor Management</Link>
        <Link to="/booking-manage" className="bg-white text-blue-800 py-4 px-6 rounded-xl shadow hover:bg-blue-100 transition text-lg font-semibold">📅 Booking Management</Link>
      </div>
    </div>
  );
}