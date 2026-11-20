import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "../../redux/adminSlice";

import { Link } from "react-router-dom";
export default function UserManagement() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.admin.users);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-blue-800 text-white p-6">
      <h1 className="text-3xl font-bold mb-4">👤 User Management</h1>
      <table className="w-full bg-white text-blue-900 rounded shadow-md">
        <thead className="bg-blue-200">
          <tr>
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.$id} className="text-center">
              <td className="p-2 border-b border-blue-300">{user.name}</td>
              <td className="p-2 border-b border-blue-300">{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link
        to={'/admin-login'}
        className=" inline-flex items-center gap-2 px-6 py-2 mt-4 rounded-full bg-blue-100 text-white border border-pink-500 hover:bg-pink-600 hover:shadow-lg transition duration-300"
      >
        
        Back to Dashboard
      </Link>
    </div>
  );
}

