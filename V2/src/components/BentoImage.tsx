"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

type BentoImageProps = {
  src: string;
  alt: string;
  caption: string;
  className?: string;
  sizes?: string;
};

/** Photo tile with subtle scroll parallax and editorial caption badge */
export default function BentoImage({
  src,
  alt,
  caption,
  className = "",
  sizes = "(min-width: 768px) 25vw, 50vw",
}: BentoImageProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <figure
      ref={ref}
      className={`group relative h-full w-full overflow-hidden rounded-[1.5rem] bg-sand sm:rounded-[1.75rem] ${className}`}
    >
      <motion.div style={{ y }} className="absolute -inset-y-[6%] inset-x-0">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-[1.4s] ease-editorial group-hover:scale-[1.05]"
        />
      </motion.div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-espresso/50 via-transparent to-transparent opacity-80 transition-opacity duration-700 group-hover:opacity-100" />
      <figcaption className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-4 sm:left-4 sm:right-4">
        <span className="inline-block rounded-full bg-alabaster/90 px-2.5 py-1 text-[0.58rem] font-medium uppercase tracking-[0.16em] text-espresso backdrop-blur transition-transform duration-500 ease-editorial sm:translate-y-2 sm:px-3 sm:py-1.5 sm:text-[0.6rem] sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
          {caption}
        </span>
      </figcaption>
    </figure>
  );
}
