import type { Metadata, Viewport } from "next";
import type { CSSProperties } from "react";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import { siteConfig } from "@/data/siteConfig";
import MotionProvider from "@/components/ui/MotionProvider";
import PerformanceHUD from "@/components/ui/PerformanceHUD";
import "./globals.css";

// Serif editorial de alta costura (titulares y énfasis en cursiva)
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

// Sans geométrica ultra limpia (interfaz y lectura)
const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const { seo, theme, brand } = siteConfig;

export const metadata: Metadata = {
  metadataBase: new URL(seo.url),
  title: seo.title,
  description: seo.description,
  openGraph: {
    title: seo.title,
    description: seo.description,
    url: seo.url,
    siteName: brand.name,
    images: [{ url: seo.ogImage }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
    images: [seo.ogImage],
  },
};

export const viewport: Viewport = {
  themeColor: theme.colors.background,
};

// Inyecta la paleta de siteConfig como variables CSS → Tailwind las consume
const themeVars = {
  "--brand-background": theme.colors.background,
  "--brand-surface": theme.colors.surface,
  "--brand-ink": theme.colors.ink,
  "--brand-muted": theme.colors.muted,
  "--brand-clay": theme.colors.clay,
  "--brand-sage": theme.colors.sage,
} as CSSProperties;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang={brand.language}
      data-scroll-behavior="smooth"
      style={themeVars}
      className={`${cormorant.variable} ${jakarta.variable} antialiased`}
    >
      <head>
        <link rel="preload" as="image" href="/images/hero-sculpt.webp" type="image/webp" />
        <link rel="preload" as="image" href="/images/reel-01.webp" type="image/webp" />
        <link rel="preload" as="image" href="/images/about-portrait.webp" type="image/webp" />
      </head>
      <body className="min-h-full bg-alabaster font-sans text-espresso">
        <MotionProvider>
          <div className="relative w-full overflow-x-clip min-h-screen">
            {children}
          </div>
          <PerformanceHUD />
        </MotionProvider>
      </body>
    </html>
  );
}
