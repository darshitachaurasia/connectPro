import { Link } from 'react-router-dom';
import { MdPerson, MdEventNote, MdBuild } from 'react-icons/md';

export default function MentorDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 px-8 py-14">
      <h1 className="text-4xl font-bold mb-16 text-center text-blue-800">
        Mentor Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 place-items-center max-w-5xl mx-auto">
        <MentorIconCard
          icon={<MdPerson size={60} />}
          label="My Profile"
          to="/profile"
          bg="from-blue-100 to-blue-200"
          hover="hover:from-blue-200 hover:to-blue-300"
        />
        <MentorIconCard
          icon={<MdEventNote size={60} />}
          label="Bookings"
          to="/mentor-bookings"
          bg="from-blue-100 to-blue-200"
          hover="hover:from-blue-200 hover:to-blue-300"
        />
        <MentorIconCard
          icon={<MdBuild size={60} />}
          label="Services"
          to="/mentor-services"
          bg="from-blue-100 to-blue-200"
          hover="hover:from-blue-200 hover:to-blue-300"
        />
      </div>
    </div>
  );
}

function MentorIconCard({ icon, label, to, bg, hover }) {
  return (
    <Link
      to={to}
      className={`group flex flex-col items-center justify-center w-44 h-44 md:w-52 md:h-52 rounded-2xl bg-gradient-to-br ${bg} ${hover} shadow-md transition-all duration-300 hover:scale-105`}
    >
      <div className="text-blue-600 mb-2 group-hover:text-blue-800">
        {icon}
      </div>
      <p className="text-base md:text-lg text-blue-700 group-hover:text-blue-900 font-semibold">
        {label}
      </p>
    </Link>
  );
}
