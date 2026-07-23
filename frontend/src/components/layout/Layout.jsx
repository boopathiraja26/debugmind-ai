import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import { ROUTES } from '../../utils/constants';

/**
 * Shared shell rendered around every route: sticky navbar, routed page
 * content. Footer is now handled per-page to avoid cluttering app views.
 */
const Layout = () => {
  const location = useLocation();
  const isHome = location.pathname === ROUTES.HOME;

  return (
    <div className="flex min-h-screen flex-col bg-base">
      <Navbar />
      <main className={`flex-1 ${!isHome ? 'pt-16' : ''}`}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
