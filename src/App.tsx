import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import InvitePage from './pages/InvitePage';
import DashboardLayout from './layouts/DashboardLayout';
import DashboardPage from './pages/dashboard/DashboardPage';
import GuestsPage from './pages/dashboard/GuestsPage';
import RsvpPage from './pages/RsvpPage';
import LoginPage from './pages/auth/LoginPage';
import AuthCallback from './pages/auth/AuthCallback';
import ProtectedRoute from './components/auth/ProtectedRoute';
import LandingPage from './pages/LandingPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        
        {/* Public Invite Route */}
        <Route path="/invite/:slug" element={<InvitePage />} />
        
        {/* Public RSVP Route */}
        <Route path="/rsvp/:token" element={<RsvpPage />} />

        {/* Protected Dashboard Routes */}
        <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
          <Route index element={<DashboardPage />} />
          <Route path="guests" element={<GuestsPage />} />
        </Route>
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster position="top-center" />
    </BrowserRouter>
  );
}
