import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";

function AdminRoute() {
  const { user, isLoading } = useAuthStore();

  if (isLoading) return <p>Loading...</p>;

  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== "admin") return <Navigate to="/" replace />;

  return <Outlet />;
}

export default AdminRoute;
