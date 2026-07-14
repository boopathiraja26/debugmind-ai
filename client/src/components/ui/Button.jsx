import Spinner from './Spinner';

const VARIANT_CLASSES = {
  primary:
    'bg-brand-400 text-base hover:bg-brand-300 focus-visible:outline-brand-400 shadow-glow',
  secondary:
    'bg-base-elevated text-ink border border-base-border hover:border-brand-400/40 hover:bg-base-elevated/80',
  ghost: 'bg-transparent text-ink-muted hover:text-ink hover:bg-white/5',
  danger: 'bg-bug text-white hover:bg-bug/90',
};

const SIZE_CLASSES = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-6 text-base',
};

/**
 * Shared button primitive used across the app. Supports loading and
 * disabled states, left/right icons, and full-width layout.
 */
const Button = ({
  children,
  type = 'button',
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  fullWidth = false,
  leftIcon = null,
  rightIcon = null,
  className = '',
  onClick,
  ...rest
}) => {
  const isDisabled = disabled || isLoading;

  return (
    <button
      type={type}
      disabled={isDisabled}
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-150
        focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
        disabled:cursor-not-allowed disabled:opacity-50
        ${VARIANT_CLASSES[variant] || VARIANT_CLASSES.primary}
        ${SIZE_CLASSES[size] || SIZE_CLASSES.md}
        ${fullWidth ? 'w-full' : ''}
        ${className}`}
      {...rest}
    >
      {isLoading ? (
        <Spinner size="sm" className="text-current" />
      ) : (
        <>
          {leftIcon}
          {children}
          {rightIcon}
        </>
      )}
    </button>
  );
};

export default Button;
