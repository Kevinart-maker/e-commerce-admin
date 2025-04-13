import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/Auth';

export default function PrivateRoute({ children }: { children: JSX.Element }) {
  const { user } = useAuth();

  console.log('what is inside user??.. ', user)


  return user ? children : <Navigate to="/login" />;
}