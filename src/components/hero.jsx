"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { MaskLine, FadeIn, EASE } from "./reveal";

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const yPortrait = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.9], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-svh flex-col justify-between px-5 pt-24 pb-8 md:px-10"
    >
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
        style={{ y, opacity }}
        className="relative z-0 mx-auto w-full max-w-[1200px] font-normal leading-[0.98] tracking-[-0.03em] text-[clamp(3.2rem,11vw,10.5rem)]"
      >
        <MaskLine load delay={0.25} duration={1.1}>
          <span className="block">Creative Web</span>
        </MaskLine>
        <MaskLine load delay={0.4} duration={1.1}>
          <span className="block pl-[18vw]">Developer</span>
        </MaskLine>
      </motion.h1>

      {/* bottom row */}
      <div className="relative z-20 flex items-end justify-between">
        <FadeIn load delay={1.3} duration={0.7}>
          <p className="max-w-[240px] text-[13px] leading-snug text-muted">
            Specialized in custom full-stack development &amp; thoughtful
            design
          </p>
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
