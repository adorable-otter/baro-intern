import { Navigate, Outlet } from 'react-router-dom';
import { AuthUser } from '../stores/useAuthUserStore';

type ProtectedRouteProps = {
  user: AuthUser | null;
  redirectPath?: string;
  children?: React.ReactNode;
};

const AuthenticatedOnly = ({ user, redirectPath = '/', children }: ProtectedRouteProps) => {
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

export default AuthenticatedOnly;
