import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiZap, FiShield, FiSearch, FiClock } from 'react-icons/fi';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import DiffPanel from '../components/common/DiffPanel';
import useAuth from '../hooks/useAuth';
import { ROUTES } from '../utils/constants';

const FEATURES = [
  {
    icon: FiZap,
    title: 'Root cause, not just a fix',
    description:
      'DebugMind explains why the bug happens before showing you the corrected code, so the fix actually sticks.',
  },
  {
    icon: FiSearch,
    title: 'Paste code, paste the error',
    description:
      'No setup, no config. Drop in your snippet and the stack trace or error message — analysis starts immediately.',
  },
  {
    icon: FiShield,
    title: 'Security & performance notes',
    description:
      'Every analysis flags security concerns and performance improvements alongside the core fix, not as an afterthought.',
  },
  {
    icon: FiClock,
    title: 'Searchable history',
    description:
      'Every analysis is saved to your account. Filter by language or status, and search your past fixes in seconds.',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut', delay },
  }),
};

const Home = () => {
  const { isAuthenticated } = useAuth();
  const primaryCtaTarget = isAuthenticated ? ROUTES.DASHBOARD : ROUTES.REGISTER;

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-grid-fade">
        <div className="container-shell grid gap-14 py-20 md:grid-cols-2 md:items-center md:py-28">
          <motion.div initial="hidden" animate="visible" custom={0} variants={fadeUp}>
            <p className="eyebrow mb-5">AI-powered bug analysis</p>
            <h1 className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-ink sm:text-5xl">
              Paste the bug.
              <br />
              Get the <span className="text-brand-400">fix</span> and the{' '}
              <span className="text-fix">why</span>.
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-ink-muted">
              DebugMind AI reads your code and your error message together, then returns the root
              cause, a corrected version, and the reasoning behind every change — in seconds.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link to={primaryCtaTarget}>
                <Button size="lg" rightIcon={<FiArrowRight size={16} />} fullWidth>
                  {isAuthenticated ? 'Go to dashboard' : 'Start debugging free'}
                </Button>
              </Link>
              {!isAuthenticated ? (
                <Link to={ROUTES.LOGIN}>
                  <Button variant="secondary" size="lg" fullWidth>
                    I already have an account
                  </Button>
                </Link>
              ) : null}
            </div>

            <p className="mt-5 font-mono text-xs text-ink-faint">
              No credit card. No install. Just paste and analyze.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
            className="flex justify-center md:justify-end"
          >
            <DiffPanel />
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-base-border/70 py-20">
        <div className="container-shell">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            custom={0}
            variants={fadeUp}
            className="max-w-xl"
          >
            <p className="eyebrow mb-4">Why teams use DebugMind</p>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-ink">
              Built around how debugging actually works
            </h2>
          </motion.div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {FEATURES.map(({ icon: Icon, title, description }, index) => (
              <motion.div
                key={title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                custom={index * 0.08}
                variants={fadeUp}
              >
                <Card className="h-full p-6">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-400/10 text-brand-400">
                    <Icon size={18} />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold text-ink">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-base-border/70 py-20">
        <div className="container-shell">
          <Card className="flex flex-col items-center gap-6 px-8 py-14 text-center">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              Stop guessing. Start fixing.
            </h2>
            <p className="max-w-md text-sm text-ink-muted">
              Create a free account and analyze your first bug in under a minute.
            </p>
            <Link to={primaryCtaTarget}>
              <Button size="lg" rightIcon={<FiArrowRight size={16} />}>
                {isAuthenticated ? 'Go to dashboard' : 'Create your account'}
              </Button>
            </Link>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Home;
