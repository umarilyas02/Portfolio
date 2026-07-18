import Hero from "@/components/hero";
import Manifesto from "@/components/manifesto";
import RecentWorks from "@/components/works";
import Experience from "@/components/experience";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <main>
      <Hero />
      {/* slides over the pinned hero */}
      <div className="relative z-10">
        <div className="bg-cream">
          <Manifesto />
          <RecentWorks />
          <Experience />
        </div>
        <Footer />
      </div>
    </main>
  );
}
