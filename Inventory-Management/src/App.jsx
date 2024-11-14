import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLogin from "./assets/Frontend/AdminLogin";
import AdminDashboard from "./assets/Frontend/AdminDashboard";
import WorkerLogin from "./assets/Frontend/WorkerLogin";  // Import WorkerLogin component
import WorkerDashboard from "./assets/Frontend/WorkerDashboard"; // Import WorkerDashboard component
import Navbar from "./assets/Frontend/Navbar";
import './index.css';  // Or './App.css' if you're using that

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
        
        {/* Add WorkerLogin route */}
        <Route path="/worker-login" element={<WorkerLogin />} />
        
        {/* Add WorkerDashboard route */}
        <Route path="/worker-dashboard" element={<WorkerDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
