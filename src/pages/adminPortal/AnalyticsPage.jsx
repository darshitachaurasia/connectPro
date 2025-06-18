import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPlatformStats } from '../../redux/adminSlice';
import service from '../../appwrite/services';
import AnalyticsCard from '../../components/AnalyticsCard'; // assume you have this

export default function AnalyticsPage() {
  const dispatch = useDispatch();

  // ✅ Get stats from Redux
  const stats = useSelector((state) => state.admin.platformStats);

  useEffect(() => {
    async function fetchStats() {
      const stats = await service.getCounts();
      dispatch(
        getPlatformStats({
          users: stats.userCount,
          mentors: stats.mentorCount,
          bookings: stats.bookingCount,
        })
      );
    }

    fetchStats();
  }, [dispatch]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Analytics Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <AnalyticsCard title="Users" count={stats?.users || 0} />
        <AnalyticsCard title="Mentors" count={stats?.mentors || 0} />
        <AnalyticsCard title="Bookings" count={stats?.bookings || 0} />
      </div>
    </div>
  );
}

