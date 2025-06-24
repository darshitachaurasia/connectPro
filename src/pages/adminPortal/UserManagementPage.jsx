import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "../../redux/adminSlice";

export default function UserManagementPage() {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">User Management</h2>
      <ul className="space-y-2">
        {users.map((user) => (
          <li key={user.$id} className="border p-4 rounded-xl">
            {user.name} - {user.email} - Role: {user.role}
          </li>
        ))}
      </ul>
    </div>
  );
}