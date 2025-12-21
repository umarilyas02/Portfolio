"use client";
import { HeroParallax } from "@/components/ui/hero-parallax";
import PortfolioSection from "@/components/portfolio-section";
import TechSection from "@/components/tech-section";
import ContactForm from "@/components/contact-form";
import { products } from "@/components/hero-parallax-demo";

export default function Home() {
  return (
    <main className="bg-black">
      {/* Hero Section with Parallax */}
      <section id="hero">
        <HeroParallax products={products} />
      </section>

      {/* Portfolio Section */}
      <PortfolioSection />

      {/* Tech I Love Section */}
      <TechSection />

      {/* Contact Section */}
      <ContactForm />

      {/* Footer */}
      <footer className="bg-gray-950 border-t border-gray-800 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          <p>&copy; 2024 My Portfolio. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}