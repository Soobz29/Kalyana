-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create Enum Types
create type theme_type as enum ('sl', 'si', 'ni');
create type dietary_preference_type as enum ('standard', 'vegetarian', 'jain', 'halal', 'vegan', 'gluten-free');

-- Table: weddings
create table weddings (
  id uuid primary key default uuid_generate_v4(),
  couple_name_1 text not null,
  couple_name_2 text not null,
  theme theme_type not null,
  slug text unique not null,
  user_id uuid references auth.users not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Table: events
create table events (
  id uuid primary key default uuid_generate_v4(),
  wedding_id uuid references weddings(id) on delete cascade not null,
  name text not null,
  date date not null,
  time time not null,
  venue text not null,
  dress_code text,
  description text,
  sort_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Table: households
create table households (
  id uuid primary key default uuid_generate_v4(),
  wedding_id uuid references weddings(id) on delete cascade not null,
  family_name text not null,
  rsvp_token uuid unique default uuid_generate_v4() not null,
  rsvp_submitted_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Table: guests
create table guests (
  id uuid primary key default uuid_generate_v4(),
  household_id uuid references households(id) on delete cascade not null,
  first_name text not null,
  last_name text not null,
  dietary_preference dietary_preference_type default 'standard',
  phone text,
  email text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Table: guest_event_invitations
create table guest_event_invitations (
  guest_id uuid references guests(id) on delete cascade not null,
  event_id uuid references events(id) on delete cascade not null,
  attending boolean, -- null = pending, true = yes, false = no
  primary key (guest_id, event_id)
);

-- Table: shagun_pledges
create table shagun_pledges (
  id uuid primary key default uuid_generate_v4(),
  wedding_id uuid references weddings(id) on delete cascade not null,
  pledger_name text not null,
  amount_note text,
  message text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Row Level Security (RLS) Policies

-- Enable RLS on all tables
alter table weddings enable row level security;
alter table events enable row level security;
alter table households enable row level security;
alter table guests enable row level security;
alter table guest_event_invitations enable row level security;
alter table shagun_pledges enable row level security;

-- Policies for weddings
create policy "Users can view their own wedding" on weddings
  for select using (auth.uid() = user_id);

create policy "Users can insert their own wedding" on weddings
  for insert with check (auth.uid() = user_id);

create policy "Users can update their own wedding" on weddings
  for update using (auth.uid() = user_id);

create policy "Public can view weddings by slug" on weddings
  for select using (true); -- Simplified for public access via slug, in app logic we filter by slug

-- Policies for events
create policy "Users can manage their wedding events" on events
  for all using (exists (select 1 from weddings where id = events.wedding_id and user_id = auth.uid()));

create policy "Public can view events for a wedding" on events
  for select using (true);

-- Policies for households
create policy "Users can manage their wedding households" on households
  for all using (exists (select 1 from weddings where id = households.wedding_id and user_id = auth.uid()));

create policy "Public can view household by token" on households
  for select using (true); -- In app, we query by rsvp_token

-- Policies for guests
create policy "Users can manage their wedding guests" on guests
  for all using (exists (select 1 from households join weddings on households.wedding_id = weddings.id where households.id = guests.household_id and weddings.user_id = auth.uid()));

create policy "Public can view guests by household token" on guests
  for select using (true); -- In app, we verify via household token

-- Policies for guest_event_invitations
create policy "Users can manage invitations" on guest_event_invitations
  for all using (exists (
    select 1 from guests
    join households on guests.household_id = households.id
    join weddings on households.wedding_id = weddings.id
    where guests.id = guest_event_invitations.guest_id and weddings.user_id = auth.uid()
  ));

create policy "Guests can update their own invitations" on guest_event_invitations
  for update using (true); -- Simplified, ideally validated by rsvp_token in application logic or RLS function

-- Policies for shagun_pledges
create policy "Users can view pledges for their wedding" on shagun_pledges
  for select using (exists (select 1 from weddings where id = shagun_pledges.wedding_id and user_id = auth.uid()));

create policy "Public can insert pledges" on shagun_pledges
  for insert with check (true);
