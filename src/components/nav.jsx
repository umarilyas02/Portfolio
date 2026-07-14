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
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(latest > prev && latest > 140);
  });

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 mix-blend-difference text-white"
      animate={{ y: hidden ? "-110%" : 0 }}
      transition={{ duration: 0.6, ease: EASE }}
    >
      <nav className="flex items-center justify-between px-5 py-5 md:px-10">
        <Link
          href="/"
          className="text-[13px] font-semibold tracking-[0.08em] uppercase"
        >
          Umar Ilyas<sup>®</sup>
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          {LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="group relative text-[12px] font-semibold tracking-[0.14em]"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-white transition-transform duration-500 ease-out group-hover:origin-left group-hover:scale-x-100" />
              </Link>
            </li>
          ))}
        </ul>

        <a
          href="mailto:umarilyas389@gmail.com"
          className="group relative text-[12px] font-semibold tracking-[0.14em]"
        >
          LET&apos;S TALK
          <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-white transition-transform duration-500 ease-out group-hover:origin-left group-hover:scale-x-100" />
        </a>
      </nav>
    </motion.header>
  );
}
