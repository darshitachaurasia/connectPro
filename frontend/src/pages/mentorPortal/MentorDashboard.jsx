import { Link } from 'react-router-dom';
import { MdPerson, MdEventNote } from 'react-icons/md';

export default function MentorDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0c0822] to-[#2d0727] text-white px-8 py-14">
      <h1 className="text-4xl font-bold mb-16 text-center text-pink-300">Mentor Dashboard</h1>

      <div className="grid grid-cols-2 gap-12 place-items-center max-w-4xl mx-auto">
        <MentorIconCard
          icon={<MdPerson size={60} />}
          label="My Profile"
          to='/mentor-profile'
        />
        <MentorIconCard
          icon={<MdEventNote size={60} />}
          label="Bookings"
          to='/mentor-bookings'
        />
      </div>
    </div>
  );
}

function MentorIconCard({ icon, label, to }) {
  return (
    <Link
      to={to}
      className="group flex flex-col items-center justify-center w-40 h-40 md:w-52 md:h-52 rounded-full bg-white/10 hover:bg-pink-600/30 transition-all duration-300 shadow-xl hover:scale-105"
    >
      <div className="text-white mb-2 group-hover:text-pink-300">
        {icon}
      </div>
      <p className="text-sm md:text-base text-gray-300 mt-2 group-hover:text-white font-semibold">
        {label}
      </p>
    </Link>
  );
}
