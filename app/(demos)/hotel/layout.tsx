import type { Metadata } from "next";
import Link from "next/link";
import { IslandNav } from "@/components/island-nav";
import { hotel } from "@/content/properties/hotel";

export const metadata: Metadata = {
  title: {
    default: `${hotel.name}, ${hotel.place} | Book direct`,
    template: `%s | ${hotel.name}`,
  },
  description:
    "A 1920s shophouse hotel in old George Town. Book direct for the lowest rate, with taxes shown up front and free cancellation.",
  openGraph: { images: ["/hotel/courtyard.jpg"] },
};

export default function HotelLayout({ children }: LayoutProps<"/hotel">) {
  return (
    <div id="top" style={hotel.theme} className="flex min-h-dvh flex-col bg-surface text-ink">
      <a
        href="#main"
        className="sr-only rounded-full bg-accent px-3 py-2 text-sm font-semibold text-on-accent focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60]"
      >
        Skip to content
      </a>

      <IslandNav
        brand="Saffron Lane"
        brandHref="/hotel"
        links={[
          { href: "/hotel/rooms", label: "Rooms" },
          { href: "/hotel#the-hotel", label: "The hotel" },
          { href: "/hotel#location", label: "Location" },
          { href: "/hotel#questions", label: "Questions" },
        ]}
        cta={{ href: "/hotel#dates", label: "Check availability" }}
        ctaNewTab={false}
      />

      <main id="main" className="flex-1 pt-24 sm:pt-32">
        {children}
      </main>

      <footer className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-12 text-sm text-muted sm:px-6 md:flex-row md:items-center md:justify-between">
        <p>
          <span className="font-semibold text-ink">Concept project.</span> {hotel.name} is not a
          real property and no real payment is taken. Photos from Unsplash.
        </p>
        <Link href="/" className="font-semibold text-ink transition-all duration-700 ease-fluid hover:text-accent">
          Back to portfolio
        </Link>
      </footer>
    </div>
  );
}
