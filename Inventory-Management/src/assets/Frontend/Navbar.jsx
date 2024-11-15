// src/components/Navbar.js
import React, { useState, useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';


function Navbar() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null); // Track whether the user is 'admin' or 'worker'
  const navigate = useNavigate();


  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    navigate('/');
  };

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <nav className="p-4 bg-gray-200 dark:bg-gray-800 shadow-lg">
      <div className="flex items-center justify-between">
        <div className="text-2xl font-bold text-gray-900 dark:text-white">
          <Link to="/">Inventory Management</Link>
        </div>

        <div className="flex space-x-4">
          {!isLoggedIn ? (
            <>
              <Link
                to="/admin-login"
                className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
              >
                Admin Login
              </Link>
              <Link
                to="/worker-login"
                className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
              >
                Worker Login
              </Link>
            </>
          ) : (
            <>
              <span className="px-4 py-2 text-gray-900 bg-gray-300 rounded dark:text-white dark:bg-gray-700">
                {userRole === 'admin' ? 'Admin' : 'Worker'} Dashboard
              </span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700"
              >
                Logout
              </button>
            </>
          )}

          <button
            onClick={toggleTheme}
            className="px-4 py-2 text-gray-900 bg-gray-300 rounded hover:bg-gray-400 dark:bg-gray-700 dark:text-white"
          >
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
