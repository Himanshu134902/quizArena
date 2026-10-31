import { Link } from "react-router-dom";


export default function Navbar() {
  return (
    <header className="navbar-header">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <div className="navbar-logo-icon">
            <span>Q</span>
          </div>
          <span className="navbar-title">Quiz Arena</span>
        </Link>
        
        <nav className="navbar-nav">
          <Link to="/create" className="navbar-link">
            Host a Quiz
          </Link>
        </nav>
      </div>
    </header>
  );
}