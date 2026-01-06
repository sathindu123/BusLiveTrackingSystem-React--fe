import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import { UserRole } from '../types';

import { lazy, Suspense } from "react"
import Layout from "../components/Layout"

// Import Pages
import { LandingPage } from '../pages/LandingPage';
import { DriverLoginPage } from '../pages/DriverLoginPage';
import { DriverRegisterPage } from '../pages/DriverRegisterPage';
import { DriverDashboard } from '../pages/DriverDashboard';
import { PassengerDashboard } from '../pages/PassengerDashboard';
import { DriverProfilePage } from '../pages/DriverProfilePage';
import { SettingsPage } from '../pages/SettingsPage';

const Router: React.FC = () => {
  const { user } = useAuth();

  return ( 
    <Routes >
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<DriverLoginPage />} />
      <Route path="/register" element={<DriverRegisterPage />} />
      
      {/* Protected Driver Route */}
      <Route 
        path="/driver-dashboard" 
        element={<DriverDashboard />} 
      />

       <Route 
        path="/driver-profile" 
        element={<DriverProfilePage />} 
      />
      <Route 
        path="/settings" 
        element={<SettingsPage />} 
      />
      
      
      <Route path="/passenger-dashboard" element={<PassengerDashboard />} />
      
      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default Router;