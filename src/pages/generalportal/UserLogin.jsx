import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function UserLogin() {
  const user = useSelector(state => state.auth.userData);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === 'user') navigate('/user/home');
  }, [user, navigate]);

  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold mb-2">Welcome User</h1>
      <p className="text-gray-600">Redirecting to your home page...</p>
    </div>
  );
}

