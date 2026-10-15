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
          className="h-full w-[3px] origin-bottom animate-eq rounded-full bg-current"
          style={{ animationDelay: `${i * 0.13}s`, animationDuration: `${0.8 + (i % 3) * 0.18}s` }}
        />
      ))}
    </span>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.2]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const badgeY = useTransform(scrollYProgress, [0, 1], [0, -120]);

  return (
    <section
      ref={ref}
      id="top"
      aria-label="Presentación"
      className="relative isolate overflow-hidden pb-16 pt-28 sm:pt-32 lg:min-h-[100svh] lg:pb-10"
    >
      {/* Halo cálido de fondo */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-40 top-10 h-[34rem] w-[34rem] rounded-full bg-clay/15 blur-[120px]" />
        <div className="absolute -right-24 bottom-0 h-[28rem] w-[28rem] rounded-full bg-sage/20 blur-[110px]" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-8">
        {/* ---------- Texto ---------- */}
        <motion.div style={{ y: textY }} className="relative z-10 lg:col-span-7">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-espresso/10 bg-alabaster/60 px-4 py-2 text-[0.65rem] font-medium uppercase tracking-[0.24em] text-espresso/80 backdrop-blur sm:text-[0.7rem]"
          >
            {hero.locationTag}
          </motion.p>

          <h1 className="text-[3.3rem] leading-[0.95] tracking-[-0.045em] text-espresso min-[400px]:text-[3.7rem] sm:text-7xl lg:text-[5.6rem] xl:text-[6.4rem]">
            {hero.headline.map((seg, i) => (
              <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                <motion.span
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1.2, delay: 0.45 + i * 0.12, ease }}
                  className={
                    seg.style === "serif"
                      ? "inline-block pr-[0.12em] font-serif text-[1.14em] font-normal italic tracking-[-0.02em] text-clay"
                      : "inline-block pr-[0.22em] font-light"
                  }
                >
                  {seg.text}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1, ease }}
            className="mt-8 max-w-lg text-base leading-relaxed text-warmstone sm:text-lg"
          >
            {hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.15, ease }}
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <MagneticButton href={hero.primaryCta.href} id="hero-cta-primary" variant="primary">
              {hero.primaryCta.label}
              <ArrowDownRight className="h-4 w-4 transition-transform duration-500 group-hover:-rotate-45" />
            </MagneticButton>
            <MagneticButton href={hero.secondaryCta.href} id="hero-cta-secondary" variant="secondary" className="pl-3!">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-clay text-alabaster transition-transform duration-500 group-hover:scale-110">
                <Play className="ml-0.5 h-3.5 w-3.5 fill-current" />
              </span>
              {hero.secondaryCta.label}
            </MagneticButton>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 1.35 }}
            className="mt-14 grid max-w-md grid-cols-3 divide-x divide-espresso/10 border-t border-espresso/10 pt-6"
          >
            {hero.stats.map((s) => (
              <div key={s.label} className="px-4 first:pl-0">
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-serif text-3xl font-medium leading-none text-espresso sm:text-4xl">{s.value}</dd>
                <dd className="mt-2 text-[0.65rem] uppercase leading-snug tracking-[0.18em] text-warmstone">{s.label}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        {/* ---------- Imagen / vídeo ---------- */}
        <div className="relative lg:col-span-5">
          <motion.div
            initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            transition={{ duration: 1.6, delay: 0.3, ease }}
            className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-t-[999px] rounded-b-[2rem] bg-sand shadow-[0_40px_80px_-30px_rgba(28,25,23,0.35)] lg:aspect-[3/4] lg:max-w-none"
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

          {/* Insignia giratoria */}
          <motion.div
            style={{ y: badgeY }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1.3, ease }}
            className="absolute -left-2 top-10 h-28 w-28 sm:-left-8 sm:h-32 sm:w-32 lg:-left-14"
          >
            <div className="relative h-full w-full rounded-full bg-alabaster/80 shadow-xl backdrop-blur-md">
              <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full animate-spin-slow" aria-hidden="true">
                <defs>
                  <path id="hero-badge-path" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
                </defs>
                <text className="fill-espresso text-[8.4px] uppercase tracking-[0.22em]" style={{ fontFamily: "var(--font-jakarta)" }}>
                  <textPath href="#hero-badge-path">{hero.rotatingBadge}</textPath>
                </text>
              </svg>
              <Sparkle className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 fill-clay text-clay" />
            </div>
          </motion.div>

          {/* Tarjeta "Now teaching" */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5, ease }}
            className="absolute -bottom-6 right-2 flex items-center gap-4 rounded-2xl border border-alabaster/40 bg-alabaster/75 p-3 pr-5 shadow-[0_20px_50px_-20px_rgba(28,25,23,0.4)] backdrop-blur-xl sm:right-6 lg:-right-6"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-espresso text-clay">
              <Equalizer />
            </span>
            <span className="flex flex-col">
              <span className="text-[0.6rem] uppercase tracking-[0.2em] text-warmstone">{hero.nowPlaying.label}</span>
              <span className="font-serif text-lg italic leading-tight text-espresso">{hero.nowPlaying.track}</span>
            </span>
            <span className="ml-1 flex items-center gap-2 border-l border-espresso/10 pl-4">
              <span className="relative flex h-2 w-2">
                <span
                  className="absolute inline-flex h-full w-full animate-beat rounded-full bg-clay"
                  style={{ animationDuration: `${60 / hero.nowPlaying.bpm}s` }}
                />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-clay" />
              </span>
              <span className="text-sm font-semibold tabular-nums text-espresso">
                {hero.nowPlaying.bpm}
                <span className="ml-1 text-[0.6rem] font-medium tracking-widest text-warmstone">BPM</span>
              </span>
            </span>
          </motion.div>
        </div>
      </div>

      {/* Indicador de scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 lg:flex"
        aria-hidden="true"
      >
        <span className="text-[0.6rem] uppercase tracking-[0.3em] text-warmstone">Scroll</span>
        <span className="relative h-10 w-px overflow-hidden bg-espresso/10">
          <motion.span
            className="absolute inset-x-0 top-0 h-1/2 bg-clay"
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.div>
    </section>
  );
}
