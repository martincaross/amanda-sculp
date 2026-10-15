import { ArrowUpRight, BadgeCheck, Quote } from "lucide-react";
import { siteConfig, type GalleryItem } from "@/data/siteConfig";
import BentoImage from "@/components/BentoImage";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { InstagramIcon, TikTokIcon } from "@/components/ui/SocialIcons";

const { about, social } = siteConfig;

const spanClass = {
  tall: "row-span-2 min-h-[300px] sm:min-h-0",
  wide: "col-span-2",
  square: "",
} as const;

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
      className={`group relative flex h-full min-h-[160px] flex-col justify-between overflow-hidden rounded-[1.5rem] p-4 transition-colors duration-700 ease-editorial sm:min-h-0 sm:rounded-[1.75rem] sm:p-6 ${
        isIg ? "bg-espresso text-alabaster hover:bg-clay" : "bg-sage text-alabaster hover:bg-espresso"
      }`}
    >
      <div className="flex items-start justify-between">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-alabaster/15 sm:h-12 sm:w-12">
          <Icon size={20} />
        </span>
        <ArrowUpRight className="h-5 w-5 transition-transform duration-500 ease-editorial group-hover:rotate-45 sm:h-6 sm:w-6" />
      </div>
      <div>
        <p className="text-[0.55rem] uppercase tracking-[0.2em] text-alabaster/60 sm:text-[0.65rem]">
          {isIg ? "Instagram" : "TikTok"} · {data.label}
        </p>
        <p className="mt-1 font-serif text-lg italic leading-tight sm:text-2xl">{data.handle}</p>
      </div>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-alabaster/10 transition-transform duration-700 ease-editorial group-hover:scale-[2.2]"
      />
    </a>
  );
}

function Tile({ item, index }: { item: GalleryItem; index: number }) {
  if (item.type === "image") {
    return (
      <Reveal delay={(index % 4) * 0.08} className={`h-full ${spanClass[item.span]}`}>
        <BentoImage
          src={item.src}
          alt={item.alt}
          caption={item.caption}
          className="h-full min-h-[180px] sm:min-h-0"
          sizes={item.span === "wide" ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 50vw"}
        />
      </Reveal>
    );
  }
  if (item.type === "quote") {
    return (
      <Reveal delay={(index % 4) * 0.08} className="h-full">
        <blockquote className="flex h-full min-h-[160px] flex-col justify-between rounded-[1.5rem] bg-clay p-4 text-alabaster sm:min-h-0 sm:rounded-[1.75rem] sm:p-6">
          <Quote className="h-5 w-5 fill-current opacity-60 sm:h-7 sm:w-7" />
          <p className="font-serif text-base italic leading-[1.15] sm:text-[1.65rem]">{item.text}</p>
          <footer className="text-[0.58rem] uppercase tracking-[0.2em] text-alabaster/70 sm:text-[0.62rem]">
            — {item.author}
          </footer>
        </blockquote>
      </Reveal>
    );
  }
  return (
    <Reveal delay={(index % 4) * 0.08} className="h-full">
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

        {/* Asymmetric Bento Grid (Mobile Responsive) */}
        <div className="mt-12 grid grid-flow-dense auto-rows-[160px] grid-cols-2 gap-3 sm:mt-20 sm:auto-rows-[220px] sm:gap-4 md:grid-cols-4 lg:auto-rows-[250px]">
          {about.gallery.map((item, i) => (
            <Tile key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
