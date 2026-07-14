"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { MaskLine, FadeIn } from "./reveal";
import { liveProjects } from "@/data/projects";

export function WorkCard({ project, index }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // subtle parallax inside the image mask
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

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
        </div>
        <div className="mt-5 flex items-baseline justify-between gap-4">
          <h3 className="text-xl font-normal tracking-[-0.01em] md:text-2xl">
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

export default function RecentWorks() {
  const featured = liveProjects.slice(0, 6);

  return (
    <section className="px-5 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-16 flex items-end justify-between md:mb-24">
          <h2 className="leading-none tracking-[-0.03em] text-[clamp(2.6rem,7vw,6.5rem)]">
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
              className="group hidden items-center gap-2 text-[12px] font-semibold tracking-[0.14em] text-muted transition-colors hover:text-ink md:inline-flex"
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
