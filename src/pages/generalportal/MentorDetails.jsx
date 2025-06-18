import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMentorById } from '../redux/mentorSlice';
import { useEffect } from 'react';
import { Button } from '../components/ui';

export default function MentorDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const mentor = useSelector(state => state.mentor.selectedMentor);

  useEffect(() => {
    dispatch(fetchMentorById(id));
  }, [id, dispatch]);

  if (!mentor) return <div>Loading mentor details...</div>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold">{mentor.name}</h2>
      <p className="text-gray-600">{mentor.bio}</p>
      <h3 className="text-xl mt-6 font-semibold">Services</h3>
      <ul className="list-disc ml-5">
        {mentor.services.map(service => <li key={service.id}>{service.title}</li>)}
      </ul>
      <Button to={`/book/${mentor.id}`} className="mt-6">Book a Session</Button>
    </div>
  );
}