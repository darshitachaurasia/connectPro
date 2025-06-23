import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

/**
 * @param {ReactNode} children - The component to protect
 * @param {Array} allowedRoles - optional array like ['admin', 'mentor']
 */
export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const user = useSelector((state) => state.auth.user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}

