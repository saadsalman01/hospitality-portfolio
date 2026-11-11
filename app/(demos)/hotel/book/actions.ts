"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { stayQuery } from "@/components/hotel/parts";
import { findRoom } from "@/content/properties/hotel";
import { createHold, PAYMENT_WINDOW_MINUTES, releaseHold } from "@/lib/booking/availability";
import { formatDay, hotelToday, parseStay, quote } from "@/lib/booking/pricing";
import { createDepositCheckout } from "@/lib/booking/stripe";

const text = (form: FormData, name: string, max: number) =>
  String(form.get(name) ?? "").trim().slice(0, max);

/** Holds the room, then sends the guest to Stripe to pay the deposit. */
export async function startBooking(form: FormData) {
  // Everything is worked out again here: the price is never taken from the browser.
  const room = findRoom(text(form, "room", 40));
  const parsed = parseStay(
    { checkIn: text(form, "in", 10), checkOut: text(form, "out", 10), guests: text(form, "guests", 2) },
    hotelToday(),
  );
  if (!room || !parsed || "error" in parsed || parsed.guests > room.sleeps) redirect("/hotel/rooms");
  const stay = parsed;
  const back = `/hotel/book${stayQuery(stay)}&room=${room.slug}`;

  const name = text(form, "name", 120);
  const email = text(form, "email", 200);
  const phone = text(form, "phone", 40);
  if (!name || !phone || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) redirect(`${back}&error=details`);

  const q = quote(room.rateSen, stay.nights);
  const hold = await createHold({
    roomSlug: room.slug,
    checkIn: stay.checkIn,
    checkOut: stay.checkOut,
    guests: stay.guests,
    name,
    email,
    phone,
    arrival: text(form, "arrival", 40) || null,
    requests: text(form, "requests", 500) || null,
    totalSen: q.total,
    depositSen: q.deposit,
  });
  if (!hold) redirect(`/hotel/rooms${stayQuery(stay)}`); // someone took the last one a moment ago

  const h = await headers();
  const origin = `${h.get("x-forwarded-proto") ?? "http"}://${h.get("host")}`;
  let payUrl: string;
  try {
    payUrl = await createDepositCheckout({
      publicId: hold.publicId,
      reference: hold.reference,
      email,
      depositSen: q.deposit,
      title: `Deposit for ${room.name}, Saffron Lane Hotel`,
      description: `${formatDay(stay.checkIn)} to ${formatDay(stay.checkOut)}. Booking ${hold.reference}.`,
      minutes: PAYMENT_WINDOW_MINUTES,
      successUrl: `${origin}/hotel/book/confirmed?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${origin}${back}&released=${hold.publicId}`,
    });
  } catch (e) {
    console.error(e);
    await releaseHold(hold.publicId);
    redirect(`${back}&error=payment`);
  }
  redirect(payUrl);
}
