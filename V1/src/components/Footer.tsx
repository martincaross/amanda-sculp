import { ArrowUp, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { InstagramIcon, SpotifyIcon, TikTokIcon } from "@/components/ui/SocialIcons";

const { brand, footer, nav, social, contactInfo } = siteConfig;

const socials = [
  { key: "tiktok", name: "TikTok", data: social.tiktok, Icon: TikTokIcon },
  { key: "instagram", name: "Instagram", data: social.instagram, Icon: InstagramIcon },
  { key: "spotify", name: "Spotify", data: social.spotify, Icon: SpotifyIcon },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-sand pt-20 sm:pt-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 border-b border-espresso/10 pb-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <a href="#top" className="font-serif text-3xl font-medium tracking-[0.08em] text-espresso">
              {brand.logo}
            </a>
            <p className="mt-5 max-w-sm font-serif text-2xl italic leading-snug text-espresso/80">{footer.tagline}</p>
            <a
              href={`mailto:${contactInfo.email}`}
              className="mt-6 inline-block text-sm text-warmstone underline decoration-clay/60 underline-offset-4 transition-colors hover:text-clay"
            >
              {contactInfo.email}
            </a>
          </div>

          <nav aria-label="Pie de página" className="md:col-span-3">
            <p className="text-[0.65rem] uppercase tracking-[0.24em] text-warmstone">Explorar</p>
            <ul className="mt-5 space-y-3">
              {nav.links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-espresso/80 transition-colors hover:text-clay">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <p className="text-[0.65rem] uppercase tracking-[0.24em] text-warmstone">Escucha & Sigue</p>
            <ul className="mt-5 space-y-2">
              {socials.map(({ key, name, data, Icon }) => (
                <li key={key}>
                  <a
                    href={data.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    id={`footer-social-${key}`}
                    className="group flex items-center justify-between gap-4 border-b border-espresso/[0.07] py-3 transition-colors hover:text-clay"
                  >
                    <span className="flex items-center gap-3">
                      <Icon size={18} />
                      <span className="font-medium">{name}</span>
                      <span className="hidden text-sm text-warmstone sm:inline">· {data.label}</span>
                    </span>
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:rotate-45" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 py-8 text-xs text-warmstone sm:flex-row sm:items-center">
          <p>{brand.copyright}</p>
          <p className="italic">{footer.note}</p>
          <p>{brand.credits}</p>
          <a
            href="#top"
            id="footer-back-to-top"
            aria-label="Volver arriba"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-espresso/15 text-espresso transition-all duration-500 hover:-translate-y-1 hover:border-clay hover:bg-clay hover:text-alabaster"
          >
            <ArrowUp className="h-4 w-4" />
          </a>
        </div>
      </div>

      {/* Marca de agua tipográfica */}
      <div aria-hidden="true" className="pointer-events-none select-none overflow-hidden">
        <p className="-mb-[0.18em] whitespace-nowrap text-center font-serif text-[16.5vw] font-light italic leading-[0.8] tracking-[-0.04em] text-espresso/[0.07]">
          {brand.watermark}
        </p>
      </div>
    </footer>
  );
}
