"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { MaskLine, FadeIn } from "./reveal";
import { liveProjects } from "@/data/projects";

function StatusBadge({ liveUrl }) {
  return liveUrl ? (
    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-ink px-2.5 py-1 text-[9px] font-semibold tracking-[0.12em] text-cream">
      <span className="live-dot h-1.5 w-1.5 rounded-full bg-lime" />
      LIVE
    </span>
  ) : (
    <span className="shrink-0 rounded-full bg-ink px-2.5 py-1 text-[9px] font-semibold tracking-[0.12em] text-cream">
      PRIVATE BUILD
    </span>
  );
}

function DesktopMockup({ project, imageStyle }) {
  const contain = project.coverFit === "contain";
  const displayUrl = project.liveUrl
    ? project.liveUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")
    : `${project.slug}.workspace`;

  return (
    <div className="relative aspect-[16/10] w-full max-w-full overflow-hidden rounded-2xl bg-pine px-[4%] pb-[5%] pt-[4%] shadow-[0_28px_70px_-40px_rgba(18,60,47,0.9)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1.5">
      <div className="flex h-full flex-col overflow-hidden rounded-[0.7rem] border border-white/20 bg-white shadow-[0_18px_45px_-24px_rgba(0,0,0,0.75)]">
        <div className="flex h-10 shrink-0 items-center gap-2 border-b border-ink/10 bg-[#f4f4f2] px-3 sm:h-11 sm:px-4">
          <div className="flex shrink-0 gap-1.5" aria-hidden>
            <span className="h-2 w-2 rounded-full bg-[#ff6b5f]" />
            <span className="h-2 w-2 rounded-full bg-[#f2bd45]" />
            <span className="h-2 w-2 rounded-full bg-[#55c46a]" />
          </div>
          <div className="mx-auto hidden min-w-0 max-w-[58%] flex-1 items-center justify-center rounded-md border border-ink/10 bg-white/80 px-3 py-1 sm:flex">
            <span className="truncate text-[9px] text-muted/80">
              {displayUrl}
            </span>
          </div>
          <StatusBadge liveUrl={project.liveUrl} />
        </div>
        <div
          className={`relative min-h-0 flex-1 overflow-hidden ${contain ? "bg-white" : "bg-[#eef0ee]"}`}
        >
          <motion.div
            style={contain ? undefined : imageStyle}
            className={contain ? "absolute inset-0" : "absolute inset-[-8%_0]"}
          >
            <Image
              src={project.cover}
              alt={`${project.title} desktop interface`}
              fill
              sizes="(max-width: 768px) 92vw, 44vw"
              style={{
                objectFit: contain ? "contain" : "cover",
                objectPosition:
                  project.coverPosition ?? (contain ? "center" : "center top"),
              }}
              className="transition-transform duration-700 ease-out group-hover:scale-[1.025]"
            />
          </motion.div>
          <div className="pointer-events-none absolute inset-0 bg-pine/0 transition-colors duration-500 group-hover:bg-pine/10" />
        </div>
      </div>
      <div
        aria-hidden
        className="absolute bottom-[1.8%] left-1/2 h-[1.5%] w-[34%] -translate-x-1/2 rounded-full bg-white/15"
      />
    </div>
  );
}

function CardMeta({ project, number }) {
  const stack = project.techStack.slice(0, 4);
  const extra = project.techStack.length - stack.length;

  return (
    <>
      <div className="mt-5 flex min-w-0 flex-col items-start gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
        <h3 className="min-w-0 text-xl font-normal tracking-[-0.01em] transition-colors duration-500 group-hover:text-mint md:text-2xl">
          <span className="mr-2.5 align-[0.35em] text-[0.55em] font-semibold text-fog">
            {number}
          </span>
          {project.title}
          <span
            aria-hidden
            className="ml-2 inline-block text-mint opacity-0 transition-all duration-500 group-hover:translate-x-1 group-hover:opacity-100"
          >
            ↗
          </span>
        </h3>
        <p className="max-w-full text-[10px] font-semibold uppercase tracking-[0.12em] text-fog sm:text-right sm:text-[11px] sm:tracking-[0.14em]">
          {project.category}
        </p>
      </div>
      <p className="mt-1 text-sm text-muted">{project.tagline}</p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {stack.map((tech) => (
          <li
            key={tech}
            className="rounded-full border border-ink/15 px-3 py-1 text-[11px] text-muted transition-colors duration-300 hover:border-mint hover:text-mint group-hover:border-ink/30"
          >
            {tech}
          </li>
        ))}
        {extra > 0 && (
          <li className="rounded-full border border-ink/15 px-3 py-1 text-[11px] font-semibold text-mint">
            +{extra}
          </li>
        )}
      </ul>
    </>
  );
}

