import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import EnvelopeAnimation from '@/components/EnvelopeAnimation';
import { Event, Theme } from '@/types/schema';

// Mock data for demonstration until we connect to Supabase
const MOCK_EVENTS: Event[] = [
  {
    id: '1',
    wedding_id: 'w1',
    name: 'Poruwa Ceremony',
    date: 'August 24, 2024',
    time: '09:45 AM',
    venue: 'Cinnamon Grand, Colombo',
    dress_code: 'Traditional / Lounge Suit',
    sort_order: 1,
  },
  {
    id: '2',
    wedding_id: 'w1',
    name: 'Wedding Reception',
    date: 'August 24, 2024',
    time: '06:30 PM',
    venue: 'Shangri-La, Colombo',
    dress_code: 'Black Tie / Formal',
    sort_order: 2,
  },
  {
    id: '3',
    wedding_id: 'w1',
    name: 'Homecoming',
    date: 'August 26, 2024',
    time: '07:00 PM',
    venue: 'Water\'s Edge, Battaramulla',
    dress_code: 'Smart Casual',
    sort_order: 3,
  },
];

export default function InvitePage() {
  const { slug } = useParams();
  const [showWebsite, setShowWebsite] = useState(false);
  
  // In a real app, we would fetch the wedding details by slug here
  const theme: Theme = 'sl'; // Default to Sri Lankan for demo
  const coupleInitials = 'K&S';

  return (
    <div className="min-h-screen bg-stone-100 overflow-x-hidden">
      {/* Hero Section with Envelope */}
      <div className="h-screen flex flex-col items-center justify-center relative">
        <EnvelopeAnimation 
          events={MOCK_EVENTS} 
          theme={theme} 
          coupleInitials={coupleInitials}
          onOpenComplete={() => setShowWebsite(true)}
        />
      </div>

      {/* Wedding Website Content (Revealed after animation) */}
      {showWebsite && (
        <div className="max-w-4xl mx-auto p-4 pb-20 animate-in fade-in slide-in-from-bottom-10 duration-1000">
          <div className="text-center mb-12">
            <h1 className="font-playfair text-4xl md:text-6xl text-stone-800 mb-4">
              Kasun & Sarah
            </h1>
            <p className="font-serif text-xl text-stone-600 italic">
              Invite you to celebrate their union
            </p>
          </div>

          {/* Timeline */}
          <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-stone-300 before:to-transparent">
            {MOCK_EVENTS.map((event, index) => (
              <div key={event.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                {/* Icon */}
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-stone-200 group-[.is-active]:bg-stone-800 group-[.is-active]:text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                  <span className="font-serif text-sm">{index + 1}</span>
                </div>
                
                {/* Card */}
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-6 rounded-xl shadow-md border border-stone-100">
                  <time className="font-serif text-stone-500 text-sm">{event.date} • {event.time}</time>
                  <h3 className="font-playfair text-xl font-bold text-stone-800 mt-1 mb-2">{event.name}</h3>
                  <p className="text-stone-600 text-sm mb-2">{event.venue}</p>
                  <div className="text-xs font-medium text-stone-500 uppercase tracking-wide bg-stone-100 inline-block px-2 py-1 rounded">
                    {event.dress_code}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Map Placeholder */}
          <div className="mt-16 bg-white p-4 rounded-xl shadow-md">
            <h2 className="font-playfair text-2xl text-center mb-4">Venue Locations</h2>
            <div className="w-full h-64 bg-stone-200 rounded-lg flex items-center justify-center text-stone-500">
              Google Maps Embed Placeholder
            </div>
          </div>

          {/* RSVP Button */}
          <div className="mt-12 text-center">
             <button className="bg-stone-900 text-white px-8 py-3 rounded-full font-serif text-lg hover:bg-stone-800 transition-transform hover:scale-105 shadow-lg">
               RSVP Now
             </button>
          </div>
        </div>
      )}
    </div>
  );
}
