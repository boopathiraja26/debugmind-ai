import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FiMenu, FiX, FiTerminal, FiLogOut } from 'react-icons/fi';
import useAuth from '../../hooks/useAuth';
import Button from '../ui/Button';
import { ROUTES } from '../../utils/constants';

const navLinkClasses = ({ isActive }) =>
  `text-sm transition-colors duration-150 ${
    isActive ? 'text-ink' : 'text-ink-muted hover:text-ink'
  }`;

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate(ROUTES.LOGIN);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-base-border/70 bg-base/80 backdrop-blur-md">
      <nav className="container-shell flex h-16 items-center justify-between">
        <Link to={ROUTES.HOME} className="flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-400/10 text-brand-400">
            <FiTerminal size={17} />
          </span>
          <span className="font-display text-base font-semibold tracking-tight text-ink">
            DebugMind <span className="text-brand-400">AI</span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <NavLink to={ROUTES.HOME} className={navLinkClasses} end>
            Home
          </NavLink>

          {isAuthenticated ? (
            <>
              <NavLink to="/profile" className={navLinkClasses}>
                Profile
              </NavLink>
              <NavLink to={ROUTES.DASHBOARD} className={navLinkClasses}>
                Dashboard
              </NavLink>
               <NavLink to={ROUTES.HISTORY} className={navLinkClasses}>
                History
              </NavLink>
              <NavLink to={ROUTES.ANALYZE} className={navLinkClasses}>
              Analyze
              </NavLink>
              <div className="flex items-center gap-3 border-l border-base-border pl-6">
                <span className="font-mono text-xs text-ink-muted">{user?.name}</span>
                <Button variant="ghost" size="sm" onClick={handleLogout} leftIcon={<FiLogOut size={14} />}>
                  Logout
                </Button>
              </div>
              
            </>
          ) : (
            <div className="flex items-center gap-3">
              <Link to={ROUTES.LOGIN}>
                <Button variant="ghost" size="sm">
                  Log in
                </Button>
              </Link>
              <Link to={ROUTES.REGISTER}>
                <Button variant="primary" size="sm">
                  Get started
                </Button>
              </Link>
            </div>
          )}
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-lg text-ink-muted hover:bg-white/5 md:hidden"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </nav>

      {isMenuOpen ? (
        <div className="border-t border-base-border bg-base px-5 pb-6 pt-2 md:hidden">
          <div className="flex flex-col gap-4">
            <NavLink to={ROUTES.HOME} className={navLinkClasses} end onClick={() => setIsMenuOpen(false)}>
              Home
            </NavLink>

            {isAuthenticated ? (
              <>
                <NavLink to={ROUTES.DASHBOARD} className={navLinkClasses} onClick={() => setIsMenuOpen(false)}>
                  Dashboard
                </NavLink>
                <span className="font-mono text-xs text-ink-muted">{user?.name}</span>
                <Button variant="secondary" size="sm" onClick={handleLogout} leftIcon={<FiLogOut size={14} />}>
                  Logout
                </Button>
              </>
            ) : (
              <div className="flex flex-col gap-3">
                <Link to={ROUTES.LOGIN} onClick={() => setIsMenuOpen(false)}>
                  <Button variant="secondary" size="sm" fullWidth>
                    Log in
                  </Button>
                </Link>
                <Link to={ROUTES.REGISTER} onClick={() => setIsMenuOpen(false)}>
                  <Button variant="primary" size="sm" fullWidth>
                    Get started
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </header>
  );
};

export default Navbar;