export function WorkCard({ project, index }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // subtle parallax inside the image mask
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  const number = String(index + 1).padStart(2, "0");

  const card = (
    <FadeIn y={60} duration={1} delay={(index % 2) * 0.1}>
      <div
        className="group min-w-0 w-full"
        style={{ maxWidth: "calc(100vw - 2.5rem)" }}
      >
        <div ref={ref}>
          <DesktopMockup project={project} imageStyle={{ y }} />
        </div>
        <CardMeta project={project} number={number} />
      </div>
    </FadeIn>
  );

  return <Link href={`/works/${project.slug}`}>{card}</Link>;
}

export function WorksGrid({ projects }) {
  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 md:gap-y-24">
      {projects.map((project, i) => (
        <div
          key={project.slug}
          className={`min-w-0 ${i % 2 === 1 ? "md:mt-24" : ""}`}
        >
          <WorkCard project={project} index={i} />
        </div>
      ))}
    </div>
  );
}

function HorizontalCard({ project, index }) {
  const number = String(index + 1).padStart(2, "0");

  const card = (
    <div className="group w-[82vw] shrink-0 md:w-[44vw] lg:w-[36vw]">
      <DesktopMockup project={project} />
      <CardMeta project={project} number={number} />
    </div>
  );

  return <Link href={`/works/${project.slug}`}>{card}</Link>;
}

export default function RecentWorks() {
  const featured = liveProjects.slice(0, 8);
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [range, setRange] = useState(0);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -range]);

  useEffect(() => {
    if (reduceMotion) return;
    const measure = () => {
      if (trackRef.current) {
        setRange(
          Math.max(0, trackRef.current.scrollWidth - window.innerWidth),
        );
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [reduceMotion]);

  const header = (
    <div className="flex items-end justify-between">
      <h2 className="leading-none tracking-[-0.03em] text-[clamp(2.6rem,7vw,6rem)]">
        <MaskLine duration={1}>
          <span className="block">
            Recent Works{" "}
            <sup className="text-[0.35em] font-semibold text-mint">
              ({liveProjects.length})
            </sup>
          </span>
        </MaskLine>
      </h2>
      <FadeIn delay={0.2}>
        <Link
          href="/works"
          className="group inline-flex items-center gap-2 text-[12px] font-semibold tracking-[0.14em] text-muted transition-colors duration-300 hover:text-mint"
        >
          ALL WORKS
          <span
            aria-hidden
            className="transition-transform duration-500 group-hover:rotate-45"
          >
            ↗
          </span>
        </Link>
      </FadeIn>
    </div>
  );

  // reduced motion: no pinning, no scroll-jacking — just the grid
  if (reduceMotion) {
    return (
      <section className="px-5 py-28 md:px-10 md:py-40">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-16 md:mb-24">{header}</div>
          <WorksGrid projects={featured} />
          <div className="mt-20 flex justify-center md:hidden">
            <Link
              href="/works"
              className="inline-flex items-center gap-3 rounded-full border border-ink/20 px-8 py-4 text-[13px] font-semibold tracking-[0.14em]"
            >
              ALL WORKS <span aria-hidden>↗</span>
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: `calc(100svh + ${range}px)` }}
    >
      <div className="sticky top-0 flex h-svh flex-col justify-center gap-10 overflow-hidden py-8 md:gap-14">
        <div className="px-5 md:px-10">{header}</div>

        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex items-start gap-6 px-5 will-change-transform md:gap-10 md:px-10"
        >
          {featured.map((project, i) => (
            <HorizontalCard key={project.slug} project={project} index={i} />
          ))}

          {/* end tile → all works */}
          <Link
            href="/works"
            className="group flex aspect-[16/10] w-[60vw] shrink-0 items-center justify-center rounded-2xl border border-ink/15 transition-[background-color,border-color,color,transform] duration-500 hover:border-pine hover:bg-pine hover:text-cream active:scale-[0.98] md:w-[24vw]"
          >
            <span className="flex items-center gap-3 text-[13px] font-semibold tracking-[0.14em]">
              ALL WORKS
              <span
                aria-hidden
                className="transition-transform duration-500 group-hover:rotate-45"
              >
                ↗
              </span>
            </span>
          </Link>
        </motion.div>

        <div className="px-5 md:px-10">
          <motion.div
            style={{ scaleX: scrollYProgress }}
            className="h-[2px] origin-left rounded-full bg-ink/70"
          />
        </div>
      </div>
    </section>
  );
}
