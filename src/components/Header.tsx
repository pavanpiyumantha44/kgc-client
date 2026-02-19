import { useState } from 'react';
import { Menu, X,} from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  return (
    <header className="bg-slate-900 text-white shadow-xl sticky top-0 z-50">
        <nav className="container mx-auto px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-linear-to-br rounded-full flex items-center justify-center font-bold text-xl shadow-lg">
                <img src="./logo.png" alt="Logo" />
              </div>
              <span className="text-xl lg:text-2xl font-bold">Kandy Garden Club</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="hover:text-emerald-400 transition-colors font-medium">Home</Link>
              <Link to="/" className="hover:text-emerald-400 transition-colors font-medium">About</Link>
              <Link to="/" className="hover:text-emerald-400 transition-colors font-medium">Facilities</Link>
              <Link to="/" className="hover:text-emerald-400 transition-colors font-medium">Contact</Link>
              <Link to="/login" className="hover:text-emerald-400 transition-colors font-medium">Login</Link>
              <button className="bg-linear-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 px-8 py-3 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl transform hover:scale-105">
                Book Now
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 hover:bg-slate-800 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-6 pb-4 space-y-4 animate-fadeIn">
              <Link to="/" className="block hover:text-emerald-400 transition-colors font-medium py-2">Home</Link>
              <Link to="/" className="block hover:text-emerald-400 transition-colors font-medium py-2">About</Link>
              <Link to="/" className="block hover:text-emerald-400 transition-colors font-medium py-2">Facilities</Link>
              <Link to="/" className="block hover:text-emerald-400 transition-colors font-medium py-2">Contact</Link>
              <Link to="/login" className="block hover:text-emerald-400 transition-colors font-medium py-2">Login</Link>
              <button className="w-full bg-linear-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 px-6 py-3 rounded-full font-semibold transition-all">
                Book Now
              </button>
            </div>
          )}
        </nav>
    </header>
  )
}

export default Header
