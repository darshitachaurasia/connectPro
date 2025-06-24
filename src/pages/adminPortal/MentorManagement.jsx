import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMentors } from '../../redux/mentorSlice';

export default function MentorManagementPage() {
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.mentor);

  useEffect(() => {
    dispatch(fetchMentors());
  }, [dispatch]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Mentor Management</h2>
      <ul className="space-y-2">
        {list.map((mentor) => (
          <li key={mentor.$id} className="border p-4 rounded-xl">
            {mentor.userId} - {mentor.bio} - Experience: {mentor.experience}
          </li>
        ))}
      </ul>
    </div>
  );
}