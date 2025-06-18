import { useSelector } from "react-redux";

export default function AnalyticsPage() {
  const stats = useSelector(state => state.admin.stats);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Analytics Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <AnalyticsCard title="Users" count={stats.users || 0} />
        <AnalyticsCard title="Mentors" count={stats.mentors || 0} />
        <AnalyticsCard title="Bookings" count={stats.bookings || 0} />
      </div>
    </div>
  );
}

