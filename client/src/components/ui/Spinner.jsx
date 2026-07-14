const SIZE_MAP = {
  sm: 'h-4 w-4 border-2',
  md: 'h-6 w-6 border-2',
  lg: 'h-10 w-10 border-[3px]',
};

/**
 * Minimal, accessible loading spinner. Pass `label` to show accompanying
 * text (also used as the screen-reader announcement).
 */
const Spinner = ({ size = 'md', label, className = '' }) => {
  const sizeClasses = SIZE_MAP[size] || SIZE_MAP.md;

  return (
    <div
      role="status"
      aria-live="polite"
      className={`flex flex-col items-center justify-center gap-3 ${className}`}
    >
      <span
        className={`inline-block animate-spin rounded-full border-base-border border-t-brand-400 ${sizeClasses}`}
      />
      {label ? <span className="text-sm text-ink-muted">{label}</span> : null}
      <span className="sr-only">{label || 'Loading'}</span>
    </div>
  );
};

export default Spinner;
