import MentorCard from '../../components/MentorCard';

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


