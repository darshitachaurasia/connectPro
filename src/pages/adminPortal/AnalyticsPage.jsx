import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboardStats } from '../../redux/adminSlice';

export default function AnalyticsPage() {
  const dispatch = useDispatch();
  const { stats } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchDashboardStats());
  }, [dispatch]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Analytics Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <AnalyticsCard title="Users" count={stats?.userCount || 0} />
        <AnalyticsCard title="Mentors" count={stats?.mentorCount || 0} />
        <AnalyticsCard title="Bookings" count={stats?.bookingCount || 0} />
      </div>
    </div>
  );
}

function AnalyticsCard({ title, count }) {
  return (
    <div className="bg-white p-6 shadow rounded-lg text-center border">
      <div className="text-4xl font-bold mb-2">{count}</div>
      <div className="text-lg font-medium text-gray-600">{title}</div>
    </div>
  );
}

