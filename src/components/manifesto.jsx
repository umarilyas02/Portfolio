"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { MaskLine, ScrollFillWords, EASE } from "./reveal";

export default function Manifesto() {
  return (
    <section className="px-5 py-28 md:px-10 md:py-44">
      {/* stacked statements */}
      <div className="mx-auto max-w-[1200px] space-y-6 leading-[1.02] tracking-[-0.02em] text-[clamp(2.2rem,6vw,5.5rem)]">
        <MaskLine duration={1.1}>
          <span className="block">Full-Stack Developer</span>
        </MaskLine>
        <MaskLine duration={1.1} delay={0.08}>
          <span className="block pl-[10vw]">
            Web &amp; Mobile
          </span>
        </MaskLine>
        <MaskLine duration={1.1} delay={0.12}>
          <span className="block">
            I build with <span className="italic text-mint">care.</span>
          </span>
        </MaskLine>
        <MaskLine duration={1.1} delay={0.16}>
          <span className="block pl-[6vw] text-[0.5em] text-muted">
            No templates, no shortcuts.
          </span>
        </MaskLine>
      </div>

      {/* view works pill */}
      <div className="mx-auto mt-20 flex max-w-[1200px] justify-center md:mt-28">
        <motion.div
          initial={{ scale: 0, rotate: -8 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <Link
            href="/works"
            className="group inline-flex items-center gap-3 rounded-full bg-lime px-8 py-4 text-[13px] font-semibold tracking-[0.14em] text-ink transition-[background-color,color,transform] duration-300 ease-out hover:-translate-y-0.5 hover:bg-pine hover:text-cream"
          >
            VIEW WORKS
            <span
              aria-hidden
              className="transition-transform duration-500 group-hover:rotate-45"
            >
              ↗
            </span>
          </Link>
        </motion.div>
      </div>

      {/* scroll-fill paragraph */}
      <div className="mx-auto mt-28 max-w-[1100px] md:mt-44">
        <ScrollFillWords
          text="Just custom-made, production-grade products — engineered and brought to life with code."
          accent={["code."]}
          className="leading-[1.12] tracking-[-0.02em] text-[clamp(2rem,5vw,4.6rem)]"
        />
      </div>
    </section>
  );
}
