// Server only: uses the secret key. Never import this from a client component.

async function sb<T>(path: string, init?: { method?: string; body?: unknown }): Promise<T> {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!url || !key) throw new Error("SUPABASE_URL and SUPABASE_SECRET_KEY must be set");
  const res = await fetch(`${url}/rest/v1/${path}`, {
    method: init?.method ?? "GET",
    headers: { apikey: key, "Content-Type": "application/json", Prefer: "return=representation" },
    body: init?.body === undefined ? undefined : JSON.stringify(init.body),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`${path.split("?")[0]} failed: ${res.status} ${await res.text()}`);
  return res.json() as Promise<T>;
}

const rpc = <T>(fn: string, body: unknown) => sb<T>(`rpc/${fn}`, { method: "POST", body });

/** Free units per room type for the given nights, e.g. { courtyard: 6, "family-loft": 0 }. */
export async function freeUnits(checkIn: string, checkOut: string): Promise<Record<string, number>> {
  const rows = await rpc<{ room_slug: string; free: number }[]>("free_units", {
    p_check_in: checkIn,
    p_check_out: checkOut,
  });
  return Object.fromEntries(rows.map((r) => [r.room_slug, r.free]));
}

/** Stripe's shortest payment window is 30 minutes, so the room is held a little longer than that. */
export const PAYMENT_WINDOW_MINUTES = 30;

export type HoldInput = {
  roomSlug: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  name: string;
  email: string;
  phone: string;
  arrival: string | null;
  requests: string | null;
  totalSen: number;
  depositSen: number;
};

/** Holds one unit while the guest pays. Returns null when the room has just been taken. */
export async function createHold(h: HoldInput): Promise<{ publicId: string; reference: string } | null> {
  let rows: { public_id: string; reference: string }[];
  try {
    rows = await rpc("create_hold", {
      p_room_slug: h.roomSlug,
      p_check_in: h.checkIn,
      p_check_out: h.checkOut,
      p_guests: h.guests,
      p_guest_name: h.name,
      p_guest_email: h.email,
      p_guest_phone: h.phone,
      p_arrival_time: h.arrival,
      p_requests: h.requests,
      p_total_sen: h.totalSen,
      p_deposit_sen: h.depositSen,
    });
  } catch (e) {
    if (e instanceof Error && e.message.includes("no_availability")) return null;
    throw e;
  }
  const { public_id: publicId, reference } = rows[0];
  // The database holds for 15 minutes; stretch it to outlast the Stripe payment page.
  const until = new Date(Date.now() + (PAYMENT_WINDOW_MINUTES + 1) * 60_000).toISOString();
  await sb(`bookings?public_id=eq.${publicId}&status=eq.held`, {
    method: "PATCH",
    body: { hold_expires_at: until },
  });
  return { publicId, reference };
}

const isUuid = (s: string) => /^[0-9a-f-]{36}$/i.test(s);

/** Frees a held room, e.g. when the guest backs out of the payment page. Confirmed bookings are untouched. */
export async function releaseHold(publicId: string): Promise<void> {
  if (!isUuid(publicId)) return;
  await sb(`bookings?public_id=eq.${publicId}&status=eq.held`, {
    method: "PATCH",
    body: { status: "cancelled" },
  });
}

/** Marks a held booking as paid. Safe to call twice: the second call changes nothing. */
export async function confirmBooking(publicId: string, stripeSessionId: string): Promise<void> {
  if (!isUuid(publicId)) return;
  await sb(`bookings?public_id=eq.${publicId}&status=eq.held`, {
    method: "PATCH",
    body: { status: "confirmed", hold_expires_at: null, stripe_session_id: stripeSessionId },
  });
}

export type Booking = {
  reference: string;
  status: "held" | "confirmed" | "cancelled" | "expired";
  roomSlug: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalSen: number;
  depositSen: number;
  guestName: string;
  guestEmail: string;
};

export async function getBooking(publicId: string): Promise<Booking | null> {
  if (!isUuid(publicId)) return null;
  const rows = await sb<
    {
      reference: string;
      status: Booking["status"];
      stay: string;
      guests: number;
      total_sen: number;
      deposit_sen: number;
      guest_name: string;
      guest_email: string;
      room_units: { room_slug: string };
    }[]
  >(
    `bookings?public_id=eq.${publicId}&select=reference,status,stay,guests,total_sen,deposit_sen,guest_name,guest_email,room_units(room_slug)`,
  );
  const b = rows[0];
  if (!b) return null;
  const [checkIn, checkOut] = b.stay.replace(/[[\]()]/g, "").split(","); // "[2026-12-01,2026-12-04)"
  return {
    reference: b.reference,
    status: b.status,
    roomSlug: b.room_units.room_slug,
    checkIn,
    checkOut,
    guests: b.guests,
    totalSen: b.total_sen,
    depositSen: b.deposit_sen,
    guestName: b.guest_name,
    guestEmail: b.guest_email,
  };
}
