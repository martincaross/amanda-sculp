"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Pause, Play } from "lucide-react";
import { useEffect, useState } from "react";
import { siteConfig } from "@/data/siteConfig";

const { vibe } = siteConfig.method;
const BAR_COUNT = 44;
const ease = [0.22, 1, 0.36, 1] as const;

/** Alturas deterministas (sin Math.random → sin desajustes de hidratación). */
function barHeights(seed: number) {
  return Array.from({ length: BAR_COUNT }, (_, i) => {
    const a = Math.abs(Math.sin(i * 0.55 + seed * 1.7));
    const b = Math.abs(Math.cos(i * 0.21 + seed));
    return Math.round((0.22 + 0.78 * a * (0.55 + 0.45 * b)) * 100);
  });
}

export default function ClassVibePreview() {
  const [activeIdx, setActiveIdx] = useState(1);
  const [playing, setPlaying] = useState(true);
  const [beat, setBeat] = useState(0);
  const track = vibe.tracks[activeIdx];
  const beatSec = 60 / track.bpm;
  const heights = barHeights(activeIdx + 1);

  // Contador de compás 1-2-3-4 sincronizado con el BPM real
  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => setBeat((b) => (b + 1) % 4), beatSec * 1000);
    return () => window.clearInterval(id);
  }, [playing, beatSec]);

  return (
    <div
      id="class-vibe-preview"
      className="relative overflow-hidden rounded-[2rem] bg-espresso text-alabaster shadow-[0_50px_100px_-40px_rgba(28,25,23,0.6)] sm:rounded-[2.5rem]"
    >
      {/* Brillo ambiental del color de la fase */}
      <motion.div
        aria-hidden="true"
        animate={{ backgroundColor: track.accent }}
        transition={{ duration: 1.2 }}
        className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full opacity-25 blur-[120px]"
      />

      <div className="relative grid lg:grid-cols-5">
        {/* Lista de fases */}
        <div className="border-b border-alabaster/10 p-6 sm:p-10 lg:col-span-2 lg:border-b-0 lg:border-r">
          <p className="text-[0.65rem] uppercase tracking-[0.28em] text-alabaster/50">Interactive</p>
          <h3 className="mt-3 font-serif text-4xl italic leading-none sm:text-5xl">{vibe.title}</h3>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-alabaster/60">{vibe.subtitle}</p>

          <ul className="mt-8 space-y-2" role="tablist" aria-label="Fases de la clase">
            {vibe.tracks.map((t, i) => {
              const active = i === activeIdx;
              return (
                <li key={t.id}>
                  <button
                    id={`vibe-track-${t.id}`}
                    role="tab"
                    aria-selected={active}
                    onClick={() => {
                      setActiveIdx(i);
                      setPlaying(true);
                      setBeat(0);
                    }}
                    className={`group relative flex w-full items-center gap-4 overflow-hidden rounded-2xl px-4 py-4 text-left transition-colors duration-500 ${
                      active ? "bg-alabaster/[0.08]" : "hover:bg-alabaster/[0.04]"
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="vibe-active-bar"
                        className="absolute inset-y-3 left-0 w-[3px] rounded-full"
                        style={{ backgroundColor: t.accent }}
                      />
                    )}
                    <span className="text-xs tabular-nums text-alabaster/40">0{i + 1}</span>
                    <span className="flex-1">
                      <span className={`block text-[0.95rem] font-medium ${active ? "text-alabaster" : "text-alabaster/70"}`}>
                        {t.phase}
                      </span>
                      <span className="mt-0.5 block text-xs text-alabaster/40">{t.duration}</span>
                    </span>
                    <span
                      className="rounded-full border px-3 py-1 text-xs font-semibold tabular-nums"
                      style={{ borderColor: active ? t.accent : "rgba(249,246,240,0.15)", color: active ? t.accent : undefined }}
                    >
                      {t.bpm} BPM
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Visualizador */}
        <div className="flex flex-col p-6 sm:p-10 lg:col-span-3" role="tabpanel" aria-live="polite">
          <div className="flex items-start justify-between gap-6">
            <div>
              <div className="flex items-end gap-3">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={track.bpm}
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -40, opacity: 0 }}
                    transition={{ duration: 0.5, ease }}
                    className="font-serif text-[5.5rem] font-light leading-[0.8] tabular-nums sm:text-[8rem]"
                  >
                    {track.bpm}
                  </motion.span>
                </AnimatePresence>
                <span className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-alabaster/50">BPM</span>
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={track.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                >
                  <p className="mt-5 font-serif text-2xl italic" style={{ color: track.accent }}>
                    {track.phase}
                  </p>
                  <p className="mt-2 max-w-sm text-sm leading-relaxed text-alabaster/60">{track.description}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            <button
              id="vibe-play-toggle"
              onClick={() => setPlaying((p) => !p)}
              aria-label={playing ? "Pausar visualizador" : "Reproducir visualizador"}
              className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-alabaster text-espresso transition-transform duration-500 hover:scale-105"
            >
              {playing && (
                <span
                  className="absolute inset-0 animate-beat rounded-full"
                  style={{ backgroundColor: track.accent, animationDuration: `${beatSec}s` }}
                />
              )}
              <span className="relative">
                {playing ? <Pause className="h-5 w-5 fill-current" /> : <Play className="ml-0.5 h-5 w-5 fill-current" />}
              </span>
            </button>
          </div>

          {/* Barras de audio */}
          <div className="mt-10 flex h-36 items-center gap-[3px] sm:h-44 sm:gap-1" aria-hidden="true">
            {heights.map((h, i) => (
              <span
                key={`${track.id}-${i}`}
                className="flex-1 origin-center animate-eq rounded-full transition-colors duration-700"
                style={{
                  height: `${h}%`,
                  backgroundColor: i % 7 === 0 ? track.accent : "rgba(249,246,240,0.82)",
                  opacity: 0.35 + (h / 100) * 0.65,
                  animationDuration: `${beatSec * (i % 3 === 0 ? 2 : 1)}s`,
                  animationDelay: `${-(i * beatSec) / 11}s`,
                  animationPlayState: playing ? "running" : "paused",
                }}
              />
            ))}
          </div>

          {/* Pie: compás + intensidad */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-6 border-t border-alabaster/10 pt-6">
            <div className="flex items-center gap-3">
              <span className="text-[0.65rem] uppercase tracking-[0.24em] text-alabaster/40">Compás</span>
              <div className="flex gap-1.5">
                {[0, 1, 2, 3].map((b) => (
                  <span
                    key={b}
                    className="flex h-7 w-7 items-center justify-center rounded-full text-[0.7rem] font-semibold tabular-nums transition-all duration-150"
                    style={{
                      backgroundColor: playing && beat === b ? track.accent : "rgba(249,246,240,0.06)",
                      color: playing && beat === b ? "#1C1917" : "rgba(249,246,240,0.5)",
                      transform: playing && beat === b ? "scale(1.12)" : "scale(1)",
                    }}
                  >
                    {b + 1}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[0.65rem] uppercase tracking-[0.24em] text-alabaster/40">Intensidad</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((lvl) => (
                  <motion.span
                    key={lvl}
                    animate={{
                      backgroundColor: lvl <= track.intensity ? track.accent : "rgba(249,246,240,0.1)",
                      height: 6 + lvl * 3,
                    }}
                    transition={{ duration: 0.5, delay: lvl * 0.05 }}
                    className="w-2 self-end rounded-full"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
