"use client";

import { Download } from "lucide-react";
import { MaskLine, FadeIn } from "./reveal";
import Magnetic from "./magnetic";

const CV_URL = "/Umar-Ilyas-CV.pdf";

const ROLES = [
  {
    role: "Full Stack Developer",
    company: "x4shipping & Logistics LLC",
    meta: "Remote — Sialkot, Pakistan",
    period: "Sep 2023 — Present",
    points: [
      "Develop and maintain full-stack web applications end to end on PERN and MERN stacks — from database schema and API design through to production UI.",
      "Design and ship secure RESTful APIs with JWT authentication and role-based access control, consumed by both web and React Native mobile clients.",
      "Build cross-platform React Native features against shared backends, and conduct code reviews enforcing reusable component-based architecture.",
    ],
  },
];

const EDUCATION = {
  degree: "BS Software Engineering",
  school: "University of Management & Technology, Lahore",
  meta: "Final year — graduating July 2026",
  period: "Nov 2022 — Jul 2026",
};

function DownloadCV({ className = "" }) {
  return (
    <Magnetic>
      <a
        href={CV_URL}
        download
        className={`group inline-flex items-center gap-3 rounded-full bg-ink px-7 py-3.5 text-[12px] font-semibold tracking-[0.14em] text-cream transition-[background-color,transform] duration-300 ease-out hover:-translate-y-0.5 hover:bg-pine active:scale-95 ${className}`}
      >
        DOWNLOAD CV
        <Download
          size={15}
          strokeWidth={2}
          aria-hidden
          className="transition-transform duration-500 group-hover:translate-y-0.5"
        />
      </a>
    </Magnetic>
  );
}

export default function Experience() {
  return (
    <section className="px-5 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-16 flex items-end justify-between md:mb-20">
          <h2 className="leading-none tracking-[-0.03em] text-[clamp(2.6rem,7vw,6.5rem)]">
            <MaskLine duration={1}>
              <span className="block">
                Experience{" "}
                <sup className="text-[0.35em] font-semibold text-mint">
                  (3+ YRS)
                </sup>
              </span>
            </MaskLine>
          </h2>
          <FadeIn delay={0.2} className="hidden md:block">
            <DownloadCV />
          </FadeIn>
        </div>

        {ROLES.map((job) => (
          <FadeIn key={job.company} y={40}>
            <div className="group grid gap-6 rounded-2xl border-t border-ink/15 py-12 transition-colors duration-300 ease-out hover:bg-lime md:grid-cols-[1fr_2fr_auto] md:gap-10 md:py-16">
              <div className="transition-transform duration-300 ease-out group-hover:translate-x-5 md:group-hover:translate-x-8">
                <p className="text-[12px] font-semibold tracking-[0.14em] text-fog transition-colors duration-300 group-hover:text-ink/70">
                  {job.period}
                </p>
                <p className="mt-2 text-sm text-muted">{job.meta}</p>
              </div>
              <div className="transition-transform duration-300 ease-out group-hover:translate-x-5 md:group-hover:translate-x-8">
                <h3 className="leading-tight tracking-[-0.02em] text-[clamp(1.6rem,3.4vw,2.6rem)]">
                  {job.role}
                </h3>
                <p className="mt-1 text-base text-mint">{job.company}</p>
                <ul className="mt-7 max-w-2xl space-y-3.5">
                  {job.points.map((point) => (
                    <li
                      key={point}
                      className="flex gap-3 text-sm leading-relaxed text-muted"
                    >
                      <span aria-hidden className="shrink-0 text-mint">
                        —
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
              <span
                aria-hidden
                className="hidden h-12 w-12 shrink-0 items-center justify-center self-start rounded-full border border-ink/15 text-lg transition-all duration-300 ease-out group-hover:rotate-45 group-hover:border-ink/30 group-hover:bg-cream md:group-hover:-translate-x-8 md:flex"
              >
                ↗
              </span>
            </div>
          </FadeIn>
        ))}

        <FadeIn y={40}>
          <div className="group grid gap-6 rounded-2xl border-t border-ink/15 py-12 transition-colors duration-300 ease-out hover:bg-lime md:grid-cols-[1fr_2fr_auto] md:gap-10 md:py-16">
            <div className="transition-transform duration-300 ease-out group-hover:translate-x-5 md:group-hover:translate-x-8">
              <p className="text-[12px] font-semibold tracking-[0.14em] text-fog transition-colors duration-300 group-hover:text-ink/70">
                {EDUCATION.period}
              </p>
              <p className="mt-2 text-sm text-muted">{EDUCATION.meta}</p>
            </div>
            <div className="transition-transform duration-300 ease-out group-hover:translate-x-5 md:group-hover:translate-x-8">
              <h3 className="leading-tight tracking-[-0.02em] text-[clamp(1.6rem,3.4vw,2.6rem)]">
                {EDUCATION.degree}
              </h3>
              <p className="mt-1 text-base text-mint">{EDUCATION.school}</p>
            </div>
            <span
              aria-hidden
              className="hidden h-12 w-12 shrink-0 items-center justify-center self-start rounded-full border border-ink/15 text-lg transition-all duration-300 ease-out group-hover:rotate-45 group-hover:border-ink/30 group-hover:bg-cream md:group-hover:-translate-x-8 md:flex"
            >
              ↗
            </span>
          </div>
        </FadeIn>

        <FadeIn className="mt-14 flex justify-center md:hidden">
          <DownloadCV />
        </FadeIn>
      </div>
    </section>
  );
}
