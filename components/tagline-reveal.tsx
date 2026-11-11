"use client";

import { useEffect, useRef } from "react";

/** Large statement whose words light up in reading order as it scrolls through the viewport. */
export function TaglineReveal({ lines }: { lines: string[] }) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const words = el.querySelectorAll<HTMLElement>("[data-w]");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      words.forEach((w) => w.setAttribute("data-on", ""));
      return;
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the block's top reaches 85% of the viewport, 1 when its bottom reaches 45%
      const progress = (vh * 0.85 - rect.top) / (vh * 0.4 + rect.height);
      const lit = Math.round(Math.min(1, Math.max(0, progress)) * words.length);
      words.forEach((w, i) => w.toggleAttribute("data-on", i < lit));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <p
      ref={ref}
      className="mx-auto max-w-[680px] text-center text-4xl font-semibold tracking-tight text-ink sm:text-5xl"
    >
      {lines.map((line, i) => (
        <span key={i} className="block">
          {line.split(" ").map((word, j) => (
            <span key={j} data-w className="tagline-word">
              {word}{" "}
            </span>
          ))}
        </span>
      ))}
    </p>
  );
}
