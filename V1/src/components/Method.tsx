import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import ClassVibePreview from "@/components/ClassVibePreview";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

const { method } = siteConfig;

export default function Method() {
  return (
    <section id="metodo" aria-labelledby="metodo-title" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <SectionHeading id="metodo-title" eyebrow={method.eyebrow} sans={method.titleSans} serif={method.titleSerif} />
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-5">
            <p className="text-lg leading-relaxed text-warmstone">{method.intro}</p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-4 md:grid-cols-3 md:gap-5">
          {method.pillars.map((p, i) => (
            <Reveal key={p.number} delay={i * 0.12}>
              <article className="group relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-espresso/[0.07] bg-sand/70 p-8 transition-all duration-700 ease-editorial hover:-translate-y-2 hover:bg-alabaster hover:shadow-[0_30px_60px_-30px_rgba(28,25,23,0.3)] sm:p-10">
                <div className="flex items-start justify-between">
                  <span className="font-serif text-7xl font-light italic leading-none text-clay/80 transition-colors duration-500 group-hover:text-clay">
                    {p.number}
                  </span>
                  <span className="rounded-full border border-espresso/10 px-3 py-1 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-warmstone">
                    {p.tag}
                  </span>
                </div>
                <h3 className="mt-12 text-2xl font-medium tracking-tight text-espresso">{p.title}</h3>
                <p className="mt-4 flex-1 leading-relaxed text-warmstone">{p.text}</p>
                <div className="mt-8 flex items-center justify-between">
                  <span className="h-px w-12 bg-espresso/20 transition-all duration-700 ease-editorial group-hover:w-24 group-hover:bg-clay" />
                  <ArrowUpRight className="h-5 w-5 -translate-x-2 text-clay opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100" />
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16 sm:mt-20">
          <ClassVibePreview />
        </Reveal>
      </div>
    </section>
  );
}
