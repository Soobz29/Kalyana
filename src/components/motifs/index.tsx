import { SVGProps } from 'react';

export function PahanaLamp(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 100 100" fill="currentColor" {...props}>
      <path d="M50 10 C50 10 30 40 30 60 C30 80 50 90 50 90 C50 90 70 80 70 60 C70 40 50 10 50 10 Z M50 20 C50 20 60 45 60 60 C60 70 50 80 50 80 C50 80 40 70 40 60 C40 45 50 20 50 20 Z" />
      <path d="M45 5 L50 0 L55 5 Z" /> {/* Flame */}
      <path d="M20 60 Q10 60 10 50 M80 60 Q90 60 90 50" stroke="currentColor" fill="none" strokeWidth="2" />
    </svg>
  );
}

export function TempleArch(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 200 100" fill="currentColor" {...props}>
      <path d="M10 100 L10 60 Q10 10 100 10 Q190 10 190 60 L190 100" fill="none" stroke="currentColor" strokeWidth="4" />
      <path d="M20 100 L20 65 Q20 20 100 20 Q180 20 180 65 L180 100" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="100" cy="40" r="10" />
      <path d="M90 10 L100 0 L110 10" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export function MughalArch(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 200 100" fill="currentColor" {...props}>
      <path d="M10 100 L10 50 Q10 30 30 30 Q50 30 50 10 Q100 0 150 10 Q150 30 170 30 Q190 30 190 50 L190 100" fill="none" stroke="currentColor" strokeWidth="3" />
      <path d="M100 15 Q130 25 130 40 Q130 50 100 50 Q70 50 70 40 Q70 25 100 15" fill="none" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

export function WaxSeal({ initials, onClick }: { initials: string; onClick?: () => void }) {
  return (
    <svg viewBox="0 0 100 100" className="cursor-pointer drop-shadow-md" onClick={onClick}>
      <circle cx="50" cy="50" r="45" fill="#8B0000" />
      <circle cx="50" cy="50" r="35" fill="none" stroke="#600000" strokeWidth="2" strokeDasharray="4 2" />
      <text x="50" y="55" textAnchor="middle" fill="#D4AF37" fontFamily="serif" fontSize="24" fontWeight="bold">
        {initials}
      </text>
    </svg>
  );
}
