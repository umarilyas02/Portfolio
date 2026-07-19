import { notFound } from "next/navigation";
import Footer from "@/components/footer";
import { liveProjects, getProjectBySlug } from "@/data/projects";
import ProjectDetail from "./project-detail";

export function generateStaticParams() {
  return liveProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: `/works/${slug}` },
    openGraph: {
      title: `${project.title} • Umar Ilyas`,
      description: project.tagline,
      url: `/works/${slug}`,
      images: [{ url: project.cover, alt: `${project.title} interface` }],
    },
  };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const index = liveProjects.findIndex((p) => p.slug === slug);
  const wrap = (i) => liveProjects[(i + liveProjects.length) % liveProjects.length];
  const prev = wrap(index - 1);
  const next = wrap(index + 1);

  return (
    <main>
      <ProjectDetail
        project={project}
        prev={{ slug: prev.slug, title: prev.title }}
        next={{ slug: next.slug, title: next.title }}
      />
      <Footer />
    </main>
  );
}
