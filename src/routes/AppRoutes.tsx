import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '../pages/HomePage'
import Dashboard from '../pages/Dashboard'
import Summary from '../pages/Dashboard/Summary';
import ProtectedRoute from '../app/ProtectedRoute';
import AdminLoginPage from '../pages/Login';
import BookingsPage from '../pages/BookingsPage';
import ServicesPage from '../pages/Dashboard/Services';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<HomePage/>} />
      <Route path="/login" element={<AdminLoginPage/>} />
      <Route path="/bookings" element={<BookingsPage/>} />

      {/* Protected dashboard routes with nested children */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      >
        <Route index element={<Summary />} />
        <Route path="bookings" element={<Summary />} />
        <Route path="services" element={<ServicesPage />} />
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default AppRoutes
