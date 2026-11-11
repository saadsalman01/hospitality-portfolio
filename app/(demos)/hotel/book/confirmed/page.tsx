import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { CheckCircle } from "@phosphor-icons/react/dist/ssr";
import Loading from "@/app/(demos)/hotel/loading";
import { guestsLabel, nightsLabel, primaryButton, secondaryButton } from "@/components/hotel/parts";
import { findRoom, hotel } from "@/content/properties/hotel";
import { confirmBooking, getBooking } from "@/lib/booking/availability";
import { addDays, formatDay, formatRM } from "@/lib/booking/pricing";
import { getCheckout } from "@/lib/booking/stripe";

export const metadata: Metadata = { title: "Booking confirmed", robots: { index: false } };

const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);
const row = "flex items-baseline justify-between gap-4";

async function ConfirmedContent({ searchParams }: PageProps<"/hotel/book/confirmed">) {
  const checkout = await getCheckout(first((await searchParams).session_id) ?? "");
  // shortcut: the booking is confirmed when the guest lands here after paying. A guest who pays and
  // closes the tab first stays "held"; a Stripe webhook should confirm those before real money is taken.
  if (checkout?.paid) await confirmBooking(checkout.publicId, first((await searchParams).session_id)!);
  const booking = checkout ? await getBooking(checkout.publicId) : null;
  const room = booking && findRoom(booking.roomSlug);

  if (!booking || !room || booking.status !== "confirmed") {
    return (
      <div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 pb-24 pt-12 sm:px-6">
        <h1 className="text-4xl font-bold tracking-tight">This booking is not confirmed</h1>
        <p className="text-lg text-muted">
          We could not find a completed payment for this booking, so no room is reserved. If you were
          charged, message the hotel with the email you used and we will sort it out.
        </p>
        <Link href="/hotel/rooms" className={`self-start ${primaryButton}`}>
          Choose dates again
        </Link>
      </div>
    );
  }

  const nights = Math.round((Date.parse(booking.checkOut) - Date.parse(booking.checkIn)) / 86_400_000);
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 pb-24 pt-12 sm:px-6">
      <div className="flex flex-col gap-4">
        <CheckCircle size={48} weight="fill" aria-hidden className="text-accent" />
        <h1 className="text-4xl font-bold tracking-tight">Your room is booked</h1>
        <p className="text-lg text-muted">
          Thank you, {booking.guestName}. We look forward to welcoming you on {formatDay(booking.checkIn)}.
        </p>
      </div>

      <section className="flex flex-col gap-4 rounded-2xl border border-line bg-raised p-6">
        <p className="flex flex-col gap-1">
          <span className="text-sm font-semibold text-muted">Booking reference</span>
          <span className="text-2xl font-bold tracking-tight">{booking.reference}</span>
        </p>
        <dl className="flex flex-col gap-2 border-t border-line pt-4 text-base">
          <div className={row}>
            <dt className="text-muted">Room</dt>
            <dd className="text-right font-semibold">{room.name}</dd>
          </div>
          <div className={row}>
            <dt className="text-muted">Dates</dt>
            <dd className="text-right font-semibold">
              {formatDay(booking.checkIn)} to {formatDay(booking.checkOut)}
            </dd>
          </div>
          <div className={row}>
            <dt className="text-muted">Stay</dt>
            <dd className="text-right font-semibold">
              {nightsLabel(nights)} · {guestsLabel(booking.guests)}
            </dd>
          </div>
          <div className={row}>
            <dt className="text-muted">Address</dt>
            <dd className="text-right font-semibold">{hotel.address}</dd>
          </div>
        </dl>
      </section>

      <section className="flex flex-col gap-4 rounded-2xl border border-line bg-raised p-6">
        <h2 className="text-xl font-bold tracking-tight">Payment</h2>
        <dl className="flex flex-col gap-2 text-base">
          <div className={row}>
            <dt>Total, taxes included</dt>
            <dd>{formatRM(booking.totalSen)}</dd>
          </div>
          <div className={row}>
            <dt>Deposit paid today</dt>
            <dd>{formatRM(booking.depositSen)}</dd>
          </div>
          <div className={`${row} mt-2 border-t border-line pt-4 font-bold`}>
            <dt>Balance to pay at the hotel</dt>
            <dd>{formatRM(booking.totalSen - booking.depositSen)}</dd>
          </div>
        </dl>
        <p className="text-sm text-muted">
          Free cancellation until {formatDay(addDays(booking.checkIn, -3))}, with the deposit refunded in
          full. After that the deposit is kept.
        </p>
      </section>

      <p className="rounded-2xl border border-dashed border-line p-4 text-sm text-muted">
        Concept project: this was a test payment and no money moved. A live site would also email this
        confirmation to {booking.guestEmail}. Keep this page or note your reference.
      </p>

      <Link href="/hotel" className={`self-start ${secondaryButton}`}>
        Back to the hotel
      </Link>
    </div>
  );
}

// Reads the payment and the booking per request, so it streams in behind a loading state.
export default function ConfirmedPage(props: PageProps<"/hotel/book/confirmed">) {
  return (
    <Suspense fallback={<Loading />}>
      <ConfirmedContent {...props} />
    </Suspense>
  );
}
