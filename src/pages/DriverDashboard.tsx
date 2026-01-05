import React, { useState, useEffect } from 'react';
import { 
  Bus, MapPin, Navigation, Power, Users, DollarSign, 
  AlertTriangle, CircleDot, LogOut, Info, Settings, User as UserIcon
} from 'lucide-react';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';

export const DriverDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOnline, setIsOnline] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState('');
  const [passengerCount, setPassengerCount] = useState(0);
  const [showStatusMenu, setShowStatusMenu] = useState(false);
  const [speed, setSpeed] = useState(0);

  const routes = [
    { id: '177', name: '177 - Kaduwela / Kollupitiya' },
    { id: '138', name: '138 - Homagama / Pettah' },
    { id: '120', name: '120 - Horana / Colombo' },
    { id: '993', name: '993 - Maharagama / Malabe' },
  ];

  useEffect(() => {
    let interval: any;
    if (isOnline) {
      interval = setInterval(() => {
        setPassengerCount(prev => Math.min(prev + Math.floor(Math.random() * 2), 60));
        setSpeed(Math.floor(Math.random() * 15) + 45);
      }, 5000);
    } else {
      setSpeed(0);
    }
    return () => clearInterval(interval);
  }, [isOnline]);

  const toggleOnline = () => {
    if (!selectedRoute && !isOnline) {
      alert("කරුණාකර මාර්ගය තෝරන්න (Select Route)");
      return;
    }
    setIsOnline(!isOnline);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="h-screen flex flex-col bg-slate-100 overflow-hidden font-sans">
      <header className={`px-5 py-4 flex justify-between items-center z-30 transition-all duration-500 shadow-xl ${isOnline ? 'bg-emerald-600' : 'bg-slate-900'}`}>
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-xl ${isOnline ? 'bg-white/20' : 'bg-slate-800'}`}>
            <Bus className="text-white" size={20} />
          </div>
          <div>
            <h1 className="text-white font-black text-sm tracking-tight">{user?.busNumber || 'ND-4589'}</h1>
            <p className="text-white/70 text-[10px] uppercase font-bold tracking-widest">
              {isOnline ? 'LIVE • TRACKING ACTIVE' : 'SYSTEM OFFLINE'}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
           <button onClick={() => navigate('/driver-profile')} className="text-white/70 p-2 hover:bg-white/10 rounded-lg transition-colors">
              <UserIcon size={20}/>
           </button>
           <button onClick={() => navigate('/settings')} className="text-white/70 p-2 hover:bg-white/10 rounded-lg transition-colors">
              <Settings size={20}/>
           </button>
           <button onClick={handleLogout} className="text-white/70 p-2 hover:bg-white/10 rounded-lg transition-colors">
              <LogOut size={20}/>
           </button>
        </div>
      </header>

      <div className="flex-1 relative bg-slate-200">
        <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(#475569 1px, transparent 1px)', backgroundSize: '30px 30px'}}></div>
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <div className={`relative p-5 rounded-full border-4 shadow-2xl transition-all duration-700 ${isOnline ? 'bg-blue-600 border-white scale-110' : 'bg-slate-600 border-slate-400 grayscale'}`}>
            <Bus className="text-white w-10 h-10" />
            {isOnline && <div className="absolute inset-0 bg-blue-400 rounded-full animate-ping opacity-30"></div>}
          </div>
          {isOnline && (
            <div className="mt-4 bg-white px-4 py-1 rounded-full shadow-lg border border-slate-100 flex items-center space-x-2">
              <Navigation className="text-blue-600" size={14} />
              <span className="text-xs font-black text-slate-800 tracking-tight">{speed} km/h</span>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-t-[3rem] shadow-[0_-15px_50px_rgba(0,0,0,0.1)] z-20 px-8 pb-10">
        <div className="w-14 h-1.5 bg-slate-100 rounded-full mx-auto my-5"></div>
        <div className="mb-8">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-1">Current Active Route</label>
          <div className="relative">
            <select 
              value={selectedRoute}
              onChange={(e) => setSelectedRoute(e.target.value)}
              disabled={isOnline}
              className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 pr-12 text-sm font-bold appearance-none text-slate-800 focus:border-emerald-500 transition-all disabled:opacity-70 disabled:bg-slate-100"
            >
              <option value="">මාර්ගය තෝරන්න (Select Route)</option>
              {routes.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
            </select>
            <CircleDot className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-blue-50/60 p-5 rounded-3xl border border-blue-100/50 flex flex-col items-center">
            <Users size={22} className="text-blue-600 mb-2" />
            <span className="text-2xl font-black text-slate-800 leading-none tracking-tighter">{passengerCount}</span>
            <span className="text-[9px] font-bold text-slate-400 uppercase mt-1">Sittings</span>
          </div>
          <div className="bg-emerald-50/60 p-5 rounded-3xl border border-emerald-100/50 flex flex-col items-center">
            <DollarSign size={22} className="text-emerald-600 mb-2" />
            <span className="text-2xl font-black text-slate-800 leading-none tracking-tighter">{passengerCount * 60}</span>
            <span className="text-[9px] font-bold text-slate-400 uppercase mt-1">LKR</span>
          </div>
          <button onClick={() => setShowStatusMenu(true)} className="bg-orange-50/60 p-5 rounded-3xl border border-orange-100/50 flex flex-col items-center">
            <AlertTriangle size={22} className="text-orange-600 mb-2" />
            <span className="text-xs font-black text-slate-800 mt-1 uppercase">Report</span>
          </button>
        </div>
        <button 
          onClick={toggleOnline}
          className={`w-full py-5 rounded-[1.5rem] font-black text-lg flex items-center justify-center transition-all transform active:scale-[0.96] shadow-2xl ${
            isOnline ? 'bg-red-500 text-white shadow-red-200' : 'bg-slate-900 text-white shadow-slate-300'
          }`}
        >
          <Power className="mr-3" size={24} />
          {isOnline ? 'STOP BROADCASTING' : 'START LIVE TRIP'}
        </button>
      </div>

      {showStatusMenu && (
        <div className="absolute inset-0 z-50 flex items-end sm:items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white w-full max-w-sm rounded-[2.5rem] p-8 shadow-2xl">
            <h3 className="font-black text-slate-800 text-xl mb-6">Report Issue</h3>
            <div className="grid grid-cols-2 gap-3 mb-8">
              {['Traffic Jam', 'Breakdown', 'Accident', 'Road Close'].map(status => (
                <button key={status} onClick={() => setShowStatusMenu(false)} className="py-4 bg-slate-50 border border-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-wider">
                  {status}
                </button>
              ))}
            </div>
            <button onClick={() => setShowStatusMenu(false)} className="w-full py-4 bg-slate-100 text-slate-500 font-bold rounded-2xl">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};