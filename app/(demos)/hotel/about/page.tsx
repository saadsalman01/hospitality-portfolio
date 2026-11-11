import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { fluid } from "@/components/hotel/parts";
import { Reveal } from "@/components/reveal";
import { hotel as h } from "@/content/properties/hotel";

export const metadata: Metadata = {
  title: "Our story",
  description: "How a spice trader's house from 1926 became a fourteen room hotel in old George Town.",
};

const cream = `inline-flex min-h-12 items-center gap-2 bg-[#ece3ce] px-6 py-2 text-sm font-semibold text-ink hover:bg-ink hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${fluid}`;

export default function AboutPage() {
  return (
    <>
      <section className="bg-accent text-on-accent">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-16 sm:px-6 sm:py-24">
          <p className="text-sm font-medium tracking-widest text-white/70 uppercase">Our story</p>
          <h1 className="max-w-3xl text-5xl font-bold tracking-tight capitalize sm:text-6xl">
            A trader&apos;s house since 1926
          </h1>
          <p className="max-w-2xl text-lg text-white/85">{h.story.intro}</p>
        </div>
      </section>

      <section className="mx-auto flex max-w-6xl flex-col gap-24 px-4 py-24 sm:px-6">
        {h.story.chapters.map((c, i) => (
          <Reveal key={c.year} className="grid gap-8 md:grid-cols-2 md:items-center md:gap-16">
            <Image
              src={c.photo.src}
              alt={c.photo.alt}
              placeholder="blur"
              sizes="(min-width: 768px) 540px, 100vw"
              className={`aspect-[4/3] w-full object-cover ${i % 2 ? "md:order-2" : ""}`}
            />
            <div className="flex flex-col gap-4">
              <p className="text-sm font-medium tracking-widest text-[#4f6f52] uppercase">{c.year}</p>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{c.title}</h2>
              <p className="text-base text-muted">{c.body}</p>
            </div>
          </Reveal>
        ))}
      </section>

      <section className="bg-raised">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-4 py-24 sm:px-6">
          <h2 className="max-w-xl text-3xl font-semibold tracking-tight sm:text-4xl">
            Come and stay in the house
          </h2>
          <p className="max-w-xl text-base text-muted">
            Choose your dates to see which rooms are free and the full price, taxes included.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/hotel#dates" className={cream}>
              Check availability
            </Link>
            <Link
              href="/hotel/rooms"
              className={`inline-flex min-h-12 items-center border border-ink px-6 py-2 text-sm font-semibold hover:bg-ink hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${fluid}`}
            >
              See the rooms
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
