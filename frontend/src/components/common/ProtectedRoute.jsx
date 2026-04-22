import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const ProtectedRoute = ({ children, role }) => {
  const { user, loading } = useAuth();

  //  wait until auth is ready
  if (loading) {
    return <div>Loading...</div>; 
  }

  //  not logged in
  if (!user) {
    return <Navigate to="/auth/login" />;
  }

  //  role check
  if (role && user.role !== role) {
    return <Navigate to="/auth/login" />;
  }

  return children;
};

export default ProtectedRoute;