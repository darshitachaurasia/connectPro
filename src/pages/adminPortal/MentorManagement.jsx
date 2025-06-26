import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllMentors, updateMentorStatus } from "../../redux/adminSlice";

import { Link } from "react-router-dom";
export default function MentorManagement() {
  const dispatch = useDispatch();
  const mentors = useSelector((state) => state.admin.mentors);

  useEffect(() => {
    dispatch(fetchAllMentors());
  }, [dispatch]);

  const handleApprove = (id) => {
    dispatch(updateMentorStatus({ mentorId: id, status: "approved" }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-700 to-purple-800 text-white p-6">
      <h1 className="text-3xl font-bold mb-4">👨‍🏫 Mentor Management</h1>
      <table className="w-full bg-white text-purple-900 rounded shadow-md">
        <thead className="bg-purple-200">
          <tr>
            <th className="p-3">Name</th>
            <th className="p-3">Status</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {mentors.map((mentor) => (
            <tr key={mentor.$id} className="text-center">
              <td className="p-2 border-b border-purple-300">{mentor.name}</td>
              <td className="p-2 border-b border-purple-300">{mentor.status}</td>
              <td className="p-2 border-b border-purple-300">
                {mentor.status !== "approved" && (
                  <button
                    className="bg-green-500 text-white px-4 py-1 rounded"
                    onClick={() => handleApprove(mentor.$id)}
                  >
                    Approve
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link
        to={'/admin-login'}
        className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-[#2d0727] text-white border border-pink-500 hover:bg-pink-600 hover:shadow-lg transition duration-300"
      >
        
        Back to Dashboard
      </Link>
    </div>
  );
}