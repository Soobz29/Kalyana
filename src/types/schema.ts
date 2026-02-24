export type Theme = 'sl' | 'si' | 'ni';

export interface Wedding {
  id: string;
  couple_name_1: string;
  couple_name_2: string;
  theme: Theme;
  slug: string;
  user_id: string;
  created_at: string;
}

export interface Event {
  id: string;
  wedding_id: string;
  name: string;
  date: string;
  time: string;
  venue: string;
  dress_code?: string;
  description?: string;
  sort_order: number;
}

export interface Household {
  id: string;
  wedding_id: string;
  family_name: string;
  rsvp_token: string;
  rsvp_submitted_at?: string;
}

export interface Guest {
  id: string;
  household_id: string;
  first_name: string;
  last_name: string;
  dietary_preference: 'standard' | 'vegetarian' | 'jain' | 'halal' | 'vegan' | 'gluten-free';
  phone?: string;
  email?: string;
}

export interface GuestEventInvitation {
  guest_id: string;
  event_id: string;
  attending?: boolean;
}
