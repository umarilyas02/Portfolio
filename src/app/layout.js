import localFont from "next/font/local";
import "./globals.css";
import SmoothScroll from "@/components/smooth-scroll";
import Nav from "@/components/nav";

const mori = localFont({
  src: [
    { path: "../fonts/PPMori-Extralight.otf", weight: "200", style: "normal" },
    { path: "../fonts/PPMori-Regular.otf", weight: "400", style: "normal" },
    { path: "../fonts/PPMori-SemiBold.otf", weight: "600", style: "normal" },
  ],
  variable: "--font-mori",
  display: "swap",
});

export const metadata = {
  title: "Umar Ilyas • Full-Stack Developer",
  description:
    "Full-stack developer building custom, production-grade web and mobile products — engineered end to end with code.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${mori.variable} antialiased`}>
      <body>
        <SmoothScroll>
          <Nav />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
