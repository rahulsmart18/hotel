import dynamic from "next/dynamic";
import type { Metadata } from "next";

import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Gallery",
  description:
    "Visual stories from Aurelio’s fictional dining room — masonry gallery with lightbox.",
});

const GalleryMasonry = dynamic(
  () =>
    import("@/components/gallery/gallery-masonry").then((m) => m.GalleryMasonry),
  {
    loading: () => (
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="h-10 w-40 animate-pulse rounded bg-muted/30" />
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="aspect-[3/4] animate-pulse rounded-xl bg-muted/20"
            />
          ))}
        </div>
      </div>
    ),
  }
);

export default function GalleryPage() {
  return <GalleryMasonry />;
}
