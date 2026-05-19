import type { ServiceCategory } from "./services";

export interface PortfolioProject {
  slug: string;
  title: string;
  client: string;
  category: ServiceCategory;
  tags: string[];
  result: string;
  image: string;
  brief: string;
  solution: string;
  outcome: string;
  featured?: boolean;
}

export const portfolioProjects: PortfolioProject[] = [
  {
    slug: "techstart-youtube-series",
    title: "TechStart YouTube Series",
    client: "TechStart India",
    category: "video",
    tags: ["YouTube Editing", "Color Grading"],
    result: "2.3M total views",
    image:
      "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=800&h=600&fit=crop",
    brief:
      "TechStart needed a consistent, premium look for their weekly tech review series to stand out on YouTube.",
    solution:
      "We created a signature editing style with dynamic cuts, branded lower thirds, and cinematic color grading.",
    outcome:
      "Watch time increased 85% and subscriber growth doubled in 4 months.",
    featured: true,
  },
  {
    slug: "fitlife-reels-campaign",
    title: "FitLife Reels Campaign",
    client: "FitLife Wellness",
    category: "video",
    tags: ["Reels Editing", "Motion Graphics"],
    result: "8% engagement rate",
    image:
      "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=800&h=600&fit=crop",
    brief:
      "Launch a 30-day Instagram Reels campaign to promote their new fitness program.",
    solution:
      "30 high-energy reels with trending audio, text animations, and consistent brand overlays.",
    outcome: "Instagram followers grew by 12,000 in 30 days.",
    featured: true,
  },
  {
    slug: "edupro-documentary",
    title: "EduPro Founder Documentary",
    client: "EduPro Academy",
    category: "video",
    tags: ["Documentary", "Long-form"],
    result: "50K views in first week",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop",
    brief:
      "A 15-minute founder story video for their website and investor deck.",
    solution:
      "Interview filming guidance, narrative structure, and polished long-form edit with subtitles.",
    outcome: "Used in pitch deck that secured ₹50L in seed funding.",
    featured: true,
  },
  {
    slug: "styleco-brand-identity",
    title: "StyleCo Brand Identity",
    client: "StyleCo Fashion",
    category: "design",
    tags: ["Logo", "Brand Identity"],
    result: "Complete rebrand delivered",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop",
    brief: "StyleCo needed a modern, premium brand identity to match their new product line.",
    solution:
      "Logo, colour palette, typography system, and 20 social media templates.",
    outcome: "Brand recognition survey showed 60% improvement post-launch.",
    featured: true,
  },
  {
    slug: "foodhub-social-kit",
    title: "FoodHub Social Kit",
    client: "FoodHub Delivery",
    category: "design",
    tags: ["Social Creatives", "Templates"],
    result: "40% more post saves",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop",
    brief: "Consistent food photography templates for daily Instagram posts.",
    solution: "15 Canva-ready templates with brand colours and layout guidelines.",
    outcome: "Posting consistency went from 3x/week to daily.",
    featured: true,
  },
  {
    slug: "growthlab-linkedin",
    title: "GrowthLab LinkedIn Growth",
    client: "GrowthLab B2B",
    category: "social",
    tags: ["LinkedIn", "Content Strategy"],
    result: "3x profile views",
    image:
      "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&h=600&fit=crop",
    brief: "B2B consultancy needed thought leadership presence on LinkedIn.",
    solution:
      "Monthly content calendar, carousel designs, and engagement strategy.",
    outcome: "Inbound leads increased 3x within 90 days.",
    featured: true,
  },
  {
    slug: "localcafe-instagram",
    title: "LocalCafe Instagram",
    client: "LocalCafe Varanasi",
    category: "social",
    tags: ["Instagram", "Community"],
    result: "5K new followers",
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=600&fit=crop",
    brief: "A local café wanted to build an Instagram presence from zero.",
    solution: "Full account setup, content strategy, and 60 days of managed posting.",
    outcome: "Foot traffic increased noticeably on weekends.",
    featured: true,
  },
  {
    slug: "edupro-website",
    title: "EduPro Academy Website",
    client: "EduPro Academy",
    category: "web",
    tags: ["Next.js", "Landing Page"],
    result: "40% more leads",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    brief: "Replace outdated WordPress site with a fast, modern course landing page.",
    solution:
      "Built with Next.js, course showcase, testimonial section, and Razorpay integration.",
    outcome: "Page load time dropped from 4.2s to 0.8s; leads up 40%.",
    featured: true,
  },
  {
    slug: "craftstudio-portfolio",
    title: "CraftStudio Portfolio",
    client: "CraftStudio",
    category: "web",
    tags: ["Portfolio", "Web Design"],
    result: "Lighthouse 98 score",
    image:
      "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&h=600&fit=crop",
    brief: "A freelance designer needed a stunning portfolio to win premium clients.",
    solution: "Minimal glassmorphism design with project gallery and contact form.",
    outcome: "Client landed 3 new projects within the first month of launch.",
    featured: true,
  },
  {
    slug: "wedding-highlight-reel",
    title: "Wedding Highlight Reel",
    client: "Confidential",
    category: "video",
    tags: ["Wedding", "Cinematic"],
    result: "Viral on Instagram",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop",
    brief: "Cinematic 3-minute highlight reel from 8 hours of wedding footage.",
    solution: "Emotional storytelling edit with licensed music and colour grade.",
    outcome: "Reel reached 500K views organically on Instagram.",
    featured: false,
  },
  {
    slug: "startup-pitch-deck",
    title: "Startup Pitch Deck Design",
    client: "Confidential",
    category: "design",
    tags: ["Pitch Deck", "Presentation"],
    result: "Funding secured",
    image:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop",
    brief: "Seed-stage startup needed investor-ready pitch deck design.",
    solution: "15-slide deck with data visualisations and consistent brand styling.",
    outcome: "Deck used in successful ₹1Cr seed round.",
    featured: false,
  },
  {
    slug: "shopify-store-launch",
    title: "Shopify Store Launch",
    client: "Handmade India",
    category: "web",
    tags: ["E-commerce", "Shopify"],
    result: "₹2L revenue month 1",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
    brief: "Launch an e-commerce store for handmade products with payment integration.",
    solution: "Custom Shopify theme, product photography guidance, and launch strategy.",
    outcome: "₹2 lakh in sales during the first month after launch.",
    featured: false,
  },
];

export function getProjectBySlug(slug: string): PortfolioProject | undefined {
  return portfolioProjects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): PortfolioProject[] {
  return portfolioProjects.filter((p) => p.featured);
}

export function getProjectsByCategory(
  category: ServiceCategory | "all"
): PortfolioProject[] {
  if (category === "all") return portfolioProjects;
  return portfolioProjects.filter((p) => p.category === category);
}

export function getRelatedProjects(
  slug: string,
  limit = 3
): PortfolioProject[] {
  const current = getProjectBySlug(slug);
  if (!current) return [];
  return portfolioProjects
    .filter((p) => p.slug !== slug && p.category === current.category)
    .slice(0, limit);
}

export const portfolioSlugs = portfolioProjects.map((p) => p.slug);
