import { Link } from 'react-router-dom';

export default function MentorCard({ title, icon, description, to }) {
  return (
    <Link
      to={to}
      className="bg-purple-900/60 text-white p-6 rounded-xl shadow-lg hover:shadow-purple-500 transition-all duration-300 hover:scale-105"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">{title}</h2>
        <span className="text-3xl">{icon}</span>
      </div>
      <p className="text-gray-300">{description}</p>
    </Link>
  );
}
