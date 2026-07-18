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
    <span className="absolute right-4 top-4 z-10 inline-flex items-center gap-2 rounded-full bg-ink/60 px-3 py-1.5 text-[10px] font-semibold tracking-[0.14em] text-cream backdrop-blur-sm">
      <span className="h-1.5 w-1.5 rounded-full bg-lime" />
      LIVE
    </span>
  ) : (
    <span className="absolute right-4 top-4 z-10 rounded-full bg-ink/60 px-3 py-1.5 text-[10px] font-semibold tracking-[0.14em] text-cream backdrop-blur-sm">
      PRIVATE BUILD
    </span>
  );
}

function CardMeta({ project, number }) {
  const stack = project.techStack.slice(0, 4);
  const extra = project.techStack.length - stack.length;

  return (
    <>
      <div className="mt-5 flex items-baseline justify-between gap-4">
        <h3 className="text-xl font-normal tracking-[-0.01em] transition-colors duration-500 group-hover:text-mint md:text-2xl">
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
        <p className="shrink-0 text-[11px] font-semibold uppercase tracking-[0.14em] text-fog">
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
      <div className="group">
        <div
          ref={ref}
          className="relative overflow-hidden rounded-2xl bg-pine/10 aspect-[4/3]"
        >
          <motion.div style={{ y }} className="absolute inset-[-10%_0]">
            <Image
              src={project.cover}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </motion.div>
          <div className="pointer-events-none absolute inset-0 z-[5] bg-pine/0 transition-colors duration-500 group-hover:bg-pine/25" />
          <StatusBadge liveUrl={project.liveUrl} />
        </div>
        <CardMeta project={project} number={number} />
      </div>
    </FadeIn>
  );

  return project.liveUrl ? (
    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
      {card}
    </a>
  ) : (
    <div>{card}</div>
  );
}

export function WorksGrid({ projects }) {
  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 md:gap-y-24">
      {projects.map((project, i) => (
        <div key={project.slug} className={i % 2 === 1 ? "md:mt-24" : ""}>
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
      <div className="relative overflow-hidden rounded-2xl bg-pine/10 aspect-[4/3]">
        <Image
          src={project.cover}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 82vw, 44vw"
          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="pointer-events-none absolute inset-0 z-[5] bg-pine/0 transition-colors duration-500 group-hover:bg-pine/25" />
        <StatusBadge liveUrl={project.liveUrl} />
      </div>
      <CardMeta project={project} number={number} />
    </div>
  );

  return project.liveUrl ? (
    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
      {card}
    </a>
  ) : (
    <div>{card}</div>
  );
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
          className="group hidden items-center gap-2 text-[12px] font-semibold tracking-[0.14em] text-muted transition-colors duration-300 hover:text-mint md:inline-flex"
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
            className="group flex aspect-[4/3] w-[60vw] shrink-0 items-center justify-center rounded-2xl border border-ink/15 transition-colors duration-500 hover:border-pine hover:bg-pine hover:text-cream md:w-[24vw]"
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
