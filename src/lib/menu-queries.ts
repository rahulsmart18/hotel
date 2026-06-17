import { MENU_ITEMS } from "@/lib/menu-data";
import type { DietaryTag, MenuCategoryId, MenuItem } from "@/types";

export const MENU_SORT_IDS = [
  "menu-order",
  "price-asc",
  "price-desc",
  "name",
] as const;
export type MenuSortId = (typeof MENU_SORT_IDS)[number];

export const MENU_SORT_LABELS: Record<MenuSortId, string> = {
  "menu-order": "Chef’s order",
  "price-asc": "Price · low to high",
  "price-desc": "Price · high to low",
  name: "Name · A–Z",
};

const ALL = "all" as const;
export type MenuCategoryFilter = typeof ALL | MenuCategoryId;

export function getCategoryCounts(): Record<MenuCategoryFilter, number> {
  const counts: Record<string, number> = {
    all: MENU_ITEMS.length,
    starters: 0,
    "main-course": 0,
    seafood: 0,
    desserts: 0,
    beverages: 0,
  };
  for (const item of MENU_ITEMS) {
    counts[item.category]++;
  }
  return counts as Record<MenuCategoryFilter, number>;
}

const orderIndex = new Map(
  MENU_ITEMS.map((item, i) => [item.id, i] as const)
);

export function filterMenuItems(
  items: MenuItem[],
  opts: {
    category: MenuCategoryFilter;
    query: string;
    dietaryRequired: DietaryTag[];
  }
): MenuItem[] {
  const q = opts.query.trim().toLowerCase();
  return items.filter((item) => {
    if (opts.category !== ALL && item.category !== opts.category) return false;
    if (q) {
      const blob = `${item.name} ${item.description}`.toLowerCase();
      if (!blob.includes(q)) return false;
    }
    if (opts.dietaryRequired.length > 0) {
      const ok = opts.dietaryRequired.every((tag) => item.dietary.includes(tag));
      if (!ok) return false;
    }
    return true;
  });
}

export function sortMenuItems(items: MenuItem[], sort: MenuSortId): MenuItem[] {
  const copy = [...items];
  switch (sort) {
    case "price-asc":
      return copy.sort((a, b) => a.priceInr - b.priceInr);
    case "price-desc":
      return copy.sort((a, b) => b.priceInr - a.priceInr);
    case "name":
      return copy.sort((a, b) => a.name.localeCompare(b.name));
    case "menu-order":
    default:
      return copy.sort(
        (a, b) => (orderIndex.get(a.id) ?? 0) - (orderIndex.get(b.id) ?? 0)
      );
  }
}
