import type { Metadata } from "next";
import { Suspense } from "react";
import Loading from "@/app/(demos)/hotel/loading";
import { connection } from "next/server";
import Image from "next/image";
import Link from "next/link";
import { Info } from "@phosphor-icons/react/dist/ssr";
import { DateBar } from "@/components/hotel/date-bar";
import {
  fluid,
  nightsLabel,
  primaryButton,
  secondaryButton,
  stayQuery,
  StaySummary,
  Steps,
} from "@/components/hotel/parts";
import { hotel } from "@/content/properties/hotel";
import { freeUnits } from "@/lib/booking/availability";
import { addDays, formatDay, formatRM, hotelToday, parseStay, quote, type Stay } from "@/lib/booking/pricing";

export const metadata: Metadata = { title: "Rooms" };

const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

/** For rooms with nothing free: the nearest later stay of the same length, looking up to two weeks ahead. */
async function nextFreeStays(stay: Stay, taken: string[]): Promise<Record<string, Stay>> {
  const found: Record<string, Stay> = {};
  for (let shift = 1; shift <= 14 && Object.keys(found).length < taken.length; shift++) {
    const shifted = { ...stay, checkIn: addDays(stay.checkIn, shift), checkOut: addDays(stay.checkOut, shift) };
    const free = await freeUnits(shifted.checkIn, shifted.checkOut);
    for (const slug of taken) if (!found[slug] && (free[slug] ?? 0) > 0) found[slug] = shifted;
  }
  return found;
}

async function RoomsPageContent({ searchParams }: PageProps<"/hotel/rooms">) {
  const sp = await searchParams;
  await connection(); // the clock is read below, so this must render per request
  const parsed = parseStay(
    { checkIn: first(sp.in), checkOut: first(sp.out), guests: first(sp.guests) },
    hotelToday(),
  );

  // No dates yet, or dates that need fixing: browse the rooms with the date bar on top.
  if (!parsed || "error" in parsed) {
    return (
      <div className="mx-auto flex max-w-4xl flex-col gap-12 px-4 pb-24 sm:px-6">
        <header className="flex flex-col gap-4 pt-12">
          <h1 className="text-4xl font-bold tracking-tight">Rooms</h1>
          <p className="text-lg text-muted">Choose your dates to see what is free and the full price.</p>
        </header>
        <DateBar
          checkIn={first(sp.in)}
          checkOut={first(sp.out)}
          guests={Number(first(sp.guests)) || 2}
          error={parsed?.error}
        />
        <ul className="flex flex-col gap-6">
          {hotel.rooms.map((room) => (
            <li key={room.slug} className="grid gap-4 rounded-2xl border border-line bg-raised p-2 sm:grid-cols-[240px_1fr]">
              <Image
                src={room.photo.src}
                alt={room.photo.alt}
                placeholder="blur"
                sizes="(min-width: 640px) 240px, 100vw"
                className="aspect-[4/3] w-full rounded-lg object-cover"
              />
              <div className="flex flex-col gap-2 p-4">
                <h2 className="text-xl font-bold tracking-tight">{room.name}</h2>
                <p className="text-sm text-muted">
                  {room.bed} · sleeps {room.sleeps} · {room.size} · breakfast included
                </p>
                <p className="text-sm text-muted">
                  from <span className="text-base font-bold text-ink">{formatRM(room.rateSen)}</span> a night,
                  before tax
                </p>
                <Link
                  href={`/hotel/rooms/${room.slug}`}
                  className={`mt-auto pt-2 text-base font-semibold text-accent underline underline-offset-4 ${fluid}`}
                >
                  Room details
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  const stay = parsed;
  const query = stayQuery(stay);
  const free = await freeUnits(stay.checkIn, stay.checkOut);
  const fits = hotel.rooms.filter((r) => r.sleeps >= stay.guests);
  const taken = fits.filter((r) => (free[r.slug] ?? 0) === 0).map((r) => r.slug);
  const alternatives = taken.length ? await nextFreeStays(stay, taken) : {};

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 pb-24 sm:px-6">
      <div className="flex flex-col gap-6 pt-12">
        <Steps current="Room" stay={stay} />
        <h1 className="text-4xl font-bold tracking-tight">Rooms for your dates</h1>
        <StaySummary stay={stay} changeHref={`/hotel/rooms`} />
      </div>

      {fits.length === 0 && (
        <p className="rounded-2xl border border-line bg-raised p-6 text-base">
          No single room sleeps {stay.guests}. Book two rooms, or message the hotel and we will arrange it.
        </p>
      )}

      <ul className="flex flex-col gap-6">
        {fits.map((room) => {
          const q = quote(room.rateSen, stay.nights);
          const available = (free[room.slug] ?? 0) > 0;
          const alt = alternatives[room.slug];
          return (
            <li key={room.slug} className="grid gap-4 rounded-2xl border border-line bg-raised p-2 sm:grid-cols-[240px_1fr]">
              <Image
                src={room.photo.src}
                alt={room.photo.alt}
                placeholder="blur"
                sizes="(min-width: 640px) 240px, 100vw"
                className={`aspect-[4/3] w-full rounded-lg object-cover ${available ? "" : "opacity-60"}`}
              />
              <div className="flex flex-col gap-4 p-4">
                <div className="flex flex-col gap-2">
                  <h2 className="text-xl font-bold tracking-tight">{room.name}</h2>
                  <p className="text-sm text-muted">
                    {room.bed} · sleeps {room.sleeps} · {room.size} · breakfast included
                  </p>
                </div>

                {available ? (
                  <>
                    <div className="mt-auto flex flex-wrap items-end justify-between gap-4">
                      <p>
                        <span className="block text-2xl font-bold tracking-tight">{formatRM(q.total)}</span>
                        <span className="block text-sm text-muted">
                          Total for {nightsLabel(stay.nights)}, taxes included
                        </span>
                      </p>
                      <Link href={`/hotel/book${query}&room=${room.slug}`} className={primaryButton}>
                        Select
                      </Link>
                    </div>
                    <Link
                      href={`/hotel/rooms/${room.slug}${query}`}
                      className={`text-sm font-semibold text-accent underline underline-offset-4 ${fluid}`}
                    >
                      Room details and price breakdown
                    </Link>
                  </>
                ) : (
                  <>
                    <p className="flex gap-2 rounded-lg border border-line p-3 text-sm">
                      <Info size={20} aria-hidden className="shrink-0 text-muted" />
                      <span>
                        <span className="block font-semibold">Not available for these dates</span>
                        {alt ? (
                          <span className="block text-muted">
                            Next free: {formatDay(alt.checkIn)} to {formatDay(alt.checkOut)}.
                          </span>
                        ) : (
                          <span className="block text-muted">Nothing free in the two weeks after.</span>
                        )}
                      </span>
                    </p>
                    {alt && (
                      <Link href={`/hotel/rooms${stayQuery(alt)}`} className={`self-start ${secondaryButton}`}>
                        See those dates
                      </Link>
                    )}
                  </>
                )}
              </div>
            </li>
          );
        })}
      </ul>

      <p className="text-sm text-muted">
        Prices include 8% service tax and tourism tax of RM 10 per room per night. You pay a 30%
        deposit when you book and the balance at the hotel.
      </p>
    </div>
  );
}

// Availability is read per request, so the page streams in behind a loading state.
export default function RoomsPage(props: PageProps<"/hotel/rooms">) {
  return (
    <Suspense fallback={<Loading />}>
      <RoomsPageContent {...props} />
    </Suspense>
  );
}
