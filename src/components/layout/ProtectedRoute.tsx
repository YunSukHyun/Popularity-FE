import { useAuth } from "../../context";
import { Navigate, Outlet } from "react-router-dom";
import { Role } from "../../types/auth";

const ProtectedRoute = ({ allowedRoles }: { allowedRoles?: Role[] }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return "Loading..";
  }
  if (!user || (allowedRoles && !allowedRoles.includes(user.role))) {
    console.log("User: ", user);
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
