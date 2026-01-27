import dynamic from 'next/dynamic';
import { products } from "@/components/hero-parallax-demo";

// Dynamic imports with loading states to reduce initial bundle size
const HeroParallax = dynamic(
  () => import('@/components/ui/hero-parallax').then(mod => ({ default: mod.HeroParallax })),
  { 
    loading: () => (
      <div className="h-screen flex items-center justify-center bg-black">
        <div className="animate-pulse text-white text-2xl">Loading...</div>
      </div>
    )
  }
);

const PortfolioSection = dynamic(() => import('@/components/portfolio-section'), {
  loading: () => <div className="h-96 bg-black" />
});

const TechSection = dynamic(() => import('@/components/tech-section'), {
  loading: () => <div className="h-96 bg-black" />
});

const ContactForm = dynamic(() => import('@/components/contact-form'), {
  loading: () => <div className="h-96 bg-black" />
});

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
          <p>&copy; 2026 UMAR ILYAS - Portfolio. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}