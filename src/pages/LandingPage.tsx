import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, ChevronRight, Globe, Users, ScrollText, Heart, Wine } from 'lucide-react';

// Culturally specific high-quality imagery
const CULTURAL_IMAGES = [
  {
    id: 'western',
    url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1000&auto=format&fit=crop',
    alt: 'Classic Western Elegance',
    label: 'Classic Elegance'
  },
  {
    id: 'north-indian',
    url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1000&auto=format&fit=crop',
    alt: 'North Indian Royal Wedding',
    label: 'North Indian Royal'
  },
  {
    id: 'south-indian',
    url: 'https://images.unsplash.com/photo-1610173827002-62c0f1f05b04?q=80&w=1000&auto=format&fit=crop',
    alt: 'South Indian Kanjeevaram',
    label: 'South Indian Traditional'
  },
  {
    id: 'sri-lankan',
    url: 'https://images.unsplash.com/photo-1544078755-9ee2969b820a?q=80&w=1000&auto=format&fit=crop',
    alt: 'Sri Lankan Tropical/Heritage',
    label: 'Sri Lankan Heritage'
  }
];

export default function LandingPage() {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  // Auto-cycle through the cultural images every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImgIndex((prev) => (prev + 1) % CULTURAL_IMAGES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-stone-900 font-sans overflow-hidden">
      
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <h1 className="font-playfair text-3xl font-bold tracking-tight text-stone-900">Kalyana</h1>
          <div className="flex items-center gap-6">
            <Link to="/login" className="text-sm font-medium text-stone-600 hover:text-stone-900 transition">Log in</Link>
            <Link to="/login" className="bg-stone-900 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-stone-800 transition shadow-lg shadow-stone-900/20">
              Create your website
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 border border-stone-200 text-xs font-medium tracking-wide mb-6 text-stone-600">
              <Sparkles className="w-4 h-4 text-stone-800" />
              <span>The platform built for every tradition</span>
            </div>
            <h2 className="font-playfair text-5xl lg:text-7xl font-semibold leading-[1.1] mb-6 text-stone-900">
              Your love story, <br/>
              <span className="text-stone-500 italic">beautifully digital.</span>
            </h2>
            <p className="text-lg text-stone-600 mb-8 leading-relaxed">
              From the Church Altar to the Poruwa, and the Rehearsal Dinner to the Sangeet. Create a premium wedding website that flawlessly handles multi-day itineraries, household RSVPs, and global traditions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/login" className="flex items-center justify-center gap-2 bg-stone-900 text-white px-8 py-4 rounded-full text-base font-medium hover:bg-stone-800 transition shadow-xl shadow-stone-900/20">
                Start for free <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>

          {/* Hero Visuals (Auto-Fading Cultural Image Carousel) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[500px] lg:h-[600px] hidden md:block"
          >
            {/* Dynamic Image Container */}
            <div className="absolute right-0 top-0 w-4/5 h-4/5 rounded-t-full rounded-b-2xl overflow-hidden shadow-2xl border-4 border-white bg-stone-100 relative">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImgIndex}
                  src={CULTURAL_IMAGES[currentImgIndex].url}
                  alt={CULTURAL_IMAGES[currentImgIndex].alt}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>
              
              {/* Dynamic Theme Label Overlay */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center z-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentImgIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-lg text-xs font-bold tracking-wide text-stone-800 uppercase"
                  >
                    {CULTURAL_IMAGES[currentImgIndex].label}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
            
            {/* Floating UI Card 1: Western Event Weekend */}
            <motion.div 
              animate={{ y: [-10, 10, -10] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="absolute left-0 top-1/4 bg-white p-5 rounded-xl shadow-2xl border border-stone-100 max-w-xs z-20"
            >
              <div className="flex items-center justify-between mb-3 border-b border-stone-100 pb-2">
                <span className="text-xs font-bold tracking-widest text-stone-500 uppercase">Welcome Drinks</span>
                <span className="text-[10px] text-stone-400">Friday, 7 PM</span>
              </div>
              <h4 className="font-playfair text-lg font-bold text-stone-900">Sophia & James</h4>
              <p className="text-xs text-stone-500 mt-1">The Botanical Gardens, NYC</p>
            </motion.div>

            {/* Floating UI Card 2: South Asian RSVP */}
            <motion.div 
              animate={{ y: [10, -10, 10] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 1 }}
              className="absolute right-10 -bottom-10 bg-[#FEFAE0] p-6 rounded-xl shadow-2xl border border-[#E8A020] max-w-xs w-full z-20"
            >
               <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#C0392B]/10 flex items-center justify-center">
                    <Users className="w-5 h-5 text-[#C0392B]" />
                  </div>
                  <div>
                    <h4 className="font-playfair text-md font-bold text-stone-900">The Patel Family</h4>
                    <p className="text-xs text-stone-600">4 Guests • Invited to 3 Events</p>
                  </div>
               </div>
               <button className="w-full bg-[#2D6A4F] text-white text-sm py-2 rounded-md font-medium shadow-md">Submit RSVP</button>
            </motion.div>
          </motion.div>

        </div>
      </section>

      {/* The Global Themes Section (4 Grid) */}
      <section className="bg-white py-24 px-6 border-t border-stone-200 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h3 className="font-playfair text-4xl font-bold mb-4">Aesthetic themes for every culture.</h3>
            <p className="text-stone-600">Whether you are planning a minimalist Western ceremony or a vibrant South Asian celebration, our design tokens adapt to your heritage.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Western Theme Card */}
            <div className="bg-stone-50 rounded-2xl p-6 border border-stone-200 hover:shadow-xl transition relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition">
                <Wine className="w-24 h-24 text-stone-900" />
              </div>
              <h4 className="font-playfair font-bold text-xl text-stone-900 mb-2">Classic Elegance</h4>
              <p className="text-xs text-stone-500 mb-6 min-h-[40px]">Minimalist botanical borders and timeless serif typography.</p>
              <ul className="space-y-2 text-[11px] font-medium text-stone-500">
                <li>✓ Ivory, Sage & Charcoal</li>
                <li>✓ Playfair Display fonts</li>
                <li>✓ Minimalist line-art</li>
              </ul>
            </div>

            {/* Sri Lankan Theme Card */}
            <div className="bg-[#FDF6E3] rounded-2xl p-6 border border-[#C9A84C]/50 hover:shadow-xl transition relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition">
                <Globe className="w-24 h-24 text-[#6B1A1A]" />
              </div>
              <h4 className="font-playfair font-bold text-xl text-[#6B1A1A] mb-2">Sri Lankan Heritage</h4>
              <p className="text-xs text-[#2C1A0E] mb-6 min-h-[40px]">Inspired by Kandyan drumming and brass Pahana lamps.</p>
              <ul className="space-y-2 text-[11px] font-medium text-[#6B1A1A]/80">
                <li>✓ Maroon & Gold foil</li>
                <li>✓ Noto Serif Sinhala</li>
                <li>✓ Linen texture overlays</li>
              </ul>
            </div>

            {/* North Indian Theme Card */}
            <div className="bg-[#F5F0F6] rounded-2xl p-6 border border-[#C2185B]/50 hover:shadow-xl transition relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition">
                <Heart className="w-24 h-24 text-[#1B5E20]" />
              </div>
              <h4 className="font-playfair font-bold text-xl text-[#C2185B] mb-2">North Indian Royal</h4>
              <p className="text-xs text-[#0D1B2A] mb-6 min-h-[40px]">Palatial elegance featuring Kundan jewelry and Mughal arches.</p>
              <ul className="space-y-2 text-[11px] font-medium text-[#1B5E20]/80">
                <li>✓ Magenta & Emerald Green</li>
                <li>✓ Noto Serif Devanagari</li>
                <li>✓ Mehndi vine borders</li>
              </ul>
            </div>

            {/* South Indian Theme Card */}
            <div className="bg-[#FEFAE0] rounded-2xl p-6 border border-[#E8A020]/50 hover:shadow-xl transition relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition">
                <ScrollText className="w-24 h-24 text-[#C0392B]" />
              </div>
              <h4 className="font-playfair font-bold text-xl text-[#C0392B] mb-2">South Indian Tradition</h4>
              <p className="text-xs text-[#2D6A4F] mb-6 min-h-[40px]">Auspicious colors mirroring Kanjeevaram silk and temples.</p>
              <ul className="space-y-2 text-[11px] font-medium text-[#2D6A4F]/80">
                <li>✓ Turmeric & Deep Green</li>
                <li>✓ Noto Serif Tamil</li>
                <li>✓ Banana leaf borders</li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* Feature Section (Household & Itinerary) - Kept same as previous */}
      <section className="bg-stone-900 text-stone-50 py-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h3 className="font-playfair text-4xl font-bold mb-6">Built for complex wedding weekends.</h3>
            <div className="space-y-8 mt-10">
              <div>
                <h5 className="font-bold text-lg text-stone-200 mb-2">Household RSVP Links</h5>
                <p className="text-stone-400">Never send individual links. Group guests into "Households" so one person can confirm attendance and dietary restrictions (Allergies, Vegan, Halal, Jain) for their entire family.</p>
              </div>
              <div>
                <h5 className="font-bold text-lg text-stone-200 mb-2">Event-Specific Gating</h5>
                <p className="text-stone-400">Inviting everyone to the Wedding Ceremony, but only the wedding party to the Rehearsal Dinner? Kalyana dynamically hides events based on exactly who is looking at the card.</p>
              </div>
              <div>
                <h5 className="font-bold text-lg text-stone-200 mb-2">Global Cash Funds & Registries</h5>
                <p className="text-stone-400">Whether it's a Honeymoon Fund, a traditional digital Shagun, or a charity donation, give your guests a beautiful way to contribute.</p>
              </div>
            </div>
          </div>
          
          <div className="bg-stone-800 p-8 rounded-2xl border border-stone-700 shadow-2xl relative">
             <div className="absolute -top-4 -right-4 bg-stone-100 text-stone-900 text-xs font-bold px-4 py-1 rounded-full shadow-lg">Live RSVP CRM</div>
             <div className="space-y-4">
                <div className="bg-stone-900 p-4 rounded-lg flex justify-between items-center border border-stone-700">
                  <div>
                    <p className="font-medium">The Mitchell Family</p>
                    <p className="text-xs text-stone-400">3 Guests • Rehearsal & Wedding</p>
                  </div>
                  <span className="bg-green-900/50 text-green-400 text-xs px-2 py-1 rounded">Confirmed</span>
                </div>
                <div className="bg-stone-900 p-4 rounded-lg flex justify-between items-center border border-stone-700">
                  <div>
                    <p className="font-medium">Ayesha & Tariq</p>
                    <p className="text-xs text-stone-400">2 Guests • Nikkah & Walima</p>
                  </div>
                  <span className="bg-amber-900/50 text-amber-400 text-xs px-2 py-1 rounded">Pending</span>
                </div>
                <div className="bg-stone-900 p-4 rounded-lg flex justify-between items-center border border-stone-700 opacity-50">
                  <div>
                    <p className="font-medium">Uncle Sunil's Family</p>
                    <p className="text-xs text-stone-400">5 Guests • Haldi Only</p>
                  </div>
                  <span className="bg-stone-700 text-stone-300 text-xs px-2 py-1 rounded">Declined</span>
                </div>
             </div>
          </div>
        </div>
      </section>

    </div>
  );
}
