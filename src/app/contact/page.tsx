import type { Metadata } from "next";
import Link from "next/link";

import { ContactForm } from "@/components/contact/contact-form";
import { BRANCH, SITE } from "@/lib/site";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Contact",
  description: "Hours, location, and a demo contact form for Aurelio.",
});

const HOURS = [
  { day: "Tuesday — Saturday", hours: "6:00 PM — 11:30 PM" },
  { day: "Sunday lunch", hours: "12:00 PM — 3:00 PM" },
  { day: "Monday", hours: "Closed" },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-24 pt-12 sm:px-6 lg:px-8">
      <header className="max-w-2xl">
        <p className="text-xs font-medium uppercase tracking-[0.35em] text-gold">
          Contact
        </p>
        <h1 className="mt-3 text-4xl tracking-tight sm:text-5xl md:text-6xl">
          We respond like maître d’s — swiftly, warmly, precisely.
        </h1>
      </header>

      <div className="mt-14 grid gap-12 lg:grid-cols-2">
        <div className="space-y-10">
          <section aria-labelledby="hours-heading">
            <h2
              id="hours-heading"
              className="text-2xl tracking-tight"
            >
              Opening hours
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              {HOURS.map((row) => (
                <li
                  key={row.day}
                  className="flex justify-between gap-4 border-b border-border/50 py-2"
                >
                  <span>{row.day}</span>
                  <span className="text-foreground">{row.hours}</span>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="branch-heading">
            <h2
              id="branch-heading"
              className="text-2xl tracking-tight"
            >
              {BRANCH.name}
            </h2>
            <address className="mt-4 not-italic text-sm leading-relaxed text-muted-foreground">
              {BRANCH.addressLines.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
              <a
                className="mt-3 inline-block text-foreground underline-offset-4 hover:underline"
                href={`tel:${BRANCH.phoneTel}`}
              >
                {BRANCH.phoneDisplay}
              </a>
              <br />
              <a
                className="inline-block text-foreground underline-offset-4 hover:underline"
                href={`mailto:${BRANCH.email}`}
              >
                {BRANCH.email}
              </a>
            </address>
          </section>

          <section aria-labelledby="social-heading">
            <h2
              id="social-heading"
              className="text-2xl tracking-tight"
            >
              Social
            </h2>
            <ul className="mt-4 flex flex-wrap gap-4 text-sm">
              <li>
                <a
                  href={SITE.social.instagram}
                  className="text-gold underline-offset-4 hover:underline"
                  rel="noreferrer"
                  target="_blank"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href={SITE.social.facebook}
                  className="text-gold underline-offset-4 hover:underline"
                  rel="noreferrer"
                  target="_blank"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href={SITE.social.x}
                  className="text-gold underline-offset-4 hover:underline"
                  rel="noreferrer"
                  target="_blank"
                >
                  X
                </a>
              </li>
            </ul>
          </section>

          <Link
            href="/reservations"
            className="inline-block text-sm font-medium text-foreground underline-offset-4 hover:underline"
          >
            Prefer to reserve directly? → Reservations
          </Link>
        </div>

        <div className="space-y-8">
          <div className="overflow-hidden rounded-2xl border border-border/70 shadow-sm">
            <iframe
              title="Aurelio — Iyyappanthangal, Chennai"
              src="https://maps.google.com/maps?q=Iyyappanthangal+Chennai+Tamil+Nadu+India&output=embed&z=15"
              width="100%"
              height="320"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block w-full border-0"
              aria-label="Map showing Iyyappanthangal, Chennai location"
            />
            <div className="flex items-center justify-between border-t border-border/60 bg-muted/30 px-4 py-3">
              <p className="text-xs text-muted-foreground">
                Iyyappanthangal, Chennai — Tamil Nadu 600056
              </p>
              <a
                href="https://maps.google.com/?q=Iyyappanthangal+Chennai+Tamil+Nadu"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-medium text-gold underline-offset-4 hover:underline"
              >
                Open in Maps →
              </a>
            </div>
          </div>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
