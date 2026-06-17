export const BRANCH = {
  name: "Aurelio \u2014 Iyyappanthangal",
  addressLines: [
    "Iyyappanthangal",
    "Chennai, Tamil Nadu 600056",
    "India",
  ],
  phoneDisplay: "+91 (44) 5550-2140",
  phoneTel: "+914455502140",
  email: "concierge@aurelio.studio",
} as const;

/** Amici-style "tonight / this week" honesty \u2014 static demo copy for the portfolio build. */
export const VENUE_SIGNALS = {
  statusLabel: "Dinner service \u00b7 demo schedule",
  statusDetail:
    "Wed\u2013Sun \u00b7 seatings from 6:00pm \u00b7 last kitchen call 10:30pm (portfolio hours).",
  walkInNote:
    "Chef\u2019s counter sometimes releases a few walk-ins after 9:15pm when the pass is calm \u2014 ask the door, kindly.",
} as const;

export const SITE = {
  name: "Aurelio",
  tagline:
    "We welcome you the way we would at our own table \u2014 calm pacing, generous detail, Chennai at night.",
  /** Tamil line \u2014 warm host register (portfolio). */
  taglineTamil:
    "\u0b87\u0ba9\u0bcd\u0bb1\u0bc8\u0baf \u0b87\u0bb0\u0bb5\u0bbf\u0bb1\u0bcd\u0b95\u0bc1 \u0bb5\u0bb0\u0bb5\u0bc7\u0bb1\u0bcd\u0b95\u0bbf\u0bb1\u0bcb\u0bae\u0bcd \u2014 \u0ba8\u0bbf\u0ba4\u0bbe\u0ba9\u0bae\u0bbe\u0ba9 \u0b9a\u0bc1\u0bb5\u0bc8, \u0b9a\u0bc6\u0ba9\u0bcd\u0ba9\u0bc8\u0baf\u0bbf\u0ba9\u0bcd \u0b87\u0ba4\u0baf\u0ba4\u0bcd\u0ba4\u0bbf\u0bb2\u0bcd.",
  /** Host voice: Tamil Nadu\u2013aware, still honest that the venue is fictional. */
  regionStory:
    "The kitchen thinks in Tamil Nadu markets and coastlines; this flagship is imagined for Iyyappanthangal, Chennai, but the warmth is real.",
  description:
    "Aurelio is a fictional Chennai flagship \u2014 a portfolio piece written in the voice of a host, not a brochure.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://aurelio.example.com",
  locale: "en_IN",
  currency: "INR",
  /** Optional WhatsApp-style deep link for reservations (demo). Uses branch phone. */
  whatsappBookingUrl:
    "https://wa.me/914455502140?text=Hi%20Aurelio%2C%20I%E2%80%99d%20like%20to%20reserve%20a%20table.",
  /** Social display handle (footer + loyalty). */
  socialHandle: "@aurelio",
  social: {
    instagram: "https://www.instagram.com/",
    facebook: "https://www.facebook.com/",
    x: "https://x.com/",
  },
} as const;

/** Loyalty app band \u2014 demo URLs; swap for production deep links. */
export const LOYALTY_APP = {
  headline: "Join 50K+ members",
  subtitle:
    "Pre-order pick-up, collect turmeric points, and unlock treats reserved for the app \u2014 built as a portfolio demo.",
  qrTargetUrl: `${SITE.url}/download-app`,
  storeIosUrl: "#app-store",
  storeAndroidUrl: "#google-play",
  rewards: [
    {
      id: "points",
      title: "Turmeric points",
      description:
        "Earn on every visit and redeem toward tasting-menu credits or wine flights.",
    },
    {
      id: "priority",
      title: "Priority seating",
      description:
        "Check in from the app on busy nights for faster door recognition (demo flow).",
    },
    {
      id: "birthday",
      title: "Birthday amuse",
      description:
        "Automatic treat on the table \u2014 stack with the gold-rim surprise when the room allows.",
    },
  ],
} as const;

/** Demo "evening programming" cards \u2014 BAVET-style reasons to visit (static data). */
export const EVENING_PROGRAMMING = [
  {
    id: "filter-hour",
    strand: "Terrace",
    label: "Filter coffee hour",
    blurb: "Bar opens early \u00b7 5\u20136pm \u00b7 demo slot",
    time: "5:00 \u2013 6:00 PM",
    day: "Daily",
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80",
  },
  {
    id: "live-pass",
    strand: "Pass",
    label: "Live from the pass",
    blurb: "Chef narrates two plates \u00b7 Thu",
    time: "7:30 PM",
    day: "Thursday",
    image:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
  },
  {
    id: "tamil-supper",
    strand: "Salon",
    label: "Tamil supper club",
    blurb: "Set menu + pairings \u00b7 monthly",
    time: "7:00 PM",
    day: "Last Sunday",
    image:
      "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80",
  },
  {
    id: "afterwork",
    strand: "Jade room",
    label: "Afterwork jade room",
    blurb: "Small plates, low lights \u00b7 Fri",
    time: "5:30 \u2013 8:30 PM",
    day: "Friday",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
  },
  {
    id: "vin-jardin",
    strand: "Garden",
    label: "Vin & jardin",
    blurb: "Sommelier walk-around \u00b7 Sat early",
    time: "6:00 PM",
    day: "Saturday",
    image:
      "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&q=80",
  },
] as const;

/** Editorial news items \u2014 keeps the site feeling alive. */
export const NEWS_ITEMS = [
  {
    id: "n1",
    date: "12 Jun 2026",
    title: "Tamil supper club returns this Sunday",
    excerpt:
      "Chef Elena has curated a five-course arc around Chettinad spice \u2014 book your seat before the month closes.",
    href: "#",
  },
  {
    id: "n2",
    date: "02 Jun 2026",
    title: "The terrace reopens for filter coffee hour",
    excerpt:
      "Monsoon break is over. The rooftop terrace is back with single-origin filter and open-air starters from 5 PM.",
    href: "#",
  },
  {
    id: "n3",
    date: "18 May 2026",
    title: "Aurelio joins the ONDC network",
    excerpt:
      "You can now order from us through any ONDC-enabled app. Same kitchen, same care \u2014 straight to your door.",
    href: "#",
  },
] as const;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "About" },
  { href: "/gallery", label: "Gallery" },
  { href: "/reservations", label: "Reservations" },
  { href: "/contact", label: "Contact" },] as const;
