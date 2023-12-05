import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from './userContext';

const PrivateInstRoute = ({ element, ...props }) => {
  const { userType, isAuthenticate } = useUser();

  return isAuthenticate && userType === 'Instructor' ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateInstRoute;
