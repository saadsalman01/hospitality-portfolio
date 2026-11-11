-- Saffron Lane Hotel: rooms inventory and bookings.
-- Room names, photos and prices live in content/properties/hotel.ts; the database
-- owns only what must be consistent under concurrency: units and who holds them.

create extension if not exists btree_gist with schema extensions;

create table public.room_units (
  id smallint generated always as identity primary key,
  room_slug text not null,
  label text not null unique
);
create index room_units_room_slug_idx on public.room_units (room_slug);

create table public.bookings (
  id bigint generated always as identity primary key,
  public_id uuid not null default gen_random_uuid() unique, -- unguessable, used in URLs
  reference text not null unique,                           -- short, shown to the guest
  unit_id smallint not null references public.room_units (id),
  stay daterange not null,                                  -- [check-in, check-out)
  guests smallint not null check (guests between 1 and 4),
  status text not null check (status in ('held', 'confirmed', 'cancelled', 'expired')),
  hold_expires_at timestamptz,
  source text not null default 'direct' check (source in ('direct', 'ical')),
  guest_name text not null,
  guest_email text not null,
  guest_phone text not null,
  arrival_time text,
  requests text,
  total_sen integer not null check (total_sen > 0),
  deposit_sen integer not null check (deposit_sen > 0 and deposit_sen <= total_sen),
  stripe_session_id text unique,
  created_at timestamptz not null default now(),
  constraint bookings_stay_valid check (lower(stay) < upper(stay)),
  -- The guarantee: one unit can never have two live bookings on overlapping nights.
  constraint bookings_no_double_booking
    exclude using gist (unit_id with =, stay with &&)
    where (status in ('held', 'confirmed'))
);
create index bookings_held_expiry_idx on public.bookings (hold_expires_at) where status = 'held';

-- Locked by default: no policies, so only the server's secret key can read or write.
alter table public.room_units enable row level security;
alter table public.bookings enable row level security;

grant select on public.room_units to service_role;
grant select, insert, update on public.bookings to service_role;

-- How many units of each room type are free for the given nights.
create function public.free_units(p_check_in date, p_check_out date)
returns table (room_slug text, free bigint)
language sql stable security invoker set search_path = ''
as $$
  select u.room_slug, count(*) filter (where b.id is null)
  from public.room_units u
  left join public.bookings b
    on b.unit_id = u.id
   and b.stay && daterange(p_check_in, p_check_out, '[)')
   and (b.status = 'confirmed' or (b.status = 'held' and b.hold_expires_at > now()))
  group by u.room_slug;
$$;

-- Holds the first free unit of a room type for 15 minutes while the guest pays.
-- Raises 'no_availability' when every unit is taken.
create function public.create_hold(
  p_room_slug text,
  p_check_in date,
  p_check_out date,
  p_guests smallint,
  p_guest_name text,
  p_guest_email text,
  p_guest_phone text,
  p_arrival_time text,
  p_requests text,
  p_total_sen integer,
  p_deposit_sen integer
)
returns table (public_id uuid, reference text)
language plpgsql security invoker set search_path = ''
as $$
declare
  v_unit smallint;
begin
  if p_check_in < (now() at time zone 'Asia/Kuala_Lumpur')::date or p_check_out <= p_check_in then
    raise exception 'invalid_dates';
  end if;

  update public.bookings set status = 'expired'
  where status = 'held' and hold_expires_at < now();

  for v_unit in
    select u.id from public.room_units u where u.room_slug = p_room_slug order by u.id
  loop
    begin
      return query
        insert into public.bookings as b (
          reference, unit_id, stay, guests, status, hold_expires_at,
          guest_name, guest_email, guest_phone, arrival_time, requests,
          total_sen, deposit_sen
        ) values (
          'SL-' || upper(substr(md5(random()::text), 1, 6)),
          v_unit, daterange(p_check_in, p_check_out, '[)'), p_guests, 'held',
          now() + interval '15 minutes',
          p_guest_name, p_guest_email, p_guest_phone, p_arrival_time, p_requests,
          p_total_sen, p_deposit_sen
        )
        returning b.public_id, b.reference;
      return;
    exception when exclusion_violation then
      null; -- this unit is taken for those nights; try the next one
    end;
  end loop;

  raise exception 'no_availability';
end;
$$;

revoke execute on function public.free_units(date, date) from public, anon, authenticated;
revoke execute on function public.create_hold(text, date, date, smallint, text, text, text, text, text, integer, integer) from public, anon, authenticated;
grant execute on function public.free_units(date, date) to service_role;
grant execute on function public.create_hold(text, date, date, smallint, text, text, text, text, text, integer, integer) to service_role;

-- 14 rooms: 6 courtyard, 5 heritage deluxe, 3 family loft.
insert into public.room_units (room_slug, label)
select 'courtyard', 'C' || n from generate_series(1, 6) n
union all select 'heritage-deluxe', 'D' || n from generate_series(1, 5) n
union all select 'family-loft', 'L' || n from generate_series(1, 3) n;
