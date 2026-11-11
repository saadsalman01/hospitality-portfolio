import type { Metadata } from "next";
import { Suspense } from "react";
import Loading from "@/app/(demos)/hotel/loading";
import { connection } from "next/server";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, Info } from "@phosphor-icons/react/dist/ssr";
import { DateBar } from "@/components/hotel/date-bar";
import { fluid, PriceBreakdown, primaryButton, stayQuery, StaySummary } from "@/components/hotel/parts";
import { findRoom } from "@/content/properties/hotel";
import { freeUnits } from "@/lib/booking/availability";
import { addDays, formatDay, formatRM, hotelToday, parseStay, quote } from "@/lib/booking/pricing";

const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

export async function generateMetadata({ params }: PageProps<"/hotel/rooms/[slug]">): Promise<Metadata> {
  const room = findRoom((await params).slug);
  return { title: room?.name ?? "Room" };
}

async function RoomPageContent({ params, searchParams }: PageProps<"/hotel/rooms/[slug]">) {
  const room = findRoom((await params).slug);
  if (!room) notFound();

  const sp = await searchParams;
  await connection(); // the clock is read below, so this must render per request
  const parsed = parseStay(
    { checkIn: first(sp.in), checkOut: first(sp.out), guests: first(sp.guests) },
    hotelToday(),
  );
  const stay = parsed && !("error" in parsed) ? parsed : null;
  const q = stay && quote(room.rateSen, stay.nights);
  const available = stay ? ((await freeUnits(stay.checkIn, stay.checkOut))[room.slug] ?? 0) > 0 : false;
  const tooMany = stay ? stay.guests > room.sleeps : false;
  const bookable = stay && q && available && !tooMany;

  return (
    <div className={`mx-auto flex max-w-3xl flex-col gap-12 px-4 sm:px-6 ${bookable ? "pb-40" : "pb-24"}`}>
      <div className="flex flex-col gap-6 pt-12">
        <Link
          href={`/hotel/rooms${stay ? stayQuery(stay) : ""}`}
          className={`inline-flex items-center gap-2 self-start text-sm font-semibold text-muted hover:text-ink ${fluid}`}
        >
          <ArrowLeft size={16} weight="bold" aria-hidden /> All rooms
        </Link>
        <h1 className="text-4xl font-bold tracking-tight">{room.name}</h1>
      </div>

      <Image
        src={room.photo.src}
        alt={room.photo.alt}
        priority
        placeholder="blur"
        sizes="(min-width: 768px) 720px, 100vw"
        className="aspect-[4/3] w-full rounded-3xl object-cover"
      />

      <section className="flex flex-col gap-6">
        <p className="text-lg text-muted">{room.description}</p>
        <ul className="grid grid-cols-2 gap-4 text-base">
          {room.features.map((f) => (
            <li key={f} className="flex items-center gap-2">
              <Check size={16} weight="bold" aria-hidden className="shrink-0 text-accent" /> {f}
            </li>
          ))}
        </ul>
      </section>

      {stay && q ? (
        <section className="flex flex-col gap-6">
          <h2 className="text-2xl font-bold tracking-tight">Price for your stay</h2>
          <StaySummary stay={stay} changeHref={`/hotel/rooms/${room.slug}`} />
          {tooMany ? (
            <p className="flex gap-2 rounded-2xl border border-line bg-raised p-6 text-base">
              <Info size={20} aria-hidden className="shrink-0 text-muted" />
              This room sleeps {room.sleeps}. Choose fewer guests or another room.
            </p>
          ) : available ? (
            <div className="rounded-2xl border border-line bg-raised p-6">
              <PriceBreakdown q={q} rateSen={room.rateSen} />
            </div>
          ) : (
            <p className="flex gap-2 rounded-2xl border border-line bg-raised p-6 text-base">
              <Info size={20} aria-hidden className="shrink-0 text-muted" />
              This room is not available for these dates. Change the dates above, or see the other rooms.
            </p>
          )}
        </section>
      ) : (
        <section className="flex flex-col gap-6">
          <h2 className="text-2xl font-bold tracking-tight">Check your dates</h2>
          <p className="text-base text-muted">
            From {formatRM(room.rateSen)} a night, before tax. Choose dates to see the full price.
          </p>
          <DateBar
            room={room.slug}
            checkIn={first(sp.in)}
            checkOut={first(sp.out)}
            guests={Number(first(sp.guests)) || 2}
            error={parsed && "error" in parsed ? parsed.error : undefined}
          />
        </section>
      )}

      <section className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold tracking-tight">Cancellation</h2>
        <p className="text-base text-muted">
          {stay
            ? `Free until ${formatDay(addDays(stay.checkIn, -3))}, with the deposit refunded in full. After that the deposit is kept.`
            : "Free up to 3 days before arrival, with the deposit refunded in full. After that the deposit is kept."}
        </p>
      </section>

      {bookable && (
        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-raised">
          <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
            <p>
              <span className="block text-xl font-bold tracking-tight">{formatRM(q.total)}</span>
              <span className="block text-sm text-muted">Total, taxes included</span>
            </p>
            <Link href={`/hotel/book${stayQuery(stay)}&room=${room.slug}`} className={primaryButton}>
              Book this room
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

// Availability is read per request, so the page streams in behind a loading state.
export default function RoomPage(props: PageProps<"/hotel/rooms/[slug]">) {
  return (
    <Suspense fallback={<Loading />}>
      <RoomPageContent {...props} />
    </Suspense>
  );
}
