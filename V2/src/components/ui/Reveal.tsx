"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = HTMLMotionProps<"div"> & {
  children: ReactNode;
  delay?: number;
  y?: number;
};

/** Aparición editorial al hacer scroll: fade + desplazamiento + desenfoque. */
export default function Reveal({ children, delay = 0, y = 14, ...rest }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "200px 0px 200px 0px" }}
      transition={{ duration: 0.45, delay: Math.min(delay, 0.2), ease: [0.22, 1, 0.36, 1] }}
      style={{ willChange: "transform, opacity" }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
