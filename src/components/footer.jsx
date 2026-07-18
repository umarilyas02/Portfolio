"use client";

import { useState } from "react";
import { useLenis } from "lenis/react";
import { Copy, Check } from "lucide-react";
import { MaskLine, FadeIn } from "./reveal";

const EMAIL = "umarilyas389@gmail.com";

export default function Footer() {
  const lenis = useLenis();
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable (http / old browser) — leave button as-is */
    }
  };

  return (
    <footer className="rounded-t-[2.5rem] bg-ink px-5 pt-24 pb-10 text-cream md:px-10 md:pt-36">
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
                className="group relative inline-block text-[clamp(1.3rem,3.4vw,2.8rem)] tracking-[-0.01em] transition-colors duration-500 hover:text-lime"
              >
                {EMAIL}
                <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-lime transition-transform duration-500 ease-out group-hover:origin-left group-hover:scale-x-100" />
              </a>
              <button
                type="button"
                onClick={copyEmail}
                aria-label="Copy email address"
                className={`rounded-full border p-3 transition-colors duration-300 ${
                  copied
                    ? "border-lime text-lime"
                    : "border-cream/25 text-fog hover:border-lime hover:text-lime"
                }`}
              >
                {copied ? (
                  <Check size={16} strokeWidth={2} />
                ) : (
                  <Copy size={16} strokeWidth={2} />
                )}
              </button>
            </div>
          </div>
        </FadeIn>

        <div className="mt-24 flex flex-col gap-6 border-t border-cream/15 pt-8 text-[12px] font-semibold tracking-[0.14em] text-fog md:mt-36 md:flex-row md:items-center md:justify-between">
          <p>©2026 UMAR ILYAS</p>
          <div className="flex gap-8">
            <a
              href="https://github.com/umarilyas02"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-lime"
            >
              GITHUB
            </a>
            <a
              href="https://www.linkedin.com/in/umarilyas02"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-lime"
            >
              LINKEDIN
            </a>
            <a href="/Umar-Ilyas-CV.pdf" download className="transition-colors hover:text-lime">
              DOWNLOAD CV
            </a>
          </div>
          <button
            type="button"
            onClick={() => lenis?.scrollTo(0, { duration: 1.4 })}
            className="text-left transition-colors hover:text-lime md:text-right"
          >
            BACK TO TOP ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
