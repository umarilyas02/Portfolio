import localFont from "next/font/local";
import "./globals.css";
import SmoothScroll from "@/components/smooth-scroll";
import Nav from "@/components/nav";
import { SITE_URL, SITE_NAME, SITE_TITLE, SITE_DESCRIPTION } from "@/lib/site";

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
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s • Umar Ilyas",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Umar Ilyas",
    "full-stack developer",
    "Next.js developer",
    "React developer",
    "web developer Pakistan",
    "freelance developer",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  // lets the cream/ink surfaces extend under the notch; safe-area insets
  // are handled per-component with env(safe-area-inset-*)
  viewportFit: "cover",
  themeColor: "#e9e8e8",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: SITE_NAME,
      url: SITE_URL,
      image: `${SITE_URL}/me.webp`,
      jobTitle: "Full-Stack Developer",
      description: SITE_DESCRIPTION,
      email: "mailto:umarilyas389@gmail.com",
      nationality: "Pakistan",
      sameAs: [
        "https://github.com/umarilyas02",
        "https://www.linkedin.com/in/umarilyas02",
      ],
      knowsAbout: [
        "Next.js",
        "React",
        "TypeScript",
        "PostgreSQL",
        "Tailwind CSS",
        "Node.js",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Umar Ilyas — Portfolio",
      publisher: { "@id": `${SITE_URL}/#person` },
      inLanguage: "en",
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${mori.variable} antialiased`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SmoothScroll>
          <Nav />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
