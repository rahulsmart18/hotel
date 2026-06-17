import type { MenuItem } from "@/types";

export const MENU_ITEMS: MenuItem[] = [
  {
    id: "burrata-mist",
    name: "Burrata in Morning Mist",
    description:
      "Heirloom tomatoes, basil oil, aged balsamic pearls, and warm sourdough.",
    story:
      "Written like a first light over the market — cool cream, hot bread, tomatoes that still remember the vine.",
    priceInr: 720,
    category: "starters",
    dietary: ["vegetarian", "chef-special"],
    imageSrc:
      "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80",
    imageAlt: "Burrata salad with tomatoes",
  },
  {
    id: "scallop-carpaccio",
    name: "Hokkaido Scallop Carpaccio",
    description:
      "Citrus yuzu kosho, finger lime, chive oil, and crisp nori tuile.",
    story:
      "A quiet show-off: sweetness first, then salt, then heat — the kind of plate that makes the room go still for a beat.",
    priceInr: 980,
    category: "starters",
    dietary: ["gluten-free", "chef-special"],
    imageSrc:
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80",
    imageAlt: "Scallop carpaccio on a plate",
  },
  {
    id: "truffle-tart",
    name: "Black Truffle Tartlet",
    description:
      "Silken egg custard, aged Comté, winter truffle shavings, micro herbs.",
    priceInr: 890,
    category: "starters",
    dietary: ["vegetarian", "contains-nuts"],
    imageSrc:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
    imageAlt: "Gourmet tartlet with truffle",
  },
  {
    id: "wagyu-tataki",
    name: "Wagyu Tataki",
    description:
      "Seared A5 strips, smoked ponzu, pickled mooli, and crispy garlic.",
    story:
      "Char on the edge, rare in the middle — built for the friend who always asks for “just one more bite.”",
    priceInr: 1450,
    category: "starters",
    dietary: ["spicy", "chef-special"],
    imageSrc:
      "https://images.unsplash.com/photo-1558030006-450675393462?w=800&q=80",
    imageAlt: "Seared beef tataki",
  },
  {
    id: "lamb-saddle",
    name: "Saddle of Lamb",
    description:
      "Slow-roasted with rosemary ash, fondant potato, and red wine jus.",
    priceInr: 1680,
    category: "main-course",
    dietary: ["gluten-free", "chef-special"],
    imageSrc:
      "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&q=80",
    imageAlt: "Lamb dish with jus",
  },
  {
    id: "duck-breast",
    name: "Dry-Aged Duck Breast",
    description:
      "Cherry gastrique, charred endive, cocoa nib, and jus roti.",
    priceInr: 1520,
    category: "main-course",
    dietary: ["gluten-free"],
    imageSrc:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
    imageAlt: "Duck breast plated",
  },
  {
    id: "porcini-risotto",
    name: "Porcini Risotto",
    description:
      "Carnaroli rice, porcini duxelles, Parmigiano Reggiano, and truffle butter.",
    priceInr: 1180,
    category: "main-course",
    dietary: ["vegetarian", "gluten-free"],
    imageSrc:
      "https://images.unsplash.com/photo-1546549018-43d89c67ddc4?w=800&q=80",
    imageAlt: "Creamy mushroom risotto",
  },
  {
    id: "mille-feuille",
    name: "Heritage Chicken Mille-Feuille",
    description:
      "Confit leg, crisp skin, morel cream, and spring vegetables.",
    priceInr: 1320,
    category: "main-course",
    dietary: ["contains-nuts"],
    imageSrc:
      "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&q=80",
    imageAlt: "Fine dining chicken dish",
  },
  {
    id: "lobster-bisque",
    name: "Lobster Bisque En Croûte",
    description:
      "Brandy flame, tarragon foam, and butter-poached knuckle meat.",
    priceInr: 920,
    category: "seafood",
    dietary: ["chef-special"],
    imageSrc:
      "https://images.unsplash.com/photo-1553621042-f6e147245754?w=800&q=80",
    imageAlt: "Lobster soup",
  },
  {
    id: "sea-bass",
    name: "Line-Caught Sea Bass",
    description:
      "Charcoal skin, fennel pollen, saffron velouté, and sea herbs.",
    priceInr: 1890,
    category: "seafood",
    dietary: ["gluten-free", "chef-special"],
    imageSrc:
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&q=80",
    imageAlt: "Sea bass fillet",
  },
  {
    id: "tuna-tartare",
    name: "Bluefin Tartare",
    description:
      "Avocado crémeux, sesame tuile, wasabi leaf, and ponzu pearls.",
    priceInr: 1650,
    category: "seafood",
    dietary: ["spicy", "gluten-free"],
    imageSrc:
      "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800&q=80",
    imageAlt: "Tuna tartare",
  },
  {
    id: "octopus",
    name: "Charred Octopus",
    description:
      "Smoked paprika aioli, confit potato, caper berries, and lemon ash.",
    priceInr: 1280,
    category: "seafood",
    dietary: ["gluten-free"],
    imageSrc:
      "https://images.unsplash.com/photo-1559847844-5315695dadae?w=800&q=80",
    imageAlt: "Grilled octopus",
  },
  {
    id: "chocolate-souffle",
    name: "Valrhona Soufflé",
    description:
      "70% Guanaja, créme anglaise pour, and gold leaf — baked to order.",
    priceInr: 680,
    category: "desserts",
    dietary: ["vegetarian", "gluten-free", "chef-special"],
    imageSrc:
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&q=80",
    imageAlt: "Chocolate soufflé",
  },
  {
    id: "yuzu-parfait",
    name: "Yuzu Olive Oil Parfait",
    description:
      "Sheep’s milk yogurt, meringue shards, and candied pistachio.",
    priceInr: 620,
    category: "desserts",
    dietary: ["vegetarian", "contains-nuts"],
    imageSrc:
      "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800&q=80",
    imageAlt: "Elegant dessert parfait",
  },
  {
    id: "cheese-cart",
    name: "Affineur’s Selection",
    description:
      "Three rotating artisan cheeses, honeycomb, and fig mostarda.",
    priceInr: 980,
    category: "desserts",
    dietary: ["vegetarian", "gluten-free"],
    imageSrc:
      "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=800&q=80",
    imageAlt: "Cheese board",
  },
  {
    id: "sorbet-trio",
    name: "Palette Cleanser Trio",
    description:
      "Mango, rose, and lychee sorbets with crystallized herbs.",
    priceInr: 420,
    category: "desserts",
    dietary: ["vegan", "gluten-free"],
    imageSrc:
      "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&q=80",
    imageAlt: "Colorful sorbet scoops",
  },
  {
    id: "sommelier-flight",
    name: "Sommelier’s Flight",
    description:
      "Three curated pours paired to the chef’s tasting — ask your server.",
    priceInr: 2400,
    category: "beverages",
    dietary: [],
    imageSrc:
      "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&q=80",
    imageAlt: "Wine glasses",
  },
  {
    id: "zero-proof",
    name: "Zero-Proof Pairing",
    description:
      "Botanical shrubs, cold-brew teas, and house ferments — alcohol free.",
    priceInr: 890,
    category: "beverages",
    dietary: ["vegan"],
    imageSrc:
      "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&q=80",
    imageAlt: "Craft non-alcoholic drinks",
  },
  {
    id: "champagne",
    name: "Champagne by the Glass",
    description:
      "NV Blanc de Blancs — crisp citrus, brioche, and mineral finish.",
    priceInr: 1100,
    category: "beverages",
    dietary: ["vegan", "gluten-free"],
    imageSrc:
      "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800&q=80",
    imageAlt: "Champagne flute",
  },
  {
    id: "espresso",
    name: "Single-Origin Espresso",
    description:
      "Ethiopian heirloom — jasmine, bergamot, and cacao nib finish.",
    priceInr: 220,
    category: "beverages",
    dietary: ["vegan", "gluten-free"],
    imageSrc:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80",
    imageAlt: "Espresso cup",
  },
];

export const MENU_CATEGORY_LABELS: Record<
  import("@/types").MenuCategoryId,
  string
> = {
  starters: "Starters",
  "main-course": "Main Course",
  seafood: "Seafood",
  desserts: "Desserts",
  beverages: "Beverages",
};

export const DIETARY_LABELS: Record<import("@/types").DietaryTag, string> = {
  vegetarian: "Vegetarian",
  vegan: "Vegan",
  "gluten-free": "Gluten-free",
  "contains-nuts": "Contains nuts",
  spicy: "Spicy",
  "chef-special": "Chef’s special",
};
