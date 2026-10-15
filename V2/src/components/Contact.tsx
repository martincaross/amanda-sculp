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
    <section id="connect" aria-labelledby="connect-title" className="relative px-3 py-14 sm:px-6 sm:py-24">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-espresso p-3 sm:rounded-[2.75rem] sm:p-5">
          {/* Ambient Lighting Halos (Pure GPU radial gradients with 0 blur overhead) */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div
              className="absolute -left-20 top-0 h-96 w-96 rounded-full opacity-60 sm:opacity-80 sm:blur-[130px]"
              style={{ background: "radial-gradient(circle, rgba(200,125,85,0.28) 0%, transparent 70%)" }}
            />
            <div
              className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full opacity-50 sm:opacity-70 sm:blur-[120px]"
              style={{ background: "radial-gradient(circle, rgba(138,154,134,0.25) 0%, transparent 70%)" }}
            />
          </div>

          <div className="relative grid gap-4 lg:grid-cols-12">
            {/* Contact Information & Availability (Mobile: clean top card) */}
            <div className="flex flex-col justify-between p-4 pb-6 text-alabaster sm:p-10 lg:col-span-5">
              <div>
                <SectionHeading
                  id="connect-title"
                  eyebrow={contact.eyebrow}
                  sans={contact.titleSans}
                  serif={contact.titleSerif}
                  tone="light"
                />
                <div className="mt-6 flex items-start gap-3 rounded-2xl border border-alabaster/10 bg-alabaster/[0.04] p-4 sm:mt-8">
                  <span className="relative mt-1.5 flex h-2.5 w-2.5 shrink-0">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sage opacity-70" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-sage" />
                  </span>
                  <p className="text-xs leading-relaxed text-alabaster/80 sm:text-sm">{contact.availability}</p>
                </div>
              </div>

              <div className="mt-10 space-y-6 sm:mt-12 sm:space-y-8">
                <ul className="space-y-3.5 text-sm sm:space-y-4">
                  <li>
                    <a
                      href={`mailto:${contactInfo.email}`}
                      id="contact-email-link"
                      className="group flex items-center gap-3 text-alabaster transition-colors hover:text-clay"
                    >
                      <Mail className="h-4 w-4 shrink-0 text-clay" />
                      <span className="font-serif text-xl italic sm:text-3xl">{contactInfo.email}</span>
                      <ArrowUpRight className="h-4 w-4 opacity-0 transition-all duration-500 group-hover:opacity-100" />
                    </a>
                  </li>
                  <li className="flex items-center gap-3 text-alabaster/70">
                    <MapPin className="h-4 w-4 shrink-0 text-clay" />
                    <span>
                      {contactInfo.location} — <span className="text-alabaster/50">{contactInfo.neighborhoods}</span>
                    </span>
                  </li>
                  <li className="flex items-center gap-3 text-alabaster/70">
                    <Clock className="h-4 w-4 shrink-0 text-clay" />
                    <span>{contactInfo.responseTime}</span>
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
                      className="group inline-flex items-center gap-2 rounded-full border border-alabaster/15 px-3.5 py-2 text-[0.68rem] font-medium uppercase tracking-[0.14em] text-alabaster/80 transition-all duration-500 hover:border-clay hover:bg-clay hover:text-alabaster sm:px-4 sm:py-2.5 sm:text-xs"
                    >
                      <Icon size={14} />
                      {name}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Interactive Form */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </div>
    </section>
  );
}
