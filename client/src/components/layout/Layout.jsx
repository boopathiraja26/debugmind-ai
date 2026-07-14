import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

/**
 * Shared shell rendered around every route: sticky navbar, routed page
 * content, and a footer. Keeps the page background and min-height
 * consistent across the app.
 */
const Layout = () => (
  <div className="flex min-h-screen flex-col bg-base">
    <Navbar />
    <main className="flex-1">
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default Layout;
