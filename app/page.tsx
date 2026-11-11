import Link from "next/link";

// Temporary index until the portfolio home is built (Phase 4 of the plan).
export default function Home() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-[680px] flex-col justify-center gap-6 px-4 sm:px-6">
      <h1 className="text-4xl font-bold tracking-tight">
        Direct booking websites for hotels and guesthouses
      </h1>
      <p className="text-lg text-muted">Portfolio in progress. Concept projects so far:</p>
      <ul>
        <li>
          <Link href="/guesthouse" className="text-lg font-semibold underline underline-offset-4">
            Kebun Tiga guesthouse, Ubud
          </Link>
        </li>
      </ul>
    </main>
  );
}
