import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "../redux/authSlice";

export default function AuthLayout({ children }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getCurrentUser())
      .finally(() => setLoading(false)); // Wait for session check
  }, [dispatch]);

  if (loading) return <h1 className="text-center mt-20">Loading user...</h1>;

  return <>{children}</>;
}
