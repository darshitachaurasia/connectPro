import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllMentors } from '../../redux/mentorSlice';
import MentorCard from '../../components/MentorCard';

function MentorListing() {
  const dispatch = useDispatch();
  const mentors = useSelector(state => state.mentor.mentors);

  useEffect(() => { dispatch(fetchAllMentors()); }, [dispatch]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Available Mentors</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {mentors.map(mentor => <MentorCard key={mentor.id} mentor={mentor} />)}
      </div>
    </div>
  );
}

export default MentorListing;