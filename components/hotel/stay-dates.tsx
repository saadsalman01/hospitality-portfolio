"use client";

import { useEffect, useRef, useState } from "react";
import { CalendarBlank, CaretLeft, CaretRight } from "@phosphor-icons/react";
import { addDays, formatDay, hotelToday, MAX_NIGHTS } from "@/lib/booking/pricing";

const pad = (n: number) => String(n).padStart(2, "0");
const monthOf = (iso: string) => ({ y: Number(iso.slice(0, 4)), m: Number(iso.slice(5, 7)) - 1 });
const weekdays = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
const field =
  "flex min-h-12 w-full items-center justify-between gap-2 border border-line bg-surface px-3 py-2 text-left text-base transition-all duration-700 ease-fluid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";
const arrow =
  "flex size-11 items-center justify-center border border-line hover:border-accent disabled:opacity-30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

/**
 * Arrival and departure fields with the hotel's own calendar instead of the browser's.
 * The chosen dates sit in hidden inputs, so the surrounding form submits them as before.
 */
export function StayDates({ checkIn = "", checkOut = "" }: { checkIn?: string; checkOut?: string }) {
  const [from, setFrom] = useState(checkIn);
  const [to, setTo] = useState(checkOut);
  const [picking, setPicking] = useState<"in" | "out" | null>(null);
  const [view, setView] = useState({ y: 2026, m: 0 }); // set for real when the calendar opens
  const root = useRef<HTMLDivElement>(null);
  const today = picking ? hotelToday() : "";

  // When the calendar closes, focus goes back to a date field instead of being lost.
  const focusField = (i: number) =>
    root.current?.querySelectorAll<HTMLButtonElement>("button[aria-haspopup]")[i]?.focus();

  const open = (which: "in" | "out") => {
    setPicking(which);
    setView(monthOf((which === "out" && to) || from || hotelToday()));
  };

  // Close on Escape or a click elsewhere; ask for dates if the form is sent without them.
  useEffect(() => {
    const form = root.current?.closest("form");
    const onSubmit = (e: Event) => {
      if (from && to) return;
      e.preventDefault();
      open(from ? "out" : "in");
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape" || !picking) return;
      focusField(picking === "in" ? 0 : 1);
      setPicking(null);
    };
    const onDown = (e: PointerEvent) => !root.current?.contains(e.target as Node) && setPicking(null);
    form?.addEventListener("submit", onSubmit);
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      form?.removeEventListener("submit", onSubmit);
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  });

  const choose = (iso: string) => {
    if (picking === "in" || !from || iso <= from) {
      setFrom(iso);
      setTo("");
      setPicking("out");
    } else {
      setTo(iso);
      focusField(1);
      setPicking(null);
    }
  };

  // Arrow keys move between days, like a native calendar.
  const onGridKey = (e: React.KeyboardEvent) => {
    const step = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 }[e.key];
    if (!step) return;
    e.preventDefault();
    const days = [...e.currentTarget.querySelectorAll<HTMLButtonElement>("button:not(:disabled)")];
    days[days.indexOf(document.activeElement as HTMLButtonElement) + step]?.focus();
  };

  const first = new Date(Date.UTC(view.y, view.m, 1));
  const blanks = (first.getUTCDay() + 6) % 7; // weeks start on Monday
  const count = new Date(Date.UTC(view.y, view.m + 1, 0)).getUTCDate();
  const title = first.toLocaleString("en-GB", { month: "long", year: "numeric", timeZone: "UTC" });
  const atFirstMonth = `${view.y}-${pad(view.m + 1)}` <= today.slice(0, 7);
  const move = (by: number) => {
    const d = new Date(Date.UTC(view.y, view.m + by, 1));
    setView({ y: d.getUTCFullYear(), m: d.getUTCMonth() });
  };

  return (
    <div ref={root} className="relative col-span-2 grid grid-cols-2 gap-4">
      <input type="hidden" name="in" value={from} />
      <input type="hidden" name="out" value={to} />
      {(["in", "out"] as const).map((which) => {
        const value = which === "in" ? from : to;
        return (
          <div key={which} className="flex flex-col gap-2 text-sm font-semibold">
            <span id={`${which}-label`}>{which === "in" ? "Arrival" : "Departure"}</span>
            <button
              type="button"
              aria-labelledby={`${which}-label ${which}-value`}
              aria-haspopup="dialog"
              aria-expanded={picking === which}
              onClick={() => (picking === which ? setPicking(null) : open(which))}
              className={`${field} ${picking === which ? "border-accent" : ""}`}
            >
              <span id={`${which}-value`} className={`truncate ${value ? "font-semibold" : "font-normal text-muted"}`}>
                {value ? formatDay(value) : "Add date"}
              </span>
              {!value && <CalendarBlank size={20} aria-hidden className="shrink-0 text-accent" />}
            </button>
          </div>
        );
      })}

      {picking && (
        <div
          role="dialog"
          aria-label={picking === "in" ? "Choose your arrival date" : "Choose your departure date"}
          className="absolute top-full left-0 z-40 mt-2 flex w-80 max-w-[calc(100vw-4rem)] flex-col gap-4 border border-line bg-surface p-4 shadow-xl"
        >
          <div className="flex items-center justify-between gap-2">
            <button type="button" aria-label="Previous month" disabled={atFirstMonth} onClick={() => move(-1)} className={arrow}>
              <CaretLeft size={16} weight="bold" aria-hidden />
            </button>
            <p aria-live="polite" className="text-base font-semibold">
              {title}
            </p>
            <button type="button" aria-label="Next month" onClick={() => move(1)} className={arrow}>
              <CaretRight size={16} weight="bold" aria-hidden />
            </button>
          </div>

          <div className="grid grid-cols-7 text-center" onKeyDown={onGridKey}>
            {weekdays.map((d) => (
              <span key={d} aria-hidden className="pb-2 text-xs font-medium tracking-widest text-[#4f6f52] uppercase">
                {d}
              </span>
            ))}
            {Array.from({ length: blanks }, (_, i) => (
              <span key={`blank-${i}`} />
            ))}
            {Array.from({ length: count }, (_, i) => {
              const iso = `${view.y}-${pad(view.m + 1)}-${pad(i + 1)}`;
              const selected = iso === from || iso === to;
              const between = from && to && iso > from && iso < to;
              const off =
                iso < today || (picking === "out" && !!from && (iso < from || iso > addDays(from, MAX_NIGHTS)));
              return (
                <button
                  key={iso}
                  type="button"
                  disabled={off}
                  aria-label={formatDay(iso)}
                  aria-pressed={selected}
                  onClick={() => choose(iso)}
                  className={`aspect-square text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                    selected
                      ? "bg-accent font-semibold text-on-accent"
                      : between
                        ? "bg-[#e3e9e3]"
                        : off
                          ? "text-muted/40 line-through"
                          : "hover:bg-[#ece3ce]"
                  } ${iso === today && !selected ? "font-bold underline underline-offset-4" : ""}`}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between gap-4 border-t border-line pt-4 text-sm">
            <p className="text-muted">
              {picking === "in" ? "Choose your arrival date" : "Now choose your departure date"}
            </p>
            <button
              type="button"
              onClick={() => {
                setFrom("");
                setTo("");
                setPicking("in");
              }}
              className="min-h-11 font-semibold underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
