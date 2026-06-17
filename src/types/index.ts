export type MenuCategoryId =
  | "starters"
  | "main-course"
  | "seafood"
  | "desserts"
  | "beverages";

export type DietaryTag =
  | "vegetarian"
  | "vegan"
  | "gluten-free"
  | "contains-nuts"
  | "spicy"
  | "chef-special";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  /** Optional one-line editorial (EISLAB-style flavor story), e.g. for signatures. */
  story?: string;
  priceInr: number;
  category: MenuCategoryId;
  dietary: DietaryTag[];
  imageSrc: string;
  imageAlt: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  heightClass: "short" | "medium" | "tall";
}

export interface TimelineStep {
  id: string;
  title: string;
  description: string;
}

export interface Award {
  id: string;
  title: string;
  year: string;
  body: string;
}

export interface BranchInfo {
  name: string;
  addressLines: string[];
  phone: string;
  email: string;
}

export type ChatRole = "user" | "assistant" | "system";

export interface ChatMessage {
  id: string;
  role: Exclude<ChatRole, "system">;
  content: string;
}
