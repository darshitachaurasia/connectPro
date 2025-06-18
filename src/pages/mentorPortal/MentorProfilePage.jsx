// pages/mentor/MentorProfilePage.jsx
import React from 'react';
import { useSelector } from 'react-redux';

function MentorProfilePage() {
  const mentor = useSelector((state) => state.mentor.currentMentor);

  return (
    <div className="p-6 space-y-2">
      <h2 className="text-2xl font-semibold">Profile</h2>
      <p><strong>Name:</strong> {mentor?.name}</p>
      <p><strong>Email:</strong> {mentor?.email}</p>
      <p><strong>Bio:</strong> {mentor?.bio}</p>
      
    </div>
  );
}

export default MentorProfilePage;


