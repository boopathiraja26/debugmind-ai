import { FiTool } from 'react-icons/fi';
import useAuth from '../hooks/useAuth';

/**
 * Temporary placeholder so the post-login redirect (/dashboard) resolves to
 * something real behind ProtectedRoute. The actual Dashboard experience
 * (stats, analysis history, AI analysis flow) is built in the next phase
 * and will replace this file's usage in App.jsx.
 */
const DashboardPlaceholder = () => {
  const { user } = useAuth();

  return (
    <div className="container-shell flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center py-16 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-400/10 text-brand-400">
        <FiTool size={20} />
      </span>
      <h1 className="mt-5 font-display text-2xl font-semibold tracking-tight text-ink">
        You&apos;re in, {user?.name?.split(' ')[0] || 'there'}.
      </h1>
      <p className="mt-2 max-w-sm text-sm text-ink-muted">
        Authentication is fully wired up. The AI analysis dashboard is coming in the next build
        phase.
      </p>
    </div>
  );
};

export default DashboardPlaceholder;
