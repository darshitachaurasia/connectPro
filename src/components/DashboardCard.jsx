import { Link } from 'react-router-dom';

export default function DashboardCard({ title, description, icon, to }) {
  return (
    <Link
      to={to}
      className="flex flex-col justify-between bg-white/10 text-white p-6 rounded-2xl shadow-xl hover:scale-105 hover:bg-white/20 transition-transform duration-300"
    >
      {/* Icon */}
      <div className="text-4xl mb-4">{icon}</div>

      {/* Title */}
      <h2 className="text-2xl font-bold mb-2">{title}</h2>

      {/* Description */}
      <p className="text-sm text-gray-200">{description}</p>
    </Link>
  );
}
