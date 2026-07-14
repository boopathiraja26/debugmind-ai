import { forwardRef, useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

/**
 * Shared text input with label, helper/error text, optional left icon, and
 * a built-in show/hide toggle when type="password".
 */
const Input = forwardRef(
  ({ label, id, error, hint, type = 'text', icon = null, className = '', ...rest }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';
    const resolvedType = isPassword && showPassword ? 'text' : type;

    return (
      <div className="w-full">
        {label ? (
          <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink">
            {label}
          </label>
        ) : null}

        <div className="relative">
          {icon ? (
            <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-ink-faint">
              {icon}
            </span>
          ) : null}

          <input
            ref={ref}
            id={id}
            type={resolvedType}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
            className={`h-11 w-full rounded-xl border bg-base-surface px-4 text-sm text-ink placeholder:text-ink-faint
              transition-colors duration-150
              ${icon ? 'pl-10' : ''}
              ${isPassword ? 'pr-10' : ''}
              ${
                error
                  ? 'border-bug/60 focus:border-bug focus:ring-1 focus:ring-bug/40'
                  : 'border-base-border focus:border-brand-400/60 focus:ring-1 focus:ring-brand-400/30'
              }
              focus:outline-none
              ${className}`}
            {...rest}
          />

          {isPassword ? (
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute inset-y-0 right-3 flex items-center text-ink-faint hover:text-ink-muted"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
            </button>
          ) : null}
        </div>

        {error ? (
          <p id={`${id}-error`} className="mt-1.5 text-xs text-bug-text">
            {error}
          </p>
        ) : hint ? (
          <p id={`${id}-hint`} className="mt-1.5 text-xs text-ink-faint">
            {hint}
          </p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
