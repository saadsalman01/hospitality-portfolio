import type { Metadata } from "next";
import { Suspense } from "react";
import Loading from "@/app/(demos)/hotel/loading";
import { connection } from "next/server";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Info } from "@phosphor-icons/react/dist/ssr";
import { PriceBreakdown, stayQuery, StaySummary, Steps } from "@/components/hotel/parts";
import { findRoom } from "@/content/properties/hotel";
import { SubmitButton } from "@/components/hotel/submit-button";
import { freeUnits, releaseHold } from "@/lib/booking/availability";
import { startBooking } from "./actions";
import { addDays, formatDay, formatRM, hotelToday, parseStay, quote } from "@/lib/booking/pricing";

export const metadata: Metadata = { title: "Your details", robots: { index: false } };

const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);
const field =
  "min-h-12 w-full rounded-lg border border-line bg-raised px-3 py-2 text-base text-ink transition-all duration-700 ease-fluid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";
const label = "flex flex-col gap-2 text-sm font-semibold";

async function BookPageContent({ searchParams }: PageProps<"/hotel/book">) {
  const sp = await searchParams;
  await connection(); // the clock is read below, so this must render per request
  const room = findRoom(first(sp.room) ?? "");
  const parsed = parseStay(
    { checkIn: first(sp.in), checkOut: first(sp.out), guests: first(sp.guests) },
    hotelToday(),
  );
  // Without a room and valid dates there is nothing to book: send the guest back a step.
  if (!room || !parsed || "error" in parsed) redirect("/hotel/rooms");
  const stay = parsed;
  if (stay.guests > room.sleeps) redirect(`/hotel/rooms${stayQuery(stay)}`);

  // Back from the payment page without paying: free the room that was being held.
  const released = first(sp.released);
  if (released) await releaseHold(released);
  const problem =
    first(sp.error) === "details"
      ? "Check your name, email and phone, then try again."
      : first(sp.error) === "payment"
        ? "The payment page could not be opened. Nothing was charged. Try again."
        : null;

  const q = quote(room.rateSen, stay.nights);
  const available = ((await freeUnits(stay.checkIn, stay.checkOut))[room.slug] ?? 0) > 0;
  if (!available) redirect(`/hotel/rooms${stayQuery(stay)}`);

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 pb-24 sm:px-6">
      <div className="flex flex-col gap-6 pt-12">
        <Steps current="Details" stay={stay} />
        <h1 className="text-4xl font-bold tracking-tight">Your details</h1>
      </div>

      <div className="flex items-center gap-4 rounded-2xl border border-line bg-raised p-2">
        <Image
          src={room.photo.src}
          alt=""
          placeholder="blur"
          sizes="96px"
          className="size-24 shrink-0 rounded-lg object-cover"
        />
        <p className="text-xl font-bold tracking-tight">{room.name}</p>
      </div>
      <StaySummary stay={stay} changeHref={`/hotel/rooms/${room.slug}`} />

      {problem && (
        <p role="alert" className="rounded-2xl border border-accent bg-raised p-4 text-base font-semibold">
          {problem}
        </p>
      )}

      <form action={startBooking} className="flex flex-col gap-6">
        <input type="hidden" name="room" value={room.slug} />
        <input type="hidden" name="in" value={stay.checkIn} />
        <input type="hidden" name="out" value={stay.checkOut} />
        <input type="hidden" name="guests" value={stay.guests} />
        <fieldset className="flex flex-col gap-4 rounded-2xl border border-line bg-raised p-6">
          <legend className="sr-only">Your details</legend>
          <label className={label}>
            Full name
            <input name="name" required autoComplete="name" className={field} />
          </label>
          <label className={label}>
            Email
            <input name="email" type="email" required autoComplete="email" className={field} />
            <span className="font-normal text-muted">Your confirmation is sent here.</span>
          </label>
          <label className={label}>
            Phone
            <input name="phone" type="tel" required autoComplete="tel" placeholder="+60 12 345 6789" className={field} />
            <span className="font-normal text-muted">For questions about your arrival. WhatsApp works.</span>
          </label>
          <label className={label}>
            Arrival time (optional)
            <select name="arrival" defaultValue="" className={field}>
              <option value="">I don&apos;t know yet</option>
              <option>Before 2 pm</option>
              <option>2 pm to 6 pm</option>
              <option>After 6 pm</option>
            </select>
          </label>
          <label className={label}>
            Requests (optional)
            <textarea name="requests" rows={3} maxLength={500} placeholder="Cot, late arrival, allergies" className={field} />
          </label>
        </fieldset>

        <section className="flex flex-col gap-4 rounded-2xl border border-line bg-raised p-6">
          <h2 className="text-xl font-bold tracking-tight">Price</h2>
          <PriceBreakdown q={q} rateSen={room.rateSen} />
        </section>

        <p className="flex gap-2 rounded-2xl border border-line bg-raised p-6 text-base">
          <Info size={20} aria-hidden className="shrink-0 text-muted" />
          <span>
            <span className="block font-semibold">
              Free cancellation until {formatDay(addDays(stay.checkIn, -3))}
            </span>
            <span className="block text-muted">Your deposit is refunded in full. After that it is kept.</span>
          </span>
        </p>

        <SubmitButton busy="Holding your room">Continue to payment</SubmitButton>
        <p className="text-sm text-muted">
          You pay a {formatRM(q.deposit)} deposit on the next screen. The balance of {formatRM(q.balance)} is
          paid at the hotel. Your room is held for 30 minutes while you pay.
        </p>
        <p className="rounded-2xl border border-dashed border-line p-4 text-sm text-muted">
          Concept project: payment runs in test mode and no money moves. Use card number 4242 4242 4242
          4242 with any future expiry date and any three digits.
        </p>
      </form>
    </div>
  );
}

// Availability is read per request, so the page streams in behind a loading state.
export default function BookPage(props: PageProps<"/hotel/book">) {
  return (
    <Suspense fallback={<Loading />}>
      <BookPageContent {...props} />
    </Suspense>
  );
}
