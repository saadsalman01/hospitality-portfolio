// Shown while availability loads. Shaped like a results list, not a spinner.
export default function Loading() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 pb-24 sm:px-6" aria-busy="true">
      <p className="sr-only">Loading</p>
      <div className="h-16 animate-pulse rounded-2xl bg-line" />
      {[0, 1, 2].map((i) => (
        <div key={i} className="h-48 animate-pulse rounded-2xl bg-line" />
      ))}
    </div>
  );
}
