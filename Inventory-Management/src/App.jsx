import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import AdminLogin from "./assets/Frontend/AdminLogin";
import AdminDashboard from "./assets/Frontend/AdminDashboard";
import WorkerLogin from "./assets/Frontend/WorkerLogin";  // Import WorkerLogin component
import WorkerDashboard from "./assets/Frontend/WorkerDashboard"; // Import WorkerDashboard component
import Navbar from "./assets/Frontend/Navbar";
import './index.css';  // Or './App.css' if you're using that
import Body from "./assets/Frontend/Body";
import Scanner from "./assets/Frontend/Scanner";
import WorkerScanner from "./assets/Frontend/WorkerScanner";
import './App.css';


// Custom wrapper for the App component to manage the location
function AppWrapper() {
  const location = useLocation();

  // List the paths where Navbar should be hidden
  const hideNavbarPaths = ['/admin-login', '/worker-login','/dashboard','/Scanner-login'];


  // Check if the current path matches any path that should hide the Navbar
  const hideNavbar = hideNavbarPaths.includes(location.pathname);

  return (
    <div>
     
      {!hideNavbar && <Navbar />}
      
      <Routes>
        <Route path="/" element={<Body />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
        
        {/* Add WorkerLogin route */}
        <Route path="/worker-login" element={<WorkerLogin />} />
        
        {/* Add WorkerDashboard route */}
        <Route path="/worker-dashboard" element={<WorkerDashboard />} />
        <Route path="/Scanner-login" element={<Scanner />} />
        <Route path="/worker-scanner" element={<WorkerScanner />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  );
}

export default App;
