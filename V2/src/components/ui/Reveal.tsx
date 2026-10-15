"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = HTMLMotionProps<"div"> & {
  children: ReactNode;
  delay?: number;
  y?: number;
};

/**
 * Editorial scroll reveal with memory leak protection:
 * viewport={{ once: true, margin: "50px" }} ensures animations trigger once
 * and immediately release the mobile CPU/GPU observer.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 14,
  className = "",
  ...rest
}: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "50px" }}
      transition={{
        duration: 0.5,
        delay: Math.min(delay, 0.2),
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`reveal-node ${className}`}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
