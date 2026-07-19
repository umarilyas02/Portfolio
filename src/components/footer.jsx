"use client";

import { useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { AnimatePresence, motion } from "motion/react";
import { Copy, Check } from "lucide-react";
import { MaskLine, FadeIn, EASE } from "./reveal";
import Magnetic from "./magnetic";

const EMAIL = "umarilyas389@gmail.com";

function SweepLink({ href, children, external = false, download = false }) {
  return (
    <a
      href={href}
      download={download || undefined}
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
      className="group relative transition-colors duration-300 hover:text-lime"
    >
      {children}
      <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-lime transition-transform duration-500 ease-out group-hover:origin-left group-hover:scale-x-100" />
    </a>
  );
}

export default function Footer() {
  const lenis = useLenis();
  const [copied, setCopied] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable (http / old browser) — leave button as-is */
    }
  };

  const iconPop = {
    initial: { scale: 0.4, opacity: 0, rotate: -30 },
    animate: { scale: 1, opacity: 1, rotate: 0 },
    exit: { scale: 0.4, opacity: 0 },
    transition: { duration: 0.25, ease: EASE },
  };

  return (
    <footer className="rounded-t-[2.5rem] bg-ink px-5 pt-24 pb-[max(2.5rem,env(safe-area-inset-bottom))] text-cream md:px-10 md:pt-36">
      <div className="mx-auto max-w-[1400px]">
        <FadeIn>
          <p className="text-[12px] font-semibold tracking-[0.2em] text-lime">
            GOT A PROJECT IN MIND?
          </p>
        </FadeIn>

        <h2 className="mt-8 leading-[0.98] tracking-[-0.03em] text-[clamp(3rem,10vw,9.5rem)]">
          <MaskLine duration={1.1}>
            <span className="block">Let&apos;s work</span>
          </MaskLine>
          <MaskLine duration={1.1} delay={0.1}>
            <span className="block pl-[12vw]">
              together<span className="text-lime">.</span>
            </span>
          </MaskLine>
        </h2>

        <FadeIn delay={0.25}>
          <div className="mt-16 md:mt-24">
            <p className="text-sm text-fog">Drop me an email:</p>
            <div className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-3">
              <a
                href={`mailto:${EMAIL}`}
                className="group relative inline-block text-[clamp(1.35rem,5.6vw,2.8rem)] tracking-[-0.01em] transition-colors duration-500 hover:text-lime md:text-[clamp(1.3rem,3.4vw,2.8rem)]"
              >
                {EMAIL}
                <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-lime transition-transform duration-500 ease-out group-hover:origin-left group-hover:scale-x-100" />
              </a>
              <Magnetic strength={0.35}>
                <button
                  type="button"
                  onClick={copyEmail}
                  aria-label="Copy email address"
                  className={`rounded-full border p-3 transition-[border-color,color,transform] duration-300 active:scale-90 ${
                    copied
                      ? "border-lime text-lime"
                      : "border-cream/25 text-fog hover:border-lime hover:text-lime"
                  }`}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {copied ? (
                      <motion.span key="check" {...iconPop} className="block">
                        <Check size={16} strokeWidth={2} aria-hidden />
                      </motion.span>
                    ) : (
                      <motion.span key="copy" {...iconPop} className="block">
                        <Copy size={16} strokeWidth={2} aria-hidden />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </Magnetic>
              <span aria-live="polite" className="sr-only">
                {copied ? "Email address copied to clipboard" : ""}
              </span>
            </div>
          </div>
        </FadeIn>

        <div className="mt-24 flex flex-col gap-6 border-t border-cream/15 pt-8 text-[12px] font-semibold tracking-[0.14em] text-fog md:mt-36 md:flex-row md:items-center md:justify-between">
          <p>©2026 UMAR ILYAS</p>
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            <SweepLink href="https://github.com/umarilyas02" external>
              GITHUB
            </SweepLink>
            <SweepLink href="https://www.linkedin.com/in/umarilyas02" external>
              LINKEDIN
            </SweepLink>
            <SweepLink href="/Umar-Ilyas-CV.pdf" download>
              DOWNLOAD CV
            </SweepLink>
          </div>
          <button
            type="button"
            onClick={() =>
              lenis
                ? lenis.scrollTo(0, { duration: 1.4 })
                : window.scrollTo({ top: 0 })
            }
            className="group text-left transition-colors duration-300 hover:text-lime md:text-right"
          >
            BACK TO TOP{" "}
            <span
              aria-hidden
              className="inline-block transition-transform duration-500 ease-out group-hover:-translate-y-1"
            >
              ↑
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
