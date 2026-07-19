import { SITE_URL } from "@/lib/site";
import { liveProjects } from "@/data/projects";

export default function sitemap() {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/works`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.6,
    },
    ...liveProjects.map((project) => ({
      url: `${SITE_URL}/works/${project.slug}`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    })),
  ];
}
