import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, ChevronRight, Globe, Users, ScrollText, Heart } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-stone-900 font-sans overflow-hidden">
      
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <h1 className="font-playfair text-3xl font-bold tracking-tight text-amber-800">Kalyana</h1>
          <div className="flex items-center gap-6">
            <Link to="/login" className="text-sm font-medium text-stone-600 hover:text-stone-900 transition">Log in</Link>
            <Link to="/login" className="bg-amber-800 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-amber-900 transition shadow-lg shadow-amber-900/20">
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-medium tracking-wide mb-6 text-amber-800">
              <Sparkles className="w-4 h-4" />
              <span>Built for Sri Lankan & Indian Weddings</span>
            </div>
            <h2 className="font-playfair text-5xl lg:text-7xl font-semibold leading-[1.1] mb-6 text-stone-900">
              Your heritage, <br/>
              <span className="text-amber-800 italic">beautifully digital.</span>
            </h2>
            <p className="text-lg text-stone-600 mb-8 leading-relaxed">
              From the Poruwa to the Muhurtham, and the Haldi to the Sangeet. Create a premium wedding website that handles massive guest lists, household RSVPs, and multi-day cultural itineraries.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/login" className="flex items-center justify-center gap-2 bg-amber-800 text-white px-8 py-4 rounded-full text-base font-medium hover:bg-amber-900 transition shadow-xl shadow-amber-900/20">
                Start for free <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>

          {/* Hero Visuals (Overlapping Cultural Cards) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[500px] lg:h-[600px] hidden md:block"
          >
            {/* Main Background Image - Elegant Mandap/Decor */}
            <div className="absolute right-0 top-0 w-4/5 h-4/5 rounded-t-full rounded-b-2xl overflow-hidden shadow-2xl border-4 border-white">
              <img 
                src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1000&auto=format&fit=crop" 
                alt="Traditional Wedding Decor" 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Floating UI Card 1: Sri Lankan Event */}
            <motion.div 
              animate={{ y: [-10, 10, -10] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="absolute left-0 top-1/4 bg-[#FDF6E3] p-5 rounded-xl shadow-2xl border border-[#C9A84C] max-w-xs"
            >
              <div className="flex items-center justify-between mb-3 border-b border-[#C9A84C]/30 pb-2">
                <span className="text-xs font-bold tracking-widest text-[#6B1A1A] uppercase">Poruwa Ceremony</span>
                <span className="text-[10px] text-[#6B1A1A]">Day 1</span>
              </div>
              <h4 className="font-playfair text-lg font-bold text-[#2C1A0E]">Kavindi & Dilshan</h4>
              <p className="text-xs text-[#2C1A0E]/70 mt-1">Galle Face Hotel, Colombo</p>
            </motion.div>

            {/* Floating UI Card 2: Indian Household RSVP */}
            <motion.div 
              animate={{ y: [10, -10, 10] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="absolute right-10 -bottom-10 bg-[#FEFAE0] p-6 rounded-xl shadow-2xl border border-[#E8A020] max-w-xs w-full"
            >
               <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#C0392B]/10 flex items-center justify-center">
                    <Users className="w-5 h-5 text-[#C0392B]" />
                  </div>
                  <div>
                    <h4 className="font-playfair text-md font-bold text-stone-900">The Sharma Family</h4>
                    <p className="text-xs text-stone-600">5 Guests • Invited to 3 Events</p>
                  </div>
               </div>
               <button className="w-full bg-[#2D6A4F] text-white text-sm py-2 rounded-md font-medium shadow-md">Submit RSVP</button>
            </motion.div>
          </motion.div>

        </div>
      </section>

      {/* The "Three Pillars" Themes Section */}
      <section className="bg-white py-24 px-6 border-t border-stone-200 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h3 className="font-playfair text-4xl font-bold mb-4">Authentic Cultural Themes</h3>
            <p className="text-stone-600">We don't do generic templates. Kalyana features hand-crafted design tokens inspired by actual regional aesthetics, textiles, and scripts.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Sri Lankan Theme Card */}
            <div className="bg-[#FDF6E3] rounded-2xl p-8 border border-[#C9A84C]/50 hover:shadow-xl transition relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition">
                {/* Abstract Pahana shape */}
                <Globe className="w-24 h-24 text-[#6B1A1A]" />
              </div>
              <h4 className="font-playfair font-bold text-2xl text-[#6B1A1A] mb-2">Sri Lankan Heritage</h4>
              <p className="text-sm text-[#2C1A0E] mb-6">Inspired by Kandyan drumming patterns and brass Pahana lamps.</p>
              <ul className="space-y-2 text-xs font-medium text-[#6B1A1A]/80">
                <li>✓ Maroon & Gold foil palettes</li>
                <li>✓ Noto Serif Sinhala web fonts</li>
                <li>✓ Linen & raw-silk texture overlays</li>
              </ul>
            </div>

            {/* South Indian Theme Card */}
            <div className="bg-[#FEFAE0] rounded-2xl p-8 border border-[#E8A020]/50 hover:shadow-xl transition relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition">
                <ScrollText className="w-24 h-24 text-[#C0392B]" />
              </div>
              <h4 className="font-playfair font-bold text-2xl text-[#C0392B] mb-2">South Indian Traditional</h4>
              <p className="text-sm text-[#2D6A4F] mb-6">Rich, auspicious colors mirroring Kanjeevaram silk and temple architecture.</p>
              <ul className="space-y-2 text-xs font-medium text-[#2D6A4F]/80">
                <li>✓ Turmeric Yellow & deep Green palettes</li>
                <li>✓ Noto Serif Tamil typography</li>
                <li>✓ Banana leaf & Jasmine string borders</li>
              </ul>
            </div>

            {/* North Indian Theme Card */}
            <div className="bg-[#F5F0F6] rounded-2xl p-8 border border-[#C2185B]/50 hover:shadow-xl transition relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition">
                <Heart className="w-24 h-24 text-[#1B5E20]" />
              </div>
              <h4 className="font-playfair font-bold text-2xl text-[#C2185B] mb-2">North Indian Royal</h4>
              <p className="text-sm text-[#0D1B2A] mb-6">Palatial elegance featuring Kundan jewelry motifs and Mughal archways.</p>
              <ul className="space-y-2 text-xs font-medium text-[#1B5E20]/80">
                <li>✓ Deep Magenta & Emerald Green palettes</li>
                <li>✓ Noto Serif Devanagari web fonts</li>
                <li>✓ Intricate Mehndi vine SVG dividers</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section (Household & Itinerary) */}
      <section className="bg-stone-900 text-stone-50 py-24 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h3 className="font-playfair text-4xl font-bold mb-6">Built for massive families and multi-day celebrations.</h3>
            <div className="space-y-8 mt-10">
              <div>
                <h5 className="font-bold text-lg text-amber-500 mb-2">Household RSVP Links</h5>
                <p className="text-stone-400">Never send 500 individual links. Group guests into "Families" so one person can confirm attendance and dietary restrictions (Halal, Jain, Veg) for their entire household.</p>
              </div>
              <div>
                <h5 className="font-bold text-lg text-amber-500 mb-2">Event-Specific Gating</h5>
                <p className="text-stone-400">Inviting the whole town to the Reception, but only close family to the Haldi/Mehendi? Kalyana dynamically hides events based on exactly who is looking at the card.</p>
              </div>
              <div>
                <h5 className="font-bold text-lg text-amber-500 mb-2">Digital Shagun & Hundial</h5>
                <p className="text-stone-400">A tasteful, integrated digital registry allowing well-wishers to pledge cash gifts and leave beautiful messages without awkward banking details.</p>
              </div>
            </div>
          </div>
          
          <div className="bg-stone-800 p-8 rounded-2xl border border-stone-700 shadow-2xl relative">
             <div className="absolute -top-4 -right-4 bg-amber-600 text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg">RSVP Manager</div>
             <div className="space-y-4">
                <div className="bg-stone-900 p-4 rounded-lg flex justify-between items-center border border-stone-700">
                  <div>
                    <p className="font-medium">Uncle Sunil's Family</p>
                    <p className="text-xs text-stone-400">4 Guests • Haldi & Reception</p>
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
                    <p className="font-medium">The Fernando Family</p>
                    <p className="text-xs text-stone-400">5 Guests • Poruwa Only</p>
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
