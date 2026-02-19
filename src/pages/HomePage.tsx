import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Twitter, ChevronRight, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

const SportsClubHomepage: React.FC = () => {

  return (
    <div className="min-h-screen bg-white">
      {/* Header Navigation */}
      <Header/>
      {/* Hero Section */}
      <section className="relative min-h-150 lg:h-175 bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yIDItNCA0LTRzNCwyIDQgNHYyYzAgMi0yIDQtNCA0cy00LTItNC00di0yem0wLTMwYzAtMiAyLTQgNC00czQgMiA0IDR2MmMwIDItMiA0LTQgNHMtNC0yLTQtNFY0ek0wIDM0YzAtMiAyLTQgNC00czQgMiA0IDR2MmMwIDItMiA0LTQgNHMtNC0yLTQtNHYtMnptMC0zMGMwLTIgMi00IDQtNHM0IDIgNCA0djJjMCAyLTIgNC00IDRzLTQtMi00LTRWNHoiLz48L2c+PC9nPjwvc3ZnPg==')]"></div>
        </div>
        
        {/* Floating Decorative Elements */}
        <div className="absolute top-20 right-10 w-32 h-32 md:w-48 md:h-48 bg-emerald-500 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-40 h-40 md:w-56 md:h-56 bg-blue-500 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-purple-500 rounded-full opacity-5 blur-2xl"></div>
        
        <div className="container mx-auto px-4 lg:px-8 h-full flex items-center relative z-10 py-20 lg:py-0">
          <div className="max-w-4xl">
            <div className="inline-flex items-center bg-emerald-500/90 backdrop-blur-sm text-white px-5 py-2 rounded-full text-sm font-semibold mb-6 shadow-lg">
              <Award className="mr-2" size={18} />
              Premium Sports Facilities
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-6 leading-tight">
              Elevate Your <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-blue-500">Game</span>
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl text-gray-300 mb-10 italic font-light">
              "Welcome to the Kandy Garden Club Service Booking Portal"
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/bookings" className="bg-linear-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-10 py-5 rounded-full font-semibold text-lg transition-all transform hover:scale-105 flex items-center justify-center shadow-xl hover:shadow-2xl">
                Book Your Court <ChevronRight className="ml-2" size={24} />
              </Link>
              <button className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white border-2 border-white/30 px-10 py-5 rounded-full font-semibold text-lg transition-all transform hover:scale-105">
                View Facilities
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-emerald-600 mb-2">8+</div>
              <div className="text-gray-600 font-medium">Premium Courts</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-emerald-600 mb-2">500+</div>
              <div className="text-gray-600 font-medium">Active Members</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-emerald-600 mb-2">15+</div>
              <div className="text-gray-600 font-medium">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-emerald-600 mb-2">24/7</div>
              <div className="text-gray-600 font-medium">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Opening Hours & Contact Section */}
      <section className="py-20 bg-linear-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Visit Us Today</h2>
            <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">Your premier destination for tennis, table tennis, and snooker</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Opening Hours */}
            <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-10 hover:shadow-2xl transition-all transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-linear-to-br from-emerald-100 to-emerald-200 rounded-2xl flex items-center justify-center mb-6">
                <Clock className="text-emerald-600" size={32} />
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-6">Opening Hours</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                  <span className="font-semibold text-gray-700">Monday - Friday</span>
                  <span className="text-gray-600 font-medium">6:00 AM - 9:00 PM</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                  <span className="font-semibold text-gray-700">Saturday</span>
                  <span className="text-gray-600 font-medium">6:00 AM - 9:00 PM</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                  <span className="font-semibold text-gray-700">Sunday</span>
                  <span className="text-gray-600 font-medium">6:00 AM - 9:00 PM</span>
                </div>
                <div className="mt-6 bg-linear-to-r from-emerald-50 to-blue-50 rounded-xl p-4">
                  <p className="text-sm text-emerald-800 font-semibold">🎉 Early bird discount: 6-9 AM weekdays!</p>
                </div>
              </div>
            </div>

            {/* Contact Details */}
            <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-10 hover:shadow-2xl transition-all transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-linear-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mb-6">
                <Phone className="text-blue-600" size={32} />
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-6">Contact Us</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center shrink-0">
                    <Phone className="text-emerald-600" size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-700 mb-1">Phone</p>
                    <p className="text-gray-600">+94 812222675</p>
                    <p className="text-gray-600">+94 77 123 4567</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center shrink-0">
                    <Mail className="text-emerald-600" size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-700 mb-1">Email</p>
                    <p className="text-gray-600 break-all">info@kandygardenclub.lk</p>
                    <p className="text-gray-600 break-all">bookings@kandygardenclub.lk</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center shrink-0">
                    <MapPin className="text-emerald-600" size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-700 mb-1">Address</p>
                    <p className="text-gray-600">9 Sangaraja Mawatha, Kandy 20000, Sri Lanka</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all transform hover:-translate-y-1">
              <iframe
                title="Kandy Garden Club"
                src="https://maps.google.com/maps?hl=en&q=9 Sangaraja Mawatha, Kandy 20000 (Kandy Garden Club)&z=14&output=embed"
                className="w-full h-120 border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white pt-20 pb-8">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-12">
            {/* About */}
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-linear-to-br rounded-full flex items-center justify-center font-bold text-xl shadow-lg">
                  <img src="./logo.png" alt="Logo" />
                </div>
                <span className="text-xl font-bold">Kandy Garden Club</span>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Premier sports facility offering world-class tennis, table tennis, and snooker courts for athletes of all levels.
              </p>
              <div className="flex space-x-3">
                <Link to="https://web.facebook.com/people/Kandy-Garden-Club/61554364246124/?mibextid=ZbWKwL" className="w-11 h-11 bg-slate-800 hover:bg-linear-to-br hover:from-emerald-500 hover:to-emerald-600 rounded-full flex items-center justify-center transition-all transform hover:scale-110" aria-label="Facebook">
                  <Facebook size={20} />
                </Link>
                <Link to="https://www.instagram.com/explore/locations/113486693816589/the-kandy-garden-club/" className="w-11 h-11 bg-slate-800 hover:bg-linear-to-br hover:from-emerald-500 hover:to-emerald-600 rounded-full flex items-center justify-center transition-all transform hover:scale-110" aria-label="Instagram">
                  <Instagram size={20} />
                </Link>
                <a href="#" className="w-11 h-11 bg-slate-800 hover:bg-linear-to-br hover:from-emerald-500 hover:to-emerald-600 rounded-full flex items-center justify-center transition-all transform hover:scale-110" aria-label="Twitter">
                  <Twitter size={20} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-bold mb-6">Quick Links</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors flex items-center group"><ChevronRight className="mr-1 group-hover:translate-x-1 transition-transform" size={16} />Home</a></li>
                <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors flex items-center group"><ChevronRight className="mr-1 group-hover:translate-x-1 transition-transform" size={16} />About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors flex items-center group"><ChevronRight className="mr-1 group-hover:translate-x-1 transition-transform" size={16} />Facilities</a></li>
                <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors flex items-center group"><ChevronRight className="mr-1 group-hover:translate-x-1 transition-transform" size={16} />Membership</a></li>
                <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors flex items-center group"><ChevronRight className="mr-1 group-hover:translate-x-1 transition-transform" size={16} />Events</a></li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-lg font-bold mb-6">Our Services</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors flex items-center group"><ChevronRight className="mr-1 group-hover:translate-x-1 transition-transform" size={16} />Tennis Courts</a></li>
                <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors flex items-center group"><ChevronRight className="mr-1 group-hover:translate-x-1 transition-transform" size={16} />Table Tennis</a></li>
                <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors flex items-center group"><ChevronRight className="mr-1 group-hover:translate-x-1 transition-transform" size={16} />Snooker Tables</a></li>
                <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors flex items-center group"><ChevronRight className="mr-1 group-hover:translate-x-1 transition-transform" size={16} />Coaching</a></li>
                <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors flex items-center group"><ChevronRight className="mr-1 group-hover:translate-x-1 transition-transform" size={16} />Pro Shop</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-bold mb-6">Contact Info</h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="text-emerald-500 shrink-0 mt-1" size={18} />
                  <p className="text-gray-400 text-sm leading-relaxed">9 Sangaraja Mawatha, Kandy 20000, Sri Lanka</p>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="text-emerald-500 shrink-0" size={18} />
                  <p className="text-gray-400 text-sm">+94 812 222 675</p>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="text-emerald-500 shrink-0" size={18} />
                  <p className="text-gray-400 text-sm break-all">info@kandygardenclub.lk</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-slate-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-gray-400 text-sm text-center md:text-left">
                © 2026 Kandy Garden Club. All rights reserved.
              </p>
              <div className="flex flex-wrap justify-center gap-6 text-sm">
                <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">Privacy Policy</a>
                <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">Terms of Service</a>
                <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SportsClubHomepage;