import React from 'react';
import { Map, Navigation, ShieldCheck, Smartphone, Clock } from 'lucide-react';

interface LandingPageProps {
  onSelectDriver: () => void;
  onSelectPassenger: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onSelectDriver, onSelectPassenger }) => {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50">
      
      {/* Hero Section */}
      <div className="bg-blue-700 text-white pb-20 pt-12 px-4 rounded-b-[3rem] shadow-xl relative overflow-hidden">
        {/* Abstract shapes */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-400/10 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="inline-block py-1 px-3 rounded-full bg-blue-600 border border-blue-500 text-xs font-semibold tracking-wider mb-4">SRI LANKA'S #1 TRANSIT APP</span>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Don't Wait.<br />
            <span className="text-yellow-400">Track Your Bus Live.</span>
          </h1>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Real-time GPS tracking for CTB and Private buses. Know exactly when your ride arrives.
          </p>
        </div>
      </div>

      {/* Role Selection Cards */}
      <div className="max-w-4xl mx-auto px-4 -mt-16 relative z-20 pb-12">
        <div className="grid md:grid-cols-2 gap-6">
          
          {/* Passenger Card */}
          <div 
            onClick={onSelectPassenger}
            className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all cursor-pointer transform hover:-translate-y-1 group border border-transparent hover:border-blue-500/20"
          >
            <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
              <Map className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">I am a Passenger</h2>
            <p className="text-slate-500 mb-6">Find buses, check routes, and see estimated arrival times.</p>
            <div className="flex items-center text-blue-600 font-semibold group-hover:translate-x-2 transition-transform">
              Open Live Map <Navigation className="ml-2 w-4 h-4" />
            </div>
          </div>

          {/* Driver Card */}
          <div 
            onClick={onSelectDriver}
            className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all cursor-pointer transform hover:-translate-y-1 group border border-transparent hover:border-yellow-500/20"
          >
            <div className="bg-yellow-50 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:bg-yellow-500 transition-colors">
              <Smartphone className="w-8 h-8 text-yellow-600 group-hover:text-white transition-colors" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">I am a Driver</h2>
            <p className="text-slate-500 mb-6">Login to share your location, manage trips, and update status.</p>
            <div className="flex items-center text-yellow-600 font-semibold group-hover:translate-x-2 transition-transform">
              Driver Login <Navigation className="ml-2 w-4 h-4" />
            </div>
          </div>

        </div>

        {/* Features Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
                <div className="mb-4 bg-white p-3 rounded-xl shadow-sm"><Clock className="text-blue-600" /></div>
                <h3 className="font-bold text-slate-800">Accurate ETAs</h3>
                <p className="text-sm text-slate-500 mt-2">Know exactly how many minutes until the bus reaches your halt.</p>
            </div>
            <div className="flex flex-col items-center text-center">
                <div className="mb-4 bg-white p-3 rounded-xl shadow-sm"><Navigation className="text-blue-600" /></div>
                <h3 className="font-bold text-slate-800">Live Tracking</h3>
                <p className="text-sm text-slate-500 mt-2">Watch the bus move on the map in real-time with GPS precision.</p>
            </div>
            <div className="flex flex-col items-center text-center">
                <div className="mb-4 bg-white p-3 rounded-xl shadow-sm"><ShieldCheck className="text-blue-600" /></div>
                <h3 className="font-bold text-slate-800">Verified Drivers</h3>
                <p className="text-sm text-slate-500 mt-2">All buses are registered and verified for your safety.</p>
            </div>
        </div>
      </div>

    </div>
  );
};