/**
 * ============================================================================
 *  AMANDA — SCULPT & MOVEMENT · CENTRAL SITE CONFIGURATION (V2 · LA EDITION)
 * ============================================================================
 *
 *  👉 This is the ONLY file you need to edit to customize the entire landing page:
 *     copy, social links, color palette tokens, image paths, video URLs, and
 *     the contact form endpoint.
 *
 *  · IMAGES live in   /public/images/  → reference as "/images/filename.jpg"
 *  · VIDEOS live in   /public/videos/  → reference as "/videos/filename.mp4"
 *    (or paste any direct CDN video URL: "https://cdn.../clip.mp4")
 *  · Save this file and the site automatically hot-reloads with `npm run dev`.
 * ============================================================================
 */

/* ----------------------------------------------------------------------------
 *  TYPES
 * --------------------------------------------------------------------------*/
export type HeadlineSegment = {
  text: string;
  /** "sans" = clean geometric · "serif" = editorial high-fashion italic */
  style: "sans" | "serif";
};

export type VibeTrack = {
  id: string;
  phase: string;
  bpm: number;
  duration: string;
  intensity: 1 | 2 | 3 | 4 | 5;
  description: string;
  accent: string;
};

export type Reel = {
  id: string;
  title: string;
  classStyle: string;
  bpm: number;
  poster: string;
  video: string;
  tiktokUrl: string;
};

export type GalleryItem =
  | { type: "image"; src: string; alt: string; caption: string; span: "tall" | "wide" | "square" }
  | { type: "quote"; text: string; author: string }
  | { type: "social"; network: "instagram" | "tiktok" };

export type InquiryType = { id: string; label: string };

/* ============================================================================
 *  SITE CONFIGURATION
 * ==========================================================================*/
