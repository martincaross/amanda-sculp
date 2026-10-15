"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { siteConfig } from "@/data/siteConfig";
import MagneticButton from "@/components/ui/MagneticButton";
import { InstagramIcon, TikTokIcon } from "@/components/ui/SocialIcons";

const { brand, nav, social } = siteConfig;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 30);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is active
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-2.5 sm:px-6 sm:pt-5">
        <nav
          aria-label="Main"
          className={`flex w-full max-w-6xl items-center justify-between rounded-full border py-2 pl-5 pr-2 transition-all duration-500 ease-editorial sm:pl-6 ${
            scrolled
              ? "border-espresso/10 bg-[#F9F6F0]/98 shadow-[0_10px_40px_-15px_rgba(28,25,23,0.2)] md:backdrop-blur-md md:bg-alabaster/85"
              : "border-transparent bg-[#F9F6F0]/98 md:backdrop-blur-sm md:bg-alabaster/40"
          }`}
        >
          <a
            href="#top"
            id="nav-logo"
            className="font-serif text-xl font-medium tracking-[0.08em] text-espresso transition-colors hover:text-clay sm:text-2xl"
          >
            {brand.logo}
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {nav.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  id={`nav-${link.href.slice(1)}`}
                  className="group relative px-4 py-2 text-[0.8rem] font-medium tracking-wide text-espresso/75 transition-colors hover:text-espresso"
                >
                  {link.label}
                  <span className="absolute inset-x-4 -bottom-0.5 h-px origin-left scale-x-0 bg-clay transition-transform duration-500 ease-editorial group-hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <MagneticButton
              href={nav.cta.href}
              id="nav-cta"
              variant="primary"
              className="hidden! px-6! py-3! sm:inline-flex!"
              strength={0.25}
            >
              {nav.cta.label}
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:rotate-45" />
            </MagneticButton>
            <button
              id="nav-menu-toggle"
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={open}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-espresso text-alabaster transition-transform duration-300 active:scale-95 md:hidden sm:h-11 sm:w-11"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Fullscreen Mobile Drawer with radial reveal */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ clipPath: "circle(0% at calc(100% - 2.5rem) 2.2rem)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 2.5rem) 2.2rem)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 2.5rem) 2.2rem)" }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-between bg-espresso px-7 pb-10 pt-24 text-alabaster md:hidden"
          >
            <ul className="space-y-1">
              {nav.links.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.06, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                >
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 py-2 font-serif text-4xl italic transition-colors hover:text-clay sm:text-5xl"
                  >
                    <span className="font-sans text-xs not-italic tracking-widest text-alabaster/40">0{i + 1}</span>
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="space-y-6"
            >
              <a
                href={nav.cta.href}
                onClick={() => setOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-clay py-4 text-xs font-medium uppercase tracking-[0.16em] text-alabaster"
              >
                {nav.cta.label} <ArrowUpRight className="h-4 w-4" />
              </a>
              <div className="flex items-center justify-center gap-6 text-alabaster/70">
                <a href={social.tiktok.url} target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                  <TikTokIcon />
                </a>
                <a href={social.instagram.url} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <InstagramIcon />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
