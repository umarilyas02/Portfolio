import Hero from "@/components/hero";
import Manifesto from "@/components/manifesto";
import RecentWorks from "@/components/works";
import TechStack from "@/components/tech-stack";
import Experience from "@/components/experience";
import Footer from "@/components/footer";
import { getGitHubActivity } from "@/lib/github";

export default async function Home() {
  const githubActivity = await getGitHubActivity();

  return (
    <main>
      <Hero />
      {/* slides over the pinned hero */}
      <div className="relative z-10">
        <div className="bg-cream">
          <Manifesto />
          <RecentWorks />
          <TechStack />
          <Experience githubActivity={githubActivity} />
        </div>
        <Footer />
      </div>
    </main>
  );
}
