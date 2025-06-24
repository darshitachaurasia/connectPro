
import { Link } from 'react-router-dom';

export default function UserDashboard() {
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-800 to-pink-600 text-white flex flex-col items-center justify-start p-8">
      <p className="text-xl italic text-gray-200 mb-8">
        “The beautiful thing about learning is that nobody can take it away from you.” — B.B. King
      </p>

     
      {/* Functional Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        <DashboardCard title="👤 My Profile" to="/profile" />
        <DashboardCard title="📅 Book a Mentor" to="/book-mentor" />
        <DashboardCard title="📖 My Bookings" to="/booking-details" />
        <DashboardCard title="🛠️ Services" to="/service" />
      </div>

      {/* Logout */}
      <Link
        to="/logout"
        className="mt-10 px-6 py-2 bg-red-600 rounded-full hover:bg-red-700 transition"
      >
        Logout
      </Link>
    </div>
  );
}

function DashboardCard({ title, to }) {
  return (
    <Link
      to={to}
      className="bg-white/20 backdrop-blur-md p-6 rounded-xl hover:bg-white/30 transition duration-200 text-center shadow-lg"
    >
      <h2 className="text-2xl font-semibold">{title}</h2>
    </Link>
  );
}


