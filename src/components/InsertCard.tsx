import { JSX } from 'react';
import { motion } from 'motion/react';
import { Event, Theme } from '@/types/schema';
import { PahanaLamp, TempleArch, MughalArch } from './motifs';
import { cn } from '@/lib/utils';

interface InsertCardProps {
  event: Event;
  theme: Theme;
  index: number;
  total: number;
}

export default function InsertCard({ event, theme, index, total }: InsertCardProps): JSX.Element {
  const getThemeStyles = (theme: Theme) => {
    switch (theme) {
      case 'sl':
        return {
          bg: 'bg-[#FDF6E3]', // sl-cream
          text: 'text-[#2C1A0E]', // sl-deep
          accent: 'text-[#C9A84C]', // sl-gold
          border: 'border-[#6B1A1A]', // sl-maroon
          font: 'font-sinhala',
          Motif: PahanaLamp,
        };
      case 'si':
        return {
          bg: 'bg-[#FEFAE0]', // si-ivory
          text: 'text-[#2D6A4F]', // si-green
          accent: 'text-[#E8A020]', // si-turmeric
          border: 'border-[#C0392B]', // si-red
          font: 'font-tamil',
          Motif: TempleArch,
        };
      case 'ni':
        return {
          bg: 'bg-white',
          text: 'text-[#0D1B2A]', // ni-navy
          accent: 'text-[#C2185B]', // ni-magenta
          border: 'border-[#FFD700]', // ni-gold
          font: 'font-devanagari',
          Motif: MughalArch,
        };
    }
  };

  const styles = getThemeStyles(theme);
  const Motif = styles.Motif;

  // Calculate random rotation for "stacked" look if it's in the stack
  const randomRotate = (index % 2 === 0 ? 1 : -1) * (index * 2);

  return (
    <motion.div
      className={cn(
        'absolute top-0 left-0 w-full h-full rounded-lg shadow-lg p-6 flex flex-col items-center justify-between border-4',
        styles.bg,
        styles.text,
        styles.border,
        styles.font
      )}
      style={{
        zIndex: total - index,
        rotate: randomRotate,
      }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      whileDrag={{ scale: 1.05, rotate: 0 }}
    >
      <div className="w-full flex justify-center opacity-80">
        <Motif className={cn("w-16 h-16", styles.accent)} />
      </div>

      <div className="text-center space-y-2">
        <h3 className={cn("text-2xl font-bold uppercase tracking-widest", styles.accent)}>
          {event.name}
        </h3>
        <p className="text-lg font-serif italic">{event.date} at {event.time}</p>
        <p className="text-md">{event.venue}</p>
      </div>

      <div className="text-center text-sm opacity-75">
        <p className="uppercase tracking-wider text-xs mb-1">Dress Code</p>
        <p>{event.dress_code || 'Formal Traditional'}</p>
      </div>
      
      {/* Texture Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-10 mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/linen.png')]"></div>
    </motion.div>
  );
}
