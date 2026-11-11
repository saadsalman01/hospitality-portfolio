import { WarningCircle } from "@phosphor-icons/react/dist/ssr";
import { StayDates } from "@/components/hotel/stay-dates";
import { MAX_GUESTS } from "@/lib/booking/pricing";

const field =
  "min-h-12 w-full rounded-lg border border-line bg-surface px-3 py-2 text-base text-ink transition-all duration-700 ease-fluid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

/**
 * Plain GET form: dates and guests travel in the page address, so results can be
 * refreshed, shared and reached without JavaScript.
 */
export function DateBar({
  checkIn,
  checkOut,
  guests = 2,
  error,
  room,
}: {
  checkIn?: string;
  checkOut?: string;
  guests?: number;
  error?: string;
  room?: string; // when set, the form returns to that room's page
}) {
  return (
    <form
      id="dates"
      action={room ? `/hotel/rooms/${room}` : "/hotel/rooms"}
      className="flex flex-col gap-4 rounded-2xl border border-line bg-raised p-4 sm:p-6"
    >
      <div className="grid grid-cols-2 gap-4 md:grid-cols-[1fr_1fr_1fr_auto] md:items-end">
        <StayDates checkIn={checkIn} checkOut={checkOut} />
        <label className="col-span-2 flex flex-col gap-2 text-sm font-semibold md:col-span-1">
          Guests
          <select name="guests" defaultValue={guests} className={field}>
            {Array.from({ length: MAX_GUESTS }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </label>
        <button
          type="submit"
          className="col-span-2 inline-flex min-h-12 items-center justify-center rounded-full bg-accent px-6 py-2 text-base font-semibold text-on-accent transition-all duration-700 ease-fluid hover:opacity-90 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:col-span-1"
        >
          Check availability
        </button>
      </div>
      {error ? (
        <p role="alert" className="flex items-center gap-2 text-sm font-semibold text-[#a3231a]">
          <WarningCircle size={16} weight="fill" aria-hidden />
          {error}
        </p>
      ) : (
        <p className="text-sm text-muted">
          You see the full price, taxes included, before entering any details. Free cancellation up
          to 3 days before arrival.
        </p>
      )}
    </form>
  );
}
