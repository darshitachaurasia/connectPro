import React from 'react'

const MentorCard = ({ mentor }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden my-4 p-6 text-center transform hover:scale-105 transition-transform duration-300 ease-in-out">
      {mentor?.profile?.profileImage ? (
        <img
          className="w-32 h-auto rounded-full mx-auto -mt-16 border-4 border-white shadow-lg object-cover"
          src={mentor.profile.profileImage}
          alt={`Profile of ${mentor?.fullname}`}
        />
      ) : (
        <div
          className="w-32 h-32 rounded-full mx-auto  border-4 border-white shadow-lg flex items-center justify-center bg-blue-100 text-blue-700 text-5xl font-bold select-none"
        >
          {mentor?.fullname?.charAt(0)?.toUpperCase() || 'M'}
        </div>
      )}
      <div className="mt-4">
        <h3 className="text-xl font-bold text-gray-900">{mentor?.fullname}</h3>
        <h4 className="text-md font-semibold text-blue-600">
          {mentor?.role}
        </h4>
      </div>
    </div>
  );
};

export default MentorCard