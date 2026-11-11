import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CaretDown } from "@phosphor-icons/react/dist/ssr";
import { DateBar } from "@/components/hotel/date-bar";
import { fluid } from "@/components/hotel/parts";
import { Reveal } from "@/components/reveal";
import { hotel as h } from "@/content/properties/hotel";
import { formatRM } from "@/lib/booking/pricing";

const section = "mx-auto max-w-6xl px-4 py-24 sm:px-6";
const eyebrow = "text-sm font-medium tracking-widest text-[#4f6f52] uppercase";
const h2 = "text-3xl font-semibold tracking-tight sm:text-4xl";
const cream = `inline-flex min-h-12 items-center gap-2 bg-[#ece3ce] px-6 py-2 text-sm font-semibold text-ink hover:bg-ink hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${fluid}`;

const stats = [
  { value: "14", label: "Rooms" },
  { value: "1926", label: "Year the house was built" },
  { value: "0%", label: "Booking fee when you book here" },
];

export default function HotelHome() {
  return (
    <>
      {/* Hero: green band with the headline, the photo hanging over its lower edge */}
      <section className="bg-accent text-on-accent">
        <div className="mx-auto max-w-6xl px-4 pt-12 pb-12 sm:px-6 sm:pt-16">
          <p className="text-sm font-medium tracking-widest text-white/70 uppercase">
            {h.place}
          </p>
          <h1 className="mt-4 max-w-4xl text-5xl font-bold tracking-tight capitalize sm:text-7xl">
            {h.hero.headline.join(" ")}
          </h1>
        </div>
      </section>
      <section className="bg-linear-to-b from-accent from-50% to-surface to-50%">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="round relative overflow-hidden">
            <Image
              src={h.hero.photo.src}
              alt={h.hero.photo.alt}
              priority
              placeholder="blur"
              sizes="(min-width: 1152px) 1104px, 100vw"
              className="aspect-[4/3] w-full object-cover sm:aspect-[16/8]"
            />
            <div className="flex flex-col gap-4 bg-[#4f6f52] p-6 text-white md:absolute md:right-0 md:bottom-0 md:max-w-md md:bg-[#4f6f52]/90">
              <p className="text-sm">{h.hero.sub}</p>
              <Link
                href="/hotel/rooms"
                className={`inline-flex items-center gap-2 self-start text-sm font-semibold underline underline-offset-4 hover:gap-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${fluid}`}
              >
                View room list{" "}
                <ArrowRight size={16} weight="bold" aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* The date bar comes first after the hero, because every later price depends on it */}
      <section className="mx-auto max-w-6xl px-4 pt-12 sm:px-6">
        <DateBar />
      </section>

      <section id="the-hotel" className={section}>
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <ul className="grid grid-cols-2 gap-4">
            {h.about.photos.map((photo, i) => (
              <li key={photo.alt} className={i === 1 ? "pt-12" : "pb-12"}>
                <Reveal delay={i * 100}>
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    placeholder="blur"
                    sizes="(min-width: 768px) 270px, 50vw"
                    className="aspect-[3/4] w-full object-cover"
                  />
                </Reveal>
              </li>
            ))}
          </ul>
          <Reveal className="flex flex-col items-start gap-6">
            <p className={eyebrow}>About the hotel</p>
            <h2 className={h2}>
              A trader&apos;s house from 1926, now fourteen quiet rooms
            </h2>
            <p className="text-base text-muted">{h.about.body}</p>
            <Link href="/hotel/rooms" className={cream}>
              See the rooms
            </Link>
          </Reveal>
        </div>
        <dl className="mt-24 grid gap-8 border-y border-line py-12 sm:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col-reverse gap-2">
              <dt className="text-sm text-muted">{s.label}</dt>
              <dd className="text-5xl font-bold tracking-tight text-accent">
                {s.value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Rooms: photo cards with the name and a "from" price laid over the picture */}
      <section className="bg-raised">
        <div className={section}>
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div className="flex max-w-xl flex-col gap-4">
              <p className={eyebrow}>Our rooms</p>
              <h2 className={h2}>Three kinds of room, all with breakfast</h2>
            </div>
            <Link href="/hotel/rooms" className={cream}>
              All rooms
            </Link>
          </Reveal>
          <ul className="mt-12 grid gap-6 md:grid-cols-3">
            {h.rooms.map((room, i) => (
              <li key={room.slug}>
                <Reveal delay={i * 100}>
                  <Link
                    href={`/hotel/rooms/${room.slug}`}
                    className="round group relative block overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    <Image
                      src={room.photo.src}
                      alt={room.photo.alt}
                      placeholder="blur"
                      sizes="(min-width: 768px) 360px, 100vw"
                      className={`aspect-[4/5] w-full object-cover group-hover:scale-105 ${fluid}`}
                    />
                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-ink/80 p-4 text-white">
                      <p>
                        <span className="block text-xl font-semibold tracking-tight">
                          {room.name}
                        </span>
                        <span className="block text-sm text-white/80">
                          {room.bed} · sleeps {room.sleeps}
                        </span>
                      </p>
                      <p className="shrink-0 text-right">
                        <span className="block text-xl font-semibold">
                          {formatRM(room.rateSen)}
                        </span>
                        <span className="block text-sm text-white/80">
                          a night, before tax
                        </span>
                      </p>
                    </div>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Photo banner */}
      <section className="relative">
        <Image
          src={h.about.photos[1].src}
          alt=""
          placeholder="blur"
          sizes="100vw"
          className="flat absolute inset-0 size-full object-cover"
        />
        <div className="relative bg-ink/70">
          <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-4 py-24 text-white sm:px-6">
            <h2 className={`max-w-xl ${h2}`}>{h.tagline.join(" ")}</h2>
            <p className="max-w-xl text-base text-white/85">
              Book on this site and the price you see is the price you pay:
              taxes included, no booking fee, and free cancellation up to 3 days
              before arrival.
            </p>
            <Link href="/hotel#dates" className={cream}>
              Check availability
            </Link>
          </div>
        </div>
      </section>

      <section id="location" className={section}>
        <Reveal className="grid gap-12 md:grid-cols-2">
          <div className="flex flex-col items-start gap-6">
            <p className={eyebrow}>Location</p>
            <h2 className={h2}>
              Inside the old town, a walk from almost everything
            </h2>
            <p className="text-base text-muted">
              {h.address}, inside the UNESCO heritage zone.
            </p>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Lebuh+Armenian+George+Town+Penang"
              target="_blank"
              rel="noopener noreferrer"
              className={cream}
            >
              Open in Maps
            </a>
          </div>
          <ul className="flex flex-col self-center">
            {h.nearby.map((n) => (
              <li
                key={n.place}
                className="flex items-baseline justify-between gap-4 border-b border-line py-4 text-base"
              >
                <span className="font-semibold">{n.place}</span>
                <span className="shrink-0 text-muted">{n.time}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section id="questions" className="bg-raised">
        <div className="mx-auto max-w-3xl px-4 py-24 sm:px-6">
          <Reveal className="flex flex-col items-center gap-4 text-center">
            <p className={eyebrow}>Questions</p>
            <h2 className={h2}>Good to know before you book</h2>
          </Reveal>
          <div className="mt-12 flex flex-col gap-4">
            {h.faq.map((item) => (
              <details
                key={item.q}
                className="group border border-line bg-surface p-6"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <CaretDown
                    size={20}
                    aria-hidden
                    className={`shrink-0 text-muted group-open:rotate-180 ${fluid}`}
                  />
                </summary>
                <p className="mt-4 text-base text-muted">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
