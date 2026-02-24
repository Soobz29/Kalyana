import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { supabase } from '@/lib/supabase';
import { Theme, Event } from '@/types/schema';
import EnvelopeAnimation from '@/components/EnvelopeAnimation';
import { toast } from 'sonner';
import { Loader2, Plus, Trash2, ArrowRight, ArrowLeft } from 'lucide-react';

const THEMES: { id: Theme; name: string; description: string }[] = [
  { id: 'sl', name: 'Sri Lankan Heritage', description: 'Kandyan motifs, brass lamp, maroon & gold' },
  { id: 'si', name: 'South Indian Traditional', description: 'Temple arch, banana leaf, turmeric & red' },
  { id: 'ni', name: 'North Indian Royal', description: 'Mughal arch, mehndi patterns, magenta & emerald' },
];

export default function CreateWeddingFlow() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  // Form State
  const [theme, setTheme] = useState<Theme>('sl');
  const [coupleName1, setCoupleName1] = useState('');
  const [coupleName2, setCoupleName2] = useState('');
  const [events, setEvents] = useState<Omit<Event, 'id' | 'wedding_id' | 'created_at'>[]>([
    { name: 'Wedding Ceremony', date: '', time: '', venue: '', dress_code: '', sort_order: 1 }
  ]);

  const handleAddEvent = () => {
    setEvents([...events, { name: '', date: '', time: '', venue: '', dress_code: '', sort_order: events.length + 1 }]);
  };

  const handleRemoveEvent = (index: number) => {
    const newEvents = [...events];
    newEvents.splice(index, 1);
    setEvents(newEvents);
  };

  const handleEventChange = (index: number, field: keyof Omit<Event, 'id' | 'wedding_id' | 'created_at'>, value: any) => {
    const newEvents = [...events];
    newEvents[index] = { ...newEvents[index], [field]: value };
    setEvents(newEvents);
  };

  const handlePublish = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const slug = `${coupleName1}-${coupleName2}-${Date.now()}`.toLowerCase().replace(/\s+/g, '-');

      // 1. Create Wedding
      const { data: wedding, error: weddingError } = await supabase
        .from('weddings')
        .insert({
          couple_name_1: coupleName1,
          couple_name_2: coupleName2,
          theme,
          slug,
          user_id: user.id
        })
        .select()
        .single();

      if (weddingError) throw weddingError;

      // 2. Create Events
      const eventsToInsert = events.map((e, i) => ({
        wedding_id: wedding.id,
        ...e,
        sort_order: i + 1
      }));

      const { error: eventsError } = await supabase
        .from('events')
        .insert(eventsToInsert);

      if (eventsError) throw eventsError;

      toast.success('Wedding published successfully!');
      navigate(`/invite/${slug}`);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Mock events for preview with IDs
  const previewEvents = events.map((e, i) => ({ ...e, id: `preview-${i}`, wedding_id: 'preview' })) as Event[];

  return (
    <div className="max-w-4xl mx-auto py-8">
      {/* Progress Bar */}
      <div className="flex justify-between mb-8 relative">
        <div className="absolute top-1/2 left-0 w-full h-1 bg-stone-200 -z-10"></div>
        {[1, 2, 3, 4].map((s) => (
          <div 
            key={s} 
            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors ${step >= s ? 'bg-stone-800 text-white' : 'bg-stone-200 text-stone-500'}`}
          >
            {s}
          </div>
        ))}
      </div>

      <div className="bg-white p-8 rounded-xl shadow-lg min-h-[500px]">
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
            <h2 className="text-2xl font-serif font-bold">Choose a Cultural Theme</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {THEMES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id)}
                  className={`p-6 rounded-xl border-2 text-left transition-all ${theme === t.id ? 'border-stone-800 bg-stone-50 ring-2 ring-stone-800 ring-offset-2' : 'border-stone-200 hover:border-stone-400'}`}
                >
                  <div className={`w-full h-32 mb-4 rounded-lg ${t.id === 'sl' ? 'bg-[#C9A84C]' : t.id === 'si' ? 'bg-[#E8A020]' : 'bg-[#C2185B]'}`}></div>
                  <h3 className="font-bold text-lg">{t.name}</h3>
                  <p className="text-sm text-stone-600 mt-2">{t.description}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
            <h2 className="text-2xl font-serif font-bold">Couple Details</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Partner 1 Name</label>
                <input
                  type="text"
                  value={coupleName1}
                  onChange={(e) => setCoupleName1(e.target.value)}
                  className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-stone-500"
                  placeholder="e.g. Kasun"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Partner 2 Name</label>
                <input
                  type="text"
                  value={coupleName2}
                  onChange={(e) => setCoupleName2(e.target.value)}
                  className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-stone-500"
                  placeholder="e.g. Sarah"
                />
              </div>
            </div>
            <p className="text-sm text-stone-500 italic">
              Tip: You can paste Sinhala, Tamil, or Hindi text directly.
            </p>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-serif font-bold">Wedding Events</h2>
              <button onClick={handleAddEvent} className="flex items-center gap-2 text-sm bg-stone-100 px-3 py-1 rounded-full hover:bg-stone-200">
                <Plus size={16} /> Add Event
              </button>
            </div>
            
            <div className="space-y-6 max-h-[500px] overflow-y-auto pr-2">
              {events.map((event, index) => (
                <div key={index} className="p-4 border border-stone-200 rounded-xl relative bg-stone-50">
                  <button 
                    onClick={() => handleRemoveEvent(index)}
                    className="absolute top-2 right-2 text-stone-400 hover:text-red-500"
                  >
                    <Trash2 size={18} />
                  </button>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-stone-500 uppercase">Event Name</label>
                      <input
                        type="text"
                        value={event.name}
                        onChange={(e) => handleEventChange(index, 'name', e.target.value)}
                        className="w-full mt-1 px-3 py-2 border border-stone-300 rounded-md"
                        placeholder="e.g. Poruwa Ceremony"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-stone-500 uppercase">Venue</label>
                      <input
                        type="text"
                        value={event.venue}
                        onChange={(e) => handleEventChange(index, 'venue', e.target.value)}
                        className="w-full mt-1 px-3 py-2 border border-stone-300 rounded-md"
                        placeholder="e.g. Cinnamon Grand"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-xs font-medium text-stone-500 uppercase">Date</label>
                        <input
                          type="text"
                          value={event.date}
                          onChange={(e) => handleEventChange(index, 'date', e.target.value)}
                          className="w-full mt-1 px-3 py-2 border border-stone-300 rounded-md"
                          placeholder="Aug 24, 2024"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-stone-500 uppercase">Time</label>
                        <input
                          type="text"
                          value={event.time}
                          onChange={(e) => handleEventChange(index, 'time', e.target.value)}
                          className="w-full mt-1 px-3 py-2 border border-stone-300 rounded-md"
                          placeholder="09:45 AM"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-stone-500 uppercase">Dress Code</label>
                      <input
                        type="text"
                        value={event.dress_code}
                        onChange={(e) => handleEventChange(index, 'dress_code', e.target.value)}
                        className="w-full mt-1 px-3 py-2 border border-stone-300 rounded-md"
                        placeholder="e.g. Traditional"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
            <h2 className="text-2xl font-serif font-bold text-center">Preview Your Invite</h2>
            <div className="border-4 border-stone-200 rounded-xl overflow-hidden bg-stone-100 h-[600px] relative">
              <div className="absolute inset-0 flex items-center justify-center scale-75 origin-center">
                <EnvelopeAnimation 
                  events={previewEvents} 
                  theme={theme} 
                  coupleInitials={`${coupleName1.charAt(0)}&${coupleName2.charAt(0)}`}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <button
          onClick={() => setStep(Math.max(1, step - 1))}
          disabled={step === 1}
          className="flex items-center gap-2 px-6 py-3 rounded-full border border-stone-300 hover:bg-stone-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ArrowLeft size={18} /> Back
        </button>

        {step < 4 ? (
          <button
            onClick={() => setStep(Math.min(4, step + 1))}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-stone-900 text-white hover:bg-stone-800"
          >
            Next <ArrowRight size={18} />
          </button>
        ) : (
          <button
            onClick={handlePublish}
            disabled={loading}
            className="flex items-center gap-2 px-8 py-3 rounded-full bg-green-700 text-white hover:bg-green-800 disabled:opacity-70"
          >
            {loading ? <Loader2 className="animate-spin" /> : 'Publish Wedding'}
          </button>
        )}
      </div>
    </div>
  );
}
