import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function UserDashboard() {
  return (
    <div className="min-h-screen bg-white text-white flex flex-col items-center justify-start p-10">
  <motion.p
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.3, duration: 0.8 }}
    className="text-4xl italic text-black mb-14 text-center max-w-4xl"
  >
    “The beautiful thing about learning is that nobody can take it away from you.”
  </motion.p>

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 w-full max-w-3xl px-4">
    {['My Profile','Book a Mentor','My Bookings','Services'].map((title, idx) => (
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 300 }}
        className="rounded-lg shadow-lg"
        key={idx}
      >
        <Link
          to={`/path-${idx}`}
          className="bg-gradient-to-br from-[#111184] via-[#1E1A6A] to-[#242474]  hover:bg-[rgba(17,17,132,1)] text-xl font-semibold rounded-lg h-40 flex items-center justify-center text-center px-6 transition duration-300"
        >
          {` ${title}`}
        </Link>
      </motion.div>
    ))}
  </div>
  </div>
)}


