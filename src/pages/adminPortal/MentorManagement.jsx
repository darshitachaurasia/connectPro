import { useDispatch, useSelector } from 'react-redux';
import { approveMentor } from '../../redux/adminSlice';

export default function AdminMentorManagementPage() {
  const dispatch = useDispatch();
  const mentors = useSelector(state => state.admin.mentor);

  const handleApprove = (mentor) => {
    const updatedMentor = { ...mentor, approved: true };
    dispatch(approveMentor(updatedMentor));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Mentor Management</h2>
      <ul className="space-y-2">
        {mentors.map(mentor => (
          <li key={mentor.id} className="flex justify-between p-3 border rounded">
            <span>{mentor.name} ({mentor.email}) - {mentor.approved ? 'Approved' : 'Pending'}</span>
            {!mentor.approved && (
              <button className="text-green-600" onClick={() => handleApprove(mentor)}>Approve</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

