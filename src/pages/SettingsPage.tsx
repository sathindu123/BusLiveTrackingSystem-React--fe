import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell, Moon, Globe, Shield, Smartphone, Info, ChevronRight } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  const settingsList = [
    { icon: <Bell size={20} />, label: 'Notifications', value: notifications, toggle: () => setNotifications(!notifications) },
    { icon: <Moon size={20} />, label: 'Dark Mode', value: darkMode, toggle: () => setDarkMode(!darkMode) },
    { icon: <Globe size={20} />, label: 'Language', detail: 'English / සිංහල' },
    { icon: <Shield size={20} />, label: 'Privacy & Security' },
    { icon: <Smartphone size={20} />, label: 'App Version', detail: 'v1.0.4' },
    { icon: <Info size={20} />, label: 'Help & Support' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
      <header className="bg-slate-900 p-6 text-white flex items-center shadow-lg">
        <button onClick={() => navigate('/driver-dashboard')} className="mr-4 p-2 hover:bg-white/10 rounded-full transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-black tracking-tight">System Settings</h1>
      </header>

      <div className="flex-1 p-6 space-y-4">
        <div className="max-w-md mx-auto bg-white rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden">
          {settingsList.map((item, idx) => (
            <div 
              key={idx} 
              className={`flex items-center justify-between p-6 cursor-pointer hover:bg-slate-50 transition-colors ${idx !== settingsList.length - 1 ? 'border-b border-slate-50' : ''}`}
              onClick={item.toggle}
            >
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-slate-100 rounded-2xl text-slate-600">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-sm">{item.label}</h3>
                  {item.detail && <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{item.detail}</p>}
                </div>
              </div>

              {item.toggle ? (
                <div className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${item.value ? 'bg-emerald-500' : 'bg-slate-300'}`}>
                  <div className={`w-4 h-4 bg-white rounded-full transition-transform duration-300 ${item.value ? 'translate-x-6' : 'translate-x-0'}`}></div>
                </div>
              ) : (
                <ChevronRight size={18} className="text-slate-300" />
              )}
            </div>
          ))}
        </div>

        <div className="max-w-md mx-auto py-10 text-center">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Designed by LankaBus Tech Team</p>
            <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mt-1">LankaBus © 2025 All Rights Reserved</p>
        </div>
      </div>
    </div>
  );
};