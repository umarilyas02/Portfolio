"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export const EASE = [0.22, 1, 0.36, 1];

/**
 * Masked line reveal — the line slides up from behind an overflow-hidden
 * mask, the signature Framer text entrance.
 */
export function MaskLine({
  children,
  delay = 0,
  duration = 1,
  className = "",
  once = true,
  load = false,
}) {
  // The observer must watch the (untransformed) outer mask: the inner span
  // starts fully clipped, so observing it directly would never fire.
  const trigger = load
    ? { animate: "visible" }
    : { whileInView: "visible", viewport: { once, margin: "-10% 0px" } };

  return (
    <motion.span
      className={`block overflow-hidden ${className}`}
      initial="hidden"
      {...trigger}
    >
      <motion.span
        className="block will-change-transform"
        variants={{ hidden: { y: "110%" }, visible: { y: 0 } }}
        transition={{ duration, ease: EASE, delay }}
      >
        {children}
      </motion.span>
    </motion.span>
  );
}

export function FadeIn({
  children,
  delay = 0,
  y = 24,
  duration = 0.9,
  className = "",
  load = false,
}) {
  const anim = load
    ? { initial: { opacity: 0, y }, animate: { opacity: 1, y: 0 } }
    : {
        initial: { opacity: 0, y },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-10% 0px" },
      };

  return (
    <motion.div
      className={className}
      {...anim}
      transition={{ duration, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Scroll-linked word fill — words go from faded to full ink as the
 * paragraph moves through the viewport (tied to scroll, not time).
 */
export function ScrollFillWords({ text, className = "", accent = [] }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.5"],
  });

  const words = text.split(" ");

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <Word
          key={i}
          progress={scrollYProgress}
          range={[i / words.length, (i + 1) / words.length]}
          accent={accent.includes(word)}
        >
          {word}
        </Word>
      ))}
    </p>
  );
}

function Word({ progress, range, accent, children }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <motion.span
      style={{ opacity }}
      className={`inline-block mr-[0.24em] ${accent ? "text-mint italic" : ""}`}
    >
      {children}
    </motion.span>
  );
}
