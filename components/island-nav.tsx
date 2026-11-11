"use client";

import { useEffect, useState } from "react";

type NavLink = { href: string; label: string };

const fluid = "transition-all duration-700 ease-fluid";

/** Floating glass pill. On small screens it morphs into a full screen menu. */
export function IslandNav({
  brand,
  brandHref = "#top",
  links,
  cta,
  ctaNewTab = true,
}: {
  brand: string;
  brandHref?: string;
  links: NavLink[];
  cta: NavLink;
  ctaNewTab?: boolean;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header>
      <nav
        aria-label="Main"
        className="fixed top-6 left-1/2 z-50 flex w-max max-w-[calc(100vw-32px)] -translate-x-1/2 items-center gap-6 rounded-full border border-line bg-surface/80 py-2 pr-2 pl-6 backdrop-blur-xl"
      >
        <a href={brandHref} className="text-base font-bold tracking-tight text-ink">
          {brand}
        </a>

        <ul className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={`text-sm font-semibold text-muted hover:text-ink ${fluid}`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href={cta.href}
          {...(ctaNewTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className={`hidden rounded-full bg-accent px-3 py-2 text-sm font-semibold text-on-accent hover:opacity-90 active:scale-[0.98] md:inline-flex ${fluid}`}
        >
          {cta.label}
        </a>

        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="relative size-10 rounded-full bg-accent md:hidden"
        >
          <span
            className={`absolute top-1/2 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-on-accent ${fluid} ${
              open ? "-translate-y-1/2 rotate-45" : "-translate-y-1"
            }`}
          />
          <span
            className={`absolute top-1/2 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-on-accent ${fluid} ${
              open ? "-translate-y-1/2 -rotate-45" : "translate-y-0.5"
            }`}
          />
        </button>
      </nav>

      <div
        id="mobile-menu"
        inert={!open}
        className={`fixed inset-0 z-40 flex flex-col justify-center bg-white/80 px-6 backdrop-blur-3xl md:hidden ${fluid} ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <ul className="flex flex-col gap-6">
          {[...links, cta].map((l, i) => (
            <li key={l.href} className="overflow-hidden">
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                style={{ transitionDelay: open ? `${100 + i * 50}ms` : "0ms" }}
                className={`block text-4xl font-semibold tracking-tight text-ink ${fluid} ${
                  open ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
                }`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
