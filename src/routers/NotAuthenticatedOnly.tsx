import { Navigate, Outlet } from 'react-router-dom';
import { AuthUser } from '../stores/useAuthUserStore';

type ProtectedRouteProps = {
  user: AuthUser | null;
  redirectPath?: string;
  children?: React.ReactNode;
};

export const NotAuthenticatedOnly = ({
  user,
  redirectPath = '/',
  children,
}: ProtectedRouteProps) => {
  if (user) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};
