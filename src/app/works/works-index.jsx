"use client";

import { MaskLine, FadeIn } from "@/components/reveal";
import { WorksGrid } from "@/components/works";
import { liveProjects } from "@/data/projects";

export default function WorksIndex() {
  return (
    <section className="px-5 pt-36 pb-28 md:px-10 md:pt-48 md:pb-40">
      <div className="mx-auto max-w-[1400px]">
        <h1 className="leading-none tracking-[-0.03em] text-[clamp(3rem,10vw,9rem)]">
          <MaskLine load duration={1.1}>
            <span className="block">
              All works{" "}
              <sup className="text-[0.3em] font-semibold text-mint">
                ({liveProjects.length})
              </sup>
            </span>
          </MaskLine>
        </h1>
        <FadeIn load delay={0.3}>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-muted">
            A selection of e-commerce storefronts, dashboards, ERPs, and SaaS
            products — built and shipped end-to-end.
          </p>
        </FadeIn>

        <div className="mt-20 md:mt-28">
          <WorksGrid projects={liveProjects} />
        </div>
      </div>
    </section>
  );
}
