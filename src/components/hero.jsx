"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { MaskLine, FadeIn, EASE } from "./reveal";

export default function Hero() {
  // the hero is pinned: the rest of the page slides over it, so its
  // exit choreography is driven by raw page scroll over the first viewport
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 900], [0, 180]);
  const yPortrait = useTransform(scrollY, [0, 900], [0, 100]);
  const opacity = useTransform(scrollY, [0, 810], [1, 0]);
  const scale = useTransform(scrollY, [0, 900], [1, 0.96]);

  return (
    <section className="sticky top-0 flex min-h-svh flex-col justify-between px-5 pt-24 pb-8 md:px-10">
      {/* top meta row */}
      <div className="flex justify-between text-[11px] font-semibold tracking-[0.14em] text-muted">
        <FadeIn load delay={1.1} duration={0.7}>
          <p>FULL-STACK / NEXT.JS</p>
        </FadeIn>
        <FadeIn load delay={1.2} duration={0.7}>
          <p className="text-right">
            BASED IN PAKISTAN
            <br />
            WORKING WORLDWIDE
          </p>
        </FadeIn>
      </div>

      {/* portrait, anchored to the hero's bottom edge behind the headline */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex justify-center md:justify-end md:pr-[8vw]">
        <motion.div style={{ y: yPortrait, opacity }}>
          <MaskLine load delay={0.55} duration={1.2}>
            <Image
              src="/me.webp"
              alt="Umar Ilyas"
              width={1182}
              height={1600}
              priority
              className="h-[42svh] w-auto grayscale md:h-[min(68svh,660px)]"
            />
          </MaskLine>
        </motion.div>
      </div>

      {/* giant offset headline */}
      <motion.h1
        style={{ y, opacity, scale }}
        className="relative z-0 mx-auto w-full max-w-[1200px] font-normal leading-[0.98] tracking-[-0.03em] text-[clamp(3.2rem,11vw,10.5rem)]"
      >
        <MaskLine load delay={0.25} duration={1.1}>
          <span className="block">Full-Stack</span>
        </MaskLine>
        <MaskLine load delay={0.4} duration={1.1}>
          <span className="block pl-[18vw]">Developer</span>
        </MaskLine>
      </motion.h1>

      {/* bottom row */}
      <div className="relative z-20 flex items-end justify-between">
        <FadeIn load delay={1.3} duration={0.7}>
          <div>
            <p className="max-w-[240px] text-[13px] leading-snug text-muted">
              Specialized in custom full-stack development — web &amp; mobile,
              end to end
            </p>
            <a
              href="/Umar-Ilyas-CV.pdf"
              download
              className="group mt-4 inline-flex items-center gap-2 border-b border-ink/30 pb-1 text-[11px] font-semibold tracking-[0.14em] text-ink transition-colors duration-300 hover:border-mint hover:text-mint"
            >
              DOWNLOAD CV
              <span
                aria-hidden
                className="transition-transform duration-500 group-hover:translate-y-0.5"
              >
                ↓
              </span>
            </a>
          </div>
        </FadeIn>

        <FadeIn load delay={1.45} duration={0.7}>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.14em] text-muted"
          >
            SCROLL <span aria-hidden>↓</span>
          </motion.div>
        </FadeIn>
      </div>
    </section>
  );
}
