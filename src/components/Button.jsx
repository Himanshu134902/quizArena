

export default function Button({ 
  children, 
  variant = "primary", 
  className = "", 
  disabled = false,
  ...props 
}) {
  return (
    <button 
      className={`btn btn-${variant} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}