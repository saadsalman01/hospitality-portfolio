// Money is in sen (1 RM = 100 sen) so totals never pick up floating point error.

export const SERVICE_TAX_RATE = 0.08;
export const TOURISM_TAX_SEN_PER_NIGHT = 1000; // RM 10 per room per night
export const DEPOSIT_RATE = 0.3;
export const MAX_NIGHTS = 30;
export const MAX_GUESTS = 4;
export const HOTEL_TIME_ZONE = "Asia/Kuala_Lumpur";

export type Quote = ReturnType<typeof quote>;

/** Full price for a stay. The total always includes taxes; the deposit is paid at booking. */
export function quote(nightlySen: number, nights: number) {
  const room = nightlySen * nights;
  const serviceTax = Math.round(room * SERVICE_TAX_RATE);
  const tourismTax = TOURISM_TAX_SEN_PER_NIGHT * nights;
  const total = room + serviceTax + tourismTax;
  const deposit = Math.round(total * DEPOSIT_RATE);
  return { nights, room, serviceTax, tourismTax, total, deposit, balance: total - deposit };
}

export type Stay = { checkIn: string; checkOut: string; guests: number; nights: number };

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

function toUtc(iso: string): number | null {
  if (!ISO_DATE.test(iso)) return null;
  const t = Date.parse(`${iso}T00:00:00Z`);
  // Date.parse accepts 2026-02-31 and rolls it over; reject anything that does not round-trip.
  return Number.isNaN(t) || new Date(t).toISOString().slice(0, 10) !== iso ? null : t;
}

/**
 * Validates dates and guests from the page address.
 * Returns null when no dates were given, an error message when they are wrong, or the stay.
 */
export function parseStay(
  input: { checkIn?: string; checkOut?: string; guests?: string },
  today: string,
): Stay | { error: string } | null {
  if (!input.checkIn && !input.checkOut) return null;
  const from = toUtc(input.checkIn ?? "");
  const to = toUtc(input.checkOut ?? "");
  if (from === null || to === null) return { error: "Choose an arrival and a departure date." };
  if (input.checkIn! < today) return { error: "Arrival cannot be in the past." };
  const nights = (to - from) / 86_400_000;
  if (nights < 1) return { error: "Departure must be after arrival." };
  if (nights > MAX_NIGHTS) return { error: `Stays are up to ${MAX_NIGHTS} nights. For longer, message the hotel.` };
  const guests = Number(input.guests ?? "2");
  if (!Number.isInteger(guests) || guests < 1 || guests > MAX_GUESTS) {
    return { error: `Choose between 1 and ${MAX_GUESTS} guests.` };
  }
  return { checkIn: input.checkIn!, checkOut: input.checkOut!, guests, nights };
}

/** Today's date at the hotel, as YYYY-MM-DD. */
export function hotelToday(now = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: HOTEL_TIME_ZONE }).format(now);
}

export function addDays(iso: string, days: number): string {
  return new Date(Date.parse(`${iso}T00:00:00Z`) + days * 86_400_000).toISOString().slice(0, 10);
}

/** 122232 -> "RM 1,222.32" */
export function formatRM(sen: number): string {
  return `RM ${(sen / 100).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

/** "2026-12-12" -> "Sat 12 Dec" */
export function formatDay(iso: string): string {
  const parts = new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  }).formatToParts(new Date(`${iso}T00:00:00Z`));
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  return `${get("weekday")} ${get("day")} ${get("month")}`;
}
