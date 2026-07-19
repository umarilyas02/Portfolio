import Footer from "@/components/footer";
import AboutContent from "./about-content";

export const metadata = {
  title: "About",
  description:
    "Umar Ilyas is a full-stack web developer based in Pakistan, working worldwide. Every project is custom-made — clean, fast, production-grade apps built with Next.js, React, and PostgreSQL.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About • Umar Ilyas",
    description:
      "Full-stack web developer building storefronts, dashboards, ERPs, and SaaS products end to end.",
    url: "/about",
  },
};

export default function AboutPage() {
  return (
    <main>
      <AboutContent />
      <Footer />
    </main>
  );
}
