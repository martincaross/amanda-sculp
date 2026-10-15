import { ArrowUpRight, Clock, Mail, MapPin } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { InstagramIcon, SpotifyIcon, TikTokIcon } from "@/components/ui/SocialIcons";

const { contact, contactInfo, social } = siteConfig;

const socials = [
  { key: "tiktok", name: "TikTok", data: social.tiktok, Icon: TikTokIcon },
  { key: "instagram", name: "Instagram", data: social.instagram, Icon: InstagramIcon },
  { key: "spotify", name: "Spotify", data: social.spotify, Icon: SpotifyIcon },
];

export default function Contact() {
  return (
    <section id="contacto" aria-labelledby="contacto-title" className="relative px-3 py-16 sm:px-6 sm:py-24">
      <Reveal>
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-espresso p-3 sm:rounded-[2.75rem] sm:p-4">
          {/* Halos ambientales */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="absolute -left-20 top-0 h-96 w-96 rounded-full bg-clay/25 blur-[130px]" />
            <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-sage/20 blur-[120px]" />
          </div>

          <div className="relative grid gap-4 lg:grid-cols-12">
            {/* Información */}
            <div className="flex flex-col justify-between p-5 pb-8 text-alabaster sm:p-10 lg:col-span-5">
              <div>
                <SectionHeading
                  id="contacto-title"
                  eyebrow={contact.eyebrow}
                  sans={contact.titleSans}
                  serif={contact.titleSerif}
                  tone="light"
                />
                <div className="mt-8 flex items-start gap-3 rounded-2xl border border-alabaster/10 bg-alabaster/[0.04] p-4">
                  <span className="relative mt-1.5 flex h-2.5 w-2.5 shrink-0">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sage opacity-70" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-sage" />
                  </span>
                  <p className="text-sm leading-relaxed text-alabaster/75">{contact.availability}</p>
                </div>
              </div>

              <div className="mt-12 space-y-8">
                <ul className="space-y-4 text-sm">
                  <li>
                    <a
                      href={`mailto:${contactInfo.email}`}
                      id="contact-email-link"
                      className="group flex items-center gap-3 text-alabaster transition-colors hover:text-clay"
                    >
                      <Mail className="h-4 w-4 text-clay" />
                      <span className="font-serif text-2xl italic sm:text-3xl">{contactInfo.email}</span>
                      <ArrowUpRight className="h-4 w-4 opacity-0 transition-all duration-500 group-hover:opacity-100" />
                    </a>
                  </li>
                  <li className="flex items-center gap-3 text-alabaster/70">
                    <MapPin className="h-4 w-4 text-clay" />
                    {contactInfo.location} — <span className="text-alabaster/50">{contactInfo.neighborhoods}</span>
                  </li>
                  <li className="flex items-center gap-3 text-alabaster/70">
                    <Clock className="h-4 w-4 text-clay" />
                    {contactInfo.responseTime}
                  </li>
                </ul>

                <div className="flex flex-wrap gap-2">
                  {socials.map(({ key, name, data, Icon }) => (
                    <a
                      key={key}
                      href={data.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      id={`contact-social-${key}`}
                      aria-label={`${name} — ${data.handle}`}
                      className="group inline-flex items-center gap-2 rounded-full border border-alabaster/15 px-4 py-2.5 text-xs font-medium uppercase tracking-[0.14em] text-alabaster/80 transition-all duration-500 hover:border-clay hover:bg-clay hover:text-alabaster"
                    >
                      <Icon size={15} />
                      {name}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Formulario */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
