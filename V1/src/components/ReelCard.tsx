"use client";

import { motion, useInView } from "framer-motion";
import { ArrowUpRight, Play } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Reel } from "@/data/siteConfig";
import { TikTokIcon } from "@/components/ui/SocialIcons";

/**
 * Tarjeta vertical 9:16.
 *  · Escritorio: el vídeo se reproduce al pasar el cursor.
 *  · Móvil/táctil: se reproduce automáticamente al entrar en pantalla.
 *  · Sin vídeo configurado: el póster hace un "Ken Burns" suave.
 */
export default function ReelCard({ reel, index }: { reel: Reel; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const inView = useInView(cardRef, { amount: 0.65 });
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
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -10 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="group relative aspect-[9/16] w-full overflow-hidden rounded-[1.75rem] bg-sand shadow-[0_30px_60px_-30px_rgba(28,25,23,0.45)]"
    >
      {/* Media */}
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
            className="h-full w-full object-cover transition-transform duration-[1.6s] ease-editorial group-hover:scale-105"
          />
        ) : (
          <div className={`absolute inset-0 ${active ? "animate-kenburns" : ""}`}>
            <Image
              src={reel.poster}
              alt={`${reel.classStyle} — ${reel.title}`}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 75vw"
              className="object-cover"
            />
          </div>
        )}
      </div>

      {/* Capa estética */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-espresso/40 via-transparent to-espresso/85" />

      {/* Top: estilo + BPM */}
      <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4">
        <span className="rounded-full border border-alabaster/25 bg-espresso/25 px-3 py-1.5 text-[0.6rem] font-medium uppercase tracking-[0.18em] text-alabaster backdrop-blur-md">
          {reel.classStyle}
        </span>
        <span className="flex items-center gap-1.5 rounded-full bg-alabaster/90 px-2.5 py-1.5 text-[0.65rem] font-semibold tabular-nums text-espresso backdrop-blur">
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

      {/* Centro: botón de play */}
      <div
        className={`pointer-events-none absolute inset-0 flex items-center justify-center transition-all duration-700 ${
          active ? "scale-75 opacity-0" : "scale-100 opacity-100"
        }`}
      >
        <span className="flex h-16 w-16 items-center justify-center rounded-full border border-alabaster/40 bg-alabaster/15 text-alabaster backdrop-blur-md">
          <Play className="ml-1 h-5 w-5 fill-current" />
        </span>
      </div>

      {/* Bottom: título + enlace */}
      <div className="absolute inset-x-0 bottom-0 p-5">
        <p className="text-[0.6rem] uppercase tracking-[0.24em] text-alabaster/60">Clip 0{index + 1}</p>
        <h3 className="mt-1 font-serif text-2xl italic leading-tight text-alabaster sm:text-[1.7rem]">{reel.title}</h3>
        <a
          href={reel.tiktokUrl}
          target="_blank"
          rel="noopener noreferrer"
          id={`reel-link-${reel.id}`}
          className="mt-4 inline-flex items-center gap-2 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-alabaster after:absolute after:inset-0 after:content-['']"
        >
          <TikTokIcon size={14} />
          Ver en TikTok
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </div>
    </motion.div>
  );
}
