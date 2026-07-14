import Footer from "@/components/footer";
import WorksIndex from "./works-index";

export const metadata = {
  title: "Works • Umar Ilyas",
  description: "Selected full-stack projects by Umar Ilyas.",
};

export default function WorksPage() {
  return (
    <main>
      <WorksIndex />
      <Footer />
    </main>
  );
}
