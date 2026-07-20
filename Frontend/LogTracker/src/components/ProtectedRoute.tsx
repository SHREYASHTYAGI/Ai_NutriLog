import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// A reusable guard that keeps protected pages behind the shared auth state.
export default function ProtectedRoute() {
  const { isLoggedIn, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#090909] text-white">
        Loading...
      </div>
    );
  }

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
}
