import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/Auth';

export default function PrivateRoute({ children }: { children: React.ReactElement }) {
  const { user } = useAuth();

  return user ? children : <Navigate to="/login" />;
}
