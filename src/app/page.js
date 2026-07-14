import Hero from "@/components/hero";
import Manifesto from "@/components/manifesto";
import RecentWorks from "@/components/works";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <Manifesto />
      <RecentWorks />
      <Footer />
    </main>
  );
}
