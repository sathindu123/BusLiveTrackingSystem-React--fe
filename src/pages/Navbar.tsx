import React from 'react';
import { Bus, Menu, MapPin } from 'lucide-react';
import { UserRole } from '../types';

interface NavbarProps {
  role: UserRole;
  onLogout: () => void;
  onHome: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ role, onLogout, onHome }) => {
  return (
   <nav className="bg-blue-700 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center cursor-pointer" onClick={onHome}>
            <div className="bg-yellow-400 p-2 rounded-full text-blue-900 mr-2">
              <Bus size={24} strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">LankaBus</h1>
              <p className="text-xs text-blue-200 -mt-1">Live Tracking</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {role !== UserRole.GUEST ? (
              <button 
                onClick={onLogout}
                className="bg-blue-800 hover:bg-blue-900 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Logout
              </button>
            ) : (
              <div className="hidden md:flex items-center text-sm text-blue-200">
                <MapPin size={16} className="mr-1" />
                <span>Sri Lanka Wide Coverage</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;