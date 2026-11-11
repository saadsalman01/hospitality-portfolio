"use client";

import { useFormStatus } from "react-dom";
import { primaryButton } from "@/components/hotel/parts";

/** Submit button that says so while the room is being held, so nobody presses twice. */
export function SubmitButton({ children, busy }: { children: React.ReactNode; busy: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      aria-live="polite"
      className={`${primaryButton} disabled:cursor-wait disabled:opacity-60`}
    >
      {pending ? busy : children}
    </button>
  );
}
