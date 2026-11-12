import type { Metadata } from "next";
import { Forum, Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, InstagramLogo } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/reveal";
import guesthousePhoto from "@/public/guesthouse/hero.jpg";
import hostelPhoto from "@/public/hostel/hero.jpg";
import hotelPhoto from "@/public/hotel/courtyard.jpg";

const forum = Forum({ subsets: ["latin"], weight: "400" });
const inter = Inter({ subsets: ["latin"] });

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

// Dark studio look: near black page, off white text, one blue accent, hairline borders.
const theme = {
  "--surface": "#111111",
  "--raised": "#161616",
  "--ink": "#ffffff",
  "--muted": "#b4b4b4",
  "--accent": "#6896ff",
  "--on-accent": "#111111",
  "--line": "rgba(255, 255, 255, 0.19)",
} as React.CSSProperties;

const instagram = "https://www.instagram.com/stillformstud/";
const fluid = "transition-all duration-700 ease-fluid";
const focus = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";
const pill = `inline-flex min-h-12 items-center gap-2 rounded-full px-6 py-2 text-xs font-medium tracking-wide whitespace-nowrap uppercase active:scale-[0.98] ${focus} ${fluid}`;
const solid = `${pill} bg-white text-[#111111] hover:bg-accent`;
const outline = `${pill} border border-line text-ink hover:border-white`;
const display = `${forum.className} font-normal tracking-tight text-ink uppercase`;
const label = "text-xs font-medium tracking-widest text-muted uppercase";
const section = "mx-auto max-w-6xl px-4 py-24 sm:px-6";
const light = "text-[#efefef]";

/** Four point star, the small ornament that opens each section. */
const Star = () => (
  <svg viewBox="0 0 24 24" aria-hidden className="size-6 text-accent">
    <path
      fill="currentColor"
      d="M12 0c.6 7.2 4.8 11.400 12 12-7.200.6-11.400 4.800-12 12-.6-7.200-4.800-11.400-12-12 7.200-.6 11.400-4.800 12-12Z"
    />
  </svg>
);

const stats = [
  { value: "3", label: "Live demos to click through" },
  { value: "1", label: "Shared system behind all of them" },
  { value: "25%", label: "Of a stay kept by booking sites, at most" },
  { value: "2 min", label: "To make a test booking yourself" },
];

const links = [
  { href: "#work", label: "Work" },
  { href: "#what-you-get", label: "What you get" },
  { href: "#how-it-works", label: "How it works" },
];

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
    alt: "Scooters passing old shophouses in the Old Quarter of Hanoi",
    kind: "Hostel priced per bed",
    name: "Lantern House",
    place: "Old Quarter, Hanoi",
    body: "The same page as the guesthouse with different content: dorm beds and private rooms, new photos and new colours. No new code was written for it.",
    points: ["Prices per bed and per room", "Built from one content file", "Enquiries go straight to WhatsApp"],
    cta: "Open hostel demo",
  },
];

const features = [
  { title: "Built for phones first", body: "Guests book on a phone, often abroad and on mobile data. Pages are light and every button is easy to tap." },
  { title: "The full price from the start", body: "Taxes are in the first price a guest sees. Nothing is added at the last step." },
  { title: "Real availability", body: "Rooms shown as free are free. The database refuses a second booking for the same room and night." },
  { title: "Payment that fits the country", body: "The demo uses Stripe. The payment part is separate, so it can be swapped for a provider that works where the property is." },
  { title: "One system, many properties", body: "Every demo here runs on the same code. A new property is new content, photos and colours, not a new build." },
  { title: "Plain words, usable by everyone", body: "Short sentences for guests reading in a second language. Works with a keyboard and a screen reader." },
];

const steps = [
  { title: "The property sends its content", body: "Photos, rooms, prices and policies. A shared folder or a WhatsApp chat is enough." },
  { title: "We set it up", body: "The content goes into the shared system with the colours and name of the property." },
  { title: "The owner checks a private link", body: "They click through it on their own phone and ask for changes." },
  { title: "It goes live on their domain", body: "Bookings and enquiries go to the property, not to a booking site." },
];

