import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Spinner from '../components/ui/Spinner';
import { ROUTES } from '../utils/constants';

/**
 * Guards nested routes behind authentication. While the session bootstrap
 * (token verification against /api/auth/me) is in flight, it renders a
 * full-screen loader instead of flashing a redirect.
 */
const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-base">
        <Spinner size="lg" label="Checking your session…" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;