import dynamic from "next/dynamic";

import { ChefPreview } from "@/components/home/chef-preview";
import { DeliveryTiles } from "@/components/home/delivery-tiles";
import { EveningProgrammingStrip } from "@/components/home/evening-programming-strip";
import { ExperienceSection } from "@/components/home/experience-section";
import { FeaturedDishes } from "@/components/home/featured-dishes";
import { HeroSection } from "@/components/home/hero-section";
import { InstagramGrid } from "@/components/home/instagram-grid";
import { LoyaltyAppSection } from "@/components/home/loyalty-app-section";
import { LocationCta } from "@/components/home/location-cta";
import { MarqueeStrip } from "@/components/home/marquee-strip";
import { NewsletterSection } from "@/components/home/newsletter-section";
import { NewsSection } from "@/components/home/news-section";
import { StatsStrip } from "@/components/home/stats-strip";
import { TableGoldSurprise } from "@/components/home/table-gold-surprise";
import { ValuePillarsSection } from "@/components/home/value-pillars-section";

const LazyTestimonials = dynamic(
  () =>
    import("@/components/home/testimonials-section").then(
      (m) => m.TestimonialsSection
    ),
  {
    loading: () => (
      <div
        className="border-y border-border/40 bg-gradient-to-b from-background to-card/10 py-24 sm:py-32"
        aria-hidden
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="h-4 w-28 animate-pulse rounded-full bg-gold/15" />
          <div className="mt-6 h-12 max-w-xl animate-pulse rounded-lg bg-muted/30" />
          <div className="mt-14 grid gap-4 md:grid-cols-2">
            <div className="h-48 animate-pulse rounded-2xl bg-muted/20" />
            <div className="hidden h-48 animate-pulse rounded-2xl bg-muted/15 md:block" />
          </div>
        </div>
      </div>
    ),
  }
);

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <MarqueeStrip />
      <DeliveryTiles />
      <EveningProgrammingStrip />
      <ValuePillarsSection />
      <FeaturedDishes />
      <StatsStrip />
      <TableGoldSurprise />
      <ChefPreview />
      <LazyTestimonials />
      <ExperienceSection />
      <LocationCta />
      <InstagramGrid />
      <NewsSection />
      <LoyaltyAppSection />
      <NewsletterSection />
    </>
  );
}
