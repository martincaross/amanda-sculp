import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import ReelCard from "@/components/ReelCard";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { TikTokIcon } from "@/components/ui/SocialIcons";

const { movement, social } = siteConfig;

export default function MovementGallery() {
  return (
    <section
      id="movimiento"
      aria-labelledby="movimiento-title"
      className="relative overflow-hidden bg-sand py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <Reveal>
            <SectionHeading
              id="movimiento-title"
              eyebrow={movement.eyebrow}
              sans={movement.titleSans}
              serif={movement.titleSerif}
            />
            <p className="mt-6 max-w-md text-lg leading-relaxed text-warmstone">{movement.intro}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <a
              href={social.tiktok.url}
              target="_blank"
              rel="noopener noreferrer"
              id="movement-tiktok-profile"
              className="group inline-flex items-center gap-4 rounded-full border border-espresso/10 bg-alabaster/70 py-2 pl-2 pr-6 transition-colors duration-500 hover:border-espresso/30"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-espresso text-alabaster transition-colors duration-500 group-hover:bg-clay">
                <TikTokIcon size={18} />
              </span>
              <span className="flex flex-col">
                <span className="text-[0.65rem] uppercase tracking-[0.2em] text-warmstone">{movement.profileCta}</span>
                <span className="text-sm font-semibold text-espresso">{social.tiktok.handle}</span>
              </span>
              <ArrowUpRight className="h-4 w-4 text-espresso transition-transform duration-500 group-hover:rotate-45" />
            </a>
          </Reveal>
        </div>
      </div>

      {/* Móvil: carrusel deslizable tipo TikTok · Tablet/escritorio: rejilla */}
      <div className="no-scrollbar mx-auto mt-14 flex max-w-7xl snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-6 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-8 lg:grid-cols-4 lg:pb-16">
        {movement.reels.map((reel, i) => (
          <Reveal
            key={reel.id}
            delay={i * 0.1}
            className={`w-[72vw] shrink-0 snap-center sm:w-auto ${i % 2 === 1 ? "lg:translate-y-16" : ""}`}
          >
            <ReelCard reel={reel} index={i} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
