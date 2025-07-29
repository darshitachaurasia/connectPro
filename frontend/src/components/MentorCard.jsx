import React from 'react'

const MentorCard = ({ mentor }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden my-4 p-6 text-center transform hover:scale-105 transition-transform duration-300 ease-in-out">
        <img 
            className="w-32 h-32 rounded-full mx-auto -mt-16 border-4 border-white shadow-lg" 
            src={mentor?.profile?.profileImage} 
            alt={`Profile of ${mentor?.profile?.name}`}
            onError={(e) => { e.target.onerror = null; e.target.src=`https://placehold.co/128x128/EBF4FF/333333?text=${mentor?.profile?.name?.charAt(0) || 'M'}`}}
        />
        <div className="mt-4">
            <h3 className="text-xl font-bold text-gray-900">{mentor?.profile?.name}</h3>
            <h4 className="text-md font-semibold text-blue-600">
                {mentor?.profile?.title}
            </h4>
        </div>
    </div>
  );
};

export default MentorCard