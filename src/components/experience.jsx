"use client";

import { Download, GitBranch, ExternalLink } from "lucide-react";
import { MaskLine, FadeIn } from "./reveal";
import Magnetic from "./magnetic";

const RESUME_URL = "/Umar-Ilyas-Resume.pdf";

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

const GITHUB_URL = "https://github.com/UMARILYAS02";
const CONTRIBUTION_COLORS = [
  "bg-[#c5e4d4]",
  "bg-[#93cdb2]",
  "bg-[#5eae8e]",
  "bg-[#367d68]",
  "bg-[#123c2f]",
];

function DownloadResume({ className = "" }) {
  return (
    <Magnetic>
      <a
        href={RESUME_URL}
        download
        className={`group inline-flex items-center gap-3 rounded-full bg-ink px-7 py-3.5 text-[12px] font-semibold tracking-[0.14em] text-cream transition-[background-color,transform] duration-300 ease-out hover:-translate-y-0.5 hover:bg-pine active:scale-95 ${className}`}
      >
        DOWNLOAD RESUME
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

function ContributionGrid({ days }) {
  if (!days.length) return null;

  const columns = Array.from(
    { length: Math.ceil(days.length / 7) },
    (_, index) => days.slice(index * 7, index * 7 + 7),
  );
  const maxCount = Math.max(...days.map((day) => day.count), 1);

  return (
    <div className="overflow-x-auto no-scrollbar">
      <div
        className="grid min-w-[560px] grid-cols-[repeat(53,minmax(0,1fr))] gap-1.5 sm:min-w-0 sm:gap-2"
        aria-label="GitHub public activity over the last year"
      >
        {columns.map((column, columnIndex) => (
          <div key={columnIndex} className="grid gap-1.5 sm:gap-2">
            {column.map((day) => {
              const level =
                day.count === 0
                  ? 0
                  : Math.min(4, Math.ceil((day.count / maxCount) * 4));

              return (
                <span
                  key={day.date}
                  title={`${day.count} public contribution${day.count === 1 ? "" : "s"} on ${day.date}`}
                  aria-label={`${day.count} public contribution${day.count === 1 ? "" : "s"} on ${day.date}`}
                  className={`aspect-square w-full rounded-[3px] border border-pine/10 ${CONTRIBUTION_COLORS[level]}`}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

function GitHubActivity({ activity }) {
  const hasActivity = activity.contributionDays.length > 0;

  return (
    <FadeIn y={40}>
      <div className="group rounded-2xl border-t border-ink/15 py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-[1fr_2fr_auto] md:gap-10">
          <div>
            <p className="text-[12px] font-semibold tracking-[0.14em] text-fog">
              LIVE / GITHUB
            </p>
            <p className="mt-2 text-sm text-muted">
              One year of public activity, refreshed hourly
            </p>
          </div>
          <div>
            <div className="flex flex-wrap items-start justify-between gap-5">
              <div>
                <h3 className="flex items-center gap-3 leading-tight tracking-[-0.02em] text-[clamp(1.6rem,3.4vw,2.6rem)]">
                  <GitBranch size={28} strokeWidth={1.5} aria-hidden />
                  Contribution history
                </h3>
                <p className="mt-1 text-base text-mint">
                  @{activity.username}
                </p>
              </div>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.14em] text-muted transition-colors hover:text-mint"
              >
                VIEW PROFILE
                <ExternalLink
                  size={14}
                  strokeWidth={1.8}
                  aria-hidden
                  className="transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                />
              </a>
            </div>
            {hasActivity ? (
              <>
                <div className="mt-8 rounded-xl border border-ink/10 bg-cream/60 p-4 sm:p-5">
                  <ContributionGrid days={activity.contributionDays} />
                  <div className="mt-4 flex items-center justify-between gap-4 text-[10px] font-semibold tracking-[0.1em] text-fog">
                    <span>1 YEAR AGO</span>
                    <span>RECENT</span>
                  </div>
                </div>
                <p className="mt-5 text-sm leading-relaxed text-muted">
                  {activity.totalContributions} public contribution
                  {activity.totalContributions === 1 ? "" : "s"} recorded in
                  the latest GitHub activity window.
                </p>
              </>
            ) : (
              <p className="mt-8 rounded-xl border border-ink/10 p-5 text-sm leading-relaxed text-muted">
                {activity.error}
              </p>
            )}
          </div>
          <span
            aria-hidden
            className="hidden h-12 w-12 shrink-0 items-center justify-center self-start rounded-full border border-ink/15 text-lg transition-all duration-300 ease-out group-hover:rotate-45 group-hover:border-ink/30 group-hover:bg-lime md:group-hover:-translate-x-8 md:flex"
          >
            ↗
          </span>
        </div>
      </div>
    </FadeIn>
  );
}

export default function Experience({ githubActivity }) {
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
<DownloadResume />
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

        <GitHubActivity activity={githubActivity} />

        <FadeIn className="mt-14 flex justify-center md:hidden">
          <DownloadResume />
        </FadeIn>
      </div>
    </section>
  );
}
