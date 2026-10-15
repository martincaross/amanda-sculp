"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { type ReactNode, useEffect, useState } from "react";

type RevealProps = HTMLMotionProps<"div"> & {
  children: ReactNode;
  delay?: number;
  y?: number;
};

/** Aparición editorial al hacer scroll: fade + desplazamiento. En móvil se renderiza directo para evitar carga a cachos. */
export default function Reveal({ children, delay = 0, y = 14, ...rest }: RevealProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const handler = () => setIsMobile(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <motion.div
      initial={isMobile ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "200px 0px 200px 0px" }}
      transition={{ duration: 0.45, delay: isMobile ? 0 : Math.min(delay, 0.2), ease: [0.22, 1, 0.36, 1] }}
      style={{ willChange: isMobile ? undefined : "transform, opacity" }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
