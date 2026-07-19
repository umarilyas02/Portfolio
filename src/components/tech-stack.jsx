import {
  siDrizzle,
  siGit,
  siGithub,
  siJavascript,
  siMongodb,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siPrisma,
  siRadixui,
  siReact,
  siRedux,
  siStripe,
  siSupabase,
  siTailwindcss,
  siTypescript,
  siVercel,
} from "simple-icons";
import { Code2, Orbit, Sparkles } from "lucide-react";

const BUILD_TOOLS = [
  { name: "JavaScript", icon: siJavascript, color: "#f7df1e" },
  { name: "TypeScript", icon: siTypescript, color: "#3178c6" },
  { name: "React", icon: siReact, color: "#61dafb" },
  { name: "Next.js", icon: siNextdotjs, color: "#e9e8e8" },
  { name: "Tailwind CSS", icon: siTailwindcss, color: "#06b6d4" },
  { name: "Motion", customIcon: Orbit, color: "#bfdb39" },
  { name: "Redux", icon: siRedux, color: "#a78bfa" },
  { name: "Node.js", icon: siNodedotjs, color: "#5fa04e" },
  { name: "Radix UI", icon: siRadixui, color: "#e9e8e8" },
  { name: "VS Code", customIcon: Code2, color: "#38a9f2" },
];

const PLATFORM_TOOLS = [
  { name: "PostgreSQL", icon: siPostgresql, color: "#61a9db" },
  { name: "MongoDB", icon: siMongodb, color: "#47a248" },
  { name: "Prisma", icon: siPrisma, color: "#e9e8e8" },
  { name: "Supabase", icon: siSupabase, color: "#3ecf8e" },
  { name: "Drizzle", icon: siDrizzle, color: "#c5f74f" },
  { name: "Stripe", icon: siStripe, color: "#8c9eff" },
  { name: "OpenAI", customIcon: Sparkles, color: "#9ee6d1" },
  { name: "Vercel", icon: siVercel, color: "#e9e8e8" },
  { name: "Git", icon: siGit, color: "#f05032" },
  { name: "GitHub", icon: siGithub, color: "#e9e8e8" },
];

function ToolIcon({ tool }) {
  if (tool.customIcon) {
    const Icon = tool.customIcon;
    return (
      <Icon
        aria-hidden
        strokeWidth={1.8}
        className="h-4 w-4 md:h-5.5 md:w-5.5"
      />
    );
  }

  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className="h-4 w-4 md:h-5.5 md:w-5.5"
    >
      <path fill="currentColor" d={tool.icon.path} />
    </svg>
  );
}

function ToolPill({ tool }) {
  return (
    <li className="group/tool relative flex shrink-0 items-center gap-2 rounded-full border border-cream/15 bg-cream/[0.04] py-2 pl-2 pr-3.5 transition-[transform,background-color,border-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:z-10 hover:-translate-y-1 hover:border-lime/50 hover:bg-cream/[0.08] md:gap-3 md:py-2.5 md:pl-2.5 md:pr-5">
      <span
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cream/10 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/tool:rotate-6 group-hover/tool:scale-105 md:h-10 md:w-10"
        style={{ color: tool.color }}
      >
        <ToolIcon tool={tool} />
      </span>
      <span className="whitespace-nowrap text-xs font-semibold tracking-[-0.01em] text-cream md:text-sm">
        {tool.name}
      </span>
    </li>
  );
}

function MarqueeRow({ tools, direction = "forward", duration }) {
  return (
    <div
      className="tech-marquee"
      data-direction={direction}
      aria-label={tools.map((tool) => tool.name).join(", ")}
    >
      <div
        className="tech-marquee-track"
        style={{ "--marquee-duration": duration }}
      >
        {["main", "copy-1", "copy-2"].map((groupKey) => (
          <ul
            key={groupKey}
            className="tech-marquee-group"
            aria-hidden={groupKey !== "main" || undefined}
          >
            {tools.map((tool) => (
              <ToolPill key={`${groupKey}-${tool.name}`} tool={tool} />
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

export default function TechStack() {
  return (
    <section
      aria-labelledby="tech-stack-title"
      className="overflow-hidden bg-ink py-28 text-cream md:py-40"
    >
      <div className="mx-auto grid max-w-[1400px] gap-8 px-5 md:grid-cols-[minmax(0,1.4fr)_minmax(18rem,0.6fr)] md:items-end md:px-10">
        <h2
          id="tech-stack-title"
          className="max-w-4xl text-balance leading-[0.92] tracking-[-0.035em] text-[clamp(2.8rem,7vw,6rem)]"
        >
          Tools behind the work
        </h2>
        <p className="max-w-md text-pretty text-sm leading-relaxed text-cream/65 md:justify-self-end md:text-base">
          A practical stack for designing, building, integrating, and shipping
          production products end to end.
        </p>
      </div>

      <div className="mt-16 flex flex-col gap-4 md:mt-24 md:gap-7">
        <MarqueeRow tools={BUILD_TOOLS} duration="42s" />
        <MarqueeRow
          tools={PLATFORM_TOOLS}
          direction="reverse"
          duration="48s"
        />
      </div>
    </section>
  );
}
