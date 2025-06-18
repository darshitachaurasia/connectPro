import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import service from '../../appwrite/services';;
import {
  fetchAllUsers,
  fetchAllMentors,
  getPlatformStats,
  setLoading,
} from '../../redux/adminSlice';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { user, mentor, stats, loading } = useSelector(state => state.admin);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(setLoading(true));

      const [users, mentors, counts] = await Promise.all([
        service.listAllUsers(),
        service.listMentors(),
        service.getCounts(),
      ]);

      if (users) dispatch(fetchAllUsers(users.documents));
      if (mentors) dispatch(fetchAllMentors(mentors.documents));
      if (counts) dispatch(getPlatformStats(counts));
    };

    fetchData();
  }, [dispatch]);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <>
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <StatCard title="Total Users" value={stats.userCount || 0} />
            <StatCard title="Total Mentors" value={stats.mentorCount || 0} />
            <StatCard title="Total Bookings" value={stats.bookingCount || 0} />
          </div>

          {/* Users Table */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">All Users</h2>
            <Table data={user} columns={['name', 'email', 'role']} />
          </div>

          {/* Mentors Table */}
          <div>
            <h2 className="text-xl font-semibold mb-2">All Mentors</h2>
            <Table data={mentor} columns={['userId', 'bio', 'experience']} />
          </div>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;

const StatCard = ({ title, value }) => (
  <div className="bg-white shadow rounded-lg p-4">
    <h3 className="text-gray-600 text-sm">{title}</h3>
    <p className="text-2xl font-semibold">{value}</p>
  </div>
);

const Table = ({ data = [], columns = [] }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto border">
        <thead className="bg-gray-100">
          <tr>
            {columns.map(col => (
              <th key={col} className="p-2 border">{col.toUpperCase()}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.$id || item.id}>
              {columns.map(col => (
                <td key={col} className="p-2 border text-sm">
                  {item[col] || '—'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

