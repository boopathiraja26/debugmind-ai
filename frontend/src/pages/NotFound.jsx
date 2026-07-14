import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft } from 'react-icons/fi';
import Button from '../components/ui/Button';
import { ROUTES } from '../utils/constants';

const NotFound = () => (
  <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-5 py-16">
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="w-full max-w-lg text-center"
    >
      <div className="mx-auto w-full max-w-sm rounded-xl border border-base-border bg-base-surface p-5 text-left font-mono text-sm">
        <p className="text-bug-text">Uncaught ReferenceError:</p>
        <p className="mt-1 text-ink-muted">
          <span className="text-brand-400">route</span> is not defined
        </p>
        <p className="mt-3 text-ink-faint">at router.js:404:1</p>
      </div>

      <h1 className="mt-8 font-display text-3xl font-semibold tracking-tight text-ink">
        This page doesn&apos;t exist
      </h1>
      <p className="mt-3 text-sm text-ink-muted">
        The route you tried to reach isn&apos;t wired up. Let&apos;s get you back to somewhere that
        is.
      </p>

      <Link to={ROUTES.HOME} className="mt-8 inline-block">
        <Button leftIcon={<FiArrowLeft size={16} />}>Back to home</Button>
      </Link>
    </motion.div>
  </div>
);

export default NotFound;
