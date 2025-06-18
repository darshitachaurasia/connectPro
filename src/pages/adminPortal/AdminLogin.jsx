import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function AdminLogin() {
  const admin = useSelector(state => state.auth.userData);
  const navigate = useNavigate();

  useEffect(() => {
    if (admin?.role === 'admin') navigate('/admin/analytics');
  }, [admin, navigate]);

  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold mb-2">Welcome Admin</h1>
      <p className="text-gray-600">Redirecting to dashboard...</p>
    </div>
  );
}