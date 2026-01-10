import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import { User, Lock, ArrowRight, BusFront, AlertCircle, FolderMinus } from 'lucide-react';
import { getMyDetails, loginDash } from '../services/auth'
import axios, { AxiosError } from "axios";
import Swal from 'sweetalert2';

export const DriverLoginPage: React.FC = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();
    setLoading(true);
    setError('');

    if(formData.username == "" || formData.password == ""){
      setError('Invalid credentials. Please try again.');
    }

    try{

      const username = formData.username
      const password = formData.password

  
      const res = await loginDash(username,password);
      console.log("res = ", res)

      const accessToken = res.data.accessToken;  
      localStorage.setItem("accessToken", accessToken);

      const details = await getMyDetails();
      console.log("dets",details)
      setUser(details.data)

      Swal.fire({
        icon: "success",
        title: "Login Successful 🎉",
        text: "Welcome to Driver Dashboard",
        showConfirmButton: false,      
        timer: 2000,                   
        timerProgressBar: true,
        willClose: () => {
          navigate("/driver-dashboard");
        }
      });
    }catch (err: any) {
      if (axios.isAxiosError(err)) {
        // Backend eken return karana message eka display karanna
        console.error("Axios error response:", err.response?.data);
        setError(err.response?.data?.message || "Something went wrong. Try again.");
      } else {
        console.error("Unknown error:", err);
        setError("Something went wrong. Try again.");
      }
    }finally {
        setLoading(false);
    }
  };


  const onBack = () => {
    navigate('/');
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-slate-50 p-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-blue-600 to-slate-50 -z-0"></div>

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden z-10 border border-slate-100">
        <div className="bg-blue-700 p-8 text-center relative">
          <div className="mx-auto bg-white/10 w-16 h-16 rounded-full flex items-center justify-center mb-4 backdrop-blur-sm">
            <BusFront className="text-yellow-400 w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-1">Driver Login</h2>
          <p className="text-blue-200 text-sm">Access your route dashboard</p>
          <div className="absolute top-4 right-4 bg-blue-800/50 px-3 py-1 rounded-full text-xs text-blue-100 font-medium border border-blue-500/30">
            ආයුබෝවන් 🙏
          </div>
        </div>

        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">

            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm flex items-center">
                <AlertCircle size={16} className="mr-2" />
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-600 ml-1">Driver ID / Phone</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="text"
                  name="username"
                  required
                  value={formData.username}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl bg-slate-50"
                  placeholder="Enter your ID"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-600 ml-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl bg-slate-50"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading} 
              className={`w-full py-3.5 rounded-xl text-white font-bold bg-blue-600 ${
                loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'
              }`}
            >
              {loading ? 'Logging in...' : (
                <span className="flex items-center justify-center">
                  Login to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                </span>
              )}
            </button>
          </form>

          <div className="mt-8 text-center pt-6 border-t border-slate-100">
            <button onClick={() => navigate('/register')} className="w-full py-2 border border-blue-600 text-blue-600 rounded-lg font-semibold">
              Create Driver Account
            </button>
            <button onClick={onBack} className="mt-4 text-xs text-slate-400">
              ← Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
