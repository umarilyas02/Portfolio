"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useMotionValueEvent,
  useReducedMotion,
} from "motion/react";
import { useLenis } from "lenis/react";
import { X } from "lucide-react";
import { EASE } from "./reveal";
import Magnetic from "./magnetic";

const LINKS = [
  { href: "/", label: "HOME" },
  { href: "/works", label: "WORKS" },
  { href: "/about", label: "ABOUT" },
];

const EMAIL = "umarilyas389@gmail.com";

function MobileMenu({ open, onClose, pathname, reduceMotion }) {
  const closeRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const wipe = reduceMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.3 },
      }
    : {
        initial: { clipPath: "inset(0 0 100% 0)" },
        animate: { clipPath: "inset(0 0 0% 0)" },
        exit: { clipPath: "inset(0 0 100% 0)" },
        transition: { duration: 0.6, ease: EASE },
      };

  const lineReveal = (i) =>
    reduceMotion
      ? {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { duration: 0.3, delay: 0.1 + i * 0.05 },
        }
      : {
          initial: { y: "110%" },
          animate: { y: 0 },
          transition: { duration: 0.75, ease: EASE, delay: 0.25 + i * 0.07 },
        };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          {...wipe}
          className="bg-ink fixed inset-0 z-[70] flex flex-col overflow-hidden px-5 pb-[max(2.5rem,env(safe-area-inset-bottom))] text-cream md:hidden"
        >
          <div className="flex items-center justify-between py-5">
            <span className="text-[13px] font-semibold tracking-[0.08em] uppercase text-cream/80">
              Umar Ilyas<sup>®</sup>
            </span>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="rounded-full border border-cream/25 p-3 text-cream transition-[border-color,color,transform] duration-300 active:scale-90 hover:border-lime hover:text-lime"
            >
              <X size={18} strokeWidth={1.8} aria-hidden />
            </button>
          </div>

          <nav className="mt-10 flex flex-col gap-2" aria-label="Site pages">
            {LINKS.map((link, i) => {
              const active = pathname === link.href;
              return (
                <div key={link.href} className="overflow-hidden">
                  <motion.div {...lineReveal(i)}>
                    <Link
                      href={link.href}
                      onClick={onClose}
                      aria-current={active ? "page" : undefined}
                      className={`group flex items-baseline gap-4 leading-[1.06] tracking-[-0.03em] text-[clamp(3rem,14vw,5.5rem)] transition-colors duration-300 ${
                        active ? "text-lime" : "text-cream hover:text-lime"
                      }`}
                    >
                      <sup className="text-[0.22em] font-semibold text-fog transition-colors duration-300 group-hover:text-lime">
                        0{i + 1}
                      </sup>
                      {link.label}
                    </Link>
                  </motion.div>
                </div>
              );
            })}
          </nav>

          <div className="mt-auto space-y-6">
            <div className="overflow-hidden">
              <motion.div {...lineReveal(3)}>
                <p className="text-sm text-fog">Got a project in mind?</p>
                <a
                  href={`mailto:${EMAIL}`}
                  className="mt-1 inline-block text-lg tracking-[-0.01em] text-cream transition-colors duration-300 hover:text-lime"
                >
                  {EMAIL}
                </a>
              </motion.div>
            </div>
            <div className="overflow-hidden">
              <motion.div
                {...lineReveal(4)}
                className="flex gap-7 border-t border-cream/15 pt-6 text-[12px] font-semibold tracking-[0.14em] text-fog"
              >
                <a
                  href="https://github.com/umarilyas02"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-300 hover:text-lime"
                >
                  GITHUB
                </a>
                <a
                  href="https://www.linkedin.com/in/umarilyas02"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-300 hover:text-lime"
                >
                  LINKEDIN
                </a>
                <a
                  href="/Umar-Ilyas-CV.pdf"
                  download
                  className="transition-colors duration-300 hover:text-lime"
                >
                  CV ↓
                </a>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Nav() {
  const { scrollY, scrollYProgress } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const lenis = useLenis();
  const reduceMotion = useReducedMotion();
  const burgerRef = useRef(null);
  const wasOpen = useRef(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(latest > prev && latest > 140);
    setScrolled(latest > 120);
  });

  // menu open locks the page scroll behind the overlay
  useEffect(() => {
    if (menuOpen) {
      wasOpen.current = true;
      lenis?.stop();
      document.documentElement.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.documentElement.style.overflow = "";
      if (wasOpen.current) {
        burgerRef.current?.focus();
        wasOpen.current = false;
      }
    }
    return () => {
      lenis?.start();
      document.documentElement.style.overflow = "";
    };
  }, [menuOpen, lenis]);

  // navigating away (e.g. browser back) always closes the menu —
  // state reset during render, per react.dev/learn/you-might-not-need-an-effect
  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setMenuOpen(false);
  }

  return (
    <>
      {/* page scroll progress */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-lime"
      />
      <motion.header
        className={`fixed inset-x-0 top-0 z-50 text-ink transition-[background-color,backdrop-filter] duration-500 ${
          scrolled ? "bg-cream/70 backdrop-blur-md" : "bg-transparent"
        }`}
        animate={{ y: hidden && !menuOpen ? "-110%" : 0 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <nav className="flex items-center justify-between px-5 py-5 md:px-10">
          <Link
            href="/"
            className="text-[13px] font-semibold tracking-[0.08em] uppercase transition-colors duration-300 hover:text-mint"
          >
            Umar Ilyas<sup>®</sup>
          </Link>

          <ul className="hidden md:flex items-center gap-8">
            {LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className="group relative text-[12px] font-semibold tracking-[0.14em] transition-colors duration-300 hover:text-mint"
                  >
                    {link.label}
                    <span
                      className={`absolute -bottom-1 left-0 h-px w-full bg-mint transition-transform duration-500 ease-out ${
                        active
                          ? "scale-x-100"
                          : "origin-right scale-x-0 group-hover:origin-left group-hover:scale-x-100"
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-5 md:gap-7">
            <a
              href={`mailto:${EMAIL}`}
              className="group relative hidden text-[12px] font-semibold tracking-[0.14em] transition-colors duration-300 hover:text-mint md:block"
            >
              LET&apos;S TALK
              <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-mint transition-transform duration-500 ease-out group-hover:origin-left group-hover:scale-x-100" />
            </a>
            <Magnetic strength={0.25}>
              <a
                href="/Umar-Ilyas-CV.pdf"
                download
                className="group inline-flex items-center gap-2 rounded-full bg-lime px-4 py-1.5 text-[11px] font-semibold tracking-[0.14em] text-ink transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-pine hover:text-cream active:scale-95"
              >
                CV
                <span
                  aria-hidden
                  className="transition-transform duration-500 group-hover:translate-y-0.5"
                >
                  ↓
                </span>
              </a>
            </Magnetic>
            <button
              ref={burgerRef}
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label="Open menu"
              className="group relative -mr-1 flex h-11 w-11 items-center justify-center md:hidden"
            >
              <span
                aria-hidden
                className="absolute h-px w-5 -translate-y-[3px] bg-ink transition-transform duration-300 ease-out group-hover:-translate-y-[5px]"
              />
              <span
                aria-hidden
                className="absolute h-px w-5 translate-y-[3px] bg-ink transition-transform duration-300 ease-out group-hover:translate-y-[5px]"
              />
            </button>
          </div>
        </nav>
      </motion.header>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        pathname={pathname}
        reduceMotion={reduceMotion}
      />
    </>
  );
}
