import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function UserDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0c0822] via-[#1e0e2f] to-[#2d0727] text-white flex flex-col items-center justify-start p-10 overflow-hidden">

      {/* Inspirational Quote */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="text-6xl italic text-gray-200 mb-14 text-center max-w-7xl"
      >
        “The beautiful thing about learning is that nobody can take it away from you.” — B.B. King
      </motion.p>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 w-full max-w-3xl px-4">
        <DashboardCard title="👤 My Profile" to="/profile" color="from-[#2d0727] to-[#601e5c]" />
        <DashboardCard title="📅 Book a Mentor" to="/mentors" color="from-[#1e0e2f] to-[#47126b]" />
        <DashboardCard title="📖 My Bookings" to="/booking-details" color="from-[#0c0822] to-[#2d0727]" />
        <DashboardCard title="🛠️ Services" to="/service" color="from-[#842d5d] to-[#2d0727]" />
      </div>
    </div>
  );
}

// Card Component with consistent gradients
function DashboardCard({ title, to, color }) {
  return (
    <motion.div
      whileHover={{ scale: 1.07 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="rounded-full shadow-2xl"
    >
      <Link
        to={to}
        className={`bg-gradient-to-r ${color} text-white text-xl font-semibold rounded-full h-40 flex items-center justify-center text-center px-6 transition duration-300 hover:opacity-90 hover:shadow-pink-400/30`}
      >
        {title}
      </Link>
    </motion.div>
  );
}
