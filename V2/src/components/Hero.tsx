"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDownRight, Play, Sparkle } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { siteConfig } from "@/data/siteConfig";
import MagneticButton from "@/components/ui/MagneticButton";

const { hero } = siteConfig;
const ease = [0.22, 1, 0.36, 1] as const;

function Equalizer({ bars = 5, className = "" }: { bars?: number; className?: string }) {
  return (
    <span className={`flex h-4 items-end gap-[3px] ${className}`} aria-hidden="true">
      {Array.from({ length: bars }).map((_, i) => (
        <span
          key={i}
          className="block h-full w-[3px] origin-bottom animate-eq rounded-full bg-current"
          style={{ animationDelay: `${i * 0.13}s`, animationDuration: `${0.8 + (i % 3) * 0.18}s` }}
        />
      ))}
    </span>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.15]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  const badgeY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <section
      ref={ref}
      id="top"
      aria-label="Hero"
      className="relative isolate overflow-hidden pb-14 pt-24 sm:pt-32 lg:min-h-[100svh] lg:pb-12"
    >
      {/* Warm ambient halos */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-32 top-8 h-[24rem] w-[24rem] rounded-full bg-clay/15 blur-[100px] sm:h-[34rem] sm:w-[34rem] sm:blur-[130px]" />
        <div className="absolute -right-20 bottom-0 h-[22rem] w-[22rem] rounded-full bg-sage/20 blur-[100px] sm:h-[28rem] sm:w-[28rem] sm:blur-[120px]" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-8 lg:grid-cols-12 lg:gap-8">
        {/* ---------- Editorial Copy (Mobile-First) ---------- */}
        <motion.div style={{ y: textY }} className="relative z-10 lg:col-span-7">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-espresso/10 bg-alabaster/70 px-3.5 py-1.5 text-[0.62rem] font-medium uppercase tracking-[0.22em] text-espresso/80 backdrop-blur sm:mb-8 sm:px-4 sm:py-2 sm:text-[0.7rem]"
          >
            {hero.locationTag}
          </motion.p>

          <h1 className="text-[2.65rem] leading-[0.96] tracking-[-0.04em] text-espresso min-[380px]:text-[3rem] min-[440px]:text-[3.5rem] sm:text-7xl lg:text-[5.4rem] xl:text-[6.2rem]">
            {hero.headline.map((seg, i) => (
              <span key={i} className="inline-block overflow-hidden pb-[0.06em] align-bottom">
                <motion.span
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1.1, delay: 0.35 + i * 0.1, ease }}
                  className={
                    seg.style === "serif"
                      ? "inline-block pr-[0.14em] font-serif text-[1.12em] font-normal italic tracking-[-0.02em] text-clay"
                      : "inline-block pr-[0.18em] font-light"
                  }
                >
                  {seg.text}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.85, ease }}
            className="mt-6 max-w-lg text-[0.98rem] leading-relaxed text-warmstone sm:mt-8 sm:text-lg"
          >
            {hero.subtitle}
          </motion.p>

          {/* CTAs: Stacked full-width on mobile, horizontal on desktop */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1, ease }}
            className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center"
          >
            <MagneticButton
              href={hero.primaryCta.href}
              id="hero-cta-primary"
              variant="primary"
              className="w-full sm:w-auto"
            >
              {hero.primaryCta.label}
              <ArrowDownRight className="h-4 w-4 transition-transform duration-500 group-hover:-rotate-45" />
            </MagneticButton>
            <MagneticButton
              href={hero.secondaryCta.href}
              id="hero-cta-secondary"
              variant="secondary"
              className="w-full pl-3! sm:w-auto"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-clay text-alabaster transition-transform duration-500 group-hover:scale-110">
                <Play className="ml-0.5 h-3.5 w-3.5 fill-current" />
              </span>
              {hero.secondaryCta.label}
            </MagneticButton>
          </motion.div>

          {/* Quick Metrics */}
          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="mt-10 grid max-w-md grid-cols-3 divide-x divide-espresso/10 border-t border-espresso/10 pt-5 sm:mt-14 sm:pt-6"
          >
            {hero.stats.map((s) => (
              <div key={s.label} className="px-3 first:pl-0 sm:px-4">
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-serif text-2xl font-medium leading-none text-espresso sm:text-4xl">{s.value}</dd>
                <dd className="mt-1.5 text-[0.62rem] uppercase leading-snug tracking-[0.16em] text-warmstone sm:mt-2 sm:text-[0.65rem] sm:tracking-[0.18em]">
                  {s.label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        {/* ---------- Editorial Arched Portrait (Mobile Optimized) ---------- */}
        <div className="relative mx-auto w-full max-w-sm sm:max-w-md lg:col-span-5 lg:max-w-none">
          <motion.div
            initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            transition={{ duration: 1.5, delay: 0.3, ease }}
            className="relative aspect-[4/5] w-full overflow-hidden rounded-t-[999px] rounded-b-[2rem] bg-sand shadow-[0_30px_70px_-25px_rgba(28,25,23,0.35)] sm:rounded-b-[2.5rem] lg:aspect-[3/4]"
          >
            <motion.div style={{ y: imgY, scale: imgScale }} className="absolute inset-0">
              {hero.video ? (
                <video
                  className="h-full w-full object-cover"
                  src={hero.video}
                  poster={hero.image}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                />
              ) : (
                <Image
                  src={hero.image}
                  alt={hero.imageAlt}
                  fill
                  preload
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  className="object-cover"
                />
              )}
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-espresso/35 via-transparent to-transparent" />
          </motion.div>

          {/* Spinning Badge: positioned safely inside bounds on mobile */}
          <motion.div
            style={{ y: badgeY }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 1.2, ease }}
            className="absolute -left-2 top-6 h-24 w-24 sm:-left-8 sm:top-10 sm:h-32 sm:w-32 lg:-left-12"
          >
            <div className="relative h-full w-full rounded-full bg-alabaster/85 shadow-lg backdrop-blur-md">
              <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full animate-spin-slow" aria-hidden="true">
                <defs>
                  <path id="hero-badge-path" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
                </defs>
                <text className="fill-espresso text-[8.2px] uppercase tracking-[0.22em]" style={{ fontFamily: "var(--font-jakarta)" }}>
                  <textPath href="#hero-badge-path">{hero.rotatingBadge}</textPath>
                </text>
              </svg>
              <Sparkle className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 fill-clay text-clay sm:h-6 sm:w-6" />
            </div>
          </motion.div>

          {/* "Now Teaching" Pill: mobile-compact & beat-synced */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.35, ease }}
            className="absolute -bottom-4 right-1 flex items-center gap-3 rounded-2xl border border-alabaster/50 bg-alabaster/80 p-2.5 pr-4 shadow-[0_15px_40px_-15px_rgba(28,25,23,0.35)] backdrop-blur-xl sm:-bottom-6 sm:right-6 sm:gap-4 sm:p-3 sm:pr-5 lg:-right-6"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-espresso text-clay sm:h-12 sm:w-12">
              <Equalizer />
            </span>
            <span className="flex flex-col">
              <span className="text-[0.55rem] uppercase tracking-[0.2em] text-warmstone sm:text-[0.6rem]">{hero.nowPlaying.label}</span>
              <span className="font-serif text-base italic leading-tight text-espresso sm:text-lg">{hero.nowPlaying.track}</span>
            </span>
            <span className="ml-1 flex items-center gap-1.5 border-l border-espresso/10 pl-3 sm:gap-2 sm:pl-4">
              <span className="relative flex h-2 w-2">
                <span
                  className="absolute inline-flex h-full w-full animate-beat rounded-full bg-clay"
                  style={{ animationDuration: `${60 / hero.nowPlaying.bpm}s` }}
                />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-clay" />
              </span>
              <span className="text-xs font-semibold tabular-nums text-espresso sm:text-sm">
                {hero.nowPlaying.bpm}
                <span className="ml-1 text-[0.55rem] font-medium tracking-widest text-warmstone sm:text-[0.6rem]">BPM</span>
              </span>
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
