import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

function Header({ currentUser, setCurrentUser }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setCurrentUser("");
    navigate("/");
  };

  return (
    <header className="header">
      {/* Left section: app name */}
      <div className="left-section">
        <h2 className="app-title">Digicradle</h2>
      </div>

      {/* Right section: navigation links + menu */}
      <div className="right-section">
        {!currentUser && (
          <>
            <Link to="/" className="header-link">Home</Link>
            <Link to="/signup" className="header-link">Signup</Link>
            <Link to="/login" className="header-link">Login</Link>
          </>
        )}

        {currentUser && (
          <>
            <span className="username">Hi, {currentUser}</span>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>

            <div className="menu-container">
              <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)}>⋮</button>
              {menuOpen && (
                <div className="dropdown">
                  <Link to="/daily-updates" onClick={() => setMenuOpen(false)}>Daily Updates</Link>
                  <Link to="/business" onClick={() => setMenuOpen(false)}>Business</Link>
                  <Link to="/issues" onClick={() => setMenuOpen(false)}>Issues</Link>
                  <Link to="/alerts" onClick={() => setMenuOpen(false)}>Alert</Link>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
