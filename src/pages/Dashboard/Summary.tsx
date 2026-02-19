import React, { useState, useMemo } from 'react';
import { Calendar, Users, DollarSign, MoreVertical,
  TrendingUp, TrendingDown, Activity, Clock, MapPin,
  CheckCircle, XCircle, AlertCircle, ChevronLeft, ChevronRight, ArrowUpDown
} from 'lucide-react';

interface Booking {
      id: string;
      customerName: string;
      court: string;
      date: string;
      time: string;
      status: 'Confirmed' | 'Pending' | 'Cancelled';
      amount: string;
    }
    
interface Stat {
      title: string;
      value: string;
      change: string;
      isPositive: boolean;
      icon: React.ReactNode;
    }
    
type SortField = keyof Booking | null;
type SortDirection = 'asc' | 'desc' | null;

const Summary = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortField, setSortField] = useState<SortField>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const itemsPerPage = 5;

  const stats: Stat[] = [
    {
      title: 'Total Bookings',
      value: '1,234',
      change: '+12.5%',
      isPositive: true,
      icon: <Calendar className="text-emerald-600" size={24} />
    },
    {
      title: 'Active Members',
      value: '543',
      change: '+8.2%',
      isPositive: true,
      icon: <Users className="text-blue-600" size={24} />
    },
    {
      title: 'Revenue',
      value: 'LKR 2.5M',
      change: '+15.3%',
      isPositive: true,
      icon: <DollarSign className="text-purple-600" size={24} />
    },
    {
      title: 'Court Utilization',
      value: '78%',
      change: '-3.1%',
      isPositive: false,
      icon: <Activity className="text-orange-600" size={24} />
    }
  ];

  const allBookings: Booking[] = useMemo(
    () => [
      { id: 'BK001', customerName: 'John Doe', court: 'Tennis Court 1', date: '2025-02-01', time: '10:00 AM', status: 'Confirmed', amount: 'LKR 2,500' },
      { id: 'BK002', customerName: 'Jane Smith', court: 'Table Tennis 2', date: '2025-02-01', time: '2:00 PM', status: 'Pending', amount: 'LKR 1,500' },
      { id: 'BK003', customerName: 'Mike Johnson', court: 'Snooker Table 1', date: '2025-02-02', time: '6:00 PM', status: 'Confirmed', amount: 'LKR 3,000' },
      { id: 'BK004', customerName: 'Sarah Williams', court: 'Tennis Court 2', date: '2025-02-02', time: '4:00 PM', status: 'Cancelled', amount: 'LKR 2,500' },
      { id: 'BK005', customerName: 'David Brown', court: 'Table Tennis 1', date: '2025-02-03', time: '11:00 AM', status: 'Confirmed', amount: 'LKR 1,500' },
      { id: 'BK006', customerName: 'Emily Davis', court: 'Tennis Court 3', date: '2025-02-03', time: '3:00 PM', status: 'Confirmed', amount: 'LKR 2,500' },
      { id: 'BK007', customerName: 'Chris Wilson', court: 'Snooker Table 2', date: '2025-02-04', time: '5:00 PM', status: 'Pending', amount: 'LKR 3,000' },
      { id: 'BK008', customerName: 'Laura Martinez', court: 'Table Tennis 3', date: '2025-02-04', time: '1:00 PM', status: 'Confirmed', amount: 'LKR 1,500' },
      { id: 'BK009', customerName: 'Robert Taylor', court: 'Tennis Court 1', date: '2025-02-05', time: '9:00 AM', status: 'Cancelled', amount: 'LKR 2,500' },
      { id: 'BK010', customerName: 'Patricia Anderson', court: 'Table Tennis 2', date: '2025-02-05', time: '12:00 PM', status: 'Confirmed', amount: 'LKR 1,500' },
    ],
    []
  );

