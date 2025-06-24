import React from 'react';
import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';

function MentorDetails() {
  const { id } = useParams();
  const mentors = useSelector(state => state.mentor.list);
  const mentor = mentors.find((m) => m.$id === id);

  if (!mentor) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-2">Mentor Details</h2>
      <p><strong>Bio:</strong> {mentor.bio}</p>
      <p><strong>Experience:</strong> {mentor.experience}</p>
      <p><strong>Services:</strong> {mentor.services?.join(", ")}</p>
      <Link
        to={`/book-mentor/${mentor.$id}`}
        className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Book This Mentor
      </Link>
    </div>
  );
}

export default MentorDetails;

