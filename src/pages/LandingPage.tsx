import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center p-4">
      <h1 className="font-serif text-4xl md:text-6xl text-stone-900 mb-4 text-center">Kalyana</h1>
      <p className="font-serif text-xl text-stone-600 mb-8 text-center max-w-lg">
        The comprehensive South Asian & Sri Lankan Wedding Platform.
      </p>
      <div className="flex gap-4">
        <Link to="/login" className="px-6 py-3 bg-stone-900 text-white rounded-full hover:bg-stone-800 transition-colors">
          Get Started
        </Link>
        <Link to="/invite/demo-wedding" className="px-6 py-3 border border-stone-300 rounded-full hover:bg-stone-100 transition-colors">
          View Demo Invite
        </Link>
      </div>
    </div>
  );
}
