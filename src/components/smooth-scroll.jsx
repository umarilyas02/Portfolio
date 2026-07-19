"use client";

import { ReactLenis } from "lenis/react";
import { MotionConfig, useReducedMotion } from "motion/react";

export default function SmoothScroll({ children }) {
  const reduceMotion = useReducedMotion();

  // Every motion/react animation honors the OS reduce-motion setting:
  // transforms snap instantly, opacity still eases.
  const content = <MotionConfig reducedMotion="user">{children}</MotionConfig>;

  // Reduced motion also means native scrolling, not Lenis interpolation.
  if (reduceMotion) return content;

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.09,
        duration: 1.2,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
      }}
    >
      {content}
    </ReactLenis>
  );
}
