import type { Metadata } from "next";
import { Sora } from "next/font/google";
import Link from "next/link";
import { Logo } from "@/components/hotel/logo";
import { hotel } from "@/content/properties/hotel";

const sora = Sora({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: `${hotel.name}, ${hotel.place} | Book direct`,
    template: `%s | ${hotel.name}`,
  },
  description:
    "A 1920s shophouse hotel in old George Town. Book direct for the lowest rate, with taxes shown up front and free cancellation.",
  openGraph: { images: ["/hotel/courtyard.jpg"] },
};

const links = [
  { href: "/hotel/rooms", label: "Rooms" },
  { href: "/hotel/about", label: "Our story" },
  { href: "/hotel#location", label: "Location" },
  { href: "/hotel#questions", label: "Questions" },
];
const fluid = "transition-all duration-700 ease-fluid";
const onGreen = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

export default function HotelLayout({ children }: LayoutProps<"/hotel">) {
  return (
    <div id="top" style={hotel.theme} className={`square flex min-h-dvh flex-col bg-surface text-ink ${sora.className}`}>
      <a
        href="#main"
        className="sr-only bg-[#ece3ce] px-3 py-2 text-sm font-semibold text-ink focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60]"
      >
        Skip to content
      </a>

      <header className="border-b border-white/15 bg-accent text-on-accent">
        <nav aria-label="Main" className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-4 sm:px-6">
          <Link href="/hotel" aria-label="Saffron Lane Hotel, home" className={onGreen}>
            <Logo />
          </Link>
          <ul className="hidden items-center gap-8 lg:flex">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={`text-sm font-medium whitespace-nowrap text-white/80 hover:text-white ${onGreen} ${fluid}`}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/hotel#dates"
            className={`inline-flex min-h-12 shrink-0 items-center bg-[#ece3ce] px-4 py-2 text-sm whitespace-nowrap sm:px-6 font-semibold text-ink hover:bg-white ${onGreen} ${fluid}`}
          >
            Book your stay
          </Link>
        </nav>
      </header>

      <main id="main" className="flex-1">
        {children}
      </main>

      <footer className="bg-accent text-on-accent">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-[2fr_1fr_1fr]">
          <div className="flex flex-col gap-4">
            <Logo large />
            <p className="max-w-md text-sm text-white/80">
              {hotel.address}. Fourteen rooms around an open air courtyard, booked direct with no
              booking fee.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-lg font-semibold">Explore</p>
            <ul className="flex flex-col gap-3 text-sm">
              {links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={`text-white/80 hover:text-white ${onGreen} ${fluid}`}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-lg font-semibold">Booking</p>
            <ul className="flex flex-col gap-3 text-sm text-white/80">
              <li>30% deposit when you book</li>
              <li>Balance paid at the hotel</li>
              <li>Free cancellation up to 3 days before</li>
            </ul>
          </div>
        </div>
        <div className="bg-ink">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 text-sm text-white/80 sm:px-6 md:flex-row md:items-center md:justify-between">
            <p>
              <span className="font-semibold text-white">Concept project.</span> {hotel.name} is not a
              real property and no real payment is taken. Photos from Unsplash.
            </p>
            <Link href="/" className={`shrink-0 font-semibold text-white hover:text-[#ece3ce] ${onGreen} ${fluid}`}>
              Back to portfolio
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
