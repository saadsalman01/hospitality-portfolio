import { Cormorant_Garamond } from "next/font/google";

const serif = Cormorant_Garamond({ subsets: ["latin"], weight: "600" });

/** Saffron Lane mark: a shophouse arch with a saffron crocus inside, beside the name in a serif. */
export function Logo({ large = false }: { large?: boolean }) {
  return (
    <span className="inline-flex items-center gap-3">
      <svg viewBox="0 0 32 32" aria-hidden className={large ? "size-12" : "size-10"}>
        <path d="M5 30V14a11 11 0 0 1 22 0v16" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M16 28c-4.5-4-4.5-10.5 0-15 4.500 4.500 4.500 11 0 15Z" fill="#e8a838" />
        <path d="M16 28c-5.500-.5-8.500-4-8.500-8.500 4.500.5 7.500 3.500 8.500 8.500Z" fill="#e8a838" opacity=".65" />
        <path d="M16 28c5.500-.5 8.500-4 8.500-8.500-4.500.5-7.500 3.500-8.500 8.500Z" fill="#e8a838" opacity=".65" />
      </svg>
      <span className="flex flex-col">
        <span className={`${serif.className} leading-none tracking-wide ${large ? "text-4xl" : "text-3xl"}`}>
          Saffron Lane
        </span>
        <span className="mt-1 text-[0.625rem] font-medium tracking-[0.3em] text-white/70 uppercase">
          Hotel · George Town
        </span>
      </span>
    </span>
  );
}
