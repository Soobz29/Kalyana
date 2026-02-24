import { useState, JSX } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { WaxSeal } from './motifs';
import InsertCard from './InsertCard';
import { Event, Theme } from '@/types/schema';

interface EnvelopeAnimationProps {
  events: Event[];
  theme: Theme;
  coupleInitials: string;
  onOpenComplete?: () => void;
}

export default function EnvelopeAnimation({ events, theme, coupleInitials, onOpenComplete }: EnvelopeAnimationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSealBroken, setIsSealBroken] = useState(false);

  const handleOpen = () => {
    if (isOpen) return;
    setIsSealBroken(true);
    setTimeout(() => {
      setIsOpen(true);
      if (onOpenComplete) {
        setTimeout(onOpenComplete, 2000); // Trigger callback after animation
      }
    }, 300);
  };

  return (
    <div className="relative w-full max-w-md mx-auto h-[600px] flex items-center justify-center perspective-1000">
      {/* Envelope Container */}
      <motion.div
        className="relative w-full max-w-[350px] h-[250px] bg-[#E5E5E5] shadow-2xl z-10"
        initial={{ y: 0 }}
        animate={isOpen ? { y: 200, opacity: 0 } : { y: 0, opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        {/* Envelope Body (Back) */}
        <div className="absolute inset-0 bg-[#d4d4d4] border border-gray-300"></div>

        {/* Card Stack */}
        <div className="absolute left-4 right-4 bottom-4 top-4 z-0">
            <AnimatePresence>
            {isOpen && (
                <motion.div
                className="relative w-full h-[450px]"
                initial={{ y: 60 }}
                animate={{ y: -250 }}
                transition={{ delay: 0.8, duration: 0.8, type: 'spring' }}
                >
                {events.map((event, index) => (
                  <div key={event.id} className="absolute inset-0 w-full h-full">
                    <InsertCard
                      event={event}
                      theme={theme}
                      index={index}
                      total={events.length}
                    />
                  </div>
                ))}
                </motion.div>
            )}
            </AnimatePresence>
        </div>

        {/* Envelope Flap */}
        <motion.div
          className="absolute top-0 left-0 w-full h-[140px] bg-[#E5E5E5] origin-top z-20"
          style={{
            clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
            backfaceVisibility: 'hidden',
          }}
          initial={{ rotateX: 0 }}
          animate={{ rotateX: isOpen ? 180 : 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut', delay: 0.3 }}
        >
            {/* Texture */}
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/linen.png')]"></div>
        </motion.div>

        {/* Envelope Front (Bottom Triangle) */}
        <div 
            className="absolute bottom-0 left-0 w-full h-[140px] bg-[#dcdcdc] z-30 pointer-events-none"
            style={{ clipPath: 'polygon(0 100%, 50% 0, 100% 100%)' }}
        ></div>
        
        {/* Envelope Sides */}
        <div className="absolute inset-0 z-30 pointer-events-none">
            <div className="absolute left-0 top-0 bottom-0 w-[80px] bg-[#d0d0d0]" style={{ clipPath: 'polygon(0 0, 100% 50%, 0 100%)'}}></div>
            <div className="absolute right-0 top-0 bottom-0 w-[80px] bg-[#d0d0d0]" style={{ clipPath: 'polygon(100% 0, 0 50%, 100% 100%)'}}></div>
        </div>

        {/* Wax Seal */}
        <AnimatePresence>
          {!isSealBroken && (
            <motion.div
              className="absolute top-[110px] left-1/2 -translate-x-1/2 z-40"
              exit={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-16 h-16">
                <WaxSeal initials={coupleInitials} onClick={handleOpen} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Click hint */}
        {!isOpen && !isSealBroken && (
            <motion.p 
                className="absolute -bottom-12 w-full text-center text-stone-500 font-serif italic"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
            >
                Tap the seal to open
            </motion.p>
        )}
      </motion.div>
    </div>
  );
}
