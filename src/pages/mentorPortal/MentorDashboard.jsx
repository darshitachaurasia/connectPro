
import { Link } from 'react-router-dom';
export default function MentorDashboard() {
  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      <MentorCard
        title="My Profile"
        description="Update your expertise and intro"
        icon="🧑‍🏫"
        to="/mentor-profile"
      />
      <MentorCard
        title="Bookings"
        description="View your mentee sessions"
        icon="📅"
        to="/mentor-bookings"
      />
     
    </div>
  );
}


export  function MentorCard({ title, icon, description, to }) {
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

