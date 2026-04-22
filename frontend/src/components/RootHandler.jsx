import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { getDashboardRoute } from "../utils/roleRedirect";

const RootRedirect = () => {
  const { user, loading } = useAuth();

  //  wait for auth
  if (loading) return <div>Loading...</div>;

  if (!user) {
    return <Navigate to="/auth/login" />;
  }

  return <Navigate to={getDashboardRoute(user.role)} />;
};

export default RootRedirect;