export const siteConfig = {
  /* --------------------------------------------------------------------------
   *  1. BRAND & SEO (American English · Los Angeles)
   * ------------------------------------------------------------------------*/
  brand: {
    name: "Amanda",
    logo: "AMANDA.", // Header logo mark
    watermark: "AMANDA SCULPT", // Oversized footer watermark
    language: "en", // HTML document language
    copyright: "© 2026 Amanda Sculpt. All rights reserved.",
    credits: "Design & Direction — Editorial Studio, Los Angeles",
  },

  seo: {
    title: "Amanda — Sculpt & Movement Instructor | Los Angeles, CA",
    description:
      "High-energy, beat-driven Sculpt classes in Los Angeles. Private 1:1 sessions, studio takeovers, masterclasses, and brand partnerships.",
    // 🔁 Replace with your live domain once connected (e.g. https://amanda-sculpt.vercel.app)
    url: "https://amandasculpt.com",
    ogImage: "/images/hero-sculpt.jpg",
  },

  /* --------------------------------------------------------------------------
   *  2. COLOR PALETTE ("LA Luxury Editorial Wellness")
   *  Change any HEX value here to instantly update the entire website.
   * ------------------------------------------------------------------------*/
  theme: {
    colors: {
      background: "#F9F6F0", // Warm alabaster / oat — primary canvas
      surface: "#EFECE6", //    Soft sand — secondary canvas
      ink: "#1C1917", //        Dark espresso — primary text & contrast
      muted: "#78716C", //      Warm stone — secondary & body text
      clay: "#C87D55", //       Terracotta clay — signature warm accent
      sage: "#8A9A86", //       Soft sage — serene California accent
    },
    // Typography: Cormorant Garamond (Editorial Serif) + Plus Jakarta Sans (Clean Modern Sans)
    // loaded via next/font in src/app/layout.tsx for zero-layout-shift performance.
  },

  /* --------------------------------------------------------------------------
   *  3. SOCIAL CHANNELS & DIRECT CONTACT INFO
   *  🔁 Replace handles and URLs with Amanda's actual accounts
   * ------------------------------------------------------------------------*/
  social: {
    tiktok: {
      handle: "@amanda.sculpt",
      url: "https://www.tiktok.com/@amanda.sculpt",
      label: "Class flows & sculpt",
    },
    instagram: {
      handle: "@amanda.in.la",
      url: "https://www.instagram.com/amanda.in.la",
      label: "Daily life & lifestyle",
    },
    spotify: {
      handle: "Amanda's Sculpt Playlists",
      url: "https://open.spotify.com/user/amandasculpt",
      label: "Class playlists",
    },
  },

  contactInfo: {
    email: "hello@amandasculpt.com",
    location: "Los Angeles, California",
    neighborhoods: "Silver Lake · West Hollywood · Santa Monica",
    responseTime: "Personal reply within 24–48 hrs",
  },

  /* --------------------------------------------------------------------------
   *  4. NAVIGATION
   * ------------------------------------------------------------------------*/
  nav: {
    links: [
      { label: "The Method", href: "#method" },
      { label: "In Motion", href: "#in-motion" },
      { label: "Beyond The Mat", href: "#beyond" },
      { label: "Connect", href: "#connect" },
    ],
    cta: { label: "Book a Session", href: "#connect" },
  },

  /* --------------------------------------------------------------------------
   *  5. HERO SECTION
   * ------------------------------------------------------------------------*/
  hero: {
    locationTag: "📍 LOS ANGELES, CA • SCULPT & MOVEMENT",
    headline: [
      { text: "Sculpted by", style: "sans" },
      { text: "rhythm.", style: "serif" },
      { text: "Driven by", style: "sans" },
      { text: "precision.", style: "serif" },
    ] as HeadlineSegment[],
    subtitle:
      "High-energy, low-impact sculpt synced to the beat. Musical tempo, precise form, and sustained tension curated so you train with intention — and walk away feeling completely unstoppable.",
    primaryCta: { label: "Book Your Session", href: "#connect" },
    secondaryCta: { label: "Watch Class in Motion", href: "#in-motion" },
    // 🖼️ Main editorial portrait
    image: "/images/hero-sculpt.jpg",
    imageAlt: "Amanda holding light hand weights in a lunge inside a sunlit Los Angeles studio",
    // 🎬 OPTIONAL: looping background video. Leave empty ("") to display the still image.
    //    Example: "/videos/hero-loop.mp4" (MP4 H.264, < 8MB recommended)
    video: "",
    nowPlaying: { label: "Now Teaching", track: "Core & Glute Burn", bpm: 126 },
    rotatingBadge: "BEAT-DRIVEN SCULPT • LOS ANGELES • EST. 2019 • ",
    stats: [
      { value: "1.2K+", label: "Classes Led" },
      { value: "126", label: "Average BPM" },
      { value: "6", label: "L.A. Studios" },
    ],
  },

  /* --------------------------------------------------------------------------
   *  6. MARQUEE STRIP
   * ------------------------------------------------------------------------*/
  marquee: [
    "Beat-Driven Sculpt",
    "Tempo Conscious",
    "Time Under Tension",
    "Los Angeles",
    "Low Impact · High Burn",
    "Move With Intention",
  ],

  /* --------------------------------------------------------------------------
   *  7. THE METHOD ("Beat-Driven Sculpt")
   * ------------------------------------------------------------------------*/
  method: {
    eyebrow: "01 — The Method",
    titleSans: "Beat-Driven",
    titleSerif: "Sculpt",
    intro:
      "We don't count reps — we move to 8-counts. Every sequence is intentionally mapped to the BPM so muscles stay under sustained tension, your breath finds its groove, and transitions flow seamlessly without ever breaking the room's energy.",
    pillars: [
      {
        number: "01",
        title: "BPM-Curated Tempo",
        tag: "BPM",
        text: "Every playlist is built by BPM. We ride deliberate tempo waves to modulate the burn — just like a DJ reading the room.",
      },
      {
        number: "02",
        title: "Sustained Muscle Burn",
        tag: "Tension",
        text: "Isometric holds, micro-pulses, and deep time-under-tension. Light weights, deep intention — high burn with zero joint impact.",
      },
      {
        number: "03",
        title: "Sunlit L.A. Culture",
        tag: "Vibe",
        text: "Natural light, heavy bass, and a community that shows up for each other. You leave sweaty, grounded, and ready for your morning matcha.",
      },
    ],
    vibe: {
      title: "Class Vibe Preview",
      subtitle: "Tap any phase to feel how a live sculpt session flows.",
      tracks: [
        {
          id: "warmup",
          phase: "Warmup Flow",
          bpm: 110,
          duration: "08 min",
          intensity: 2,
          description: "Mobility, breathwork, and gentle groove. Waking up the body with zero rush.",
          accent: "#8A9A86",
        },
        {
          id: "burn",
          phase: "Core & Glute Burn",
          bpm: 126,
          duration: "18 min",
          intensity: 4,
          description: "Sustained pulses on the 8-count. Deep time-under-tension where the signature sculpt shake kicks in.",
          accent: "#C87D55",
        },
        {
          id: "finisher",
          phase: "Sculpt Finisher",
          bpm: 132,
          duration: "10 min",
          intensity: 5,
          description: "Peak tempo, arm series, and one final beat drop that leaves you completely breathless.",
          accent: "#E3B08F",
        },
      ] as VibeTrack[],
    },
  },

  /* --------------------------------------------------------------------------
   *  8. IN MOTION — TIKTOK & CLASS REELS (Vertical 9:16)
   *  · poster: 9:16 still thumbnail
   *  · video:  optional path or CDN link (e.g. "/videos/reel-01.mp4")
   *  · tiktokUrl: direct link to Amanda's TikTok clip or profile
   * ------------------------------------------------------------------------*/
  movement: {
    eyebrow: "02 — In Motion",
    titleSans: "Class in",
    titleSerif: "motion",
    intro: "Raw moments from the studio floor. Turn the sound on — every move drops right on the beat.",
    profileCta: "Follow on TikTok",
    reels: [
      {
        id: "reel-01",
        title: "Squat pulses on the 8-count",
        classStyle: "Full Body Sculpt",
        bpm: 128,
        poster: "/images/reel-01.jpg",
        video: "", // 🎬 e.g.: "/videos/reel-01.mp4"
        tiktokUrl: "https://www.tiktok.com/@amanda.sculpt",
      },
      {
        id: "reel-02",
        title: "Sustained bridge series",
        classStyle: "Glute Burn",
        bpm: 122,
        poster: "/images/reel-02.jpg",
        video: "", // 🎬 e.g.: "/videos/reel-02.mp4"
        tiktokUrl: "https://www.tiktok.com/@amanda.sculpt",
      },
      {
        id: "reel-03",
        title: "Arm series & tempo drop",
        classStyle: "Sculpt Finisher",
        bpm: 132,
        poster: "/images/reel-03.jpg",
        video: "", // 🎬 e.g.: "/videos/reel-03.mp4"
        tiktokUrl: "https://www.tiktok.com/@amanda.sculpt",
      },
      {
        id: "reel-04",
        title: "Sunset rooftop core flow",
        classStyle: "Core Flow",
        bpm: 116,
        poster: "/images/reel-04.jpg",
        video: "", // 🎬 e.g.: "/videos/reel-04.mp4"
        tiktokUrl: "https://www.tiktok.com/@amanda.sculpt",
      },
    ] as Reel[],
  },

  /* --------------------------------------------------------------------------
   *  9. BEYOND THE MAT / LIFESTYLE (About Amanda & L.A. Life)
   * ------------------------------------------------------------------------*/
  about: {
    eyebrow: "03 — Beyond The Mat",
    titleSans: "Hi, I'm",
    titleSerif: "Amanda.",
    lead: "Sculpt instructor, vinyl collector, and iced matcha devotee. I moved to Los Angeles with a carry-on and a curated playlist — and stayed for the golden light.",
    paragraphs: [
      "I grew up dancing, fell hard for classical Pilates, and carved out my voice in Sculpt — that sweet spot where technical alignment meets a soundtrack that refuses to let you quit.",
      "Off the mat, you'll find me catching sunrise on Runyon Canyon, escaping down PCH to Malibu, or scouting sunlit coffee spots in Silver Lake. My TikTok is where we sweat; my Instagram is everything in between.",
    ],
    signature: "— Amanda",
    certifications: ["Certified Sculpt & Barre", "Comprehensive Mat Pilates", "Pre & Postnatal Movement"],
    gallery: [
      { type: "image", src: "/images/about-portrait.jpg", alt: "Amanda relaxing at her Silver Lake home", caption: "Home · Silver Lake", span: "tall" },
      { type: "image", src: "/images/life-canyon.jpg", alt: "Amanda hiking above the Los Angeles skyline at sunrise", caption: "Runyon Canyon · 6:40 am", span: "tall" },
      { type: "image", src: "/images/life-studio.jpg", alt: "Amanda curating the class playlist before teaching", caption: "Pre-class · The playlist is sacred", span: "wide" },
      { type: "image", src: "/images/life-matcha.jpg", alt: "Iced matcha latte on travertine table in a sunlit cafe", caption: "Morning ritual · Iced matcha", span: "square" },
      { type: "quote", text: "Discipline just sounds better with great music.", author: "Amanda" },
      { type: "image", src: "/images/life-malibu.jpg", alt: "Amanda walking barefoot along Malibu beach at sunset", caption: "Malibu · Golden hour", span: "wide" },
      { type: "social", network: "instagram" },
      { type: "social", network: "tiktok" },
    ] as GalleryItem[],
  },

  /* --------------------------------------------------------------------------
   *  10. CONTACT — "WORK WITH AMANDA"
   * ------------------------------------------------------------------------*/
  contact: {
    eyebrow: "04 — Work with Amanda",
    titleSans: "Let's move",
    titleSerif: "together.",
    availability:
      "Available throughout Los Angeles for private 1:1 sessions, studio takeovers, and brand partnerships.",
    inquiryLabel: "What do you have in mind?",
    inquiryTypes: [
      { id: "private", label: "Private 1:1 or Group Session" },
      { id: "brand", label: "Brand Partnership / UGC" },
      { id: "studio", label: "Studio / Guest Pop-up" },
      { id: "hello", label: "General Inquiry / Say Hi" },
    ] as InquiryType[],
    fields: {
      name: { label: "Full Name", placeholder: "Your name" },
      email: { label: "Email Address", placeholder: "you@domain.com" },
      social: { label: "Instagram / TikTok Handle", placeholder: "@handle (optional)" },
      message: { label: "Message", placeholder: "Tell me about dates, goals, or your brand collaboration idea…" },
    },
    submitLabel: "Send Message",
    sendingLabel: "Sending…",
    successTitle: "Message received!",
    successText: "Thank you for reaching out. I'll get back to you personally within 24–48 hours.",
    successReset: "Send another message",
    errorText: "Something went wrong. Please try again or email me directly at",
  },

  /* --------------------------------------------------------------------------
   *  11. CONTACT FORM ENDPOINT (Web3Forms / Formspree)
   *
   *  HOW TO ACTIVATE IN 2 MINUTES:
   *  1. Go to https://web3forms.com and type Amanda's email address.
   *  2. Copy the Access Key sent to that email.
   *  3. Paste it below into `accessKey`. That's it!
   *
   *  ℹ️ While `accessKey` remains "YOUR_WEB3FORMS_ACCESS_KEY", in development mode
   *     the form simulates a successful delivery so you can present the design.
   * ------------------------------------------------------------------------*/
  form: {
    provider: "web3forms" as "web3forms" | "formspree",
    endpoint: "https://api.web3forms.com/submit",
    // 🔑 REPLACE WITH AMANDA'S WEB3FORMS ACCESS KEY
    accessKey: "YOUR_WEB3FORMS_ACCESS_KEY",
    subject: "✨ New inquiry from amandasculpt.com",
    fromName: "Amanda Sculpt — Web",
  },

  /* --------------------------------------------------------------------------
   *  12. FOOTER
   * ------------------------------------------------------------------------*/
  footer: {
    tagline: "Sculpted by rhythm. Driven by precision.",
    note: "Crafted with natural light and good tempo in Los Angeles.",
  },
};

export type SiteConfig = typeof siteConfig;
