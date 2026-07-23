import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, Terminal, LogOut } from 'lucide-react';
import { FiGithub } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import useAuth from '../../hooks/useAuth';
import Button from '../ui/Button';
import { ROUTES } from '../../utils/constants';

const navLinkClasses = ({ isActive }) =>
  `text-sm font-medium transition-colors duration-200 ${
    isActive ? 'text-white' : 'text-zinc-400 hover:text-white'
  }`;

const anchorClasses = "text-sm font-medium text-zinc-400 transition-colors duration-200 hover:text-white";

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate(ROUTES.LOGIN);
  };

  return (
    <header 
      className={`fixed top-0 z-50 w-full transition-all duration-300 border-b ${
        scrolled 
          ? 'border-white/10 bg-black/60 backdrop-blur-xl' 
          : 'border-transparent bg-transparent'
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
        <Link to={ROUTES.HOME} className="flex items-center gap-2 group" onClick={() => setIsMenuOpen(false)}>
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-shadow">
            <Terminal size={18} />
          </div>
          <span className="font-display text-lg font-bold tracking-tight text-white">
            DebugMind <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">AI</span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {!isAuthenticated && (
            <>
              <a href="#features" className={anchorClasses}>Features</a>
              <a href="#how-it-works" className={anchorClasses}>How it Works</a>
            </>
          )}

          {isAuthenticated ? (
            <>
              <NavLink to="/profile" className={navLinkClasses}>Profile</NavLink>
              <NavLink to={ROUTES.DASHBOARD} className={navLinkClasses}>Dashboard</NavLink>
              <NavLink to={ROUTES.HISTORY} className={navLinkClasses}>History</NavLink>
              <NavLink to={ROUTES.ANALYZE} className={navLinkClasses}>Analyze</NavLink>
              <div className="flex items-center gap-4 border-l border-white/10 pl-6">
                <span className="font-mono text-xs text-zinc-400">{user?.name}</span>
                <Button variant="ghost" size="sm" onClick={handleLogout} leftIcon={<LogOut size={16} />}>
                  Logout
                </Button>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-white transition-colors">
                <FiGithub size={20} />
              </a>
              <div className="h-4 w-[1px] bg-white/10" />
              <Link to={ROUTES.LOGIN} className="text-sm font-medium text-zinc-300 hover:text-white transition-colors">
                Log in
              </Link>
              <Link to={ROUTES.REGISTER}>
                <button className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-black transition-transform hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:shadow-[0_0_25px_rgba(255,255,255,0.5)]">
                  Get Started
                </button>
              </Link>
            </div>
          )}
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-lg text-zinc-400 hover:bg-white/5 md:hidden"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="border-t border-white/10 bg-black/95 backdrop-blur-xl px-4 pb-6 pt-4 md:hidden overflow-hidden"
          >
            <div className="flex flex-col gap-4">
              {!isAuthenticated && (
                <>
                  <a href="#features" className={anchorClasses} onClick={() => setIsMenuOpen(false)}>Features</a>
                  <a href="#how-it-works" className={anchorClasses} onClick={() => setIsMenuOpen(false)}>How it Works</a>
                </>
              )}

              {isAuthenticated ? (
                <>
                  <NavLink to={ROUTES.DASHBOARD} className={navLinkClasses} onClick={() => setIsMenuOpen(false)}>Dashboard</NavLink>
                  <NavLink to={ROUTES.HISTORY} className={navLinkClasses} onClick={() => setIsMenuOpen(false)}>History</NavLink>
                  <NavLink to={ROUTES.ANALYZE} className={navLinkClasses} onClick={() => setIsMenuOpen(false)}>Analyze</NavLink>
                  <NavLink to="/profile" className={navLinkClasses} onClick={() => setIsMenuOpen(false)}>Profile</NavLink>
                  <span className="font-mono text-xs text-zinc-500">{user?.name}</span>
                  <Button variant="secondary" size="sm" onClick={handleLogout} leftIcon={<LogOut size={16} />} fullWidth>
                    Logout
                  </Button>
                </>
              ) : (
                <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-white/10">
                  <a href="https://github.com" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-zinc-400 py-2">
                    <FiGithub size={18} /> GitHub Repository
                  </a>
                  <Link to={ROUTES.LOGIN} onClick={() => setIsMenuOpen(false)}>
                    <Button variant="secondary" size="sm" fullWidth>Log in</Button>
                  </Link>
                  <Link to={ROUTES.REGISTER} onClick={() => setIsMenuOpen(false)}>
                    <Button variant="primary" size="sm" fullWidth>Get started</Button>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
