import { useDispatch, useSelector } from 'react-redux';
import { deleteUser } from '../../redux/adminSlice';

export default function AdminUserManagementPage() {
  const dispatch = useDispatch();
  const users = useSelector(state => state.admin.user);

  const handleDelete = (id) => dispatch(deleteUser(id));

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">User Management</h2>
      <ul className="space-y-2">
        {users.map(user => (
          <li key={user.id} className="flex justify-between p-3 border rounded">
            <span>{user.name} ({user.email})</span>
            <button className="text-red-500" onClick={() => handleDelete(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
