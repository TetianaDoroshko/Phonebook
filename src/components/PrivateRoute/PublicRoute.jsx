import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export const PublicRoute = ({ children, restricted = false }) => {
  const isLoggedIn = useSelector(store => store.auth.isLoggedIn) ?? false;
  return isLoggedIn && restricted ? <Navigate to="/" /> : children;
};
