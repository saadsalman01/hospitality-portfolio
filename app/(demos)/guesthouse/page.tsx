import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Bed,
  CaretDown,
  Coffee,
  HandCoins,
  MapPin,
  Ruler,
  ShieldCheck,
  Users,
  WhatsappLogo,
  ChatCircleDots,
} from "@phosphor-icons/react/dist/ssr";
import { IslandNav } from "@/components/island-nav";
import { Reveal } from "@/components/reveal";
import { TaglineReveal } from "@/components/tagline-reveal";
import { guesthouse as g, whatsapp } from "@/content/properties/guesthouse";

export const metadata: Metadata = {
  title: `${g.name} guesthouse in ${g.place} | Book direct`,
  description:
    "Six garden rooms five minutes from central Ubud. Book direct by WhatsApp for the lowest rate, with breakfast included and free cancellation.",
  openGraph: {
    title: `${g.name} guesthouse, ${g.place}`,
    description: "Six garden rooms five minutes from central Ubud. Book direct for the lowest rate.",
    images: ["/guesthouse/hero.jpg"],
  },
};

const fluid = "transition-all duration-700 ease-fluid";
const button = `inline-flex min-h-12 items-center gap-2 rounded-full bg-accent px-3 py-2 text-base font-semibold text-on-accent hover:opacity-90 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${fluid}`;

const bookLink = whatsapp(
  `Hi ${g.name}, I would like to check availability.\nArrival: \nNights: \nGuests: `,
);
const benefitIcons = [HandCoins, Coffee, ShieldCheck, ChatCircleDots];

function BookButton({ label = "Check dates on WhatsApp" }: { label?: string }) {
  return (
    <a href={bookLink} target="_blank" rel="noopener noreferrer" className={button}>
      <WhatsappLogo size={20} weight="fill" aria-hidden />
      {label}
    </a>
  );
}

