"use client";

import dynamic from "next/dynamic";

/** Client-only load so the concierge bundle does not block initial LCP. */
export const ConciergeRoot = dynamic(
  () =>
    import("@/components/food-concierge/food-concierge-launcher").then(
      (m) => m.FoodConciergeLauncher
    ),
  { ssr: false, loading: () => null }
);