const sortedBookings = useMemo(() => {
      if (!sortField || !sortDirection) return allBookings;
  
      return [...allBookings].sort((a, b) => {
        const aValue = a[sortField];
        const bValue = b[sortField];
  
        if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
}, [allBookings, sortField, sortDirection]);
  
const totalPages = Math.ceil(sortedBookings.length / itemsPerPage);
const startIndex = (currentPage - 1) * itemsPerPage;
const endIndex = startIndex + itemsPerPage;
const currentBookings = sortedBookings.slice(startIndex, endIndex);
  
const handlePageChange = (page: number) => {
      setCurrentPage(page);
};

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'Confirmed':
        return 'bg-emerald-100 text-emerald-700';
      case 'Pending':
        return 'bg-orange-100 text-orange-700';
      case 'Cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string): React.ReactNode => {
    switch (status) {
      case 'Confirmed':
        return <CheckCircle size={16} />;
      case 'Pending':
        return <AlertCircle size={16} />;
      case 'Cancelled':
        return <XCircle size={16} />;
      default:
        return null;
    }
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else if (sortDirection === 'desc') {
        setSortField(null);
        setSortDirection(null);
      }
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  return (
    <>
      {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all transform hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                    {stat.icon}
                  </div>
                  <div className={`flex items-center space-x-1 text-sm font-semibold ${stat.isPositive ? 'text-emerald-600' : 'text-red-600'}`}>
                    {stat.isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                    <span>{stat.change}</span>
                  </div>
                </div>
                <h3 className="text-gray-600 text-sm font-medium mb-1">{stat.title}</h3>
                <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Recent Bookings Table */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                <h2 className="text-xl font-bold text-slate-900">Recent Bookings</h2>
                <button className="bg-linear-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-6 py-2 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl transform hover:scale-105 text-sm">
                  View All
                </button>
              </div>
            </div>

            {/* Table - Desktop */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th 
                      className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => handleSort('id')}
                    >
                      <div className="flex items-center space-x-1">
                        <span>Booking ID</span>
                        <ArrowUpDown size={14} />
                      </div>
                    </th>
                    <th 
                      className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => handleSort('customerName')}
                    >
                      <div className="flex items-center space-x-1">
                        <span>Customer</span>
                        <ArrowUpDown size={14} />
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Court</th>
                    <th 
                      className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => handleSort('date')}
                    >
                      <div className="flex items-center space-x-1">
                        <span>Date & Time</span>
                        <ArrowUpDown size={14} />
                      </div>
                    </th>
                    <th 
                      className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => handleSort('status')}
                    >
                      <div className="flex items-center space-x-1">
                        <span>Status</span>
                        <ArrowUpDown size={14} />
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {currentBookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-semibold text-slate-900">{booking.id}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-linear-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                            {booking.customerName.charAt(0)}
                          </div>
                          <span className="text-sm font-medium text-slate-900">{booking.customerName}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <MapPin size={16} className="text-gray-400" />
                          <span className="text-sm text-gray-600">{booking.court}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <Clock size={16} className="text-gray-400" />
                          <div>
                            <p className="text-sm text-gray-900">{booking.date}</p>
                            <p className="text-xs text-gray-500">{booking.time}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(booking.status)}`}>
                          {getStatusIcon(booking.status)}
                          <span>{booking.status}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-semibold text-slate-900">{booking.amount}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                          <MoreVertical size={18} className="text-gray-600" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Cards - Mobile */}
            <div className="md:hidden divide-y divide-gray-200">
              {currentBookings.map((booking) => (
                <div key={booking.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-sm font-semibold text-slate-900 mb-1">{booking.id}</p>
                      <p className="text-sm text-gray-600">{booking.customerName}</p>
                    </div>
                    <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(booking.status)}`}>
                      {getStatusIcon(booking.status)}
                      <span>{booking.status}</span>
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <MapPin size={14} className="text-gray-400" />
                      <span>{booking.court}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Clock size={14} className="text-gray-400" />
                      <span>{booking.date} at {booking.time}</span>
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-sm font-semibold text-slate-900">{booking.amount}</span>
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <MoreVertical size={16} className="text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
              <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
                <div className="text-sm text-gray-600">
                  Showing {startIndex + 1} to {Math.min(endIndex, sortedBookings.length)} of {sortedBookings.length} entries
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-1"
                  >
                    <ChevronLeft size={16} />
                    <span>Previous</span>
                  </button>
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`w-10 h-10 rounded-lg text-sm font-medium transition-all ${
                          currentPage === page
                            ? 'bg-linear-to-r from-emerald-500 to-emerald-600 text-white shadow-lg'
                            : 'text-gray-700 hover:bg-gray-100 border border-gray-300'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-1"
                  >
                    <span>Next</span>
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
    </>
  )
}

export default Summary
