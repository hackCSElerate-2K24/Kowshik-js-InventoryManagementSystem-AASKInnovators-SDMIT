import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import AdminLogin from "./assets/Frontend/AdminLogin";
import AdminDashboard from "./assets/Frontend/AdminDashboard";
import WorkerLogin from "./assets/Frontend/WorkerLogin";  
import WorkerDashboard from "./assets/Frontend/WorkerDashboard"; 
import Navbar from "./assets/Frontend/Navbar";
import './index.css';  
import Body from "./assets/Frontend/Body";
import Scanner from "./assets/Frontend/Scanner";
import WorkerScanner from "./assets/Frontend/WorkerScanner";
import './App.css';



function AppWrapper() {
  const location = useLocation();


  const hideNavbarPaths = ['/admin-login', '/worker-login','/dashboard','/Scanner-login','/worker-dashboard','/worker-scanner'];


  
  const hideNavbar = hideNavbarPaths.includes(location.pathname);

  return (
    <div>
     
      {!hideNavbar && <Navbar />}
      
      <Routes>
        <Route path="/" element={<Body />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
        
       
        <Route path="/worker-login" element={<WorkerLogin />} />
        
       
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
