"use client";

import Image from "next/image";
import Link from "next/link";
import { MaskLine, FadeIn } from "@/components/reveal";

export default function ProjectDetail({ project, prev, next }) {
  return (
    <section className="px-5 pt-36 pb-28 md:px-10 md:pt-48 md:pb-40">
      <div className="mx-auto max-w-[1200px]">
        <FadeIn load duration={0.7}>
          <Link
            href="/works"
            className="group inline-flex items-center gap-2 text-[12px] font-semibold tracking-[0.14em] text-muted transition-colors duration-300 hover:text-mint"
          >
            <span
              aria-hidden
              className="inline-block transition-transform duration-500 ease-out group-hover:-translate-x-1"
            >
              ←
            </span>
            ALL WORKS
          </Link>
        </FadeIn>

        <FadeIn load delay={0.1} duration={0.7}>
          <p className="mt-10 text-[12px] font-semibold tracking-[0.2em] text-fog">
            {project.category.toUpperCase()}
          </p>
        </FadeIn>
        <h1 className="mt-4 leading-none tracking-[-0.03em] text-[clamp(2.6rem,8vw,7rem)]">
          <MaskLine load delay={0.15} duration={1.1}>
            <span className="block">{project.title}</span>
          </MaskLine>
        </h1>
        <FadeIn load delay={0.3} duration={0.7}>
          <p className="mt-4 text-lg text-mint">{project.tagline}</p>
        </FadeIn>
        <FadeIn load delay={0.4} duration={0.7}>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
            {project.description}
          </p>

          <ul className="mt-8 flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-ink/15 px-3 py-1 text-[11px] text-muted transition-colors duration-300 hover:border-mint hover:text-mint"
              >
                {tech}
              </li>
            ))}
          </ul>

          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-10 inline-flex items-center gap-2 border-b border-ink/30 pb-1 text-[12px] font-semibold tracking-[0.14em] text-ink transition-colors duration-300 hover:border-mint hover:text-mint"
            >
              VISIT LIVE SITE
              <span
                aria-hidden
                className="transition-transform duration-500 group-hover:rotate-45"
              >
                ↗
              </span>
            </a>
          ) : project.repoUrl ? (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-10 inline-flex items-center gap-2 border-b border-ink/30 pb-1 text-[12px] font-semibold tracking-[0.14em] text-ink transition-colors duration-300 hover:border-mint hover:text-mint"
            >
              VIEW ON GITHUB
              <span
                aria-hidden
                className="transition-transform duration-500 group-hover:rotate-45"
              >
                ↗
              </span>
            </a>
          ) : (
            <p className="mt-10 inline-block rounded-full bg-ink px-4 py-2 text-[10px] font-semibold tracking-[0.14em] text-cream">
              PRIVATE BUILD
            </p>
          )}
        </FadeIn>

        {project.features ? (
          <FadeIn load delay={0.5} duration={0.7}>
            <div className="mt-16 md:mt-20">
              <h2 className="text-[11px] font-semibold tracking-[0.2em] text-fog">
                FEATURES
              </h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {project.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 text-sm leading-relaxed text-muted"
                  >
                    <span
                      aria-hidden
                      className="mt-2 h-1 w-1 shrink-0 rounded-full bg-mint"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        ) : null}

        {project.chat ? (
          <FadeIn y={48} duration={1}>
            <div className="mt-16 md:mt-20">
              <h2 className="text-[11px] font-semibold tracking-[0.2em] text-fog">
                {(project.chat.title ?? "SAMPLE CONVERSATION").toUpperCase()}
              </h2>
              <div className="mt-5 space-y-3 rounded-2xl border border-ink/10 bg-[#f6f6f4] p-5 md:p-7">
                {project.chat.messages.map((message, i) => (
                  <div
                    key={i}
                    className={`flex ${message.side === "right" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] whitespace-pre-line rounded-2xl px-4 py-2.5 text-sm leading-relaxed sm:max-w-[75%] ${
                        message.side === "right"
                          ? "bg-ink text-cream"
                          : "border border-ink/10 bg-white text-ink"
                      }`}
                    >
                      <p className="mb-1 text-[9px] font-semibold uppercase tracking-[0.1em] opacity-60">
                        {message.from}
                      </p>
                      {message.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        ) : null}

        <div className="mt-16 space-y-12 md:mt-24 md:space-y-20">
          {project.gallery.map((shot) => (
            <FadeIn key={shot.src} y={48} duration={1}>
              <figure>
                <div className="overflow-hidden rounded-2xl border border-ink/10">
                  <Image
                    src={shot.src}
                    alt={`${project.title} — ${shot.caption}`}
                    width={1600}
                    height={1000}
                    sizes="(max-width: 768px) 92vw, 1200px"
                    className="w-full"
                  />
                </div>
                <figcaption className="mt-3 text-sm text-muted">
                  {shot.caption}
                </figcaption>
              </figure>
            </FadeIn>
          ))}
        </div>

        <nav
          aria-label="More projects"
          className="mt-24 border-t border-ink/15 pt-10 md:mt-32"
        >
          <div className="flex items-start justify-between gap-6">
            <Link href={`/works/${prev.slug}`} className="group min-w-0">
              <p className="text-[11px] font-semibold tracking-[0.14em] text-fog">
                <span
                  aria-hidden
                  className="inline-block transition-transform duration-500 ease-out group-hover:-translate-x-1"
                >
                  ←
                </span>{" "}
                PREVIOUS
              </p>
              <p className="mt-2 truncate text-xl tracking-[-0.01em] transition-colors duration-300 group-hover:text-mint md:text-2xl">
                {prev.title}
              </p>
            </Link>
            <Link
              href={`/works/${next.slug}`}
              className="group min-w-0 text-right"
            >
              <p className="text-[11px] font-semibold tracking-[0.14em] text-fog">
                NEXT{" "}
                <span
                  aria-hidden
                  className="inline-block transition-transform duration-500 ease-out group-hover:translate-x-1"
                >
                  →
                </span>
              </p>
              <p className="mt-2 truncate text-xl tracking-[-0.01em] transition-colors duration-300 group-hover:text-mint md:text-2xl">
                {next.title}
              </p>
            </Link>
          </div>
        </nav>
      </div>
    </section>
  );
}
