import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import { SchemaScript } from "@/components/schema";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://umarilyas.dev"),
  title: "Umar Ilyas - Full Stack Developer | React, Next.js & Node.js",
  description: "Full Stack Developer specializing in React.js, Next.js, and modern web technologies. Building responsive and engaging user interfaces. View my projects, tech stack, and get in touch.",
  keywords: "web developer, React developer, Next.js developer, Full Stack developer, JavaScript, TypeScript, Node.js, portfolio",
  authors: [{ name: "Umar Ilyas" }],
  creator: "Umar Ilyas",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://umarilyas.dev",
    siteName: "Umar Ilyas Portfolio",
    title: "Umar Ilyas - Full Stack Developer | React, Next.js & Node.js",
    description: "Full Stack Developer specializing in React.js, Next.js, and modern web technologies.",
    images: [
      {
        url: "https://umarilyas.dev/og-image.png",
        width: 1200,
        height: 630,
        alt: "Umar Ilyas Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@umarilyas02",
    creator: "@umarilyas02",
    title: "Umar Ilyas - Full Stack Developer",
    description: "Full Stack Developer specializing in React.js, Next.js, and modern web technologies.",
    images: ["https://umarilyas.dev/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  canonical: "https://umarilyas.dev",
  alternates: {
    canonical: "https://umarilyas.dev",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
      >
        <Navbar />
        {children}
        <Analytics />
        <SpeedInsights />
        <SchemaScript />
        <svg className="hidden">
          <defs>
            <filter id="liquid">
              <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
              <feColorMatrix 
                in="blur" 
                mode="matrix" 
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" 
                result="liquid" 
              />
              <feComposite in="SourceGraphic" in2="liquid" operator="atop" />
            </filter>
          </defs>
        </svg>
      </body>
    </html>
  );
}