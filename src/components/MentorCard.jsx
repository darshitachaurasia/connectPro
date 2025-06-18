import {Button} from './index'

export default function MentorCard({ mentor }) {
  return (
    <div className="border p-4 rounded shadow hover:shadow-lg transition">
      <h3 className="text-lg font-semibold">{mentor.name}</h3>
      <p className="text-sm text-gray-600">{mentor.specialization}</p>
      <p className="text-sm mt-2">{mentor.bio?.slice(0, 100)}...</p>
      <Button className="mt-4" to={`/mentor/${mentor.id}`}>View Details</Button>
    </div>
  );
}