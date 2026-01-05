import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Bus, MapPin, Save, Phone, BadgeCheck, Camera } from 'lucide-react';
import { useAuth } from '../context/authContext';

export const DriverProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [profileData, setProfileData] = useState({
    name: user?.name || 'Saman Perera',
    phone: '071 234 5678',
    busNumber: user?.busNumber || 'ND-4589',
    routeNumber: '177',
    startStation: 'Kaduwela',
    endStation: 'Kollupitiya'
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      // Custom toast or notification could go here
      alert("විස්තර සාර්ථකව සුරකින ලදී! (Details saved successfully)");
      navigate('/driver-dashboard');
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col antialiased">
      {/* Dynamic Header */}
      <header className="bg-slate-900 p-6 text-white flex items-center justify-between shadow-2xl z-30">
        <div className="flex items-center">
          <button 
            onClick={() => navigate('/driver-dashboard')} 
            className="mr-4 p-2.5 bg-white/10 hover:bg-white/20 rounded-2xl transition-all active:scale-90"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-lg font-black tracking-tight leading-none uppercase">Profile</h1>
            <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">Driver Settings</p>
          </div>
        </div>
        <div className="bg-emerald-500/10 text-emerald-500 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border border-emerald-500/20">
          Verified
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-6 pt-10 pb-32">
        <div className="max-w-md mx-auto">
          
          {/* Profile Header Card */}
          <div className="flex flex-col items-center mb-10">
             <div className="relative group">
                <div className="w-28 h-28 bg-white rounded-[2.5rem] flex items-center justify-center border-4 border-white shadow-2xl overflow-hidden relative">
                  <User size={56} className="text-slate-200" />
                  <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <Camera className="text-white" size={24} />
                  </div>
                </div>
                <div className="absolute -bottom-1 -right-1 bg-blue-600 text-white p-2 rounded-2xl border-4 border-slate-50 shadow-lg">
                  <BadgeCheck size={18} />
                </div>
             </div>
             <h2 className="mt-6 text-2xl font-black text-slate-900 tracking-tight">{profileData.name}</h2>
             <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-2 bg-slate-200/50 px-3 py-1 rounded-full">LankaBus Network Member</span>
          </div>

          {/* Settings Sections */}
          <div className="space-y-8">
            {/* Section: Personal */}
            <div className="bg-white p-8 rounded-[2.5rem] shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-slate-100/50">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-1.5 h-4 bg-blue-600 rounded-full"></div>
                <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest">Driver Details</h3>
              </div>
              
              <div className="space-y-5">
                <div className="group">
                  <label className="text-[10px] font-black text-slate-400 uppercase ml-1 tracking-widest mb-2 block group-focus-within:text-blue-600 transition-colors">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <input 
                      type="text" 
                      value={profileData.name}
                      onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                      className="w-full p-4.5 pl-14 bg-slate-50 rounded-2xl border-2 border-slate-50 focus:border-blue-500/30 focus:bg-white outline-none font-bold text-slate-800 transition-all text-sm" 
                    />
                  </div>
                </div>

                <div className="group">
                  <label className="text-[10px] font-black text-slate-400 uppercase ml-1 tracking-widest mb-2 block group-focus-within:text-blue-600 transition-colors">Contact Number</label>
                  <div className="relative">
                    <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <input 
                      type="tel" 
                      value={profileData.phone}
                      onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                      className="w-full p-4.5 pl-14 bg-slate-50 rounded-2xl border-2 border-slate-50 focus:border-blue-500/30 focus:bg-white outline-none font-bold text-slate-800 transition-all text-sm" 
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section: Route */}
            <div className="bg-white p-8 rounded-[2.5rem] shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-slate-100/50">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-1.5 h-4 bg-orange-500 rounded-full"></div>
                <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest">Route Setup</h3>
              </div>
              
              <div className="space-y-5">
                <div className="group">
                  <label className="text-[10px] font-black text-slate-400 uppercase ml-1 tracking-widest mb-2 block">Bus Registration</label>
                  <div className="relative">
                    <Bus className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <input 
                      type="text" 
                      value={profileData.busNumber}
                      onChange={(e) => setProfileData({...profileData, busNumber: e.target.value.toUpperCase()})}
                      className="w-full p-4.5 pl-14 bg-slate-50 rounded-2xl border-2 border-slate-50 focus:border-blue-500/30 focus:bg-white outline-none font-bold text-slate-800 transition-all uppercase text-sm" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="group">
                    <label className="text-[10px] font-black text-slate-400 uppercase ml-1 tracking-widest mb-2 block">Start Station</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Maharagama"
                      value={profileData.startStation}
                      onChange={(e) => setProfileData({...profileData, startStation: e.target.value})}
                      className="w-full p-4.5 bg-slate-50 rounded-2xl border-2 border-slate-50 focus:border-blue-500/30 focus:bg-white outline-none font-bold text-slate-800 transition-all text-sm" 
                    />
                  </div>
                  <div className="group">
                    <label className="text-[10px] font-black text-slate-400 uppercase ml-1 tracking-widest mb-2 block">End Station</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Pettah"
                      value={profileData.endStation}
                      onChange={(e) => setProfileData({...profileData, endStation: e.target.value})}
                      className="w-full p-4.5 bg-slate-50 rounded-2xl border-2 border-slate-50 focus:border-blue-500/30 focus:bg-white outline-none font-bold text-slate-800 transition-all text-sm" 
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Button - Floating Aesthetic */}
      <div className="fixed bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-slate-50 via-slate-50 to-transparent pointer-events-none z-40">
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="w-full max-w-md mx-auto pointer-events-auto bg-slate-900 text-white py-5 rounded-[2rem] font-black text-base flex items-center justify-center shadow-2xl shadow-slate-900/20 active:scale-95 transition-all hover:bg-black"
        >
          {isSaving ? (
             <span className="flex items-center">
               <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24" fill="none">
                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
               </svg>
               UPDATING PROFILE...
             </span>
          ) : (
            <>
              <Save className="mr-3" size={20} /> SAVE PROFILE SETTINGS
            </>
          )}
        </button>
      </div>
    </div>
  );
};