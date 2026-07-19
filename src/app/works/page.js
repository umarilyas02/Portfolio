import Footer from "@/components/footer";
import WorksIndex from "./works-index";

export const metadata = {
  title: "Works",
  description:
    "Selected full-stack projects by Umar Ilyas — e-commerce storefronts, admin dashboards, ERPs, and SaaS products built end to end with Next.js, React, and PostgreSQL.",
  alternates: { canonical: "/works" },
  openGraph: {
    title: "Works • Umar Ilyas",
    description:
      "E-commerce storefronts, dashboards, ERPs, and SaaS products — built and shipped end to end.",
    url: "/works",
  },
};

export default function WorksPage() {
  return (
    <main>
      <WorksIndex />
      <Footer />
    </main>
  );
}
