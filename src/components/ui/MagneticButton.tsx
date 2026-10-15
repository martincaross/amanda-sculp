"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, type MouseEvent, type ReactNode } from "react";

type Variant = "primary" | "secondary" | "light" | "ghost";

type MagneticButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  variant?: Variant;
  className?: string;
  id?: string;
  external?: boolean;
  strength?: number;
  ariaLabel?: string;
};

const variants: Record<Variant, string> = {
  primary: "bg-espresso text-alabaster hover:bg-clay",
  secondary: "border border-espresso/15 bg-alabaster/90 text-espresso sm:bg-alabaster/40 sm:backdrop-blur-md hover:border-espresso/40",
  light: "bg-alabaster text-espresso hover:bg-clay hover:text-alabaster",
  ghost: "text-espresso hover:text-clay",
};

/** Botón píldora con efecto magnético que sigue al cursor (solo en dispositivos con puntero). */
export default function MagneticButton({
  children,
  href,
  onClick,
  type = "button",
  disabled,
  variant = "primary",
  className = "",
  id,
  external,
  strength = 0.35,
  ariaLabel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.4 });
  const ix = useTransform(sx, (v) => v * 0.4);
  const iy = useTransform(sy, (v) => v * 0.4);

  const handleMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const classes = `group relative inline-flex select-none items-center justify-center gap-2.5 overflow-hidden rounded-full px-7 py-4 text-[0.8rem] font-medium uppercase tracking-[0.16em] transition-colors duration-500 ease-editorial disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${className}`;

  const inner = (
    <motion.span style={{ x: ix, y: iy }} className="relative z-10 inline-flex items-center gap-2.5">
      {children}
    </motion.span>
  );

  if (href) {
    return (
      <motion.a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        id={id}
        href={href}
        aria-label={ariaLabel}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        style={{ x: sx, y: sy }}
        whileTap={{ scale: 0.96 }}
        className={classes}
      >
        {inner}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref as React.RefObject<HTMLButtonElement>}
      id={id}
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      whileTap={{ scale: 0.96 }}
      className={classes}
    >
      {inner}
    </motion.button>
  );
}
