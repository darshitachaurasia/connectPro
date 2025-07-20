import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMentors } from '../../redux/mentorSlice';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function MentorList() {
  const dispatch = useDispatch();
  const mentors = useSelector((state) => state.mentor.list);
  const status = useSelector((state) => state.mentor.status);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchMentors());
    }
  }, [status, dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0c0822] via-[#1e0e2f] to-[#2d0727] text-white py-12 px-6">
      <h2 className="text-4xl font-extrabold text-center mb-12 text-white tracking-wide">
        Available Mentors
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {mentors.map((mentor, index) => (
          <motion.div
            key={mentor.$id || mentor.id || index} // fallback to index if no id exists
            className="rounded-2xl p-6 shadow-lg bg-gradient-to-br from-[#2d0727] to-[#47126b] backdrop-blur-sm text-white border border-white/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <h3 className="text-2xl font-bold mb-2 text-pink-300">{mentor.userId}</h3>
            <p className="mb-1 text-gray-200"><strong>Experience:</strong> {mentor.experience}</p>
            <p className="mb-1 text-gray-200"><strong>Bio:</strong> {mentor.bio}</p>
            <p className="mb-4 text-gray-200">
              <strong>Services:</strong> {mentor.services?.join(', ') || 'Not listed'}
            </p>
            <Link
              to={`/mentor-details/${mentor.$id || mentor.id}`}
              className="inline-block mt-2 bg-pink-600 hover:bg-pink-700 transition px-4 py-2 rounded-full text-white font-semibold text-sm shadow-md"
            >
              View Details
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default MentorList;

