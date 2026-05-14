import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getUserToken } from "@/lib/user-api";

const UserProtectedRoute = () => {
  const token = getUserToken();
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return <Outlet />;
};

export default UserProtectedRoute;
