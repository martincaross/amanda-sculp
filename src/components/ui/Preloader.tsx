"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const IMAGES_TO_PRELOAD = [
  "/images/hero-sculpt.webp",
  "/images/reel-01.webp",
  "/images/reel-02.webp",
  "/images/reel-03.webp",
  "/images/reel-04.webp",
  "/images/about-portrait.webp",
  "/images/life-canyon.webp",
  "/images/life-studio.webp",
  "/images/life-matcha.webp",
  "/images/life-malibu.webp",
];

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let active = true;
    let loaded = 0;
    const total = IMAGES_TO_PRELOAD.length;

    // Safety fallback: reveal page after maximum 2 seconds regardless of network
    const fallbackTimer = window.setTimeout(() => {
      if (active) setIsReady(true);
    }, 2000);

    const loadImages = async () => {
      const promises = IMAGES_TO_PRELOAD.map(async (src) => {
        try {
          const img = document.createElement("img");
          img.src = src;
          if (typeof img.decode === "function") {
            await img.decode();
          } else {
            await new Promise<void>((res) => {
              img.onload = () => res();
              img.onerror = () => res();
            });
          }
        } catch {
          // If decoding fails, continue gracefully
        } finally {
          if (active) {
            loaded++;
            setProgress(Math.round((loaded / total) * 100));
          }
        }
      });

      await Promise.all(promises);

      // Brief grace period for smooth aesthetic transition
      if (active) {
        window.setTimeout(() => {
          setIsReady(true);
        }, 300);
      }
    };

    loadImages();

    return () => {
      active = false;
      window.clearTimeout(fallbackTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {!isReady && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-between bg-alabaster px-6 py-12 text-espresso"
        >
          {/* Top Location Stamp */}
          <div className="text-center">
            <span className="text-[0.62rem] uppercase tracking-[0.3em] text-warmstone">
              Los Angeles · California
            </span>
          </div>

          {/* Central Luxury Logo Mark */}
          <div className="flex flex-col items-center">
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif text-5xl italic tracking-tight text-espresso sm:text-6xl md:text-7xl"
            >
              Amanda.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-3 text-[0.68rem] uppercase tracking-[0.26em] text-warmstone"
            >
              Sculpt & Movement
            </motion.p>

            {/* Minimalist Progress Meter */}
            <div className="mt-8 flex w-48 flex-col items-center gap-2">
              <div className="h-[2px] w-full overflow-hidden rounded-full bg-espresso/10">
                <motion.div
                  className="h-full bg-clay"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                />
              </div>
              <span className="font-serif text-xs italic tabular-nums text-clay">
                {progress}%
              </span>
            </div>
          </div>

          {/* Bottom Audio/Beat Tag */}
          <div className="text-center">
            <span className="text-[0.58rem] uppercase tracking-[0.24em] text-warmstone/70">
              Curating Beat-Driven Flow
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
