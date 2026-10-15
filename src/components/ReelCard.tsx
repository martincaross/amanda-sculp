"use client";

import { motion, useInView } from "framer-motion";
import { ArrowUpRight, Play } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Reel } from "@/data/siteConfig";
import { TikTokIcon } from "@/components/ui/SocialIcons";

/**
 * 9:16 Vertical Reel Card
 *  · Desktop: smooth hover-to-play with Ken Burns zoom.
 *  · Mobile/Touch: automatically plays when scrolled 60%+ into view.
 *  · Direct link to Amanda's TikTok.
 */
export default function ReelCard({ reel, index }: { reel: Reel; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const inView = useInView(cardRef, { amount: 0.6 });
  const [hovered, setHovered] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: none)");
    const update = () => setIsTouch(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const active = isTouch ? inView : hovered;

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (active) {
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  }, [active]);

  return (
    <motion.div
      ref={cardRef}
      onMouseEnter={() => !isTouch && setHovered(true)}
      onMouseLeave={() => !isTouch && setHovered(false)}
      whileHover={!isTouch ? { y: -8 } : undefined}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="group relative aspect-[9/16] w-full overflow-hidden rounded-[1.75rem] bg-sand shadow-[0_25px_50px_-25px_rgba(28,25,23,0.4)] sm:rounded-[2rem]"
    >
      {/* Media Layer */}
      <div className="absolute inset-0">
        {reel.video ? (
          <video
            ref={videoRef}
            src={reel.video}
            poster={reel.poster}
            muted
            loop
            playsInline
            preload="metadata"
            className="h-full w-full object-cover transition-transform duration-[1.5s] ease-editorial group-hover:scale-105"
          />
        ) : (
          <div className={`absolute inset-0 ${active ? "animate-kenburns" : ""}`}>
            <Image
              src={reel.poster}
              alt={`${reel.classStyle} — ${reel.title}`}
              fill
              loading="eager"
              priority={index < 2}
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 85vw"
              className="object-cover"
            />
          </div>
        )}
      </div>

      {/* Editorial Gradient Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-espresso/45 via-transparent to-espresso/85" />

      {/* Top Bar: Class Style & Live BPM */}
      <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3.5 sm:p-4">
        <span className="rounded-full border border-alabaster/30 bg-espresso/30 px-3 py-1.5 text-[0.6rem] font-medium uppercase tracking-[0.18em] text-alabaster backdrop-blur-md">
          {reel.classStyle}
        </span>
        <span className="flex items-center gap-1.5 rounded-full bg-alabaster/90 px-2.5 py-1.5 text-[0.62rem] font-semibold tabular-nums text-espresso backdrop-blur">
          <span className="relative flex h-1.5 w-1.5">
            <span
              className="absolute inline-flex h-full w-full animate-beat rounded-full bg-clay"
              style={{ animationDuration: `${60 / reel.bpm}s` }}
            />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-clay" />
          </span>
          {reel.bpm} BPM
        </span>
      </div>

      {/* Center Play Icon Indicator */}
      <div
        className={`pointer-events-none absolute inset-0 flex items-center justify-center transition-all duration-500 ${
          active ? "scale-75 opacity-0" : "scale-100 opacity-100"
        }`}
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full border border-alabaster/40 bg-alabaster/20 text-alabaster shadow-lg backdrop-blur-md sm:h-16 sm:w-16">
          <Play className="ml-1 h-5 w-5 fill-current" />
        </span>
      </div>

      {/* Bottom Information */}
      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
        <p className="text-[0.58rem] uppercase tracking-[0.24em] text-alabaster/60 sm:text-[0.6rem]">Clip 0{index + 1}</p>
        <h3 className="mt-1 font-serif text-xl italic leading-tight text-alabaster sm:text-2xl">{reel.title}</h3>
        <a
          href={reel.tiktokUrl}
          target="_blank"
          rel="noopener noreferrer"
          id={`reel-link-${reel.id}`}
          className="mt-3 inline-flex items-center gap-2 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-alabaster after:absolute after:inset-0 after:content-[''] hover:text-clay"
        >
          <TikTokIcon size={14} />
          Watch on TikTok
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </div>
    </motion.div>
  );
}
