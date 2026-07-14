import { motion } from 'framer-motion';

const BEFORE_LINES = [
  { text: 'function getTotal(items) {', tone: 'plain' },
  { text: "  return items.reduce((sum, i) => sum + i.price)", tone: 'bug' },
  { text: '}', tone: 'plain' },
];

const AFTER_LINES = [
  { text: 'function getTotal(items) {', tone: 'plain' },
  { text: '  return items.reduce((sum, i) => sum + i.price, 0)', tone: 'fix' },
  { text: '}', tone: 'plain' },
];

const toneClasses = {
  plain: 'text-ink-muted',
  bug: 'bg-bug-soft text-bug-text',
  fix: 'bg-fix-soft text-fix-text',
};

const tonePrefix = {
  plain: ' ',
  bug: '-',
  fix: '+',
};

/**
 * DebugMind's signature visual: a live-looking before/after diff, styled
 * like a terminal/git diff, showing the exact category of moment the
 * product exists for — a bug turning into a fix.
 */
const DiffPanel = () => {
  return (
    <div className="w-full max-w-md overflow-hidden rounded-2xl border border-base-border bg-[#0D1218] shadow-card">
      <div className="flex items-center justify-between border-b border-base-border bg-base-elevated/60 px-4 py-2.5">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-bug/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-brand-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-fix/70" />
        </div>
        <span className="font-mono text-[11px] text-ink-faint">cart-utils.js — DebugMind AI</span>
      </div>

      <div className="px-4 py-4 font-mono text-[13px] leading-relaxed">
        {BEFORE_LINES.map((line, idx) => (
          <div key={`before-${idx}`} className={`flex gap-3 rounded px-2 py-0.5 ${toneClasses[line.tone]}`}>
            <span className="select-none text-ink-faint/70">{tonePrefix[line.tone]}</span>
            <span className="whitespace-pre">{line.text}</span>
          </div>
        ))}

        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ delay: 0.9, duration: 0.5, ease: 'easeOut' }}
          className="overflow-hidden"
        >
          {AFTER_LINES.map((line, idx) => (
            <div key={`after-${idx}`} className={`flex gap-3 rounded px-2 py-0.5 ${toneClasses[line.tone]}`}>
              <span className="select-none text-ink-faint/70">{tonePrefix[line.tone]}</span>
              <span className="whitespace-pre">{line.text}</span>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="flex items-center gap-2 border-t border-base-border bg-base-elevated/60 px-4 py-2.5">
        <span className="h-1.5 w-1.5 rounded-full bg-fix" />
        <span className="font-mono text-[11px] text-fix-text">
          Fixed: missing initial value in reduce()
        </span>
      </div>
    </div>
  );
};

export default DiffPanel;