const testSteps = [
  "Pick dates and a room.",
  "Enter any name, email and phone.",
  "Pay with card 4242 4242 4242 4242, any future expiry date and any three digits.",
  "You land on a confirmation with a booking reference.",
];

export default function Home() {
  return (
    <div id="top" style={theme} className={`bg-surface text-sm leading-relaxed text-muted ${inter.className}`}>
      <a
        href="#main"
        className="sr-only rounded-full bg-white px-3 py-2 text-sm font-semibold text-[#111111] focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60]"
      >
        Skip to content
      </a>

      <header className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-6 sm:px-6">
        <a href="#top" className={`${display} text-3xl ${focus}`}>
          Stillform
        </a>
        <nav aria-label="Main" className="flex items-center gap-8">
          <ul className="hidden items-center gap-8 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={`text-xs font-medium tracking-wide text-ink uppercase hover:text-accent ${focus} ${fluid}`}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a href={instagram} target="_blank" rel="noopener noreferrer" className={outline}>
            Message us
          </a>
        </nav>
      </header>

      <main id="main">
        {/* Hero: a dimmed photo panel with the headline set low and left */}
        <section className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="relative overflow-hidden rounded-3xl border border-line">
            <Image
              src={hotelPhoto}
              alt=""
              priority
              placeholder="blur"
              sizes="(min-width: 1152px) 1104px, 100vw"
              className="absolute inset-0 size-full object-cover"
            />
            <div className="relative flex min-h-[70vh] flex-col justify-end gap-6 bg-black/70 p-6 sm:p-12">
              <p className={label}>Websites for hotels, hostels and guesthouses</p>
              <h1 className={`${display} max-w-3xl text-5xl leading-none sm:text-7xl`}>
                Websites that take <span className="text-accent">bookings</span> directly
              </h1>
              <p className={`max-w-xl text-base ${light}`}>
                Booking sites keep 15 to 25% of every stay. The website of the property keeps it. The demos
                below are working sites, and one takes a booking from dates to deposit.
              </p>
              <div className="flex flex-wrap gap-4 border-t border-line pt-6">
                <Link href="/hotel" className={solid}>
                  Try a booking <ArrowRight size={16} weight="bold" aria-hidden />
                </Link>
                <a href="#work" className={outline}>
                  See the work
                </a>
              </div>
            </div>
          </div>
        </section>

        <section aria-label="In numbers" className="mx-auto max-w-6xl px-4 pt-24 sm:px-6">
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-[var(--line)] lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col-reverse justify-end gap-4 bg-surface p-6 sm:p-8">
                <dt className={label}>{s.label}</dt>
                <dd className={`${display} text-5xl sm:text-6xl`}>{s.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section id="work" className={section}>
          <Reveal className="flex max-w-2xl flex-col gap-6">
            <Star />
            <h2 className={`${display} text-4xl sm:text-5xl`}>
              Every demo is a <span className="text-accent">working</span> site
            </h2>
            <p className="text-base">
              Not a picture of one. These properties are invented to show what the sites can do. Open them
              on your phone.
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
                      sizes="(min-width: 1024px) 350px, (min-width: 768px) 50vw, 100vw"
                      className="aspect-[4/3] w-full rounded-2xl object-cover"
                    />
                    <div className="flex flex-1 flex-col gap-4 p-4 sm:p-6">
                      <p className={`flex flex-wrap items-center gap-2 ${label}`}>
                        Concept project <span aria-hidden className="size-1.5 rounded-full bg-accent" /> {w.kind}
                      </p>
                      <h3 className={`${display} text-3xl`}>
                        {w.name}
                        <span className={`block pt-1 text-sm tracking-normal text-muted normal-case ${inter.className}`}>
                          {w.place}
                        </span>
                      </h3>
                      <p>{w.body}</p>
                      <ul className={`flex flex-col gap-2 border-t border-line pt-4 ${light}`}>
                        {w.points.map((p) => (
                          <li key={p} className="flex gap-3">
                            <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                            {p}
                          </li>
                        ))}
                      </ul>
                      <Link href={w.href} className={`mt-auto self-start ${outline}`}>
                        {w.cta} <ArrowUpRight size={16} weight="bold" aria-hidden />
                      </Link>
                    </div>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
        </section>

        <section id="try-it" className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal className="grid gap-12 rounded-3xl border border-line bg-raised p-6 sm:p-12 md:grid-cols-2">
            <div className="flex flex-col items-start gap-6">
              <Star />
              <h2 className={`${display} text-4xl sm:text-5xl`}>
                Make a <span className="text-accent">test</span> booking
              </h2>
              <p className="text-base">It takes about two minutes. Payment runs in test mode, so no money moves.</p>
              <Link href="/hotel" className={solid}>
                Start at the hotel <ArrowRight size={16} weight="bold" aria-hidden />
              </Link>
            </div>
            <ol className={`flex flex-col self-center text-base ${light}`}>
              {testSteps.map((s, i) => (
                <li key={s} className="flex gap-6 border-b border-line py-4 last:border-b-0">
                  <span className={`${display} w-8 shrink-0 text-2xl !text-accent`}>0{i + 1}</span>
                  <span className="pt-1">{s}</span>
                </li>
              ))}
            </ol>
          </Reveal>
        </section>

        <section id="what-you-get" className={section}>
          <Reveal className="flex flex-col gap-6">
            <Star />
            <h2 className={`${display} text-4xl sm:text-5xl`}>
              What <span className="text-accent">you</span> get
            </h2>
          </Reveal>
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <li key={f.title}>
                <Reveal
                  delay={(i % 3) * 100}
                  className="flex h-full flex-col gap-4 rounded-3xl border border-line p-6 sm:p-8"
                >
                  <p className={`${display} text-5xl`}>0{i + 1}</p>
                  <h3 className={`${display} border-t border-line pt-6 text-2xl`}>{f.title}</h3>
                  <p>{f.body}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </section>

        <section id="how-it-works" className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
          <Reveal className="flex max-w-2xl flex-col gap-6">
            <Star />
            <h2 className={`${display} text-4xl sm:text-5xl`}>
              How it <span className="text-accent">works</span>
            </h2>
            <p className="text-base">
              The same four steps for every property, which is what keeps ten sites affordable.
            </p>
          </Reveal>
          <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <li key={s.title}>
                <Reveal delay={i * 100} className="flex h-full flex-col gap-4 border-t border-line pt-6">
                  <p className="text-xs font-medium tracking-widest text-accent uppercase">Step 0{i + 1}</p>
                  <h3 className={`${display} text-2xl`}>{s.title}</h3>
                  <p>{s.body}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </section>

        <section id="contact" className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
          <Reveal className="flex flex-col items-center gap-6 rounded-3xl border border-line bg-raised px-6 py-24 text-center">
            <Star />
            <h2 className={`${display} max-w-3xl text-4xl sm:text-6xl`}>
              Have properties that need a <span className="text-accent">website</span>?
            </h2>
            <p className="max-w-xl text-base">
              Send a message with the type of property and what the site should do. You get a straight
              answer on what it takes.
            </p>
            <a href={instagram} target="_blank" rel="noopener noreferrer" className={solid}>
              <InstagramLogo size={16} weight="fill" aria-hidden />
              Message @stillformstud
              <ArrowUpRight size={16} weight="bold" aria-hidden />
            </a>
          </Reveal>
        </section>
      </main>

      <footer className="mx-auto flex max-w-6xl flex-col gap-4 border-t border-line px-4 py-12 sm:px-6 md:flex-row md:items-center md:justify-between">
        <p className={`${display} text-2xl`}>Stillform Studio</p>
        <p className="max-w-xl text-xs tracking-wide uppercase">
          The properties shown are fictional concept projects. Their names, prices and details are invented.
          Photos are from Unsplash.
        </p>
      </footer>
    </div>
  );
}
