import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMentors } from '../../redux/mentorSlice';
import { Link } from 'react-router-dom';

function MentorList() {
  const dispatch = useDispatch();
  const mentors = useSelector(state => state.mentor.list);
  const status = useSelector(state => state.mentor.status);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchMentors());
    }
  }, [status, dispatch]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Available Mentors</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mentors.map((mentor) => (
          <div key={mentor.$id} className="border rounded-lg p-4 shadow">
            <h3 className="text-xl font-semibold mb-2">{mentor.userId}</h3>
            <p className="mb-1"><strong>Experience:</strong> {mentor.experience}</p>
            <p className="mb-1"><strong>Bio:</strong> {mentor.bio}</p>
            <p className="mb-2"><strong>Services:</strong> {mentor.services?.join(', ')}</p>
            <Link
              to={`/mentor/${mentor.$id}`}
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MentorList;
