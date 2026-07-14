import Footer from "@/components/footer";
import AboutContent from "./about-content";

export const metadata = {
  title: "About • Umar Ilyas",
  description:
    "Umar Ilyas — full-stack web developer building custom digital products with Next.js.",
};

export default function AboutPage() {
  return (
    <main>
      <AboutContent />
      <Footer />
    </main>
  );
}
