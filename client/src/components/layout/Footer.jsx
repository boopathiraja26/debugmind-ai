import { FiTerminal } from 'react-icons/fi';

const Footer = () => (
  <footer className="border-t border-base-border/70">
    <div className="container-shell flex flex-col items-center justify-between gap-4 py-8 sm:flex-row">
      <div className="flex items-center gap-2 text-ink-muted">
        <FiTerminal size={15} />
        <span className="font-mono text-xs">DebugMind AI</span>
      </div>
      <p className="text-xs text-ink-faint">
        © {new Date().getFullYear()} DebugMind AI. Built for developers who ship.
      </p>
    </div>
  </footer>
);

export default Footer;
