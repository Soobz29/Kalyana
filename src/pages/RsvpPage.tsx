import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Household, Guest, Event, GuestEventInvitation } from '@/types/schema';
import { toast } from 'sonner';
import { Loader2, Check, X } from 'lucide-react';

export default function RsvpPage() {
  const { token } = useParams();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [household, setHousehold] = useState<Household | null>(null);
  const [guests, setGuests] = useState<Guest[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [invitations, setInvitations] = useState<Record<string, Record<string, boolean | null>>>({});

  useEffect(() => {
    if (token) fetchRsvpData(token);
  }, [token]);

  const fetchRsvpData = async (rsvpToken: string) => {
    try {
      // 1. Get Household
      const { data: hh, error: hhError } = await supabase
        .from('households')
        .select('*')
        .eq('rsvp_token', rsvpToken)
        .single();
      
      if (hhError) throw hhError;
      setHousehold(hh);

      // 2. Get Guests
      const { data: gs, error: gsError } = await supabase
        .from('guests')
        .select('*')
        .eq('household_id', hh.id);
      
      if (gsError) throw gsError;
      setGuests(gs);

      // 3. Get Events
      const { data: evs, error: evsError } = await supabase
        .from('events')
        .select('*')
        .eq('wedding_id', hh.wedding_id)
        .order('sort_order');
      
      if (evsError) throw evsError;
      setEvents(evs);

      // 4. Initialize Invitations State
      // In a real app, we'd fetch existing invitations from 'guest_event_invitations'
      // For now, we initialize with pending (null) or true/false if we had data
      const initialInvites: Record<string, Record<string, boolean | null>> = {};
      gs.forEach(g => {
        initialInvites[g.id] = {};
        evs.forEach(e => {
          initialInvites[g.id][e.id] = null; // Pending by default
        });
      });
      setInvitations(initialInvites);

    } catch (error) {
      console.error(error);
      toast.error('Invalid RSVP link');
    } finally {
      setLoading(false);
    }
  };

  const handleAttendanceChange = (guestId: string, eventId: string, status: boolean) => {
    setInvitations(prev => ({
      ...prev,
      [guestId]: {
        ...prev[guestId],
        [eventId]: status
      }
    }));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      // Upsert invitations
      const upsertData: GuestEventInvitation[] = [];
      Object.entries(invitations).forEach(([guestId, eventMap]) => {
        Object.entries(eventMap).forEach(([eventId, status]) => {
          if (status !== null) {
            upsertData.push({
              guest_id: guestId,
              event_id: eventId,
              attending: status
            });
          }
        });
      });

      const { error } = await supabase
        .from('guest_event_invitations')
        .upsert(upsertData);

      if (error) throw error;

      // Update household submission time
      await supabase
        .from('households')
        .update({ rsvp_submitted_at: new Date().toISOString() })
        .eq('id', household?.id);

      toast.success('RSVP Submitted! Thank you.');
    } catch (error) {
      console.error(error);
      toast.error('Failed to submit RSVP');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin" /></div>;
  if (!household) return <div className="min-h-screen flex items-center justify-center">Invitation not found.</div>;

  return (
    <div className="min-h-screen bg-stone-50 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-stone-900 text-white p-8 text-center">
          <h1 className="font-serif text-3xl mb-2">RSVP</h1>
          <p className="text-stone-300">The {household.family_name} Family</p>
        </div>

        <div className="p-8 space-y-8">
          {guests.map(guest => (
            <div key={guest.id} className="border-b border-stone-100 pb-8 last:border-0 last:pb-0">
              <h3 className="font-bold text-lg mb-4">{guest.first_name} {guest.last_name}</h3>
              
              <div className="space-y-4">
                {events.map(event => (
                  <div key={event.id} className="flex items-center justify-between bg-stone-50 p-4 rounded-lg">
                    <div>
                      <p className="font-medium">{event.name}</p>
                      <p className="text-sm text-stone-500">{event.date} • {event.time}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAttendanceChange(guest.id, event.id, true)}
                        className={`p-2 rounded-full transition-colors ${invitations[guest.id]?.[event.id] === true ? 'bg-green-600 text-white' : 'bg-stone-200 text-stone-400 hover:bg-stone-300'}`}
                      >
                        <Check size={20} />
                      </button>
                      <button
                        onClick={() => handleAttendanceChange(guest.id, event.id, false)}
                        className={`p-2 rounded-full transition-colors ${invitations[guest.id]?.[event.id] === false ? 'bg-red-600 text-white' : 'bg-stone-200 text-stone-400 hover:bg-stone-300'}`}
                      >
                        <X size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="w-full bg-stone-900 text-white py-4 rounded-xl font-bold hover:bg-stone-800 disabled:opacity-70 transition-colors"
          >
            {submitting ? 'Submitting...' : 'Confirm RSVP'}
          </button>
        </div>
      </div>
    </div>
  );
}
