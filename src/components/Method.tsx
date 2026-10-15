import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import ClassVibePreview from "@/components/ClassVibePreview";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

const { method } = siteConfig;

export default function Method() {
  return (
    <section id="method" aria-labelledby="method-title" className="relative py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <SectionHeading id="method-title" eyebrow={method.eyebrow} sans={method.titleSans} serif={method.titleSerif} />
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-5">
            <p className="text-base leading-relaxed text-warmstone sm:text-lg">{method.intro}</p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3 md:gap-5 sm:mt-16">
          {method.pillars.map((p, i) => (
            <Reveal key={p.number} delay={i * 0.1}>
              <article className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-espresso/[0.07] bg-sand/70 p-6 transition-all duration-700 ease-editorial hover:-translate-y-2 hover:bg-alabaster hover:shadow-[0_30px_60px_-30px_rgba(28,25,23,0.3)] sm:rounded-[2rem] sm:p-10">
                <div className="flex items-start justify-between">
                  <span className="font-serif text-6xl font-light italic leading-none text-clay/80 transition-colors duration-500 group-hover:text-clay sm:text-7xl">
                    {p.number}
                  </span>
                  <span className="rounded-full border border-espresso/10 px-3 py-1 text-[0.62rem] font-medium uppercase tracking-[0.2em] text-warmstone sm:text-[0.65rem]">
                    {p.tag}
                  </span>
                </div>
                <h3 className="mt-8 text-xl font-medium tracking-tight text-espresso sm:mt-12 sm:text-2xl">{p.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-warmstone sm:mt-4 sm:text-base">{p.text}</p>
                <div className="mt-6 flex items-center justify-between sm:mt-8">
                  <span className="h-px w-10 bg-espresso/20 transition-all duration-700 ease-editorial group-hover:w-20 group-hover:bg-clay sm:w-12 sm:group-hover:w-24" />
                  <ArrowUpRight className="h-5 w-5 -translate-x-2 text-clay opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100" />
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 sm:mt-20">
          <ClassVibePreview />
        </Reveal>
      </div>
    </section>
  );
}
