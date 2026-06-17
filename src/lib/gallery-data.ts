import type { GalleryImage } from "@/types";

export const GALLERY_CATEGORIES = [
  { id: "all", label: "All" },
  { id: "food", label: "Food" },
  { id: "interior", label: "Interior" },
  { id: "events", label: "Events" },
] as const;

export type GalleryCategory = (typeof GALLERY_CATEGORIES)[number]["id"];

export const GALLERY_IMAGES: (GalleryImage & { category: GalleryCategory; caption: string })[] = [
  {
    id: "g1",
    src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=80",
    alt: "Fine dining table setting",
    heightClass: "tall",
    category: "interior",
    caption: "The main dining room — sculptural candlelight, linen, silence.",
  },
  {
    id: "g2",
    src: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=900&q=80",
    alt: "Chef plating a dish",
    heightClass: "medium",
    category: "events",
    caption: "Chef Elena at the pass — Thursday live-plating session.",
  },
  {
    id: "g3",
    src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900&q=80",
    alt: "Gourmet appetizer",
    heightClass: "short",
    category: "food",
    caption: "Seasonal amuse-bouche — tamarind gel, coconut cream, curry leaf.",
  },
  {
    id: "g4",
    src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=900&q=80",
    alt: "Seafood course",
    heightClass: "medium",
    category: "food",
    caption: "Chettinad prawn — cold-smoked with turmeric emulsion.",
  },
  {
    id: "g5",
    src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=900&q=80",
    alt: "Restaurant interior",
    heightClass: "tall",
    category: "interior",
    caption: "The jade room — for afterwork small plates and low lights.",
  },
  {
    id: "g6",
    src: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=900&q=80",
    alt: "Wine pairing",
    heightClass: "short",
    category: "events",
    caption: "Vin & jardin — Saturday sommelier walk-around in the garden.",
  },
  {
    id: "g7",
    src: "https://images.unsplash.com/photo-1544025162-d76694265947?w=900&q=80",
    alt: "Signature dish",
    heightClass: "medium",
    category: "food",
    caption: "Signature main — aged duck breast, black pepper jus, jasmine rice.",
  },
  {
    id: "g8",
    src: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=900&q=80",
    alt: "Lobster course",
    heightClass: "tall",
    category: "food",
    caption: "Lobster thermidor — reinterpreted with south Indian coastal spice.",
  },
  {
    id: "g9",
    src: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=900&q=80",
    alt: "Dessert presentation",
    heightClass: "short",
    category: "food",
    caption: "Dessert finale — mango semifreddo, cardamom tuile, saffron honey.",
  },
  {
    id: "g10",
    src: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=900&q=80",
    alt: "Open kitchen",
    heightClass: "medium",
    category: "interior",
    caption: "The open kitchen — visible theatre from the chef\u2019s counter.",
  },
  {
    id: "g11",
    src: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=900&q=80",
    alt: "Tamil supper club",
    heightClass: "medium",
    category: "events",
    caption: "Tamil supper club \u2014 a monthly set menu celebrating Chettinad heritage.",
  },
  {
    id: "g12",
    src: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=900&q=80",
    alt: "Main course detail",
    heightClass: "tall",
    category: "food",
    caption: "Main course detail \u2014 three focal flavors, nothing more.",
  },
];
