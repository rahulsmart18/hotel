import type { Metadata, Viewport } from "next";
import { Geist_Mono, Noto_Sans_Tamil } from "next/font/google";

import { AppChrome } from "@/components/layout/app-chrome";
import { JsonLd } from "@/components/seo/json-ld";
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { createMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";

import "./globals.css";

const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
  adjustFontFallback: true,
});

const tamil = Noto_Sans_Tamil({
  subsets: ["tamil", "latin"],
  variable: "--font-tamil",
  weight: ["400", "500", "600", "700"],
  display: "swap",
  adjustFontFallback: true,
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#000000" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export const metadata: Metadata = createMetadata({
  title: { default: SITE.name, template: `%s · ${SITE.name}` },
  description: SITE.description,
  keywords: [
    "fine dining",
    "Indian fusion restaurant",
    "Modern Indian cuisine",
    "tasting menu",
    "Tamil Nadu",
    "Chennai",
    "Iyyappanthangal",
    "restaurant loyalty app",
    "neo-organic design",
    "portfolio",
    "Next.js",
  ],
  authors: [{ name: "Portfolio — Aurelio case study" }],
  openGraph: {
    title: SITE.name,
    description: SITE.tagline,
  },
  twitter: {
    title: SITE.name,
    description: SITE.tagline,
  },
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Fonts — Special Gothic Expanded One + Major Mono Display */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Major+Mono+Display&display=swap"
          rel="stylesheet"
        />
        <link rel="dns-prefetch" href="https://openrouter.ai" />
        <link rel="preconnect" href="https://openrouter.ai" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link
          rel="preconnect"
          href="https://images.unsplash.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://api.qrserver.com" />
      </head>
      <body
        className={`${mono.variable} ${tamil.variable} flex min-h-full flex-col bg-background font-sans text-foreground`}
      >
        <ThemeProvider>
          <SmoothScroll />
          <JsonLd />
          <AppChrome>{children}</AppChrome>
        </ThemeProvider>
      </body>
    </html>
  );
}
