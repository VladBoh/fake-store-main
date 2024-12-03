import { Navigate, useLocation } from 'react-router-dom';
import { routes } from '../config/routes';
import type { ReactNode } from 'react';

interface RequireAuthProviderProps {
  children: ReactNode;
}

export const RequireAuthProvider: React.FC<RequireAuthProviderProps> = ({ children }) => {
  const location = useLocation();

  const isAuth = !!localStorage.getItem('authToken');

  if (!isAuth) {
    return (
      <Navigate to={routes.auth} state={{ from: location }} replace />
    );
  }

  return <>{children}</>;
};