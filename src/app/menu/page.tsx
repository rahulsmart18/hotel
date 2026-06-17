import type { Metadata } from "next";

import { MenuBrowser } from "@/components/menu/menu-browser";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Menu",
  description:
    "Explore Aurelio’s fictional tasting menu — starters, mains, seafood, desserts, and beverages with dietary labels and search.",
});

export default function MenuPage() {
  return <MenuBrowser />;
}
