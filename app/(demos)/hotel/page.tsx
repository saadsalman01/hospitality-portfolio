import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CaretDown, MapPin } from "@phosphor-icons/react/dist/ssr";
import { DateBar } from "@/components/hotel/date-bar";
import { fluid, secondaryButton } from "@/components/hotel/parts";
import { Reveal } from "@/components/reveal";
import { TaglineReveal } from "@/components/tagline-reveal";
import { hotel as h } from "@/content/properties/hotel";
import { formatRM } from "@/lib/booking/pricing";

const section = "mx-auto max-w-6xl px-4 pb-24 sm:px-6";

export default function HotelHome() {
  return (
    <>
      {/* Hero: headline, then the date bar, because every later price depends on it */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto flex max-w-[680px] flex-col items-center gap-6 pt-12 text-center">
          <p className="flex items-center gap-2 text-sm font-semibold text-muted">
            <MapPin size={16} weight="fill" aria-hidden />
            {h.place}
          </p>
          <h1 className="bg-linear-to-r from-black to-[#666666] bg-clip-text pb-1 text-4xl font-bold tracking-tight text-transparent sm:text-5xl">
            {h.hero.headline.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>
          <p className="text-lg text-muted">{h.hero.sub}</p>
        </div>

        <div className="mx-auto mt-12 max-w-4xl">
          <DateBar />
        </div>

        <Reveal className="mt-12">
          <Image
            src={h.hero.photo.src}
            alt={h.hero.photo.alt}
            priority
            placeholder="blur"
            sizes="(min-width: 1152px) 1104px, 100vw"
            className="aspect-[4/3] w-full rounded-3xl object-cover sm:aspect-[16/9]"
          />
        </Reveal>
      </section>

      <section aria-label="What staying here is like" className="px-4 py-24 sm:px-6">
        <TaglineReveal lines={h.tagline} />
      </section>

      {/* Rooms: a "from" price for guests who browse before choosing dates */}
      <section className={section}>
        <Reveal className="flex items-end justify-between gap-4">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Rooms</h2>
          <Link href="/hotel/rooms" className={`inline-flex items-center gap-2 text-base font-semibold text-accent hover:gap-3 ${fluid}`}>
            All rooms <ArrowRight size={16} weight="bold" aria-hidden />
          </Link>
        </Reveal>
        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {h.rooms.map((room, i) => (
            <li key={room.slug}>
              <Reveal delay={i * 100} className="h-full">
                <Link
                  href={`/hotel/rooms/${room.slug}`}
                  className={`group flex h-full flex-col rounded-2xl border border-line bg-raised p-2 hover:border-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${fluid}`}
                >
                  <Image
                    src={room.photo.src}
                    alt={room.photo.alt}
                    placeholder="blur"
                    sizes="(min-width: 768px) 360px, 100vw"
                    className="aspect-[4/3] w-full rounded-lg object-cover"
                  />
                  <div className="flex flex-1 flex-col gap-2 p-4">
                    <h3 className="text-xl font-bold tracking-tight">{room.name}</h3>
                    <p className="text-sm text-muted">
                      {room.bed} · sleeps {room.sleeps} · {room.size}
                    </p>
                    <p className="mt-auto pt-4 text-sm text-muted">
                      from <span className="text-base font-bold text-ink">{formatRM(room.rateSen)}</span>{" "}
                      a night, before tax
                    </p>
                  </div>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      <section id="the-hotel" className={section}>
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <Reveal>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">The hotel</h2>
            <p className="mt-4 text-lg text-muted">{h.about.body}</p>
          </Reveal>
          <ul className="grid grid-cols-2 gap-4">
            {h.about.photos.map((photo, i) => (
              <li key={photo.alt}>
                <Reveal delay={i * 100}>
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    placeholder="blur"
                    sizes="(min-width: 768px) 270px, 50vw"
                    className="aspect-[3/4] w-full rounded-2xl object-cover"
                  />
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="location" className={section}>
        <Reveal className="grid gap-12 rounded-3xl border border-line bg-raised p-6 sm:p-12 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Location</h2>
            <p className="mt-4 text-lg text-muted">
              {h.address}, inside the UNESCO heritage zone. Most of the old town is a walk away.
            </p>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Lebuh+Armenian+George+Town+Penang"
              target="_blank"
              rel="noopener noreferrer"
              className={`mt-6 ${secondaryButton}`}
            >
              Open in Maps
            </a>
          </div>
          <ul className="flex flex-col gap-4 self-center">
            {h.nearby.map((n) => (
              <li key={n.place} className="flex items-baseline justify-between gap-4 text-base">
                <span className="font-semibold">{n.place}</span>
                <span className="shrink-0 text-muted">{n.time}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section id="questions" className="mx-auto max-w-3xl px-4 pb-24 sm:px-6">
        <Reveal>
          <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">Questions</h2>
        </Reveal>
        <div className="mt-12 flex flex-col gap-4">
          {h.faq.map((item) => (
            <details key={item.q} className="group rounded-2xl border border-line bg-raised p-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold [&::-webkit-details-marker]:hidden">
                {item.q}
                <CaretDown size={20} aria-hidden className={`shrink-0 text-muted group-open:rotate-180 ${fluid}`} />
              </summary>
              <p className="mt-4 text-base text-muted">{item.a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
