import type { Metadata } from "next";

import { SITE } from "@/lib/site";

export function createMetadata(override: Metadata): Metadata {
  const titleBase = SITE.name;

  return {
    metadataBase: new URL(SITE.url),
    title: {
      default: titleBase,
      template: `%s · ${titleBase}`,
    },
    description: SITE.description,
    openGraph: {
      type: "website",
      locale: SITE.locale,
      siteName: SITE.name,
      ...override.openGraph,
    },
    twitter: {
      card: "summary_large_image",
      ...override.twitter,
    },
    robots: {
      index: true,
      follow: true,
    },
    ...override,
  };
}
