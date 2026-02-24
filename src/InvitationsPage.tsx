import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, Filter } from 'lucide-react';

// Culturally accurate mock data for the invitations gallery
const INVITATION_DESIGNS = [
  {
    id: 1,
    category: 'North Indian',
    title: 'The Jaipur Royal',
    couple: 'Priya & Arjun',
    details: '3-Day Event Suite • Haldi, Sangeet, Wedding',
    colors: { bg: 'bg-[#C2185B]', text: 'text-[#FFD700]', border: 'border-[#FFD700]/50', cardBg: 'bg-[#C2185B]' },
    font: 'font-playfair',
    motif: 'Mehndi Vine & Arch'
  },
  {
    id: 2,
    category: 'South Indian',
    title: 'Kanjeevaram Gold',
    couple: 'Ananya & Karthik',
    details: '2-Day Event Suite • Muhurtham & Reception',
    colors: { bg: 'bg-[#FEFAE0]', text: 'text-[#C0392B]', border: 'border-[#E8A020]', cardBg: 'bg-[#FEFAE0]' },
    font: 'font-playfair',
    motif: 'Banana Leaf & Temple Bells'
  },
  {
    id: 3,
    category: 'Sri Lankan',
    title: 'Kandyan Elegance',
    couple: 'Kavindi & Dilshan',
    details: 'Poruwa Ceremony & Homecoming',
    colors: { bg: 'bg-[#FDF6E3]', text: 'text-[#6B1A1A]', border: 'border-[#C9A84C]', cardBg: 'bg-[#FDF6E3]' },
    font: 'font-serif',
    motif: 'Pahana Lamp & Lotus'
  },
  {
    id: 4,
    category: 'Western',
    title: 'Classic Botanical',
    couple: 'Sophia & James',
    details: 'Ceremony & Farewell Brunch',
    colors: { bg: 'bg-stone-50', text: 'text-stone-900', border: 'border-stone-300', cardBg: 'bg-white' },
    font: 'font-playfair',
    motif: 'Minimalist Line Art'
  },
  {
    id: 5,
    category: 'North Indian',
    title: 'Emerald Kundan',
    couple: 'Neha & Rahul',
    details: '4-Day Grand Celebration Suite',
    colors: { bg: 'bg-[#1B5E20]', text: 'text-[#FFD700]', border: 'border-[#FFD700]/40', cardBg: 'bg-[#1B5E20]' },
    font: 'font-playfair',
    motif: 'Royal Green & Gold Foil'
  },
  {
    id: 6,
    category: 'South Indian',
    title: 'Turmeric & Silk',
    couple: 'Shruti & Vikram',
    details: 'Traditional Morning Muhurtham',
    colors: { bg: 'bg-[#E8A020]', text: 'text-[#2D6A4F]', border: 'border-[#2D6A4F]/30', cardBg: 'bg-[#E8A020]' },
    font: 'font-serif',
    motif: 'Jasmine String Borders'
  }
];

const CATEGORIES = ['All', 'North Indian', 'South Indian', 'Sri Lankan', 'Western'];

export default function InvitationsPage() {
  const [activeTab, setActiveTab] = useState('All');

  const filteredDesigns = activeTab === 'All' 
    ? INVITATION_DESIGNS 
    : INVITATION_DESIGNS.filter(d => d.category === activeTab);

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-stone-900 font-sans">
      
      {/* Simple Nav */}
      <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="font-playfair text-3xl font-bold tracking-tight text-stone-900">Kalyana</Link>
          <div className="flex items-center gap-6">
            <Link to="/login" className="text-sm font-medium hover:text-stone-600 transition">Log in</Link>
          </div>
        </div>
      </nav>

      {/* Header Section */}
      <section className="pt-40 pb-16 px-6 text-center max-w-4xl mx-auto">
        <h1 className="font-playfair text-5xl md:text-6xl font-bold mb-6 text-stone-900">
          Invitations that reflect <span className="text-amber-700 italic">your heritage.</span>
        </h1>
        <p className="text-lg text-stone-600 mb-10">
          Explore our collection of animated, multi-day digital invitations. Carefully crafted with authentic typography, cultural motifs, and rich textiles.
        </p>
      </section>

      {/* Filter Tabs */}
      <section className="px-6 max-w-7xl mx-auto mb-12 sticky top-24 z-40 bg-[#FAFAFA]/90 backdrop-blur-sm py-4">
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Filter className="w-5 h-5 text-stone-400 mr-2 hidden sm:block" />
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 shadow-sm ${
                activeTab === category 
                  ? 'bg-stone-900 text-white shadow-stone-900/20 scale-105' 
                  : 'bg-white text-stone-600 border border-stone-200 hover:border-stone-400 hover:bg-stone-50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="px-6 max-w-7xl mx-auto pb-32">
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          <AnimatePresence>
            {filteredDesigns.map((design) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                key={design.id}
                className="group cursor-pointer"
              >
                {/* The Invitation Card Mockup */}
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-500 transform group-hover:-translate-y-2 border border-stone-200 p-6 flex items-center justify-center bg-stone-200">
                  
                  {/* Digital Paper Texture Background */}
                  <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>

                  {/* Inner Card */}
                  <div className={`relative w-full h-full ${design.colors.cardBg} border-2 ${design.colors.border} p-6 flex flex-col items-center justify-center text-center shadow-inner rounded-sm`}>
                    <p className={`text-[10px] uppercase tracking-[0.2em] mb-4 ${design.colors.text} opacity-80`}>You are invited</p>
                    <h3 className={`${design.font} text-3xl font-bold mb-2 ${design.colors.text}`}>{design.couple}</h3>
                    <div className={`w-12 h-[1px] my-4 ${design.colors.bg} ${design.colors.border} border-t-2`}></div>
                    <p className={`text-xs ${design.colors.text} opacity-90 uppercase tracking-widest`}>{design.motif}</p>
                    
                    {/* Simulated Stacked Inserts (Shows on hover) */}
                    <div className={`absolute -right-3 -bottom-3 w-24 h-32 ${design.colors.bg} border ${design.colors.border} shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 rotate-12 origin-bottom-left z-[-1]`}></div>
                    <div className={`absolute -left-3 -bottom-4 w-24 h-32 ${design.colors.bg} border ${design.colors.border} shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 -rotate-6 origin-bottom-right z-[-2]`}></div>
                  </div>
                </div>

                {/* Card Details */}
                <div className="mt-6 text-center">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-amber-700 bg-amber-50 px-2 py-1 rounded-full mb-2 inline-block">
                    {design.category}
                  </span>
                  <h4 className="font-playfair text-xl font-bold text-stone-900">{design.title}</h4>
                  <p className="text-sm text-stone-500 mt-1">{design.details}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Call to Action */}
      <section className="bg-stone-900 py-24 px-6 text-center text-white">
        <h2 className="font-playfair text-4xl font-bold mb-6">Found your perfect match?</h2>
        <p className="text-stone-400 max-w-2xl mx-auto mb-10">
          Every invitation includes a beautifully animated virtual envelope, event-specific household RSVPs, and a matching full-page digital itinerary.
        </p>
        <Link to="/login" className="inline-flex items-center justify-center gap-2 bg-white text-stone-900 px-8 py-4 rounded-full text-base font-bold hover:bg-stone-200 transition shadow-xl">
          Customize Your Design <ChevronRight className="w-5 h-5" />
        </Link>
      </section>

    </div>
  );
}
