/**
 * Shared elevated surface used for auth forms, panels, and content blocks.
 */
const Card = ({ children, className = '', ...rest }) => (
  <div
    className={`rounded-2xl border border-base-border bg-base-surface shadow-card ${className}`}
    {...rest}
  >
    {children}
  </div>
);

export default Card;
