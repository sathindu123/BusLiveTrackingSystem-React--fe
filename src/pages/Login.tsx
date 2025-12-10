import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { LandingPage } from '../components/LandingPage';
import { DriverLoginPage } from '../components/DriverLoginPage';
import { DriverRegisterPage } from '../components/DriverRegisterPage';
import type { ViewState, User } from '../types';
import { UserRole } from '../types';

import { Navigation, MapPin, Bus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const App: React.FC = () => {
  const navigate = useNavigate()
  const [currentView, setCurrentView] = useState<ViewState>('LANDING');
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Handlers
  const handleDriverLogin = (username: string) => {
    setCurrentUser({
      id: 'd-123',
      name: username,
      role: UserRole.DRIVER,
      busNumber: 'ND-4589'
    });
    setCurrentView('DASHBOARD_DRIVER');
  };

  const handleDriverRegisterSuccess = (name: string, busNumber: string) => {
    // In a real app, this would send data to backend.
    // For now, we simulate success and log them in immediately.
    setCurrentUser({
        id: `d-${Date.now()}`,
        name: name,
        role: UserRole.DRIVER,
        busNumber: busNumber
    });
    setCurrentView('DASHBOARD_DRIVER');
  };

  const handlePassengerAccess = () => {
    setCurrentUser({
      id: 'p-guest',
      name: 'Guest Passenger',
      role: UserRole.PASSENGER
    });
    setCurrentView('DASHBOARD_PASSENGER');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('LANDING');
  };

  // Mock Dashboards to make the prototype complete
  const DriverDashboard = () => (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow p-6 mb-6 flex justify-between items-center border-l-4 border-green-500">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Welcome, {currentUser?.name}</h2>
          <p className="text-slate-500">Bus No: <span className="font-mono font-bold text-slate-700">{currentUser?.busNumber}</span></p>
        </div>
        <div className="bg-green-100 text-green-700 px-4 py-2 rounded-lg font-bold flex items-center animate-pulse">
           <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span> Online
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow border border-slate-100">
            <h3 className="font-bold text-slate-700 mb-4">Route Selection</h3>
            <select className="w-full p-3 border rounded-lg mb-4 bg-slate-50">
                <option>177 - Kaduwela to Kollupitiya</option>
                <option>138 - Homagama to Pettah</option>
            </select>
            <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700">Start Trip</button>
        </div>
        <div className="bg-slate-100 p-6 rounded-xl border-2 border-dashed border-slate-300 flex items-center justify-center min-h-[200px]">
            <p className="text-slate-400 font-medium">GPS Map Integration Area</p>
        </div>
      </div>
    </div>
  );

  const PassengerDashboard = () => (
    <div className="h-[calc(100vh-64px)] relative">
      <div className="absolute inset-0 bg-slate-200 flex items-center justify-center">
         {/* Mock Map Background */}
         <div className="text-slate-400 flex flex-col items-center">
            <MapPin size={48} className="mb-2 text-slate-400" />
            <span className="font-semibold text-xl">Interactive Map Area</span>
            <span className="text-sm">(Leaflet / Google Maps)</span>
         </div>
      </div>
      
      {/* Floating Search Panel */}
      <div className="absolute top-4 left-4 right-4 md:left-8 md:w-96 bg-white rounded-xl shadow-2xl p-4 z-10">
         <h3 className="font-bold text-slate-800 mb-3 flex items-center"><Bus className="mr-2 text-blue-600" size={20}/> Find a Bus</h3>
         <div className="space-y-3">
            <input type="text" placeholder="From (e.g. Malabe)" className="w-full p-2.5 bg-slate-50 border rounded-lg text-sm" />
            <input type="text" placeholder="To (e.g. Pettah)" className="w-full p-2.5 bg-slate-50 border rounded-lg text-sm" />
            <button className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-bold text-sm hover:bg-blue-700">Search Routes</button>
         </div>
         
         <div className="mt-4 pt-4 border-t border-slate-100">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">Nearby Buses</p>
            <div className="space-y-2">
                {[1, 2].map((i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100 hover:border-blue-300 transition-colors cursor-pointer">
                        <div className="flex items-center">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold mr-3">177</div>
                            <div>
                                <p className="text-sm font-bold text-slate-800">NB-45{i}8</p>
                                <p className="text-xs text-slate-500">Kaduwela → Pettah</p>
                            </div>
                        </div>
                        <div className="text-right">
                             <p className="text-sm font-bold text-green-600">{i * 5} min</p>
                             <p className="text-xs text-slate-400">{1.2 * i} km</p>
                        </div>
                    </div>
                ))}
            </div>
         </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Navbar 
        role={currentUser?.role || UserRole.GUEST} 
        onLogout={handleLogout}
        onHome={() => {
            if (currentUser) return; // Stay on dashboard if logged in
            setCurrentView('LANDING');
        }} 
      />

      <main>
        {currentView === 'LANDING' && (
          <LandingPage 
            onSelectDriver={() => setCurrentView('LOGIN_DRIVER')}
            onSelectPassenger={handlePassengerAccess}
          />
        )}

        {currentView === 'LOGIN_DRIVER' && (
          <DriverLoginPage 
            onLoginSuccess={handleDriverLogin}
            onBack={() => setCurrentView('LANDING')}
            onRegisterClick={() => setCurrentView('REGISTER_DRIVER')}
          />
        )}

        {currentView === 'REGISTER_DRIVER' && (
          <DriverRegisterPage
            onRegisterSuccess={handleDriverRegisterSuccess}
            onLoginClick={() => setCurrentView('LOGIN_DRIVER')}
          />
        )}

        {currentView === 'DASHBOARD_DRIVER' && <DriverDashboard />}
        
        {currentView === 'DASHBOARD_PASSENGER' && <PassengerDashboard />}
      </main>
    </div>
  );
};

export default App;