// pages/mentor/MentorLoginPage.jsx
import React from 'react';
import { useSelector } from 'react-redux';

function MentorLogin() {
  const mentor = useSelector((state) => state.mentor.currentMentor);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Welcome, {mentor?.name || 'Mentor'}!</h1>
      <p className="text-gray-600 mt-2">This is your mentor dashboard.</p>
    </div>
  );
}

export default MentorLogin;

