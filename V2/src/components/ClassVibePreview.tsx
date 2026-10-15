"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/data/siteConfig";

const { vibe } = siteConfig.method;
const BAR_COUNT = 38; // Calibrated for flawless mobile & desktop rendering without overflow
const ease = [0.22, 1, 0.36, 1] as const;

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
  const [muted, setMuted] = useState(false);
  const [beat, setBeat] = useState(0);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const track = vibe.tracks[activeIdx];
  const beatSec = 60 / track.bpm;
  const heights = barHeights(activeIdx + 1);

  // Web Audio Beat Synthesizer (Real iOS-compatible sound in sync with BPM)
  const triggerBeatPulse = (beatIndex: number) => {
    if (muted) return;
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume().catch(() => {});
      }

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      if (beatIndex === 0) {
        // Beat 1: Warm sculpt kick
        osc.type = "sine";
        osc.frequency.setValueAtTime(130, now);
        osc.frequency.exponentialRampToValueAtTime(42, now + 0.12);
        gain.gain.setValueAtTime(0.32, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.23);
      } else if (beatIndex === 2) {
        // Beat 3: Warm clap / snare pulse
        osc.type = "triangle";
        osc.frequency.setValueAtTime(200, now);
        osc.frequency.exponentialRampToValueAtTime(70, now + 0.08);
        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.15);
      } else {
        // Beats 2 & 4: Soft rhythmic shaker
        osc.type = "sine";
        osc.frequency.setValueAtTime(380, now);
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.05);
      }
    } catch {
      // Audio not permitted or supported
    }
  };

  // 1-2-3-4 Beat Counter synced to exact BPM + Audio Synthesis
  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => {
      setBeat((prev) => {
        const next = (prev + 1) % 4;
        triggerBeatPulse(next);
        return next;
      });
    }, beatSec * 1000);
    return () => window.clearInterval(id);
  }, [playing, beatSec, muted]);

  const handleTogglePlay = () => {
    if (!playing) {
      triggerBeatPulse(0);
      setPlaying(true);
    } else {
      setPlaying(false);
      if (audioCtxRef.current && audioCtxRef.current.state === "running") {
        audioCtxRef.current.suspend().catch(() => {});
      }
    }
  };

  return (
    <div
      id="class-vibe-preview"
      className="relative overflow-hidden rounded-[1.75rem] bg-espresso text-alabaster shadow-[0_40px_90px_-35px_rgba(28,25,23,0.6)] sm:rounded-[2.5rem]"
    >
      {/* Dynamic ambient color glow (Radial gradient on mobile to eliminate blur overhead) */}
      <motion.div
        aria-hidden="true"
        animate={{ opacity: [0.2, 0.35, 0.2] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full sm:-right-32 sm:-top-32 sm:h-96 sm:w-96 md:blur-[120px]"
        style={{ background: `radial-gradient(circle, ${track.accent} 0%, transparent 70%)` }}
      />

      <div className="relative grid lg:grid-cols-5">
        {/* Track Phases List (Mobile: clean stack with touch targets) */}
        <div className="border-b border-alabaster/10 p-5 sm:p-10 lg:col-span-2 lg:border-b-0 lg:border-r">
          <p className="text-[0.62rem] uppercase tracking-[0.28em] text-alabaster/50">Interactive Experience</p>
          <h3 className="mt-2 font-serif text-3xl italic leading-none sm:mt-3 sm:text-5xl">{vibe.title}</h3>
          <p className="mt-3 max-w-xs text-xs leading-relaxed text-alabaster/60 sm:mt-4 sm:text-sm">{vibe.subtitle}</p>

          <ul className="mt-6 space-y-2 sm:mt-8" role="tablist" aria-label="Class flow phases">
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
                    className={`group relative flex w-full items-center gap-3 overflow-hidden rounded-2xl px-3.5 py-3.5 text-left transition-colors duration-500 sm:gap-4 sm:px-4 sm:py-4 ${
                      active ? "bg-alabaster/[0.08]" : "hover:bg-alabaster/[0.04]"
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="vibe-active-bar"
                        className="absolute inset-y-2.5 left-0 w-[3px] rounded-full sm:inset-y-3"
                        style={{ backgroundColor: t.accent }}
                      />
                    )}
                    <span className="text-xs tabular-nums text-alabaster/40">0{i + 1}</span>
                    <span className="flex-1">
                      <span className={`block text-[0.88rem] font-medium sm:text-[0.95rem] ${active ? "text-alabaster" : "text-alabaster/70"}`}>
                        {t.phase}
                      </span>
                      <span className="mt-0.5 block text-[0.7rem] text-alabaster/40 sm:text-xs">{t.duration}</span>
                    </span>
                    <span
                      className="rounded-full border px-2.5 py-1 text-[0.7rem] font-semibold tabular-nums sm:px-3 sm:text-xs"
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

        {/* Audio Visualizer Panel */}
        <div className="flex flex-col p-5 sm:p-10 lg:col-span-3" role="tabpanel" aria-live="polite">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-end gap-2.5 sm:gap-3">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={track.bpm}
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -30, opacity: 0 }}
                    transition={{ duration: 0.4, ease }}
                    className="font-serif text-[4.5rem] font-light leading-[0.8] tabular-nums sm:text-[7.5rem]"
                  >
                    {track.bpm}
                  </motion.span>
                </AnimatePresence>
                <span className="mb-1 text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-alabaster/50 sm:mb-2 sm:text-xs">
                  BPM
                </span>
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={track.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35 }}
                >
                  <p className="mt-4 font-serif text-xl italic sm:mt-5 sm:text-2xl" style={{ color: track.accent }}>
                    {track.phase}
                  </p>
                  <p className="mt-1.5 max-w-sm text-xs leading-relaxed text-alabaster/60 sm:mt-2 sm:text-sm">
                    {track.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex items-center gap-2">
              <button
                id="vibe-audio-mute"
                onClick={() => setMuted((m) => !m)}
                aria-label={muted ? "Unmute audio beat" : "Mute audio beat"}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-alabaster/20 bg-alabaster/10 text-alabaster transition-colors hover:bg-alabaster/20"
              >
                {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </button>

              <button
                id="vibe-play-toggle"
                onClick={handleTogglePlay}
                aria-label={playing ? "Pause soundwave preview" : "Play soundwave preview"}
                className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-alabaster text-espresso transition-transform duration-500 hover:scale-105 sm:h-14 sm:w-14"
              >
                {playing && (
                  <span
                    className="absolute inset-0 animate-beat rounded-full"
                    style={{ backgroundColor: track.accent, animationDuration: `${beatSec}s` }}
                  />
                )}
                <span className="relative">
                  {playing ? <Pause className="h-4 w-4 fill-current sm:h-5 sm:w-5" /> : <Play className="ml-0.5 h-4 w-4 fill-current sm:h-5 sm:w-5" />}
                </span>
              </button>
            </div>
          </div>

          {/* Equalizer Soundwave: hardware-accelerated block bars for 100% mobile compatibility */}
          <div className="mt-8 flex h-28 items-end gap-[2px] overflow-hidden sm:mt-10 sm:h-40 sm:gap-1" aria-hidden="true">
            {heights.map((h, i) => (
              <div key={`${track.id}-${i}`} className="flex h-full flex-1 items-end">
                <span
                  className="block w-full origin-bottom rounded-full animate-eq"
                  style={{
                    height: `${h}%`,
                    backgroundColor: i % 6 === 0 ? track.accent : "rgba(249,246,240,0.85)",
                    opacity: 0.35 + (h / 100) * 0.65,
                    animationDuration: `${beatSec * (i % 4 === 0 ? 1.4 : i % 3 === 0 ? 1.8 : 1.1)}s`,
                    animationDelay: `${-((i * 0.08) % 1.5)}s`,
                    animationPlayState: playing ? "running" : "paused",
                    transform: playing
                      ? `scaleY(${0.3 + 0.7 * Math.abs(Math.sin((beat * 1.57 + i * 0.35)))})`
                      : "scaleY(0.25)",
                    transition: "transform 0.12s ease-out, background-color 0.5s ease",
                  }}
                />
              </div>
            ))}
          </div>

          {/* Footer: 8-Count + Intensity Meter */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-alabaster/10 pt-5 sm:mt-8 sm:pt-6">
            <div className="flex items-center gap-3">
              <span className="text-[0.62rem] uppercase tracking-[0.24em] text-alabaster/40">8-Count</span>
              <div className="flex gap-1.5">
                {[0, 1, 2, 3].map((b) => (
                  <span
                    key={b}
                    className="flex h-6 w-6 items-center justify-center rounded-full text-[0.65rem] font-semibold tabular-nums transition-all duration-150 sm:h-7 sm:w-7 sm:text-[0.7rem]"
                    style={{
                      backgroundColor: playing && beat === b ? track.accent : "rgba(249,246,240,0.06)",
                      color: playing && beat === b ? "#1C1917" : "rgba(249,246,240,0.5)",
                      transform: playing && beat === b ? "scale(1.1)" : "scale(1)",
                    }}
                  >
                    {b + 1}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="text-[0.62rem] uppercase tracking-[0.24em] text-alabaster/40">Intensity</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((lvl) => (
                  <motion.span
                    key={lvl}
                    animate={{
                      backgroundColor: lvl <= track.intensity ? track.accent : "rgba(249,246,240,0.1)",
                      height: 5 + lvl * 3,
                    }}
                    transition={{ duration: 0.5, delay: lvl * 0.05 }}
                    className="w-1.5 self-end rounded-full sm:w-2"
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
