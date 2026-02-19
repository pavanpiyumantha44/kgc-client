import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
  Menu, X, Home, Calendar, DollarSign, Settings, 
  LogOut, Bell, Search, ChevronDown,Volleyball,User
} from 'lucide-react';
import { Link, Outlet } from 'react-router-dom';
import { logout } from '../app/auth/AuthSlice';
import type { RootState, AppDispatch } from "../app/Store";



const Dashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [activeMenu, setActiveMenu] = useState<string>('Dashboard');
  const [profileDropdownOpen, setProfileDropdownOpen] = useState<boolean>(false);
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();


  const menuItems = [
    // { name: 'Dashboard', icon: <Home size={20} /> },
    { name: 'Bookings', icon: <Calendar size={20} /> },
    { name: 'Services', icon: <Volleyball size={20} /> },
    { name: 'Revenue', icon: <DollarSign size={20} /> },
    { name: 'Settings', icon: <Settings size={20} /> },
  ];
  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-slate-800">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-linear-to-br rounded-full flex items-center justify-center font-bold">
               <img src="./logo.png" alt="Logo" />
              </div>
              <span className="text-xl font-bold">Admin Panel</span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 hover:bg-slate-800 rounded-lg transition-colors"
              aria-label="Close sidebar"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            <button onClick={() => {
                  setActiveMenu("Dashboard");
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                  activeMenu === "Dashboard"
                    ? 'bg-linear-to-r from-emerald-500 to-emerald-600 text-white shadow-lg'
                    : 'text-gray-400 hover:bg-slate-800 hover:text-white'
                }`}><Home/><span className='font-medium'>Dashboard</span>
            </button>
            {menuItems.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  setActiveMenu(item.name);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                  activeMenu === item.name
                    ? 'bg-linear-to-r from-emerald-500 to-emerald-600 text-white shadow-lg'
                    : 'text-gray-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                {item.icon}
                <Link to={item.name.toLowerCase()} className="font-medium">{item.name}</Link>
              </button>
            ))}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-slate-800">
            <button onClick={handleLogout} className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-slate-800 hover:text-white transition-all">
              <LogOut size={20} />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
          <div className="flex items-center justify-between px-4 lg:px-8 py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Open sidebar"
              >
                <Menu size={24} className="text-slate-900" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
                <p className="text-sm text-gray-600">Welcome back, Admin!</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Search - Hidden on small screens */}
              <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-4 py-2 w-64">
                <Search size={20} className="text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent outline-none w-full text-sm"
                />
              </div>

              {/* Notifications */}
              <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell size={24} className="text-slate-900" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center space-x-3 hover:bg-gray-100 rounded-lg px-3 py-2 transition-colors"
                >
                  <div className="w-10 h-10 bg-linear-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center font-bold text-white">
                    A
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-semibold text-slate-900">{user?.name}</p>
                    <p className="text-xs text-gray-600">{user?.email}</p>
                  </div>
                  <ChevronDown size={16} className="text-gray-600 hidden md:block" />
                </button>

                {/* Dropdown Menu */}
                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50">
                    <button className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left">
                      <User size={18} className="text-gray-600" />
                      <span className="text-sm font-medium text-slate-900">My Profile</span>
                    </button>
                    <button className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left">
                      <Settings size={18} className="text-gray-600" />
                      <span className="text-sm font-medium text-slate-900">Settings</span>
                    </button>
                    <div className="border-t border-gray-200 my-2"></div>
                    <button onClick={handleLogout} className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-red-50 transition-colors text-left">
                      <LogOut size={18} className="text-red-600" />
                      <span className="text-sm font-medium text-red-600">Logout</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Main Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <Outlet/>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;