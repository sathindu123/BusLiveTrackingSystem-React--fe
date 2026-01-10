import React, { useState } from 'react';
import { MapPin, Bus, Navigation } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { useAuth } from '../context/authContext';
import { UserRole } from '../types';
import Swal from 'sweetalert2';
import { getroutedetailsPasenger } from '../services/route';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

export const PassengerDashboard: React.FC = () => {
  const { logout } = useAuth();

  const [destination, setDestination] = useState('');
  const [routes, setRoutes] = useState<any[]>([]);
  const [selectedRoute, setSelectedRoute] = useState<any>(null);
  const [showDetails, setShowDetails] = useState(false);

  // GOOGLE MAP
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const containerStyle = {
    width: '100%',
    height: '220px',
    borderRadius: '1rem',
  };

  const defaultCenter = { lat: 6.9271, lng: 79.8612 }; // Colombo default

  const serachAction = async () => {
    try {
      const res = await getroutedetailsPasenger(destination);
      const item = res.data;

      const mappedRoutes = [
        {
          busNumber: item.buscode,
          startstation: item.startstation,
          endStation: item.endstation,
          startTime: item.startTime,
          endTime: item.endTime,
          shAvilable: item.shAvilable,
          status: item.startORoffline,
          lat: 6.865, // TEMP GPS
          lng: 79.877,
        },
      ];

      setRoutes(mappedRoutes);
    } catch (error) {
      Swal.fire('Error', 'Failed to load routes', 'error');
    }
  };

  return (
    <div className="h-screen flex flex-col bg-slate-50">
      <Navbar role={UserRole.PASSENGER} onLogout={logout} onHome={() => {}} />

      <div className="flex-1 relative">
        {/* MAP AT TOP */}
        <div className="w-full h-64">
          {isLoaded ? (
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={selectedRoute ? { lat: selectedRoute.lat, lng: selectedRoute.lng } : defaultCenter}
              zoom={13}
            >
              {selectedRoute && <Marker position={{ lat: selectedRoute.lat, lng: selectedRoute.lng }} />}
            </GoogleMap>
          ) : (
            <p className="text-center mt-24 font-bold">Loading map...</p>
          )}
        </div>

        {/* SEARCH BOX */}
        <div className="absolute top-6 left-6 right-6 md:left-10 md:w-[420px] z-10">
          <div className="bg-white rounded-[2rem] shadow-2xl p-8">
            <h2 className="text-2xl font-black mb-6 flex items-center">
              <Bus className="mr-3 text-blue-600" /> Track Real-time
            </h2>

            <input
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Where is your destination?"
              className="w-full p-5 rounded-2xl border font-bold"
            />

            <button
              onClick={serachAction}
              className="w-full mt-4 bg-blue-600 text-white py-4 rounded-2xl font-black flex items-center justify-center"
            >
              <Navigation className="inline mr-2" /> FIND NEARBY BUSES
            </button>

            <div className="mt-6 space-y-2">
              {routes.map((route, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setSelectedRoute(route);
                    setShowDetails(true);
                  }}
               className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl hover:bg-blue-50 cursor-pointer transition-all group border border-transparent hover:border-blue-100"
          >
            <span className="text-sm font-black text-slate-700 group-hover:text-blue-700">
              {route.busNumber} {route.endStation}
            </span>

            <span className="text-[9px] bg-green-100 text-green-700 px-3 py-1 rounded-full font-black uppercase tracking-tighter">
              Live Now
            </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ===== MODAL ===== */}
      {showDetails && selectedRoute && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm">

            <h3 className="text-lg font-black mb-4 flex items-center">
              <Bus className="mr-2 text-blue-600" /> Bus Details
            </h3>

            <div className="space-y-2 text-sm font-bold">
              <div>Bus: {selectedRoute.busNumber}</div>
              <div>From: {selectedRoute.startstation}</div>
              <div>To: {selectedRoute.endStation}</div>
              <div>Time: {selectedRoute.startTime} - {selectedRoute.endTime}</div>
              <div>Seats: {selectedRoute.shAvilable ? 'Available' : 'Not Available'}</div>
            </div>

            {/* GOOGLE MAP */}
            <div className="mt-4 w-full h-48">
              {isLoaded && (
                <GoogleMap
                  mapContainerStyle={{ width: '100%', height: '100%' }}
                  center={{ lat: selectedRoute.lat, lng: selectedRoute.lng }}
                  zoom={15}
                >
                  <Marker position={{ lat: selectedRoute.lat, lng: selectedRoute.lng }} />
                </GoogleMap>
              )}
            </div>

            <button
              onClick={() => setShowDetails(false)}
              className="w-full mt-4 bg-slate-100 py-3 rounded-xl font-bold"
            >
              Close
            </button>

          </div>
        </div>
      )}
    </div>
  );
};
