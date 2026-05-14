import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getToken } from "@/lib/admin-api";

const ProtectedRoute = () => {
  const token = getToken();
  const location = useLocation();

  if (!token) {
    return <Navigate to="/admin/login" state={{ from: location.pathname }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
