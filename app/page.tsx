import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarCheck,
  CreditCard,
  DeviceMobile,
  InstagramLogo,
  Receipt,
  Stack,
  Translate,
} from "@phosphor-icons/react/dist/ssr";
import { IslandNav } from "@/components/island-nav";
import { Reveal } from "@/components/reveal";
import { TaglineReveal } from "@/components/tagline-reveal";
import guesthousePhoto from "@/public/guesthouse/hero.jpg";
import hostelPhoto from "@/public/hostel/hero.jpg";
import hotelPhoto from "@/public/hotel/courtyard.jpg";

export const metadata: Metadata = {
  title: "Stillform Studio | Direct booking websites for hotels and guesthouses",
  description:
    "Websites for hotels, hostels and guesthouses in Southeast Asia that take bookings directly. Try the live demos, including a full booking with a deposit.",
  openGraph: {
    title: "Stillform Studio: direct booking websites for small hotels",
    description: "Try the live demos, including a full booking from dates to deposit.",
    images: ["/hotel/courtyard.jpg"],
  },
};

const instagram = "https://www.instagram.com/stillformstud/";
const fluid = "transition-all duration-700 ease-fluid";
const focus = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";
const primary = `inline-flex min-h-12 items-center gap-2 rounded-full bg-accent px-6 py-2 text-base font-semibold text-on-accent hover:opacity-90 active:scale-[0.98] ${focus} ${fluid}`;
const secondary = `inline-flex min-h-12 items-center gap-2 rounded-full border border-line bg-raised px-6 py-2 text-base font-semibold text-ink hover:border-ink active:scale-[0.98] ${focus} ${fluid}`;
const section = "mx-auto max-w-6xl px-4 pb-24 sm:px-6";
const h2 = "text-3xl font-bold tracking-tight sm:text-4xl";

const work = [
  {
    href: "/hotel",
    photo: hotelPhoto,
    alt: "Courtyard of a heritage hotel with tiled floor and plants",
    kind: "Hotel with booking and payment",
    name: "Saffron Lane Hotel",
    place: "George Town, Penang",
    body: "A guest picks dates, sees the full price with taxes, pays a 30% deposit by card and gets a booking reference. No account needed.",
    points: ["Live room availability", "Card payment in test mode", "Two guests can never book the same room"],
    cta: "Open hotel demo",
  },
  {
    href: "/guesthouse",
    photo: guesthousePhoto,
    alt: "Garden guesthouse among palm trees",
    kind: "Simple site with WhatsApp enquiries",
    name: "Kebun Tiga",
    place: "Ubud, Bali",
    body: "One fast page for a six room guesthouse. Rooms, prices and location, with every button opening a WhatsApp message to the owner.",
    points: ["One page, loads fast on mobile data", "Enquiries go straight to WhatsApp", "No booking system to manage"],
    cta: "Open guesthouse demo",
  },
  {
    href: "/hostel",
    photo: hostelPhoto,
    alt: "Scooters passing old shophouses in Hanoi's Old Quarter",
    kind: "Hostel priced per bed",
    name: "Lantern House",
    place: "Old Quarter, Hanoi",
    body: "The same page as the guesthouse with different content: dorm beds and private rooms, new photos and new colours. No new code was written for it.",
    points: ["Prices per bed and per room", "Built from one content file", "Enquiries go straight to WhatsApp"],
    cta: "Open hostel demo",
  },
];

const features = [
  { icon: DeviceMobile, title: "Built for phones first", body: "Guests book on a phone, often abroad and on mobile data. Pages are light and every button is easy to tap." },
  { icon: Receipt, title: "The full price from the start", body: "Taxes are in the first price a guest sees. Nothing is added at the last step." },
  { icon: CalendarCheck, title: "Real availability", body: "Rooms shown as free are free. The database refuses a second booking for the same room and night." },
  { icon: CreditCard, title: "Payment that fits the country", body: "The demo uses Stripe. The payment part is separate, so it can be swapped for a provider that works where the property is." },
  { icon: Stack, title: "One system, many properties", body: "Every demo here runs on the same code. A new property is new content, photos and colours, not a new build." },
  { icon: Translate, title: "Plain words, usable by everyone", body: "Short sentences for guests reading in a second language. Works with a keyboard and a screen reader." },
];

