import './NeoButton.css';

export default function NeoButton({
  children,
  variant = 'primary',
  size = 'large',
  icon,
  iconPosition = 'left',
  onClick,
  className = '',
  ...props
}) {
  // Lucide icons (and many modern icon libs) use React.forwardRef,
  // which makes them objects, not plain functions.
  // We must treat any non-null, non-string value as a renderable component.
  const Icon = icon || null;

  return (
    <button
      className={`neo-btn neo-btn--${variant} neo-btn--${size} ${className}`}
      onClick={onClick}
      {...props}
    >
      <span className="neo-btn__content">
        {Icon && iconPosition === 'left' && (
          <span className="neo-btn__icon neo-btn__icon--left">
            <Icon size={22} strokeWidth={2.2} />
          </span>
        )}
        <span className="neo-btn__text">{children}</span>
        {Icon && iconPosition === 'right' && (
          <span className="neo-btn__icon neo-btn__icon--right">
            <Icon size={22} strokeWidth={2.2} />
          </span>
        )}
      </span>
    </button>
  );
}
