// Server only: uses the secret key. Never import this from a client component.

async function rpc<T>(fn: string, body: unknown): Promise<T> {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!url || !key) throw new Error("SUPABASE_URL and SUPABASE_SECRET_KEY must be set");
  const res = await fetch(`${url}/rest/v1/rpc/${fn}`, {
    method: "POST",
    headers: { apikey: key, "Content-Type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`${fn} failed: ${res.status} ${await res.text()}`);
  return res.json() as Promise<T>;
}

/** Free units per room type for the given nights, e.g. { courtyard: 6, "family-loft": 0 }. */
export async function freeUnits(checkIn: string, checkOut: string): Promise<Record<string, number>> {
  const rows = await rpc<{ room_slug: string; free: number }[]>("free_units", {
    p_check_in: checkIn,
    p_check_out: checkOut,
  });
  return Object.fromEntries(rows.map((r) => [r.room_slug, r.free]));
}
