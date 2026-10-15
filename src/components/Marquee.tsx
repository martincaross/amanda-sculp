import { Asterisk } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";

/** Cinta editorial infinita entre secciones. */
export default function Marquee() {
  const items = [...siteConfig.marquee, ...siteConfig.marquee];
  return (
    <div className="relative overflow-hidden py-6" aria-hidden="true">
    <div className="relative -mx-[5%] w-[110%] -rotate-1 overflow-hidden border-y border-espresso/10 bg-espresso py-5 text-alabaster sm:py-6">
      <div className="flex w-max animate-marquee items-center hover:[animation-play-state:paused]">
        {[0, 1].map((dup) => (
          <div key={dup} className="flex shrink-0 items-center">
            {items.map((item, i) => (
              <span key={`${dup}-${i}`} className="flex items-center">
                <span
                  className={`px-6 sm:px-8 ${
                    i % 2 === 0
                      ? "font-serif text-2xl italic sm:text-4xl"
                      : "text-lg font-light uppercase tracking-[0.12em] sm:text-2xl"
                  }`}
                >
                  {item}
                </span>
                <Asterisk className="h-5 w-5 text-clay" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}
