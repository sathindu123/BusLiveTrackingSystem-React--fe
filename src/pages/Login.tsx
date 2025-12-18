import React, { useState } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { Navbar } from './Navbar';
import { LandingPage } from './LandingPage';
// import { DriverLoginPage } from './DriverLoginPage';
import { DriverRegisterPage } from './DriverRegisterPage';
import { DriverDashboard } from './DriverDashboard';
import type { ViewState, User } from '../types';
import { UserRole } from '../types';
import { MapPin, Bus } from 'lucide-react';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const navigate = useNavigate();

  // Auth Handlers
  const handleDriverLogin = (username: string) => {
    setCurrentUser({
      id: 'd-123',
      name: username,
      role: UserRole.DRIVER,
      busNumber: 'ND-4589'
    });
    navigate('/driver-dashboard');
  };

  const handleDriverRegisterSuccess = (name: string, busNumber: string) => {
    setCurrentUser({
        id: `d-${Date.now()}`,
        name: name,
        role: UserRole.DRIVER,
        busNumber: busNumber
    });
    navigate('/driver-dashboard');
  };

  const handlePassengerAccess = () => {
    setCurrentUser({
      id: 'p-guest',
      name: 'Guest Passenger',
      role: UserRole.PASSENGER
    });
    navigate('/passenger-dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    navigate('/');
  };

  // Mock Passenger Dashboard
  const PassengerDashboard = () => (
    <div className="h-[calc(100vh-64px)] relative">
      <div className="absolute inset-0 bg-slate-200 flex items-center justify-center">
         <div className="text-slate-400 flex flex-col items-center">
            <MapPin size={48} className="mb-2 text-slate-400" />
            <span className="font-semibold text-xl">Passenger Map View</span>
            <span className="text-sm">(Shows Buses Near You)</span>
         </div>
      </div>
      
      <div className="absolute top-4 left-4 right-4 md:left-8 md:w-96 bg-white rounded-xl shadow-2xl p-4 z-10">
         <h3 className="font-bold text-slate-800 mb-3 flex items-center"><Bus className="mr-2 text-blue-600" size={20}/> Find a Bus</h3>
         <div className="space-y-3">
            <input type="text" placeholder="From (e.g. Malabe)" className="w-full p-2.5 bg-slate-50 border rounded-lg text-sm" />
            <input type="text" placeholder="To (e.g. Pettah)" className="w-full p-2.5 bg-slate-50 border rounded-lg text-sm" />
            <button className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-bold text-sm hover:bg-blue-700">Search Routes</button>
         </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Navbar 
        role={currentUser?.role || UserRole.GUEST} 
        onLogout={handleLogout}
        onHome={() => navigate('/')} 
      />

      <main>
        <Routes>
          <Route path="/" element={
            <LandingPage 
              onSelectDriver={() => navigate('/login')}
              onSelectPassenger={handlePassengerAccess}
            />
          } />
          
      

          <Route path="/register" element={
            <DriverRegisterPage
              onRegisterSuccess={handleDriverRegisterSuccess}
              onLoginClick={() => navigate('/login')}
            />
          } />

          <Route path="/driver-dashboard" element={
            currentUser?.role === UserRole.DRIVER ? (
              <DriverDashboard />
            ) : (
              <Navigate to="/login" replace />
            )
          } />

          <Route path="/passenger-dashboard" element={<PassengerDashboard />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;