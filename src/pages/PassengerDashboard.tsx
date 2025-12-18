
import React from 'react';
import { MapPin, Bus, Search, Navigation } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { useAuth } from '../context/authContext';
import { UserRole } from '../types';

export const PassengerDashboard: React.FC = () => {
  const { logout } = useAuth();
  
  return (
    <div className="h-screen flex flex-col bg-slate-50">
      <Navbar role={UserRole.PASSENGER} onLogout={logout} onHome={() => {}} />
      <div className="flex-1 relative">
        <div className="absolute inset-0 bg-slate-200 flex items-center justify-center">
          <div className="text-slate-400 flex flex-col items-center">
            <MapPin size={48} className="animate-bounce text-blue-500" />
            <p className="font-black mt-3 text-slate-600">Finding Live Buses...</p>
          </div>
        </div>

        <div className="absolute top-6 left-6 right-6 md:left-10 md:w-[420px] z-10">
          <div className="bg-white rounded-[2rem] shadow-2xl p-8 border border-slate-100/50 backdrop-blur-md">
            <h2 className="text-2xl font-black text-slate-800 mb-8 flex items-center tracking-tight">
              <div className="p-2 bg-blue-100 rounded-xl mr-3"><Bus className="text-blue-600" size={20}/></div> Track Real-time
            </h2>
            <div className="space-y-4">
              <input 
                type="text" 
                placeholder="Where is your destination?" 
                className="w-full p-5 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-bold focus:border-blue-500 transition-all outline-none"
              />
              <button className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black flex items-center justify-center hover:bg-blue-700 active:scale-95 transition-all shadow-xl shadow-blue-200">
                <Navigation size={18} className="mr-3" /> FIND NEARBY BUSES
              </button>
            </div>
            
            <div className="mt-10">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Popular Routes Near You</p>
              <div className="space-y-2">
                {['177 Kaduwela', '138 Pettah', '120 Horana'].map(route => (
                  <div key={route} className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl hover:bg-blue-50 cursor-pointer transition-all group border border-transparent hover:border-blue-100">
                    <span className="text-sm font-black text-slate-700 group-hover:text-blue-700">{route}</span>
                    <span className="text-[9px] bg-green-100 text-green-700 px-3 py-1 rounded-full font-black uppercase tracking-tighter">Live Now</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
