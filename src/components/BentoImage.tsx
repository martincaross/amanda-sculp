"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type BentoImageProps = {
  src: string;
  alt: string;
  caption: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

/** Parallax scroll listener mounted strictly on desktop (md+) */
function DesktopParallaxImage({
  src,
  alt,
  sizes,
  priority,
}: {
  src: string;
  alt: string;
  sizes: string;
  priority: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <motion.div ref={ref} style={{ y }} className="absolute -inset-y-[6%] inset-x-0">
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        loading="eager"
        sizes={sizes}
        className="object-cover transition-transform duration-[1.4s] ease-editorial group-hover:scale-[1.05]"
      />
    </motion.div>
  );
}

/** Photo tile with editorial caption badge · Zero JS scroll listeners on mobile */
export default function BentoImage({
  src,
  alt,
  caption,
  className = "",
  sizes = "(min-width: 768px) 25vw, 50vw",
  priority = false,
}: BentoImageProps) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    setIsDesktop(mq.matches);
    const handler = () => setIsDesktop(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <figure
      className={`group relative h-full w-full overflow-hidden rounded-[1.5rem] bg-sand sm:rounded-[1.75rem] ${className}`}
    >
      {isDesktop ? (
        <DesktopParallaxImage src={src} alt={alt} sizes={sizes} priority={priority} />
      ) : (
        <div className="absolute inset-0">
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            loading="eager"
            sizes={sizes}
            className="object-cover"
          />
        </div>
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-espresso/50 via-transparent to-transparent opacity-80 transition-opacity duration-700 group-hover:opacity-100" />
      <figcaption className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-4 sm:left-4 sm:right-4">
        <span className="inline-block rounded-full bg-alabaster/95 px-2.5 py-1 text-[0.58rem] font-medium uppercase tracking-[0.16em] text-espresso md:bg-alabaster/90 md:backdrop-blur transition-transform duration-500 ease-editorial sm:translate-y-2 sm:px-3 sm:py-1.5 sm:text-[0.6rem] sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
          {caption}
        </span>
      </figcaption>
    </figure>
  );
}
