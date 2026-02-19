import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../app/auth/AuthSlice";
import { Mail, Lock, Eye, EyeOff, Shield} from 'lucide-react';
import { login } from '../services/authService';
import Header from '../components/Header';


const AdminLoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    try {
      // Axios now knows response.data is LoginResponse
      const response = await login({ email, password });

      // Type-safe extraction
      const { token, person, success, message } = response.data;

      if (success && token && person) {
        dispatch(setCredentials({ user: person, token }));
        navigate("/dashboard");
      } else {
        setError(message || "Login failed");
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      setError(message);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col">
      {/* Header Navigation */}
      <Header/>
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-40 left-10 w-72 h-72 bg-emerald-500 rounded-full opacity-10 blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500 rounded-full opacity-10 blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500 rounded-full opacity-5 blur-3xl"></div>
        </div>

        {/* Login Container */}
        <div className="relative w-full max-w-6xl grid lg:grid-cols-2 gap-0 bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Left Side - Admin Branding */}
          <div className="hidden lg:flex flex-col justify-between p-12 bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
            {/* Decorative Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yIDItNCA0LTRzNCwyIDQgNHYyYzAgMi0yIDQtNCA0cy00LTItNC00di0yem0wLTMwYzAtMiAyLTQgNC00czQgMiA0IDR2MmMwIDItMiA0LTQgNHMtNC0yLTQtNFY0ek0wIDM0YzAtMiAyLTQgNC00czQgMiA0IDR2MmMwIDItMiA0LTQgNHMtNC0yLTQtNHYtMnptMC0zMGMwLTIgMi00IDQtNHM0IDIgNCA0djJjMCAyLTIgNC00IDRzLTQtMi00LTRWNHoiLz48L2c+PC9nPjwvc3ZnPg==')]"></div>
            </div>

            {/* Logo and Branding */}
            <div className="relative z-10">
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-16 h-16 bg-linear-to-br rounded-2xl flex items-center justify-center font-bold text-2xl shadow-lg">
                  <img src="./logo.png" alt="Logo" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">Kandy Garden Club</h1>
                  <p className="text-emerald-400 text-sm font-medium">Admin Portal</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                  <Shield className="text-emerald-400" size={28} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Secure Access</h2>
                  <p className="text-gray-400 text-sm">Authorized Personnel Only</p>
                </div>
              </div>

              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                Access the admin dashboard to manage bookings, members, courts, and all club operations.
              </p>

              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4">
                <p className="text-sm text-emerald-400 font-medium mb-2">🔒 Security Notice</p>
                <p className="text-xs text-gray-400 leading-relaxed">
                  This is a restricted area. Only authorized administrators with valid credentials can access this system. All login attempts are monitored and logged.
                </p>
              </div>
            </div>

            {/* Admin Info */}
            <div className="relative z-10">
              <div className="border-t border-slate-700 pt-6">
                <p className="text-sm text-gray-400">
                  Need help accessing your account?
                </p>
                <p className="text-sm text-emerald-400 font-medium mt-1">
                  Contact Support: support@kandygardenclub.lk
                </p>
              </div>
            </div>

            {/* Decorative Blob */}
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-500 rounded-full opacity-10 blur-3xl"></div>
          </div>

          {/* Right Side - Login Form */}
          <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
            {/* Mobile Logo */}
            <div className="lg:hidden flex flex-col items-center mb-8">
              <div className="w-16 h-16 bg-linear-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center font-bold text-2xl shadow-lg text-white mb-3">
                SC
              </div>
              <h2 className="text-xl font-bold text-slate-900">Kandy Garden Club</h2>
              <p className="text-sm text-gray-600">Admin Portal</p>
            </div>

            <div className="mb-8">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">Admin Sign In</h2>
              <p className="text-gray-600">Enter your credentials to access the system</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4">
                <p className="text-sm text-red-600 font-medium">{error}</p>
              </div>
            )}

            <div className="space-y-6">
              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Admin Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="text-gray-400" size={20} />
                  </div>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError('');
                    }}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-slate-900 placeholder-gray-400"
                    placeholder="admin@sportclub.lk"
                    required
                    autoComplete="email"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="text-gray-400" size={20} />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError('');
                    }}
                    className="w-full pl-12 pr-12 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-slate-900 placeholder-gray-400"
                    placeholder="Enter your password"
                    required
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-5 h-5 rounded border-2 border-gray-300 text-emerald-600 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-0 cursor-pointer"
                  />
                  <span className="ml-3 text-sm font-medium text-gray-700">Remember me</span>
                </label>
                <a href="#" className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors">
                  Forgot password?
                </a>
              </div>

              {/* Sign In Button */}
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full bg-linear-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white py-4 rounded-xl font-semibold text-lg transition-all shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                  </>
                )}
              </button>

              {/* Support Info */}
              <div className="text-center pt-4">
                <p className="text-sm text-gray-600">
                  Need assistance?{' '}
                  <a href="#" className="font-semibold text-emerald-600 hover:text-emerald-700 transition-colors">
                    Contact Support
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="py-6 text-center">
        <p className="text-gray-400 text-sm">
          © 2025 SportClub Elite. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default AdminLoginPage;