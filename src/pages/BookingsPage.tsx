import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus,
  Clock, MapPin, User, Mail, Phone, XCircle, CheckCircle
} from 'lucide-react';
import Header from '../components/Header';

interface Booking {
  id: string;
  date: string;
  customerName: string;
  email: string;
  phone: string;
  court: string;
  time: string;
  duration: string;
}

const BookingsPage: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: 'BK001',
      date: '2025-02-05',
      customerName: 'John Doe',
      email: 'john@example.com',
      phone: '+94 77 123 4567',
      court: 'Tennis Court 1',
      time: '10:00 AM',
      duration: '2'
    },
    {
      id: 'BK002',
      date: '2025-02-08',
      customerName: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+94 77 987 6543',
      court: 'Table Tennis 2',
      time: '2:00 PM',
      duration: '1'
    },
    {
      id: 'BK003',
      date: '2025-02-08',
      customerName: 'Mike Johnson',
      email: 'mike@example.com',
      phone: '+94 77 555 1234',
      court: 'Snooker Table 1',
      time: '6:00 PM',
      duration: '3'
    },
    {
      id: 'BK004',
      date: '2025-02-08',
      customerName: 'Sarah Wilson',
      email: 'sarah@example.com',
      phone: '+94 77 444 5555',
      court: 'Tennis Court 2',
      time: '4:00 PM',
      duration: '2'
    }
  ]);

  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    phone: '',
    court: '',
    time: '',
    duration: '1'
  });

  const courts = [
    'Tennis Court 1',
    'Tennis Court 2',
    'Tennis Court 3',
    'Table Tennis 1',
    'Table Tennis 2',
    'Table Tennis 3',
    'Snooker Table 1',
    'Snooker Table 2'
  ];

  const timeSlots = [
    '6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
    '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM',
    '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM'
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  const getBookingsForDate = (date: number): Booking[] => {
    const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
    return bookings.filter(booking => booking.date === dateStr);
  };

  const hasBookings = (date: number): boolean => {
    return getBookingsForDate(date).length > 0;
  };

  const getBookingCount = (date: number): number => {
    return getBookingsForDate(date).length;
  };

  const isPastDate = (date: number): boolean => {
    const checkDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return checkDate < today;
  };

  const isToday = (date: number): boolean => {
    const today = new Date();
    return date === today.getDate() && 
           currentMonth.getMonth() === today.getMonth() && 
           currentMonth.getFullYear() === today.getFullYear();
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const handleDateClick = (date: number) => {
    if (isPastDate(date)) return;
    
    const selected = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), date);
    setSelectedDate(selected);
    setShowModal(true);
  };

  const handleAddBookingClick = () => {
    // Set selected date to today by default
    setSelectedDate(new Date());
    setShowModal(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!selectedDate || !formData.customerName || !formData.email || !formData.phone || !formData.court || !formData.time) {
      alert('Please fill in all required fields');
      return;
    }

    const dateStr = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;
    
    const newBooking: Booking = {
      id: `BK${String(bookings.length + 1).padStart(3, '0')}`,
      date: dateStr,
      customerName: formData.customerName,
      email: formData.email,
      phone: formData.phone,
      court: formData.court,
      time: formData.time,
      duration: formData.duration
    };

    setBookings([...bookings, newBooking]);
    setShowModal(false);
    setFormData({
      customerName: '',
      email: '',
      phone: '',
      court: '',
      time: '',
      duration: '1'
    });
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentMonth);
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Navigation */}
      <Header/>

      {/* Page Content */}
      <div className="container mx-auto px-4 lg:px-8 py-12">
        {/* Page Title & Add Booking Button */}
        <div className="mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-3">Book a Court</h1>
            <p className="text-gray-600 text-lg">Select a date or click below to make your booking</p>
          </div>
          <button
            onClick={handleAddBookingClick}
            className="bg-linear-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-8 py-4 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center space-x-2"
          >
            <Plus size={24} />
            <span>Add Booking</span>
          </button>
        </div>

        {/* Calendar */}
        <div className="bg-white rounded-3xl shadow-xl p-6 md:p-10 max-w-5xl mx-auto">
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={handlePrevMonth}
              className="p-3 hover:bg-gray-100 rounded-xl transition-colors"
              aria-label="Previous month"
            >
              <ChevronLeft className="text-slate-900" size={24} />
            </button>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </h2>
            <button
              onClick={handleNextMonth}
              className="p-3 hover:bg-gray-100 rounded-xl transition-colors"
              aria-label="Next month"
            >
              <ChevronRight className="text-slate-900" size={24} />
            </button>
          </div>

          {/* Day Names */}
          <div className="grid grid-cols-7 gap-2 md:gap-4 mb-4">
            {dayNames.map(day => (
              <div key={day} className="text-center text-sm md:text-base font-semibold text-gray-600 py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-2 md:gap-4">
            {[...Array(startingDayOfWeek)].map((_, index) => (
              <div key={`empty-${index}`} className="aspect-square"></div>
            ))}
            {[...Array(daysInMonth)].map((_, index) => {
              const date = index + 1;
              const hasBooking = hasBookings(date);
              const bookingCount = getBookingCount(date);
              const past = isPastDate(date);
              const today = isToday(date);

              return (
                <button
                  key={date}
                  onClick={() => handleDateClick(date)}
                  disabled={past}
                  className={`aspect-square rounded-xl flex flex-col items-center justify-center text-sm md:text-base font-medium transition-all relative ${
                    past
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : today
                      ? 'bg-blue-100 text-blue-700 hover:bg-blue-200 ring-2 ring-blue-500'
                      : hasBooking
                      ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                      : 'hover:bg-gray-100 text-gray-700 hover:ring-2 hover:ring-gray-300'
                  }`}
                >
                  <span className="text-lg md:text-xl font-bold">{date}</span>
                  {hasBooking && !past && (
                    <div className="absolute bottom-1 flex items-center space-x-1">
                      <span className="text-xs font-semibold text-emerald-600 bg-emerald-200 px-2 py-0.5 rounded-full">
                        {bookingCount}
                      </span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="mt-8 flex flex-wrap gap-4 md:gap-6 justify-center text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-blue-100 rounded-lg ring-2 ring-blue-500"></div>
              <span className="text-gray-600 font-medium">Today</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-emerald-100 rounded-lg"></div>
              <span className="text-gray-600 font-medium">Has Bookings</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gray-100 rounded-lg"></div>
              <span className="text-gray-600 font-medium">Past Date</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-semibold text-emerald-600 bg-emerald-200 px-2 py-1 rounded-full">3</span>
              <span className="text-gray-600 font-medium">Booking Count</span>
            </div>
          </div>
        </div>

        {/* Existing Bookings List */}
        <div className="max-w-5xl mx-auto mt-10">
          <h3 className="text-2xl font-bold text-slate-900 mb-6">Upcoming Bookings</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {bookings
              .filter(booking => new Date(booking.date) >= new Date(new Date().setHours(0, 0, 0, 0)))
              .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
              .map(booking => (
                <div key={booking.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-semibold text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full">
                      {booking.id}
                    </span>
                    <span className="text-sm text-gray-600">{booking.date}</span>
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2">{booking.customerName}</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <MapPin size={16} className="text-gray-400" />
                      <span>{booking.court}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock size={16} className="text-gray-400" />
                      <span>{booking.time} ({booking.duration}h)</span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showModal && selectedDate && (
        <div className="fixed inset-0 bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 md:p-8">
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-slate-900">Create Booking</h3>
                  <p className="text-gray-600 mt-1">
                    {monthNames[selectedDate.getMonth()]} {selectedDate.getDate()}, {selectedDate.getFullYear()}
                  </p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <XCircle className="text-gray-600" size={28} />
                </button>
              </div>

              {/* Existing Bookings for Selected Date */}
              {getBookingsForDate(selectedDate.getDate()).length > 0 && (
                <div className="mb-6 p-4 bg-orange-50 border border-orange-200 rounded-xl">
                  <p className="text-sm font-semibold text-orange-800 mb-2">
                    Existing bookings on this date ({getBookingsForDate(selectedDate.getDate()).length}):
                  </p>
                  <div className="space-y-2">
                    {getBookingsForDate(selectedDate.getDate()).map(booking => (
                      <div key={booking.id} className="text-sm text-orange-700">
                        {booking.court} - {booking.time} ({booking.customerName})
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Booking Form */}
              <div className="space-y-5">
                {/* Customer Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <User className="inline mr-2" size={16} />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Mail className="inline mr-2" size={16} />
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    placeholder="your@email.com"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Phone className="inline mr-2" size={16} />
                    Phone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    placeholder="+94 77 123 4567"
                  />
                </div>

                {/* Court Selection */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <MapPin className="inline mr-2" size={16} />
                    Select Court *
                  </label>
                  <select
                    name="court"
                    value={formData.court}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  >
                    <option value="">Choose a court</option>
                    {courts.map(court => (
                      <option key={court} value={court}>{court}</option>
                    ))}
                  </select>
                </div>

                {/* Time and Duration */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <Clock className="inline mr-2" size={16} />
                      Time *
                    </label>
                    <select
                      name="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    >
                      <option value="">Select time</option>
                      {timeSlots.map(slot => (
                        <option key={slot} value={slot}>{slot}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Duration (hours) *
                    </label>
                    <select
                      name="duration"
                      value={formData.duration}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    >
                      <option value="1">1 hour</option>
                      <option value="1.5">1.5 hours</option>
                      <option value="2">2 hours</option>
                      <option value="3">3 hours</option>
                    </select>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <button
                    onClick={() => setShowModal(false)}
                    className="flex-1 px-6 py-4 border-2 border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="flex-1 bg-linear-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-6 py-4 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center space-x-2"
                  >
                    <CheckCircle size={20} />
                    <span>Confirm Booking</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">© 2025 SportClub Elite. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default BookingsPage;