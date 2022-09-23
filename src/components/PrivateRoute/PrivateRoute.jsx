import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({ children }) => {
  const isLoggedIn = useSelector(store => store.auth.isLoggedIn) ?? false;
  return isLoggedIn ? children : <Navigate to="/login" />;
};