const steps = [
  { title: "The property sends its content", body: "Photos, rooms, prices and policies. A shared folder or a WhatsApp chat is enough." },
  { title: "We set it up", body: "The content goes into the shared system with the property's own colours and name." },
  { title: "The owner checks a private link", body: "They click through it on their own phone and ask for changes." },
  { title: "It goes live on their domain", body: "Bookings and enquiries go to the property, not to a booking site." },
];

export default function Home() {
  return (
    <div id="top" className="bg-surface text-ink">
      <a
        href="#main"
        className="sr-only rounded-full bg-accent px-3 py-2 text-sm font-semibold text-on-accent focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60]"
      >
        Skip to content
      </a>

      <IslandNav
        brand="Stillform Studio"
        links={[
          { href: "#work", label: "Work" },
          { href: "#what-you-get", label: "What you get" },
          { href: "#how-it-works", label: "How it works" },
        ]}
        cta={{ href: instagram, label: "Message us" }}
      />

      <main id="main" className="pt-32">
        <section className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto flex max-w-[680px] flex-col items-center gap-6 text-center">
            <p className="text-sm font-semibold text-muted">Websites for hotels, hostels and guesthouses</p>
            <h1 className="bg-linear-to-r from-black to-[#666666] bg-clip-text pb-1 text-4xl font-bold tracking-tight text-transparent sm:text-5xl">
              Websites that take bookings directly
            </h1>
            <p className="text-lg text-muted">
              Booking sites keep 15 to 25% of every stay. A property&apos;s own website keeps it. The demos
              below are working sites, and one takes a booking from dates to deposit.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/hotel" className={primary}>
                Try a booking <ArrowRight size={16} weight="bold" aria-hidden />
              </Link>
              <a href="#work" className={secondary}>
                See the work
              </a>
            </div>
          </div>
          <Reveal className="mt-12">
            <Image
              src={hotelPhoto}
              alt="Courtyard of a heritage hotel with tiled floor and plants"
              priority
              placeholder="blur"
              sizes="(min-width: 1152px) 1104px, 100vw"
              className="aspect-[4/3] w-full rounded-3xl object-cover sm:aspect-[16/9]"
            />
          </Reveal>
        </section>

        <section aria-label="What makes this portfolio different" className="px-4 py-24 sm:px-6">
          <TaglineReveal lines={["Every demo here is a working site,", "not a picture of one."]} />
        </section>

        <section id="work" className={section}>
          <Reveal>
            <h2 className={h2}>Work</h2>
            <p className="mt-4 max-w-[680px] text-lg text-muted">
              These properties are invented to show what the sites can do. Open them on your phone.
            </p>
          </Reveal>
          <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {work.map((w, i) => (
              <li key={w.href}>
                <Reveal delay={i * 100} className="h-full">
                  <article className="flex h-full flex-col rounded-3xl border border-line bg-raised p-2">
                    <Image
                      src={w.photo}
                      alt={w.alt}
                      placeholder="blur"
                      sizes="(min-width: 768px) 540px, 100vw"
                      className="aspect-[4/3] w-full rounded-2xl object-cover"
                    />
                    <div className="flex flex-1 flex-col gap-4 p-4 sm:p-6">
                      <p className="flex flex-wrap items-center gap-2 text-sm font-semibold text-muted">
                        <span className="rounded-full border border-line bg-surface px-3 py-1">Concept project</span>
                        {w.kind}
                      </p>
                      <h3 className="text-2xl font-bold tracking-tight">
                        {w.name} <span className="block text-lg font-semibold text-muted">{w.place}</span>
                      </h3>
                      <p className="text-base text-muted">{w.body}</p>
                      <ul className="flex flex-col gap-2 text-base">
                        {w.points.map((p) => (
                          <li key={p} className="flex gap-2">
                            <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-ink" />
                            {p}
                          </li>
                        ))}
                      </ul>
                      <Link href={w.href} className={`mt-auto self-start whitespace-nowrap ${primary}`}>
                        {w.cta} <ArrowRight size={16} weight="bold" aria-hidden />
                      </Link>
                    </div>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
        </section>

        <section id="try-it" className={section}>
          <Reveal className="grid gap-12 rounded-3xl border border-line bg-raised p-6 sm:p-12 md:grid-cols-2">
            <div>
              <h2 className={h2}>Make a test booking</h2>
              <p className="mt-4 text-lg text-muted">
                It takes about two minutes. Payment runs in test mode, so no money moves.
              </p>
              <Link href="/hotel" className={`mt-6 ${primary}`}>
                Start at the hotel <ArrowRight size={16} weight="bold" aria-hidden />
              </Link>
            </div>
            <ol className="flex flex-col gap-4 self-center text-base">
              {[
                "Pick dates and a room.",
                "Enter any name, email and phone.",
                "Pay with card 4242 4242 4242 4242, any future expiry date and any three digits.",
                "You land on a confirmation with a booking reference.",
              ].map((s, i) => (
                <li key={s} className="flex gap-4">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-on-accent">
                    {i + 1}
                  </span>
                  <span className="pt-1">{s}</span>
                </li>
              ))}
            </ol>
          </Reveal>
        </section>

        <section id="what-you-get" className={section}>
          <Reveal>
            <h2 className={h2}>What you get</h2>
          </Reveal>
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <li key={f.title}>
                <Reveal delay={(i % 3) * 100} className="flex h-full flex-col gap-4 rounded-2xl border border-line bg-raised p-6">
                  <f.icon size={32} aria-hidden />
                  <h3 className="text-xl font-bold tracking-tight">{f.title}</h3>
                  <p className="text-base text-muted">{f.body}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </section>

        <section id="how-it-works" className={section}>
          <Reveal>
            <h2 className={h2}>How it works</h2>
            <p className="mt-4 max-w-[680px] text-lg text-muted">
              The same four steps for every property, which is what keeps ten sites affordable.
            </p>
          </Reveal>
          <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <li key={s.title}>
                <Reveal delay={i * 100} className="flex h-full flex-col gap-4 border-t border-ink pt-6">
                  <p className="text-sm font-bold text-muted">Step {i + 1}</p>
                  <h3 className="text-xl font-bold tracking-tight">{s.title}</h3>
                  <p className="text-base text-muted">{s.body}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </section>

        <section id="contact" className={section}>
          <Reveal className="flex flex-col items-center gap-6 rounded-3xl bg-ink px-6 py-24 text-center text-surface">
            <h2 className={h2}>Have properties that need a website?</h2>
            <p className="max-w-[680px] text-lg text-surface/70">
              Send a message with the type of property and what the site should do. You get a straight
              answer on what it takes.
            </p>
            <a
              href={instagram}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex min-h-12 items-center gap-2 rounded-full bg-surface px-6 py-2 text-base font-semibold text-ink hover:opacity-90 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-surface ${fluid}`}
            >
              <InstagramLogo size={20} weight="fill" aria-hidden />
              Message @stillformstud
              <ArrowUpRight size={16} weight="bold" aria-hidden />
            </a>
          </Reveal>
        </section>
      </main>

      <footer className="mx-auto flex max-w-6xl flex-col gap-2 px-4 pb-12 text-sm text-muted sm:px-6">
        <p className="font-bold text-ink">Stillform Studio</p>
        <p>
          The properties shown are fictional concept projects. Their names, prices and details are invented.
          Photos are from Unsplash.
        </p>
      </footer>
    </div>
  );
}
