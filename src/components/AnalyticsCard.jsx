

function AnalyticsCard({ title, count, icon }) {
  return (
    <div className="bg-white p-6 shadow rounded-lg text-center border">
      <div className="text-4xl font-bold mb-2">{count}</div>
      <div className="text-lg font-medium text-gray-600">{title}</div>
    </div>
  );
}

export default AnalyticsCard;