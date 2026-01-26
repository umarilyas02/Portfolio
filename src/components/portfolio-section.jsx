"use client";
import { useEffect, useState } from "react";
import { Github, ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import Loader from "@/app/loader";
import { products } from "@/components/hero-parallax-demo";
import Image from "next/image";

const getProjectImage = (repoName) => {
  const imageMap = {
    "fitgrips": products.find(p => p.title === "FitGrips")?.thumbnail,
    "nexus": products.find(p => p.title === "Nexus")?.thumbnail,
    "ecommerce-frontend-design": products.find(p => p.title === "BRAND")?.thumbnail,
    "ecom-design": products.find(p => p.title === "BRAND")?.thumbnail,
    "brand": products.find(p => p.title === "BRAND")?.thumbnail,
  };
  
  return imageMap[repoName.toLowerCase()] || null;
};

const getProjectStack = (repoName) => {
  const key = repoName.toLowerCase();
  if (key.includes("fitgrips")) return ["Next.js", "RTK", "MySQL", "Zod"];
  if (key === "ecommerce-frontend-design" || key === "ecom-design" || key.includes("brand"))
    return ["React", "Context API"];
  if (key.includes("nexus")) return ["React", "WebRTC", "Firebase"];
  return [];
};

export default function PortfolioSection() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);

        const response = await fetch(
          "https://api.github.com/users/umarilyas02/repos?sort=updated&direction=desc",
          { signal: controller.signal }
        );
        clearTimeout(timeoutId);

        if (!response.ok) throw new Error("Failed to fetch repositories");
        const data = await response.json();
        setRepos(data);
      } catch (err) {
        console.error("Error fetching repos:", err);
        setError(err.message || "Failed to load repositories");
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <section id="projects" className="mt-4 pt-8 pb-16 md:pt-14 md:pb-24 px-4 sm:px-6 lg:px-8 bg-gray-950">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Projects</h2>
            <p className="text-red-400 text-lg">Error loading repositories: {error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="portfolio" className="pt-8 pb-16 md:pt-12 md:pb-24 px-4 sm:px-6 lg:px-8 bg-gray-950">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Projects</h2>
          <p className="text-gray-400 text-lg">
            Check out my projects on GitHub
          </p>
        </div>

        <div className="flex overflow-x-auto space-x-4 md:space-x-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6 md:[grid-auto-rows:minmax(0,1fr)] snap-x snap-mandatory hide-scrollbar items-stretch">
          {repos
            .filter((repo) => repo.name !== "umarilyas02")
            .filter((repo) => !repo.name.toLowerCase().includes("mini"))
            .slice(0, 6)
            .map((repo) => {
              const projectImage = getProjectImage(repo.name);
              const stack = getProjectStack(repo.name);
              const displayName = repo.name === "ecommerce-frontend-design" ? "Ecom Design" : repo.name;
              return (
                <a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-w-[72%] md:min-w-0 bg-gray-900 border border-indigo-200 rounded-lg hover:border-indigo-500 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/20 group flex flex-col h-full snap-start"
                >
                  {projectImage && (
                    <div className="relative w-full h-48 overflow-hidden bg-gray-800">
                      <Image
                        src={projectImage}
                        alt={repo.name}
                        fill
                        sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
                        quality={90}
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        priority={false}
                      />
                    </div>
                  )}

                  <div className="p-6 flex flex-col grow">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-bold group-hover:text-indigo-400 transition-colors duration-200 flex-1">
                        {displayName}
                      </h3>
                      <Github className="w-5 h-5 text-gray-500 group-hover:text-indigo-400 transition-colors duration-200 shrink-0 ml-2" />
                    </div>
                    
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2 grow">
                      {repo.description || "No description provided"}
                    </p>

                    {stack.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {stack.map((label) => (
                          <span key={label} className="text-xs bg-indigo-900 text-indigo-200 px-3 py-1 rounded-full">
                            {label}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2 mb-4">
                      {repo.language && (
                        <span className="text-xs bg-indigo-900 text-indigo-200 px-3 py-1 rounded-full">
                          {repo.language}
                        </span>
                      )}
                      {repo.topics && repo.topics.slice(0, 2).map((topic) => (
                        <span
                          key={topic}
                          className="text-xs bg-gray-800 text-gray-300 px-3 py-1 rounded-full"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-500 mt-auto">
                      <span>⭐ {repo.stargazers_count}</span>
                      <span>🍴 {repo.forks_count}</span>
                    </div>
                  </div>
                </a>
              );
            })}
        </div>

        <div className="text-center mt-12 flex justify-center">
          <motion.a
            href="https://github.com/umarilyas02"
            target="_blank"
            rel="noopener noreferrer"
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            onMouseEnter={() => setIsButtonHovered(true)}
            onMouseLeave={() => setIsButtonHovered(false)}
            className="group relative inline-flex overflow-hidden rounded-xl bg-transparent border border-white/20 py-4 px-8 font-bold text-white transition-all duration-300 md:bg-transparent md:border-white/20 max-md:bg-linear-to-r max-md:from-indigo-600 max-md:to-indigo-500 max-md:border-indigo-500"
          >
            <motion.span
              variants={{
                initial: isMobile ? { scale: 1, x: "-50%", y: "-50%" } : { scale: 0, x: "-50%", y: "-50%" },
                hover: { scale: 1, x: "-50%", y: "-50%" },
              }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="absolute left-1/2 top-1/2 z-0 h-[350%] w-[110%] origin-center rounded-full bg-linear-to-r from-indigo-600 to-indigo-500 md:block max-md:hidden"
            />

            <span className="relative z-10 flex items-center justify-center gap-2 transition-colors duration-300 group-hover:text-white">
              View More on GitHub
              <motion.div
                animate={isMobile || isButtonHovered ? { opacity: 1, x: 5 } : { opacity: 0, x: -10 }}
                transition={{ type: "spring", stiffness: 100, damping: 15 }}
                className="flex items-center"
              >
                <ArrowUpRight className="h-5 w-5" />
              </motion.div>
            </span>
          </motion.a>
        </div>
      </div>
    </section>
  );
}
