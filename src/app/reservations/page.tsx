import type { Metadata } from "next";

import { ReservationForm } from "@/components/reservations/reservation-form";
import { createMetadata } from "@/lib/seo";

const RES_STEPS = [
  {
    id: "party",
    title: "Party & time",
    body: "Who is coming, which night, and where you want to sit in the rhythm of service.",
  },
  {
    id: "occasion",
    title: "The occasion",
    body: "Birthday, business, first date, or simply hungry — it helps the room prepare tiny touches.",
  },
  {
    id: "notes",
    title: "Notes for the maître",
    body: "Dietary guardrails, surprises you do not want, songs you love — the human stuff.",
  },
] as const;

export const metadata: Metadata = createMetadata({
  title: "Reservations",
  description:
    "Request a table at Aurelio — demo reservation flow with validation, no backend.",
});

export default function ReservationsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 pb-24 pt-12 sm:px-6 lg:px-8">
      <header className="mb-10 space-y-6">
        <p className="text-xs font-medium uppercase tracking-[0.35em] text-gold">
          Reservations
        </p>
        <div className="space-y-3">
          <h1 className="text-4xl tracking-tight sm:text-5xl">
            Save your evening
          </h1>
          <p
            lang="it"
            className="text-lg italic leading-snug text-foreground/90"
          >
            Prego — tell us the shape of your night; we will answer like hosts,
            not forms.
          </p>
        </div>
        <p className="text-sm text-muted-foreground sm:text-base">
          Demo only — your details are not stored or sent to a server. Built to
          showcase React Hook Form, Zod, and accessible selects.
        </p>

        <ol className="grid gap-4 rounded-2xl border border-border/60 bg-card/30 p-5 sm:grid-cols-3 sm:gap-3 sm:p-6">
          {RES_STEPS.map((step, index) => (
            <li key={step.id} className="space-y-2">
              <p className="text-xs text-gold">
                {String(index + 1).padStart(2, "0")} · {step.title}
              </p>
              <p className="text-xs leading-relaxed text-muted-foreground sm:text-[0.8rem]">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </header>
      <ReservationForm />
    </div>
  );
}
