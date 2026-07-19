export const liveProjects = [
  {
    slug: "x4shipping",
    title: "X4 Shipping",
    tagline: "Global freight, coordinated in motion.",
    description:
      "A cinematic logistics website for X4 Shipping & Logistics LLC, presenting its freight services, operating process, industries, global routes, and quote journey.",
    liveUrl: "https://x4shpiing.vercel.app",
    category: "Shipping & Logistics",
    techStack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "Motion", "Lenis"],
    cover: "/projects/x4shipping/homepage.webp",
    coverFit: "contain",
    gallery: [
      { src: "/projects/x4shipping/homepage.webp", caption: "Homepage" },
      { src: "/projects/x4shipping/services.webp", caption: "Services" },
    ],
  },
  {
    slug: "arc-erp",
    title: "ARC ERP",
    tagline: "A unified operating system for garment manufacturing.",
    description:
      "A private, role-aware ERP for Allah Rakha & Co. that brings payroll, sales orders, retail shops, production, inventory, finance, reporting, and administration into one system.",
    liveUrl: null,
    category: "Garment Manufacturing ERP",
    techStack: ["Next.js 16", "React 19", "PostgreSQL", "Recharts", "Radix UI", "Tailwind CSS"],
    cover: "/projects/ARC-ERP/dashboard.webp",
    coverPosition: "left top",
    gallery: [
      { src: "/projects/ARC-ERP/dashboard.webp", caption: "Configurable Dashboard" },
      { src: "/projects/ARC-ERP/finance.webp", caption: "Finance & Accounting" },
      { src: "/projects/ARC-ERP/retail.webp", caption: "Retail Operations" },
      { src: "/projects/ARC-ERP/admin-setup.webp", caption: "Administration & Setup" },
    ],
  },
  {
    slug: "gmr-erp",
    title: "GMR ERP",
    tagline: "Transport operations, billing, and fleet control in one workspace.",
    description:
      "A role-aware transport ERP for GMR Transport covering trips, vehicles, clients, drivers, invoices, quotations, payments, payroll, reports, and permissions.",
    liveUrl: null,
    category: "Transport & Logistics ERP",
    techStack: ["Next.js 16", "React 19", "Prisma ORM", "PostgreSQL", "Auth.js", "TanStack Query", "Zod", "Tailwind CSS"],
    cover: "/projects/erp-trips/dashboard.webp",
    gallery: [
      { src: "/projects/erp-trips/dashboard.webp", caption: "Dashboard" },
      { src: "/projects/erp-trips/sign-in.webp", caption: "Sign In" },
      { src: "/projects/erp-trips/vehicles.webp", caption: "Vehicles" },
      { src: "/projects/erp-trips/quotation.webp", caption: "Quotation" },
      { src: "/projects/erp-trips/custom-letterhead.webp", caption: "Custom Letterhead" },
      { src: "/projects/erp-trips/role-based-access.webp", caption: "Role-Based Access" },
      { src: "/projects/erp-trips/settings.webp", caption: "Settings" },
    ],
  },
  {
    slug: "snpridesports",
    title: "SN Pride Sports",
    tagline: "Premium sports equipment manufacturer and exporter.",
    description:
      "Public storefront for SN Pride Sports with product browsing, category pages, SEO content, quote requests, blogs, and trust-building brand content.",
    liveUrl: "https://snpridesports.com",
    category: "Sports E-commerce / Manufacturing",
    techStack: ["Next.js", "React", "Tailwind CSS", "Framer Motion", "MUI", "Emotion", "Lucide React"],
    cover: "/projects/snpridesports/homepage.webp",
    gallery: [
      { src: "/projects/snpridesports/homepage.webp", caption: "Homepage" },
      { src: "/projects/snpridesports/product-detail.webp", caption: "Product Detail Page" },
      { src: "/projects/snpridesports/quote.webp", caption: "Quote Page" },
    ],
  },
  {
    slug: "fitgrips",
    title: "FitGrips",
    tagline: "Premium fitness gear for powerlifters.",
    description:
      "E-commerce storefront for lifting gear, grips, belts, wraps, and custom branding. The home page is built around product highlights, FAQs, reviews, and conversion-focused CTAs.",
    liveUrl: "https://fitgrips.com",
    category: "Fitness E-commerce",
    techStack: ["Next.js", "React", "Tailwind CSS", "Redux Toolkit", "React Hook Form", "Zod", "Axios", "Nodemailer", "Keen Slider"],
    cover: "/projects/fitgrips/homepage.webp",
    gallery: [
      { src: "/projects/fitgrips/homepage.webp", caption: "Homepage" },
      { src: "/projects/fitgrips/product-detail.webp", caption: "Product Detail Page" },
      { src: "/projects/fitgrips/checkout.webp", caption: "Checkout" },
      { src: "/projects/fitgrips/account.webp", caption: "Account Page" },
    ],
  },
  {
    slug: "arc",
    title: "ARC",
    tagline: "Precision tailoring for global institutions.",
    description:
      "Uniform and garment brand site focused on institutional apparel, export inquiries, product discovery, and trust-building brand storytelling.",
    liveUrl: "https://allahrakhaandco.com",
    category: "Uniform Manufacturing",
    techStack: ["Next.js", "React", "Tailwind CSS", "Framer Motion", "Lucide React", "Nodemailer"],
    cover: "/projects/arc/homepage.webp",
    gallery: [
      { src: "/projects/arc/homepage.webp", caption: "Homepage" },
      { src: "/projects/arc/inquiry.webp", caption: "Inquiry" },
      { src: "/projects/arc/product-catalog.webp", caption: "Product Catalog" },
      { src: "/projects/arc/product-detail.webp", caption: "Product Detail Page" },
    ],
  },
  {
    slug: "project-management",
    title: "PM Chatbot",
    tagline: "AI-powered project management workspace.",
    description:
      "Full-stack SaaS for Kanban planning, multi-user workspaces, real-time collaboration, notifications, and a Gemini-based PM assistant.",
    liveUrl: "https://pm-chatbot-rho.vercel.app/",
    category: "Productivity SaaS",
    techStack: ["Next.js", "PostgreSQL", "Supabase", "@dnd-kit", "JWT (jose)", "Zod", "Sonner", "Nodemailer", "Google Gemini", "Claude Code"],
    cover: "/projects/project-management/dashboard.webp",
    gallery: [
      { src: "/projects/project-management/dashboard.webp", caption: "Dashboard" },
      { src: "/projects/project-management/login.webp", caption: "Login" },
      { src: "/projects/project-management/chatbot.webp", caption: "Chatbot" },
      { src: "/projects/project-management/management-tab.webp", caption: "Management Tab" },
      { src: "/projects/project-management/settings.webp", caption: "Settings" },
    ],
  },
  {
    slug: "snpridesports-dashboard",
    title: "SN Pride Dashboard",
    tagline: "Content, SEO, and media health at a glance.",
    description:
      "Admin and SEO dashboard for products, categories, blogs, media, exports, and site health. It includes content management, SEO gap analysis, and reporting tools.",
    liveUrl: null,
    category: "SEO / Admin Dashboard",
    techStack: ["Next.js", "React", "Tailwind CSS", "Drizzle ORM", "PostgreSQL", "OpenAI", "UploadThing", "Jodit", "Quill", "Lucide React"],
    cover: "/projects/snpridesports-dashboard/dashboard.webp",
    gallery: [
      { src: "/projects/snpridesports-dashboard/dashboard.webp", caption: "Dashboard" },
      { src: "/projects/snpridesports-dashboard/cms-products.webp", caption: "CMS Products" },
      { src: "/projects/snpridesports-dashboard/seo-audit.webp", caption: "SEO Audit" },
    ],
  },
  {
    slug: "gt",
    title: "GT Surgical",
    tagline: "Quality dashboard for production analytics.",
    description:
      "Next.js web app that surfaces live production quality, approval rates, inspection history, and role-aware access. The login screen is built around password and OTP flows.",
    liveUrl: "https://gt-surgical-app.vercel.app",
    category: "Inspection Dashboard / API",
    techStack: ["Next.js", "React", "MongoDB", "Mongoose", "JWT", "Nodemailer", "PDFKit", "Recharts", "Tailwind CSS"],
    cover: "/projects/gt/dashboard.webp",
    gallery: [
      { src: "/projects/gt/dashboard.webp", caption: "Dashboard" },
      { src: "/projects/gt/login.webp", caption: "Login" },
      { src: "/projects/gt/history.webp", caption: "History" },
    ],
    appComingSoon: true,
  },
  {
    slug: "nac",
    title: "NAC Home Service",
    tagline: "Dubai-focused home services marketplace.",
    description:
      "Customer-facing home services app for browsing services, booking one-time and subscription jobs, OTP login, coupons, and payments. It is tightly integrated with the NAC backend API.",
    liveUrl: "https://www.nachomeservice.com",
    category: "Home Services E-commerce",
    techStack: ["Next.js 16", "React 19", "Redux Toolkit", "Stripe", "Google Maps", "Vercel Analytics", "Vercel Speed Insights", "React Toastify", "UploadThing"],
    cover: "/projects/nac/homepage.webp",
    gallery: [
      { src: "/projects/nac/homepage.webp", caption: "Homepage" },
      { src: "/projects/nac/dashboard.webp", caption: "Dashboard" },
      { src: "/projects/nac/packages.webp", caption: "Packages Page" },
      { src: "/projects/nac/product-details.webp", caption: "Product Details Page" },
    ],
  },
  {
    slug: "aq-surgical",
    title: "AQ Surgical",
    tagline: "Clinical reliability guaranteed.",
    description:
      "Surgical instrument storefront for browsing products, categories, and quote requests. The frontend pulls live catalog data from the AQ Surgical dashboard.",
    liveUrl: "https://aqsurgical.com",
    category: "Medical E-commerce",
    techStack: ["Next.js", "React", "Tailwind CSS", "Supabase", "PostgreSQL", "React Toastify", "Nodemailer", "Lucide React"],
    cover: "/projects/aq-surgical/homepage.webp",
    gallery: [
      { src: "/projects/aq-surgical/homepage.webp", caption: "Homepage" },
      { src: "/projects/aq-surgical/product-detail.webp", caption: "Product Detail Page" },
      { src: "/projects/aq-surgical/quote.webp", caption: "Quote Page" },
    ],
  },
  {
    slug: "smart-admission-guide",
    title: "Smart Admission Guide",
    tagline: "Your smart guide to university admissions.",
    description:
      "AI-assisted admissions platform for Pakistani intermediate students. It helps users find universities, check chances, generate application documents, and track deadlines.",
    liveUrl: "https://smart-admission-guide.vercel.app",
    category: "Education / Admissions",
    techStack: ["Next.js 16", "Tailwind CSS v4", "PostgreSQL (Neon)", "Claude API", "PDFKit", "Cloudflare Workers", "Python", "Nodemailer"],
    cover: "/projects/smart-admission-guide/homepage.webp",
    gallery: [
      { src: "/projects/smart-admission-guide/homepage.webp", caption: "Homepage" },
      { src: "/projects/smart-admission-guide/universities.webp", caption: "Universities" },
      { src: "/projects/smart-admission-guide/profile.webp", caption: "Profile" },
      { src: "/projects/smart-admission-guide/application-pack.webp", caption: "Application Pack" },
      { src: "/projects/smart-admission-guide/admin.webp", caption: "Admin" },
    ],
  },
];

export function getProjectBySlug(slug) {
  return liveProjects.find((project) => project.slug === slug);
}
