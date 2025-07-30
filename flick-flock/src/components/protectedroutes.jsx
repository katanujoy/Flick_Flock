import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/authcontext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return null; 
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
