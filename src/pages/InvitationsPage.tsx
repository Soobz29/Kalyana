import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, Filter, Eye } from 'lucide-react';

// Culturally accurate mock data with rich image thumbnails
const INVITATION_DESIGNS = [
  {
    id: 1,
    slug: 'jaipur-royal',
    category: 'North Indian',
    title: 'The Jaipur Royal',
    couple: 'Priya & Arjun',
    details: '3-Day Event Suite',
    // High-quality placeholder for a Royal Indian aesthetic
    imageUrl: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 2,
    slug: 'kanjeevaram-gold',
    category: 'South Indian',
    title: 'Kanjeevaram Gold',
    couple: 'Ananya & Karthik',
    details: 'Muhurtham & Reception',
    // Rich yellow/gold South Indian aesthetic
    imageUrl: 'https://images.unsplash.com/photo-1610173827002-62c0f1f05b04?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 3,
    slug: 'kandyan-elegance',
    category: 'Sri Lankan',
    title: 'Kandyan Elegance',
    couple: 'Kavindi & Dilshan',
    details: 'Poruwa Ceremony',
    // Deep maroon/tropical Sri Lankan aesthetic
    imageUrl: 'https://images.unsplash.com/photo-1544078755-9ee2969b820a?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 4,
    slug: 'classic-botanical',
    category: 'Western',
    title: 'Classic Botanical',
    couple: 'Sophia & James',
    details: 'Ceremony & Brunch',
    // Classic Western floral stationery
    imageUrl: 'https://images.unsplash.com/photo-1507504031003-b417219a0fde?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 5,
    slug: 'emerald-kundan',
    category: 'North Indian',
    title: 'Emerald Kundan',
    couple: 'Neha & Rahul',
    details: '4-Day Grand Suite',
    // Deep green / Mehndi aesthetic
    imageUrl: 'https://images.unsplash.com/photo-1532712938736-69c0727092c4?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 6,
    slug: 'turmeric-silk',
    category: 'South Indian',
    title: 'Turmeric & Silk',
    couple: 'Shruti & Vikram',
    details: 'Morning Muhurtham',
    // Bright turmeric/marigold aesthetic
    imageUrl: 'https://images.unsplash.com/photo-1583325988358-13d2a7005934?q=80&w=800&auto=format&fit=crop',
  }
];

const CATEGORIES = ['All', 'North Indian', 'South Indian', 'Sri Lankan', 'Western'];

export default function InvitationsPage() {
  const [activeTab, setActiveTab] = useState('All');
  const navigate = useNavigate();

  const filteredDesigns = activeTab === 'All' 
    ? INVITATION_DESIGNS 
    : INVITATION_DESIGNS.filter(d => d.category === activeTab);

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-stone-900 font-sans">
      
      {/* Navbar */}
      <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="font-playfair text-3xl font-bold tracking-tight text-stone-900">Kalyana</Link>
          <div className="flex items-center gap-6">
            <Link to="/login" className="text-sm font-medium hover:text-stone-600 transition">Log in</Link>
            <Link to="/login" className="bg-stone-900 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-stone-800 transition">Get Started</Link>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="pt-40 pb-12 px-6 text-center max-w-4xl mx-auto">
        <h1 className="font-playfair text-5xl md:text-6xl font-bold mb-6 text-stone-900">
          Find the design that fits <span className="text-amber-700 italic">your tradition.</span>
        </h1>
        <p className="text-lg text-stone-600 mb-6">
          Explore fully animated, multi-day digital invitations with authentic cultural aesthetics. 
        </p>
      </section>

      {/* Filter Tabs */}
      <section className="px-6 max-w-7xl mx-auto mb-12 sticky top-20 z-40 bg-[#FAFAFA]/95 backdrop-blur-md py-4 border-b border-stone-100">
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

      {/* Gallery Grid (Rich Images + Click to Redirect) */}
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
                className="group cursor-pointer flex flex-col"
                onClick={() => navigate(`/invite/${design.slug}`)}
              >
                {/* Real Image Card Preview */}
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-md group-hover:shadow-2xl transition-all duration-500 transform group-hover:-translate-y-2 border-4 border-white bg-stone-100">
                  <img 
                    src={design.imageUrl} 
                    alt={design.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Hover Overlay Button */}
                  <div className="absolute inset-0 bg-stone-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                    <div className="bg-white text-stone-900 px-6 py-3 rounded-full font-medium flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <Eye className="w-4 h-4" /> View Live Demo
                    </div>
                  </div>
                </div>

                {/* Card Meta Details */}
                <div className="mt-5 text-center px-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-amber-700 bg-amber-50 px-3 py-1 rounded-full mb-3 inline-block">
                    {design.category}
                  </span>
                  <h4 className="font-playfair text-xl font-bold text-stone-900 mb-1">{design.title}</h4>
                  <p className="text-sm text-stone-500">{design.details}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

    </div>
  );
}
