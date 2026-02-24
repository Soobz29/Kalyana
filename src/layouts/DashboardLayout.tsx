import { Outlet, Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { LogOut, Users, LayoutDashboard } from 'lucide-react';

export default function DashboardLayout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-stone-50">
      <nav className="bg-white border-b border-stone-200 px-4 py-3 flex justify-between items-center">
        <div className="font-serif font-bold text-xl text-stone-800">Kalyana</div>
        <div className="flex items-center gap-4">
          <Link to="/dashboard" className="flex items-center gap-2 text-stone-600 hover:text-stone-900">
            <LayoutDashboard size={18} />
            <span className="hidden sm:inline">Dashboard</span>
          </Link>
          <Link to="/dashboard/guests" className="flex items-center gap-2 text-stone-600 hover:text-stone-900">
            <Users size={18} />
            <span className="hidden sm:inline">Guests</span>
          </Link>
          <button onClick={handleLogout} className="flex items-center gap-2 text-red-600 hover:text-red-800">
            <LogOut size={18} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </nav>
      <main className="p-4 max-w-7xl mx-auto">
        <Outlet />
      </main>
    </div>
  );
}
