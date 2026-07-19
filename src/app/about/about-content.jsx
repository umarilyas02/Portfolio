"use client";

import { MaskLine, FadeIn, ScrollFillWords } from "@/components/reveal";

const STACK = [
  "Next.js",
  "React",
  "Tailwind CSS",
  "PostgreSQL",
  "Prisma / Drizzle",
  "Supabase",
  "Framer Motion",
  "Node.js",
  "Stripe",
  "AI Integrations",
];

export default function AboutContent() {
  return (
    <section className="px-5 pt-36 pb-28 md:px-10 md:pt-48 md:pb-40">
      <div className="mx-auto max-w-[1200px]">
        <h1 className="leading-[0.98] tracking-[-0.03em] text-[clamp(2.2rem,11.5vw,9rem)] md:text-[clamp(3rem,10vw,9rem)]">
          <MaskLine load duration={1.1}>
            <span className="block">Developer who</span>
          </MaskLine>
          <MaskLine load duration={1.1} delay={0.12}>
            <span className="block pl-[12vw]">
              ships end
              <br className="md:hidden" /> to end
              <span className="text-mint">.</span>
            </span>
          </MaskLine>
        </h1>

        <div className="mt-24 grid gap-16 md:mt-36 md:grid-cols-[1fr_1.2fr]">
          <FadeIn>
            <p className="text-[12px] font-semibold tracking-[0.2em] text-fog">
              (ABOUT ME)
            </p>
          </FadeIn>

          <div className="space-y-10">
            <ScrollFillWords
              text="I'm Umar Ilyas — a full-stack web developer based in Pakistan, working worldwide. I build storefronts, dashboards, ERPs, and SaaS products end-to-end: from the first wireframe to the deployed, production-grade app."
              className="leading-[1.25] tracking-[-0.01em] text-[clamp(1.4rem,2.6vw,2.2rem)]"
            />
            <FadeIn delay={0.1}>
              <p className="max-w-xl text-base leading-relaxed text-muted">
                Every project is custom-made — no page builders, no bloated
                templates. Just clean, fast, thoughtfully engineered products
                that hold up in the real world.
              </p>
            </FadeIn>
          </div>
        </div>

        <div className="mt-24 md:mt-36">
          <FadeIn>
            <p className="mb-8 text-[12px] font-semibold tracking-[0.2em] text-fog">
              (TOOLBOX)
            </p>
          </FadeIn>
          <ul className="flex flex-wrap gap-3">
            {STACK.map((tech, i) => (
              <FadeIn key={tech} delay={i * 0.05} y={16}>
                <li className="rounded-full border border-ink/20 px-5 py-2.5 text-sm transition-colors duration-300 hover:border-pine hover:bg-pine hover:text-cream">
                  {tech}
                </li>
              </FadeIn>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
