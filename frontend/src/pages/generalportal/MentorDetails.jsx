import React from 'react';
import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function MentorDetails() {
  const { id } = useParams();
  const mentors = useSelector(state => state.mentor.list);
  const mentor = mentors.find((m) => m.$id === id);

  if (!mentor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 text-blue-700 text-3xl">
        Loading mentor details...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 text-blue-900 px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white p-10 rounded-3xl shadow-xl border border-blue-200 max-w-3xl w-full"
      >
        <h2 className="text-4xl font-bold text-blue-700 mb-6 text-center">Mentor Details</h2>

        <div className="space-y-4 text-lg">
          <p>
            <span className="font-semibold text-blue-600">Name:</span> {mentor.name}
          </p>
          <p>
            <span className="font-semibold text-blue-600">Bio:</span> {mentor.bio}
          </p>
          <p>
            <span className="font-semibold text-blue-600">Experience:</span> {mentor.experience}
          </p>
          <p>
            <span className="font-semibold text-blue-600">Services:</span>{" "}
            {mentor.services?.join(", ") || "N/A"}
          </p>
        </div>

        <div className="mt-10 text-center">
          <Link
            to={`/booking-page/${mentor.$id}`}
            className="inline-block bg-blue-600 hover:bg-blue-700 transition px-6 py-3 text-lg font-semibold rounded-full text-white shadow-md"
          >
            Book This Mentor
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default MentorDetails;
