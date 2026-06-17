import { cn } from "@/lib/utils";

/** Minimal mark for the Gold Line ritual — horizontal stroke + centre bead. */
export function GoldLineMark({ className }: { className?: string }) {
  return (
    <svg
      className={cn("h-3.5 w-14 shrink-0 text-gold", className)}
      viewBox="0 0 56 14"
      aria-hidden
    >
      <line
        x1="2"
        y1="7"
        x2="54"
        y2="7"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
        opacity={0.88}
      />
      <circle cx="28" cy="7" r="3" fill="currentColor" opacity={0.95} />
    </svg>
  );
}
