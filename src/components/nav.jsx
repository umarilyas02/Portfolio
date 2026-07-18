"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { EASE } from "./reveal";

const LINKS = [
  { href: "/", label: "HOME" },
  { href: "/works", label: "WORKS" },
  { href: "/about", label: "ABOUT" },
];

export default function Nav() {
  const { scrollY, scrollYProgress } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(latest > prev && latest > 140);
    setScrolled(latest > 120);
  });

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
        animate={{ y: hidden ? "-110%" : 0 }}
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
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="group relative text-[12px] font-semibold tracking-[0.14em] transition-colors duration-300 hover:text-mint"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-mint transition-transform duration-500 ease-out group-hover:origin-left group-hover:scale-x-100" />
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-5 md:gap-7">
            <a
              href="mailto:umarilyas389@gmail.com"
              className="group relative text-[12px] font-semibold tracking-[0.14em] transition-colors duration-300 hover:text-mint"
            >
              LET&apos;S TALK
              <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-mint transition-transform duration-500 ease-out group-hover:origin-left group-hover:scale-x-100" />
            </a>
            <a
              href="/Umar-Ilyas-CV.pdf"
              download
              className="group inline-flex items-center gap-2 rounded-full bg-lime px-4 py-1.5 text-[11px] font-semibold tracking-[0.14em] text-ink transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-pine hover:text-cream"
            >
              CV
              <span
                aria-hidden
                className="transition-transform duration-500 group-hover:translate-y-0.5"
              >
                ↓
              </span>
            </a>
          </div>
        </nav>
      </motion.header>
    </>
  );
}
