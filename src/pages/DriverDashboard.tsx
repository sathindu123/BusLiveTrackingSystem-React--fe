import React, { useState, useEffect } from 'react';
import { 
  Bus, CircleDot, Clock, Armchair, Ban, AlertTriangle, Power, User as UserIcon, Settings, LogOut, Navigation
} from 'lucide-react';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';
import { getroutedetails, saveRouteStatus } from '../services/route';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

export const DriverDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [isOnline, setIsOnline] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState('');
  const [showStatusMenu, setShowStatusMenu] = useState(false);
  const [speed, setSpeed] = useState(0);
  const [isFull, setIsFull] = useState(false);
  const [busNumber, setBusNumber] = useState<string>('');
  const [startTime, setStartTime] = useState('08:30');
  const [endTime, setEndTime] = useState('10:30');
  const [driver, setDriver] = useState<any>(null);
  const [routes, setRoutes] = useState<{id:string; name:string}[]>([]);
  const [loading, setLoading] = useState(true);

  // Map Loader
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  });

  const defaultCenter = { lat: 6.9271, lng: 79.8612 }; // Colombo

  useEffect(() => {
    let interval: any;
    if (isOnline) {
      interval = setInterval(() => {
        setSpeed(Math.floor(Math.random() * 15) + 45);
      }, 5000);
    } else {
      setSpeed(0);
    }
    return () => clearInterval(interval);
  }, [isOnline]);

  useEffect(() => {
    const loadDriverData = async () => {
      try {
        const busCode = user?.busNb;
        if (!busCode) return;

        const res = await getroutedetails(busCode);
        const driverData = res.data ?? res;
        setDriver(driverData);
        setBusNumber(driverData.buscode ?? '');

        const start = driverData.startstation;
        const end = driverData.endstation;
        if (start && end) {
          setRoutes([
            { id: `${driverData.buscode}-UP`, name: `${driverData.buscode} - ${start} / ${end}` },
            { id: `${driverData.buscode}-DOWN`, name: `${driverData.buscode} - ${end} / ${start}` }
          ]);
          setSelectedRoute(driverData.buscode);
        }

      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadDriverData();
  }, [user]);

  const toggleOnline = async () => {
    if (!selectedRoute && !isOnline) {
      alert("කරුණාකර මාර්ගය තෝරන්න (Select Route)");
      return;
    }

    const stations = getStationsFromRoute();
    if (!stations) return;

    const payload = {
      buscode: busNumber,
      startstation: stations.start,
      endstation: stations.end,
      startTime,
      endTime,
      shAvilable: !isFull,
      startORoffline: !isOnline
    };

    try {
      await saveRouteStatus(payload);
      setIsOnline(prev => !prev);
      alert("Route status updated successfully");
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || "Route save failed");
    }
  };

  const getStationsFromRoute = () => {
    const selected = routes.find(r => r.id === selectedRoute);
    if (!selected) return null;
    const [, routePart] = selected.name.split(" - ");
    if (!routePart) return null;
    const [start, end] = routePart.split("/").map(s => s.trim());
    return { start, end };
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      
      {/* ===== Google Map Background ===== */}
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '100%' }}
          center={defaultCenter}
          zoom={12}
          options={{ disableDefaultUI: true }}
        >
          {isOnline && <Marker position={defaultCenter} />}
        </GoogleMap>
      )}

      {/* ===== Header Overlay ===== */}
      <header className={`absolute top-0 left-0 right-0 px-5 py-4 flex justify-between items-center z-30 transition-all duration-500 shadow-xl ${isOnline ? 'bg-emerald-600/80 backdrop-blur-md' : 'bg-slate-900/80 backdrop-blur-md'}`}>
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-xl ${isOnline ? 'bg-white/20' : 'bg-slate-800/50'}`}>
            <Bus className="text-white" size={20} />
          </div>
          <div>
            <h1 className="text-white font-black text-sm tracking-tight">{busNumber || 'ND-4589'}</h1>
            <p className="text-white/70 text-[10px] uppercase font-bold tracking-widest">{isOnline ? 'LIVE • TRACKING ACTIVE' : 'SYSTEM OFFLINE'}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button onClick={() => navigate('/driver-profile')} className="text-white/70 p-2 hover:bg-white/10 rounded-lg transition-colors"><UserIcon size={20}/></button>
          <button onClick={() => navigate('/settings')} className="text-white/70 p-2 hover:bg-white/10 rounded-lg transition-colors"><Settings size={20}/></button>
          <button onClick={handleLogout} className="text-white/70 p-2 hover:bg-white/10 rounded-lg transition-colors"><LogOut size={20}/></button>
        </div>
      </header>

      {/* ===== Bottom Panel Overlay ===== */}
      <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[3rem] shadow-2xl z-30 px-8 pb-10 max-h-[70vh] overflow-y-auto scrollbar-hide">
        <div className="w-14 h-1.5 bg-slate-100 rounded-full mx-auto my-5"></div>
        
        {/* Route Selector */}
        <div className="mb-6">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-1">Current Active Route</label>
          <select 
            value={selectedRoute}
            onChange={(e) => setSelectedRoute(e.target.value)}
            disabled={isOnline}
            className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 pr-12 text-sm font-bold appearance-none text-slate-800 focus:border-emerald-500 transition-all disabled:opacity-70 disabled:bg-slate-100 outline-none"
          >
            <option value="">මාර්ගය තෝරන්න (Select Route)</option>
            {routes.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
          </select>
          <CircleDot className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
        </div>

        {/* Trip Times */}
        <div className="mb-8 grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Trip Starts At</label>
            <div className="relative">
              <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500" size={18} />
              <input type="time" value={startTime} disabled={isOnline} onChange={(e) => setStartTime(e.target.value)} className="w-full bg-blue-50/50 border-2 border-blue-100/30 rounded-2xl p-4 pl-12 text-sm font-black text-slate-800 outline-none focus:border-blue-500 transition-all disabled:opacity-70"/>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Trip Ends At</label>
            <div className="relative">
              <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-500" size={18} />
              <input type="time" value={endTime} disabled={isOnline} onChange={(e) => setEndTime(e.target.value)} className="w-full bg-orange-50/50 border-2 border-orange-100/30 rounded-2xl p-4 pl-12 text-sm font-black text-slate-800 outline-none focus:border-orange-500 transition-all disabled:opacity-70"/>
            </div>
          </div>
        </div>

        {/* Seats & Report Buttons */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <button onClick={() => setIsFull(!isFull)} className={`p-5 rounded-3xl border transition-all flex flex-col items-center justify-center active:scale-95 ${isFull ? 'bg-red-50 border-red-200 text-red-600' : 'bg-emerald-50 border-emerald-200 text-emerald-600'}`}>
            {isFull ? <Ban size={24} className="mb-2"/> : <Armchair size={24} className="mb-2"/>}
            <span className="text-xs font-black uppercase tracking-tight">{isFull ? 'Bus is Full' : 'Seats Available'}</span>
            <span className="text-[8px] font-bold opacity-60 mt-1 uppercase">Tap to Change</span>
          </button>
          <button onClick={() => setShowStatusMenu(true)} className="bg-orange-50 p-5 rounded-3xl border border-orange-200 flex flex-col items-center justify-center active:scale-95 text-orange-600">
            <AlertTriangle size={24} className="mb-2" />
            <span className="text-xs font-black uppercase tracking-tight">Report Issue</span>
            <span className="text-[8px] font-bold opacity-60 mt-1 uppercase">Breakdown / Traffic</span>
          </button>
        </div>

        {/* Online Toggle */}
        <button onClick={toggleOnline} className={`w-full py-5 rounded-[1.5rem] font-black text-lg flex items-center justify-center transition-all transform active:scale-[0.96] shadow-2xl ${isOnline ? 'bg-red-500 text-white shadow-red-200' : 'bg-slate-900 text-white shadow-slate-300'}`}>
          <Power className="mr-3" size={24} />{isOnline ? 'STOP BROADCASTING' : 'START LIVE TRIP'}
        </button>
      </div>

      {/* Status Menu Modal */}
      {showStatusMenu && (
        <div className="absolute inset-0 z-50 flex items-end sm:items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white w-full max-w-sm rounded-[2.5rem] p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <h3 className="font-black text-slate-800 text-xl mb-6">Report Issue</h3>
            <div className="grid grid-cols-2 gap-3 mb-8">
              {['Traffic Jam','Breakdown','Accident','Road Close'].map(status => (
                <button key={status} onClick={() => setShowStatusMenu(false)} className="py-4 bg-slate-50 border border-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-wider hover:bg-slate-100 transition-colors">{status}</button>
              ))}
            </div>
            <button onClick={() => setShowStatusMenu(false)} className="w-full py-4 bg-slate-100 text-slate-500 font-bold rounded-2xl">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};
