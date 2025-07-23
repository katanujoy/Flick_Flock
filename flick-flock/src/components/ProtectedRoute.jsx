import { Navigate } from 'react-router-dom';
import { useMovieContext } from '../contexts/MovieContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useMovieContext();
  
  if (!user) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" />;
  }
  
  return children;
};

export default ProtectedRoute;