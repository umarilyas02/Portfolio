"use client";
import { useEffect, useState } from "react";
import { Github, ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import Loader from "@/app/loader";

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
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

        const response = await fetch(
          "https://api.github.com/users/umarilyas02/repos?sort=updated&direction=desc",
          { signal: controller.signal }
        );
        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error("Failed to fetch repositories");
        }
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {repos
            .filter((repo) => repo.name !== "umarilyas02")
            .slice(0, 6)
            .map((repo) => (
            <a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-indigo-500 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/20 group"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-bold group-hover:text-indigo-400 transition-colors duration-200 flex-1">
                  {repo.name}
                </h3>
                <Github className="w-5 h-5 text-gray-500 group-hover:text-indigo-400 transition-colors duration-200" />
              </div>
              
              <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                {repo.description || "No description provided"}
              </p>

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

              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>⭐ {repo.stargazers_count}</span>
                <span>🍴 {repo.forks_count}</span>
              </div>
            </a>
          ))}
        </div>

        <div className="text-center mt-12">
          <motion.a
            href="https://github.com/umarilyas02"
            target="_blank"
            rel="noopener noreferrer"
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            onMouseEnter={() => setIsButtonHovered(true)}
            onMouseLeave={() => setIsButtonHovered(false)}
            className="group relative inline-flex overflow-hidden rounded-xl bg-gray-900 border border-gray-800 py-4 px-8 font-bold text-white transition-all duration-300 md:border-indigo-500 max-md:border-indigo-500"
          >
            {/* The Gradient Dot Background (Expands) */}
            <motion.span
              variants={{
                initial: isMobile ? { scale: 1, x: "-50%", y: "-50%" } : { scale: 0, x: "-50%", y: "-50%" },
                hover: { scale: 1, x: "-50%", y: "-50%" },
              }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="absolute left-1/2 top-1/2 z-0 h-[350%] w-[110%] origin-center rounded-full bg-linear-to-r from-indigo-600 to-indigo-500"
            />

            {/* Button Content */}
            <span className="relative z-10 flex items-center justify-center gap-2 transition-colors duration-300 group-hover:text-white max-md:text-white">
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
