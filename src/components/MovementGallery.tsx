import { ArrowRight, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import ReelCard from "@/components/ReelCard";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { TikTokIcon } from "@/components/ui/SocialIcons";

const { movement, social } = siteConfig;

export default function MovementGallery() {
  return (
    <section
      id="in-motion"
      aria-labelledby="in-motion-title"
      className="relative overflow-hidden bg-sand py-20 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <Reveal>
            <SectionHeading
              id="in-motion-title"
              eyebrow={movement.eyebrow}
              sans={movement.titleSans}
              serif={movement.titleSerif}
            />
            <p className="mt-4 max-w-md text-base leading-relaxed text-warmstone sm:mt-6 sm:text-lg">{movement.intro}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <a
              href={social.tiktok.url}
              target="_blank"
              rel="noopener noreferrer"
              id="movement-tiktok-profile"
              className="group inline-flex items-center gap-3.5 rounded-full border border-espresso/10 bg-alabaster/80 py-2 pl-2 pr-5 transition-colors duration-500 hover:border-espresso/30 sm:gap-4 sm:pr-6"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-espresso text-alabaster transition-colors duration-500 group-hover:bg-clay sm:h-11 sm:w-11">
                <TikTokIcon size={18} />
              </span>
              <span className="flex flex-col">
                <span className="text-[0.62rem] uppercase tracking-[0.2em] text-warmstone">{movement.profileCta}</span>
                <span className="text-sm font-semibold text-espresso">{social.tiktok.handle}</span>
              </span>
              <ArrowUpRight className="h-4 w-4 text-espresso transition-transform duration-500 group-hover:rotate-45" />
            </a>
          </Reveal>
        </div>

        {/* Mobile Swipe Hint */}
        <div className="mt-6 flex items-center justify-between text-xs text-warmstone sm:hidden">
          <span className="text-[0.65rem] uppercase tracking-[0.2em]">Live Class Clips</span>
          <span className="flex items-center gap-1 text-[0.65rem] uppercase tracking-[0.16em] text-clay">
            Swipe <ArrowRight className="h-3 w-3" />
          </span>
        </div>
      </div>

      {/* Mobile: Smooth Snap Carousel · Desktop: Editorial 4-col staggered grid */}
      <div className="no-scrollbar mx-auto mt-6 flex max-w-7xl snap-x snap-mandatory gap-3.5 overflow-x-auto px-4 pb-6 [-webkit-overflow-scrolling:touch] sm:mt-14 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-8 lg:grid-cols-4 lg:pb-16">
        {movement.reels.map((reel, i) => (
          <div
            key={reel.id}
            className={`w-[78vw] shrink-0 snap-center sm:w-auto ${i % 2 === 1 ? "lg:translate-y-14" : ""}`}
          >
            <ReelCard reel={reel} index={i} />
          </div>
        ))}
      </div>
    </section>
  );
}
