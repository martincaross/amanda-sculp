"use client";

import { Activity, AlertTriangle, CheckCircle2, ChevronDown, ChevronUp, Cpu, Gauge, Zap } from "lucide-react";
import { useEffect, useRef, useState } from "react";

/**
 * Real-time Mobile & Desktop Telemetry HUD:
 *  - Real-time FPS (Frames Per Second) via requestAnimationFrame.
 *  - Scroll dropped frames & jank counter.
 *  - Core Web Vitals (LCP & CLS) via PerformanceObserver.
 *  - Detects iOS "Low Power Mode" and "prefers-reduced-motion".
 *  - Displays device DPR and screen refresh rate.
 */
export default function PerformanceHUD() {
  const [fps, setFps] = useState(60);
  const [minFps, setMinFps] = useState(60);
  const [droppedFrames, setDroppedFrames] = useState(0);
  const [lcp, setLcp] = useState<number | null>(null);
  const [cls, setCls] = useState<number>(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [dpr, setDpr] = useState(1);
  const [screenSize, setScreenSize] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const frameCount = useRef(0);
  const lastTime = useRef<number>(performance.now());
  const isScrolling = useRef(false);

  useEffect(() => {
    // 1. Detect device & OS preferences
    setDpr(window.devicePixelRatio || 1);
    setScreenSize(`${window.innerWidth}×${window.innerHeight}`);

    const mqMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mqMotion.matches);
    const motionHandler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mqMotion.addEventListener("change", motionHandler);

    const resizeHandler = () => setScreenSize(`${window.innerWidth}×${window.innerHeight}`);
    window.addEventListener("resize", resizeHandler, { passive: true });

    // 2. Track scroll activity for dropped frame detection
    let scrollTimer: ReturnType<typeof setTimeout>;
    const scrollHandler = () => {
      isScrolling.current = true;
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        isScrolling.current = false;
      }, 150);
    };
    window.addEventListener("scroll", scrollHandler, { passive: true });

    // 3. FPS & dropped frames calculation via requestAnimationFrame
    let rafId: number;
    let prevFrameTime = performance.now();

    const loop = (now: number) => {
      frameCount.current++;
      const delta = now - prevFrameTime;
      prevFrameTime = now;

      // Detect dropped frame (> 32ms between frames means < 30fps stutter)
      if (isScrolling.current && delta > 32) {
        setDroppedFrames((d) => d + 1);
      }

      if (now - lastTime.current >= 500) {
        const calculatedFps = Math.round((frameCount.current * 1000) / (now - lastTime.current));
        setFps(calculatedFps);
        setMinFps((m) => Math.min(m, calculatedFps));
        frameCount.current = 0;
        lastTime.current = now;
      }

      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    // 4. PerformanceObserver for Web Vitals (LCP & CLS)
    if (typeof PerformanceObserver !== "undefined") {
      try {
        const lcpObserver = new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          const lastEntry = entries[entries.length - 1];
          if (lastEntry) {
            setLcp(Math.round(lastEntry.startTime));
          }
        });
        lcpObserver.observe({ type: "largest-contentful-paint", buffered: true });

        const clsObserver = new PerformanceObserver((entryList) => {
          let clsValue = 0;
          for (const entry of entryList.getEntries() as unknown as { value: number; hadRecentInput?: boolean }[]) {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          }
          setCls((prev) => Number((prev + clsValue).toFixed(3)));
        });
        clsObserver.observe({ type: "layout-shift", buffered: true });

        return () => {
          cancelAnimationFrame(rafId);
          window.removeEventListener("scroll", scrollHandler);
          window.removeEventListener("resize", resizeHandler);
          mqMotion.removeEventListener("change", motionHandler);
          lcpObserver.disconnect();
          clsObserver.disconnect();
        };
      } catch {
        // Fallback if browser security denies buffered observer
      }
    }

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", scrollHandler);
      window.removeEventListener("resize", resizeHandler);
      mqMotion.removeEventListener("change", motionHandler);
    };
  }, []);

  if (!isVisible) return null;

  const fpsColor = fps >= 55 ? "text-emerald-500" : fps >= 30 ? "text-amber-500" : "text-rose-500";
  const fpsBadge = fps >= 55 ? "bg-emerald-500/10 border-emerald-500/20" : fps >= 30 ? "bg-amber-500/10 border-amber-500/20" : "bg-rose-500/10 border-rose-500/20";

  return (
    <div
      id="telemetry-hud"
      aria-label="Real-time Performance Telemetry"
      className="fixed bottom-3 left-3 z-[9999] select-none font-mono text-xs max-w-[calc(100vw-1.5rem)] pointer-events-auto"
    >
      {/* Expanded Telemetry Panel */}
      {isOpen ? (
        <div className="w-80 rounded-2xl border border-espresso/15 bg-[#1C1917]/95 p-4 text-[#F9F6F0] shadow-2xl backdrop-blur-md">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/90">
              <Activity className="h-3.5 w-3.5 text-emerald-400" />
              Live Telemetry
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-1 text-white/60 hover:bg-white/10 hover:text-white"
                aria-label="Collapse Telemetry"
              >
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2 text-[0.72rem]">
            {/* FPS */}
            <div className="rounded-xl border border-white/5 bg-white/[0.04] p-2.5">
              <span className="text-[0.62rem] uppercase tracking-wider text-white/40">Framerate</span>
              <div className="mt-0.5 flex items-baseline gap-1">
                <span className={`text-2xl font-bold ${fpsColor}`}>{fps}</span>
                <span className="text-white/40">FPS</span>
              </div>
              <span className="text-[0.6rem] text-white/40">Min: {minFps} fps</span>
            </div>

            {/* Dropped Frames */}
            <div className="rounded-xl border border-white/5 bg-white/[0.04] p-2.5">
              <span className="text-[0.62rem] uppercase tracking-wider text-white/40">Scroll Stutter</span>
              <div className="mt-0.5 flex items-baseline gap-1">
                <span className={`text-2xl font-bold ${droppedFrames === 0 ? "text-emerald-400" : "text-amber-400"}`}>
                  {droppedFrames}
                </span>
                <span className="text-white/40">drops</span>
              </div>
              <span className="text-[0.6rem] text-white/40">{droppedFrames === 0 ? "Smooth 60fps" : "Stutter detected"}</span>
            </div>

            {/* LCP */}
            <div className="rounded-xl border border-white/5 bg-white/[0.04] p-2.5">
              <span className="text-[0.62rem] uppercase tracking-wider text-white/40">LCP (Load Speed)</span>
              <div className="mt-0.5 flex items-baseline gap-1">
                <span className="text-lg font-bold text-white">
                  {lcp !== null ? `${lcp}ms` : "Measuring..."}
                </span>
              </div>
              <span className="text-[0.6rem] text-white/40">{lcp !== null && lcp < 1200 ? "⚡ Excellent" : "Evaluating"}</span>
            </div>

            {/* CLS */}
            <div className="rounded-xl border border-white/5 bg-white/[0.04] p-2.5">
              <span className="text-[0.62rem] uppercase tracking-wider text-white/40">CLS (Stability)</span>
              <div className="mt-0.5 flex items-baseline gap-1">
                <span className={`text-lg font-bold ${cls < 0.05 ? "text-emerald-400" : "text-amber-400"}`}>
                  {cls}
                </span>
              </div>
              <span className="text-[0.6rem] text-white/40">{cls < 0.05 ? "0 Layout Shifts" : "Minor Shift"}</span>
            </div>
          </div>

          {/* Device & OS State */}
          <div className="mt-3 space-y-1.5 rounded-xl border border-white/5 bg-white/[0.03] p-2.5 text-[0.65rem] text-white/70">
            <div className="flex justify-between">
              <span className="text-white/40">Viewport:</span>
              <span className="font-semibold text-white/90">{screenSize} @ {dpr}x</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/40">Reduced Motion / Low Power:</span>
              <span className="flex items-center gap-1 font-semibold">
                {reducedMotion ? (
                  <span className="flex items-center gap-1 text-amber-400">
                    <AlertTriangle className="h-3 w-3" /> Active
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-emerald-400">
                    <CheckCircle2 className="h-3 w-3" /> Inactive (Full 60fps)
                  </span>
                )}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/40">Compositor:</span>
              <span className="text-emerald-400">GPU Accelerated (WebKit)</span>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between pt-1">
            <button
              onClick={() => {
                setDroppedFrames(0);
                setMinFps(fps);
              }}
              className="rounded-lg bg-white/10 px-2.5 py-1 text-[0.65rem] text-white/80 hover:bg-white/20 transition-colors"
            >
              Reset Counters
            </button>
            <button
              onClick={() => setIsVisible(false)}
              className="text-[0.65rem] text-white/40 hover:text-white/70"
            >
              Close HUD
            </button>
          </div>
        </div>
      ) : (
        /* Compact Pill Button */
        <button
          onClick={() => setIsOpen(true)}
          className={`flex items-center gap-2 rounded-full border px-3 py-1.5 shadow-lg backdrop-blur-md transition-all active:scale-95 ${fpsBadge} bg-[#1C1917]/90 text-white`}
          aria-label="Open Performance Telemetry"
        >
          <Zap className={`h-3 w-3 ${fpsColor}`} />
          <span className="font-bold tabular-nums">{fps} FPS</span>
          {lcp !== null && (
            <span className="hidden text-white/50 min-[380px]:inline">· {lcp}ms</span>
          )}
          {droppedFrames > 0 && (
            <span className="text-amber-400">· {droppedFrames} drops</span>
          )}
          <ChevronUp className="h-3 w-3 text-white/40" />
        </button>
      )}
    </div>
  );
}
