import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from './userContext';

const PrivateRoute = ({ element, ...props }) => {
  const { userType, isAuthenticate } = useUser();

  return isAuthenticate && userType === 'Admin' ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;