export default function GuesthousePage() {
  return (
    <div id="top" style={g.theme} className="bg-surface text-ink">
      <a
        href="#main"
        className="sr-only rounded-full bg-accent px-3 py-2 text-sm font-semibold text-on-accent focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60]"
      >
        Skip to content
      </a>

      <IslandNav
        brand={g.name}
        links={[
          { href: "#rooms", label: "Rooms" },
          { href: "#direct", label: "Why direct" },
          { href: "#location", label: "Location" },
          { href: "#faq", label: "Questions" },
        ]}
        cta={{ href: bookLink, label: "Check dates" }}
      />

      <main id="main">
        {/* Hero */}
        <section className="mx-auto max-w-6xl px-4 pt-24 sm:px-6 sm:pt-32">
          <div className="mx-auto flex max-w-[680px] flex-col items-center gap-6 pt-12 text-center">
            <p className="flex items-center gap-2 text-sm font-semibold text-muted">
              <MapPin size={16} weight="fill" aria-hidden />
              {g.place}
            </p>
            <h1 className="bg-linear-to-r from-black to-[#666666] bg-clip-text pb-1 text-4xl font-bold tracking-tight text-transparent sm:text-5xl">
              {g.hero.headline.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h1>
            <p className="text-lg text-muted">{g.hero.sub}</p>
            <BookButton />
            <p className="flex items-center gap-2 text-sm font-semibold text-ink">
              <ShieldCheck size={16} weight="fill" className="text-accent" aria-hidden />
              {g.hero.proof}
            </p>
          </div>

          <Reveal className="mt-12">
            <Image
              src={g.hero.photo.src}
              alt={g.hero.photo.alt}
              priority
              placeholder="blur"
              sizes="(min-width: 1152px) 1104px, 100vw"
              className="aspect-[4/3] w-full rounded-3xl object-cover sm:aspect-[16/9]"
            />
          </Reveal>
        </section>

        {/* Tagline reveal */}
        <section aria-label="What staying here is like" className="px-4 py-24 sm:px-6">
          <TaglineReveal lines={g.tagline} />
        </section>

        {/* Rooms */}
        <section id="rooms" className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
          <Reveal className="mx-auto max-w-[680px] text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Three kinds of room</h2>
            <p className="mt-4 text-lg text-muted">
              Every room has air conditioning, hot water, fibre wifi and its own outdoor seat.
              Prices are per night for the whole room, breakfast included.
            </p>
          </Reveal>

          <ul className="mt-12 grid gap-6 md:grid-cols-3">
            {g.rooms.map((room, i) => (
              <li key={room.name}>
                <Reveal
                  delay={i * 100}
                  className="flex h-full flex-col rounded-2xl border border-line bg-raised p-2"
                >
                  <Image
                    src={room.photo.src}
                    alt={room.photo.alt}
                    placeholder="blur"
                    sizes="(min-width: 768px) 360px, 100vw"
                    className="aspect-[4/3] w-full rounded-lg object-cover"
                  />
                  <div className="flex flex-1 flex-col gap-4 p-4">
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="text-xl font-bold tracking-tight">{room.name}</h3>
                      <p className="text-sm text-muted">
                        from <span className="text-base font-bold text-ink">{room.price}</span>
                      </p>
                    </div>
                    <ul className="flex flex-col gap-2 text-sm text-muted">
                      <li className="flex items-center gap-2">
                        <Bed size={16} aria-hidden /> {room.bed}
                      </li>
                      <li className="flex items-center gap-2">
                        <Users size={16} aria-hidden /> {room.sleeps}
                      </li>
                      <li className="flex items-center gap-2">
                        <Ruler size={16} aria-hidden /> {room.size}
                      </li>
                    </ul>
                    <a
                      href={whatsapp(
                        `Hi ${g.name}, is the ${room.name.toLowerCase()} free?\nArrival: \nNights: \nGuests: `,
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`mt-auto inline-flex items-center gap-2 text-base font-semibold text-accent hover:gap-3 ${fluid}`}
                    >
                      Ask about this room <ArrowRight size={16} weight="bold" aria-hidden />
                    </a>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </section>

        {/* Why book direct */}
        <section id="direct" className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
          <Reveal className="mx-auto max-w-[680px] text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Why guests message us directly
            </h2>
          </Reveal>
          <ul className="mt-12 grid gap-6 sm:grid-cols-2">
            {g.benefits.map((b, i) => {
              const Icon = benefitIcons[i];
              return (
                <li key={b.title}>
                  <Reveal
                    delay={(i % 2) * 100}
                    className="flex h-full gap-4 rounded-2xl border border-line bg-raised p-6"
                  >
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-accent text-on-accent">
                      <Icon size={24} aria-hidden />
                    </span>
                    <div>
                      <h3 className="text-xl font-bold tracking-tight">{b.title}</h3>
                      <p className="mt-2 text-base text-muted">{b.body}</p>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </section>

        {/* How it works */}
        <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
          <Reveal className="mx-auto max-w-[680px] text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Booked in three messages
            </h2>
          </Reveal>
          <ol className="mt-12 grid gap-6 md:grid-cols-3">
            {g.steps.map((s, i) => (
              <li key={s.title}>
                <Reveal delay={i * 100} className="flex flex-col gap-2">
                  <span className="text-5xl font-bold tracking-tight text-accent">{i + 1}</span>
                  <h3 className="mt-2 text-xl font-bold tracking-tight">{s.title}</h3>
                  <p className="text-base text-muted">{s.body}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </section>

        {/* Gallery */}
        <section aria-label="Photos of the guesthouse" className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
          <ul className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {g.gallery.map((photo, i) => (
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
        </section>

        {/* Location */}
        <section id="location" className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
          <Reveal className="grid gap-12 rounded-3xl border border-line bg-raised p-6 sm:p-12 md:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Close to town, far from the traffic
              </h2>
              <p className="mt-4 text-lg text-muted">
                The house sits on Jalan Sri Wedari, a lane of family compounds and rice fields
                north of the centre. Walk to dinner, sleep with the windows open.
              </p>
            </div>
            <ul className="flex flex-col gap-4 self-center">
              {g.nearby.map((n) => (
                <li
                  key={n.place}
                  className="flex items-baseline justify-between gap-4 text-base"
                >
                  <span className="font-semibold">{n.place}</span>
                  <span className="shrink-0 text-muted">{n.time}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </section>

        {/* FAQ */}
        <section id="faq" className="mx-auto max-w-3xl px-4 pb-24 sm:px-6">
          <Reveal className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Questions guests ask
            </h2>
          </Reveal>
          <div className="mt-12 flex flex-col gap-4">
            {g.faq.map((item) => (
              <details
                key={item.q}
                className="group rounded-2xl border border-line bg-raised p-6"
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
        </section>

        {/* Final CTA */}
        <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
          <Reveal className="flex flex-col items-center gap-6 rounded-3xl bg-accent px-6 py-20 text-center text-on-accent">
            <h2 className="max-w-[680px] text-3xl font-bold tracking-tight sm:text-5xl">
              Tell us your dates and we will hold a room
            </h2>
            <p className="max-w-[680px] text-lg opacity-80">
              Lowest rate, breakfast included, free cancellation up to 3 days before arrival.
            </p>
            <a
              href={bookLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex min-h-12 items-center gap-2 rounded-full bg-on-accent px-3 py-2 text-base font-semibold text-accent hover:opacity-90 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-accent ${fluid}`}
            >
              <WhatsappLogo size={20} weight="fill" aria-hidden />
              Check dates on WhatsApp
            </a>
          </Reveal>
        </section>
      </main>

      <footer className="mx-auto flex max-w-6xl flex-col gap-4 px-4 pb-12 text-sm text-muted sm:px-6 md:flex-row md:items-center md:justify-between">
        <p>
          <span className="font-semibold text-ink">Concept project.</span> {g.name} is not a real
          property. Photos from Unsplash.
        </p>
        <Link href="/" className={`font-semibold text-ink hover:text-accent ${fluid}`}>
          Back to portfolio
        </Link>
      </footer>
    </div>
  );
}
