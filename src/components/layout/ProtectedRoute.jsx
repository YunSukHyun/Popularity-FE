import { useAuth } from "../../context";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ requiredRole }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return "Loading..";
  }
  if (!user || user.role !== requiredRole) {
    console.log("User: ", user);
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
