import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Make sure to add the relevant CSS rules in this file.

function Navbar() {
  // State to toggle between light and dark mode
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Toggle theme mode
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Apply the theme to the document body
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode'); // Corresponding CSS class
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  // State to toggle the dropdown
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Toggle the dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className={`navbar ${isDarkMode ? 'navbar-dark' : 'navbar-light'}`}>
      <div className="navbar-logo">
        <Link to="/">Inventory Management</Link>
      </div>
      <div className="navbar-links">
        {/* Dropdown for login options */}
        <div className="dropdown">
          <button onClick={toggleDropdown} className="navbar-link dropdown-btn">
            Login
          </button>
          {isDropdownOpen && (
            <div className="dropdown-menu">
              <Link to="/admin-login" className="dropdown-item">Admin Login</Link>
              <Link to="/user-login" className="dropdown-item">User Login</Link>
            </div>
          )}
        </div>

        <Link to="/user-dashboard" className="navbar-link">
          User Dashboard
        </Link>

        {/* Theme toggle button */}
        <button onClick={toggleTheme} className="theme-toggle-btn">
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
