

export default function Card({ children, className = "" }) {
  return (
    <div className={`card-container ${className}`}>
      {children}
    </div>
  );
}
