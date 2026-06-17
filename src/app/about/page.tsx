import type { Metadata } from "next";

import { AboutContent } from "@/components/about/about-content";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "About",
  description:
    "The story, philosophy, and craft behind Aurelio — a fictional flagship built as a portfolio dining experience.",
});

export default function AboutPage() {
  return <AboutContent />;
}
