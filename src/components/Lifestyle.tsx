import { ArrowUpRight, BadgeCheck, Quote } from "lucide-react";
import { siteConfig, type GalleryItem } from "@/data/siteConfig";
import BentoImage from "@/components/BentoImage";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { InstagramIcon, TikTokIcon } from "@/components/ui/SocialIcons";

const { about, social } = siteConfig;

/**
 * Mobile-First + Desktop Bento Grid classes:
 * - On Mobile (< md):
 *    Item 0 & 1: aspect-[3/4] portrait photos side-by-side (col 1 and col 2)
 *    Item 2: aspect-[16/10] cinematic wide photo spanning col-span-2
 *    Item 3: aspect-square morning ritual photo (col 1)
 *    Item 4: aspect-square terracotta editorial quote card (col 2)
 *    Item 5: aspect-[16/10] cinematic wide Malibu beach photo spanning col-span-2
 *    Item 6 & 7: aspect-[4/3] Instagram and TikTok cards side-by-side (col 1 and col 2)
 *
 * - On Desktop (md+):
 *    Transitions smoothly to the 4-column luxury bento grid with zero gaps.
 */
function getTileClasses(item: GalleryItem, index: number) {
  if (index === 0) {
    // Silver Lake portrait
    return "col-span-1 aspect-[3/4] md:aspect-auto md:col-span-1 md:row-span-2";
  }
  if (index === 1) {
    // Runyon Canyon hike
    return "col-span-1 aspect-[3/4] md:aspect-auto md:col-span-1 md:row-span-2";
  }
  if (index === 2) {
    // Studio & playlist (wide)
    return "col-span-2 aspect-[16/10] md:aspect-auto md:col-span-2 md:row-span-1";
  }
  if (index === 3) {
    // Matcha ritual
    return "col-span-1 aspect-square md:aspect-auto md:col-span-1 md:row-span-1";
  }
  if (index === 4) {
    // Quote card
    return "col-span-1 aspect-square md:aspect-auto md:col-span-1 md:row-span-1";
  }
  if (index === 5) {
    // Malibu sunset (wide)
    return "col-span-2 aspect-[16/10] md:aspect-auto md:col-span-2 md:row-span-1";
  }
  if (index === 6) {
    // Instagram card
    return "col-span-1 aspect-[4/3] md:aspect-auto md:col-span-1 md:row-span-1";
  }
  if (index === 7) {
    // TikTok card
    return "col-span-1 aspect-[4/3] md:aspect-auto md:col-span-1 md:row-span-1";
  }
  return "col-span-1 aspect-square md:aspect-auto";
}

function SocialTile({ network }: { network: "instagram" | "tiktok" }) {
  const isIg = network === "instagram";
  const data = isIg ? social.instagram : social.tiktok;
  const Icon = isIg ? InstagramIcon : TikTokIcon;
  return (
    <a
      href={data.url}
      target="_blank"
      rel="noopener noreferrer"
      id={`about-social-${network}`}
      className={`group relative flex h-full w-full flex-col justify-between overflow-hidden rounded-[1.5rem] p-3.5 transition-colors duration-700 ease-editorial sm:p-5 md:p-6 sm:rounded-[1.75rem] ${
        isIg ? "bg-espresso text-alabaster hover:bg-clay" : "bg-sage text-alabaster hover:bg-espresso"
      }`}
    >
      <div className="flex items-start justify-between">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-alabaster/15 sm:h-11 sm:w-11">
          <Icon size={18} />
        </span>
        <ArrowUpRight className="h-4 w-4 transition-transform duration-500 ease-editorial group-hover:rotate-45 sm:h-5 sm:w-5" />
      </div>
      <div>
        <p className="text-[0.52rem] uppercase tracking-[0.18em] text-alabaster/60 sm:text-[0.62rem]">
          {isIg ? "Instagram" : "TikTok"} · {data.label}
        </p>
        <p className="mt-0.5 font-serif text-base italic leading-tight text-alabaster sm:text-xl lg:text-2xl">
          {data.handle}
        </p>
      </div>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-8 -right-8 h-28 w-28 rounded-full bg-alabaster/10 transition-transform duration-700 ease-editorial group-hover:scale-[2.2]"
      />
    </a>
  );
}

function Tile({ item, index }: { item: GalleryItem; index: number }) {
  const containerClasses = getTileClasses(item, index);

  if (item.type === "image") {
    return (
      <Reveal delay={(index % 4) * 0.08} className={`h-full w-full ${containerClasses}`}>
        <BentoImage
          src={item.src}
          alt={item.alt}
          caption={item.caption}
          className="h-full w-full"
          sizes={item.span === "wide" ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 50vw"}
        />
      </Reveal>
    );
  }

  if (item.type === "quote") {
    return (
      <Reveal delay={(index % 4) * 0.08} className={`h-full w-full ${containerClasses}`}>
        <blockquote className="flex h-full w-full flex-col justify-between overflow-hidden rounded-[1.5rem] bg-clay p-3.5 text-alabaster sm:rounded-[1.75rem] sm:p-5 md:p-6">
          <Quote className="h-4 w-4 fill-current opacity-60 sm:h-6 sm:w-6" />
          <p className="font-serif text-sm italic leading-[1.18] sm:text-lg md:text-xl lg:text-2xl">
            “{item.text}”
          </p>
          <footer className="text-[0.55rem] uppercase tracking-[0.18em] text-alabaster/70 sm:text-[0.62rem]">
            — {item.author}
          </footer>
        </blockquote>
      </Reveal>
    );
  }

  return (
    <Reveal delay={(index % 4) * 0.08} className={`h-full w-full ${containerClasses}`}>
      <SocialTile network={item.network} />
    </Reveal>
  );
}

export default function Lifestyle() {
  return (
    <section id="beyond" aria-labelledby="beyond-title" className="relative py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        {/* Narrative Section */}
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-6">
            <SectionHeading id="beyond-title" eyebrow={about.eyebrow} sans={about.titleSans} serif={about.titleSerif} />
            <p className="mt-6 font-serif text-xl leading-snug text-espresso sm:mt-8 sm:text-3xl">{about.lead}</p>
          </Reveal>
          <Reveal delay={0.12} className="lg:col-span-5 lg:col-start-8 lg:pt-20">
            <div className="space-y-4 text-base leading-relaxed text-warmstone sm:space-y-5 sm:text-[1.05rem]">
              {about.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <ul className="mt-6 flex flex-wrap gap-2 sm:mt-8">
              {about.certifications.map((c) => (
                <li
                  key={c}
                  className="inline-flex items-center gap-1.5 rounded-full border border-espresso/10 bg-sand/60 px-3 py-1.5 text-xs font-medium text-espresso/80 sm:px-3.5 sm:py-2"
                >
                  <BadgeCheck className="h-3.5 w-3.5 text-sage" />
                  {c}
                </li>
              ))}
            </ul>
            <p className="mt-6 font-serif text-2xl italic text-clay sm:mt-8 sm:text-3xl">{about.signature}</p>
          </Reveal>
        </div>

        {/* 
          Mobile-First Bento Grid:
          - Mobile (< md): 2 columns with calibrated aspect ratios on every card (NEVER overlaps).
          - Desktop (md+): 4 columns with luxury editorial bento proportions.
        */}
        <div className="mt-12 grid grid-cols-2 gap-3 sm:mt-16 sm:gap-4 md:grid-cols-4 md:auto-rows-[230px] lg:auto-rows-[260px]">
          {about.gallery.map((item, i) => (
            <Tile key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
