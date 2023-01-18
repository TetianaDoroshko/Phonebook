import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({ children }) => {
  const isLoggedIn = useSelector(store => store.auth.isLoggedIn) ?? false;
  const isVerify = useSelector(store => store.auth.isVerify) ?? false;

  return isLoggedIn && isVerify ? children : <Navigate to="/login" />;
};
