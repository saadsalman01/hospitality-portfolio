import Link from "next/link";
import { formatDay, formatRM, type Quote, type Stay } from "@/lib/booking/pricing";

export const fluid = "transition-all duration-700 ease-fluid";
export const primaryButton = `inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-accent px-6 py-2 text-base font-semibold text-on-accent hover:opacity-90 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${fluid}`;
export const secondaryButton = `inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-line bg-raised px-6 py-2 text-base font-semibold text-ink hover:border-ink active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${fluid}`;

/** "?in=…&out=…&guests=…" so the chosen stay follows the guest from page to page. */
export const stayQuery = (stay: Stay) =>
  `?in=${stay.checkIn}&out=${stay.checkOut}&guests=${stay.guests}`;

export const nightsLabel = (n: number) => `${n} ${n === 1 ? "night" : "nights"}`;
export const guestsLabel = (n: number) => `${n} ${n === 1 ? "guest" : "guests"}`;

const steps = ["Dates", "Room", "Details", "Payment"] as const;

/** Where the guest is in the booking. Earlier steps are links back; later ones are plain text. */
export function Steps({ current, stay }: { current: (typeof steps)[number]; stay: Stay }) {
  const at = steps.indexOf(current);
  const hrefs = ["/hotel#dates", `/hotel/rooms${stayQuery(stay)}`];
  return (
    <nav aria-label="Booking steps">
      <ol className="flex flex-wrap items-center gap-2 text-sm font-semibold">
        {steps.map((step, i) => (
          <li key={step} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden className="text-line">/</span>}
            {i < at ? (
              <Link href={hrefs[i]} className={`text-muted underline underline-offset-4 hover:text-ink ${fluid}`}>
                {step}
              </Link>
            ) : (
              <span
                aria-current={i === at ? "step" : undefined}
                className={i === at ? "rounded-full bg-accent px-3 py-1 text-on-accent" : "text-muted"}
              >
                {step}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** The chosen stay, repeated at the top of every step with a way to change it. */
export function StaySummary({ stay, changeHref }: { stay: Stay; changeHref: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-line bg-raised p-4">
      <p>
        <span className="block text-base font-semibold">
          {formatDay(stay.checkIn)} to {formatDay(stay.checkOut)}
        </span>
        <span className="block text-sm text-muted">
          {nightsLabel(stay.nights)} · {guestsLabel(stay.guests)}
        </span>
      </p>
      <Link href={changeHref} className={`text-sm font-semibold underline underline-offset-4 hover:text-accent ${fluid}`}>
        Change
      </Link>
    </div>
  );
}

/** Every line that makes up the total, then how it splits into deposit and balance. */
export function PriceBreakdown({ q, rateSen }: { q: Quote; rateSen: number }) {
  const row = "flex items-baseline justify-between gap-4";
  return (
    <dl className="flex flex-col gap-2 text-base">
      <div className={row}>
        <dt>
          {nightsLabel(q.nights)} at {formatRM(rateSen)}
        </dt>
        <dd>{formatRM(q.room)}</dd>
      </div>
      <div className={row}>
        <dt>Service tax 8%</dt>
        <dd>{formatRM(q.serviceTax)}</dd>
      </div>
      <div className={row}>
        <dt>Tourism tax</dt>
        <dd>{formatRM(q.tourismTax)}</dd>
      </div>
      <div className={`${row} mt-2 border-t border-line pt-4 font-bold`}>
        <dt>Total</dt>
        <dd>{formatRM(q.total)}</dd>
      </div>
      <div className={`${row} text-muted`}>
        <dt>Deposit today (30%)</dt>
        <dd>{formatRM(q.deposit)}</dd>
      </div>
      <div className={`${row} text-muted`}>
        <dt>Balance at the hotel</dt>
        <dd>{formatRM(q.balance)}</dd>
      </div>
    </dl>
  );
}
