
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, Bus, Phone, AlertCircle, CheckCircle2 } from 'lucide-react';

export const DriverRegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    busNumber: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simple validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      setIsLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      onRegisterSuccess(formData.fullName, formData.busNumber);
    }, 1500);
  };

  return (
 <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-slate-50 p-4 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-blue-600 to-slate-50 -z-0"></div>
      
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden z-10 border border-slate-100">
        
        {/* Header Section */}
        <div className="bg-blue-700 p-6 text-center relative">
          <h2 className="text-2xl font-bold text-white mb-1">Driver Registration</h2>
          <p className="text-blue-200 text-sm">Join the LankaBus network today</p>
        </div>

        {/* Form Section */}
        <div className="p-8 pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm flex items-center">
                <AlertCircle size={16} className="mr-2 flex-shrink-0" />
                {error}
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600 ml-1">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="block w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                  placeholder="Saman Perera"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-600 ml-1">Mobile Number</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-4 w-4 text-slate-400" />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="block w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                    placeholder="077..."
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-600 ml-1">Bus Number</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Bus className="h-4 w-4 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    name="busNumber"
                    required
                    value={formData.busNumber}
                    onChange={handleInputChange}
                    className="block w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all uppercase"
                    placeholder="ND-xxxx"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600 ml-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="block w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                  placeholder="Create a password"
                />
              </div>
            </div>

             <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600 ml-1">Confirm Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <CheckCircle2 className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  type="password"
                  name="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="block w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                  placeholder="Repeat password"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex items-center justify-center py-3 mt-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isLoading ? 'Creating Account...' : 'Register'}
            </button>
          </form>

          <div className="mt-6 text-center border-t border-slate-100 pt-4">
            <p className="text-sm text-slate-500">
              Already registered?{' '}
              <button onClick={() => navigate('/login')} className="text-blue-600 font-bold hover:text-blue-700 hover:underline">
                Login Here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
function onRegisterSuccess(fullName: string, busNumber: string) {
  throw new Error('Function not implemented.');
}

