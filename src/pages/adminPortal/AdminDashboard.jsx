import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardStats } from "../../redux/adminSlice";

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const { stats } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchDashboardStats());
  }, [dispatch]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      {stats ? (
        <ul className="space-y-2">
          <li>Users: {stats.userCount}</li>
          <li>Mentors: {stats.mentorCount}</li>
          <li>Bookings: {stats.bookingCount}</li>
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}