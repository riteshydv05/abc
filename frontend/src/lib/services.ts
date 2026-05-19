export type ServiceCategory = "video" | "design" | "social" | "web";

export interface PricingTier {
  name: string;
  price: string;
  popular?: boolean;
  features: string[];
}

export interface Service {
  slug: string;
  name: string;
  shortDescription: string;
  tagline: string;
  category: ServiceCategory;
  icon: string;
  heroImage: string;
  deliverables: string[];
  whoItsFor: string[];
  processSteps: { title: string; description: string }[];
  faq: { q: string; a: string }[];
  pricingTiers: PricingTier[];
}

export const services: Service[] = [
  {
    slug: "video-editing",
    name: "Video Editing",
    shortDescription:
      "Cinematic edits for YouTube, Reels, ads, and long-form content that keeps viewers watching.",
    tagline: "Stories that move people — frame by frame.",
    category: "video",
    icon: "film",
    heroImage:
      "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1200&h=600&fit=crop",
    deliverables: [
      "YouTube / Reels / Shorts editing",
      "Color grading & color correction",
      "Motion graphics & text animations",
      "Transitions & sound design",
      "Long-form documentary editing",
      "Testimonial & ad video cuts",
    ],
    whoItsFor: [
      "YouTubers & content creators",
      "Startups & D2C brands",
      "Coaches & educators",
      "Event & wedding filmmakers",
    ],
    processSteps: [
      { title: "Footage Review", description: "We review all raw clips and note key moments." },
      { title: "Rough Cut", description: "First assembly with pacing and story structure." },
      { title: "Fine Cut & Grade", description: "Polished edit with color grading and graphics." },
      { title: "Final Delivery", description: "Export in your required formats and resolutions." },
    ],
    faq: [
      {
        q: "What formats do you deliver?",
        a: "MP4, MOV, or any format you need — optimised for YouTube, Instagram, or broadcast.",
      },
      {
        q: "How long does a typical edit take?",
        a: "A 10-minute YouTube video takes 3–5 business days. Rush delivery available.",
      },
      {
        q: "Do you provide raw project files?",
        a: "Yes, on Premium tier. Basic and Standard tiers deliver final exports only.",
      },
      {
        q: "Can you match my brand style?",
        a: "Absolutely. Share your brand guide or reference videos and we'll match the look.",
      },
    ],
    pricingTiers: [
      {
        name: "Basic",
        price: "₹5,000 – ₹10,000",
        features: ["Up to 5 min video", "Basic cuts & transitions", "1 revision round", "MP4 delivery"],
      },
      {
        name: "Standard",
        price: "₹10,000 – ₹25,000",
        popular: true,
        features: [
          "Up to 15 min video",
          "Color grading",
          "Motion graphics",
          "2 revision rounds",
          "Multiple format exports",
        ],
      },
      {
        name: "Premium",
        price: "₹25,000+",
        features: [
          "Unlimited length",
          "Advanced color grade",
          "Custom motion graphics",
          "Sound design",
          "Project files included",
          "Priority delivery",
        ],
      },
    ],
  },
  {
    slug: "graphic-design",
    name: "Graphic Design",
    shortDescription:
      "Logos, social creatives, pitch decks, and brand assets that make you unforgettable.",
    tagline: "Design that speaks before you do.",
    category: "design",
    icon: "palette",
    heroImage:
      "https://images.unsplash.com/photo-1626785774573-4b799314346d?w=1200&h=600&fit=crop",
    deliverables: [
      "Logo & brand identity",
      "Social media creatives (posts, stories, reels covers)",
      "Flyers, brochures & posters",
      "Pitch decks & presentations",
      "Packaging design",
      "UI mockups",
    ],
    whoItsFor: [
      "New brands launching identity",
      "Businesses needing social templates",
      "Startups pitching to investors",
      "E-commerce product brands",
    ],
    processSteps: [
      { title: "Discovery", description: "Brand questionnaire and competitor research." },
      { title: "Concepts", description: "2–3 initial directions for your review." },
      { title: "Refinement", description: "Polish chosen direction with your feedback." },
      { title: "Delivery", description: "All files in print and digital formats." },
    ],
    faq: [
      {
        q: "What file formats do I receive?",
        a: "AI, PSD, PDF, PNG, and SVG depending on the project type.",
      },
      {
        q: "How many concepts do you provide?",
        a: "Standard includes 2 concepts; Premium includes 3+ with more revision rounds.",
      },
      {
        q: "Do you create brand guidelines?",
        a: "Yes, included in Standard and Premium logo packages.",
      },
    ],
    pricingTiers: [
      {
        name: "Basic",
        price: "₹3,000 – ₹8,000",
        features: ["Single social post design", "2 concepts", "1 revision", "PNG/JPG delivery"],
      },
      {
        name: "Standard",
        price: "₹8,000 – ₹20,000",
        popular: true,
        features: [
          "Logo design",
          "Brand colour palette",
          "Social media kit (5 templates)",
          "2 revision rounds",
        ],
      },
      {
        name: "Premium",
        price: "₹20,000+",
        features: [
          "Full brand identity",
          "Brand guidelines PDF",
          "15+ social templates",
          "Print-ready files",
          "Unlimited revisions (30 days)",
        ],
      },
    ],
  },
  {
    slug: "social-media-management",
    name: "Social Media Management",
    shortDescription:
      "Strategy, content, scheduling, and community management that grows your audience.",
    tagline: "Your brand, everywhere it matters.",
    category: "social",
    icon: "share2",
    heroImage:
      "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=1200&h=600&fit=crop",
    deliverables: [
      "Content calendar planning",
      "Caption writing & hashtag strategy",
      "Post scheduling & publishing",
      "Community management (DMs, comments)",
      "Monthly performance reports",
      "Platform-specific strategies (Instagram, LinkedIn, YouTube)",
    ],
    whoItsFor: [
      "Small businesses without in-house marketing",
      "Personal brands & influencers",
      "Local shops going digital",
      "B2B companies on LinkedIn",
    ],
    processSteps: [
      { title: "Audit", description: "Review current profiles, content, and competitors." },
      { title: "Strategy", description: "Monthly content plan aligned to your goals." },
      { title: "Create & Schedule", description: "Design, write, and publish on your behalf." },
      { title: "Report", description: "Monthly analytics with actionable insights." },
    ],
    faq: [
      {
        q: "Which platforms do you manage?",
        a: "Instagram, LinkedIn, YouTube, Facebook, and Twitter/X.",
      },
      {
        q: "Do you create the visual content too?",
        a: "Yes — design is included. Video content can be added as a bundle.",
      },
      {
        q: "How often will you post?",
        a: "Depends on your tier: Basic is 8 posts/month, Standard 16, Premium 30+.",
      },
    ],
    pricingTiers: [
      {
        name: "Basic",
        price: "₹8,000 – ₹15,000/mo",
        features: ["8 posts/month", "Caption writing", "Basic scheduling", "Monthly report"],
      },
      {
        name: "Standard",
        price: "₹15,000 – ₹30,000/mo",
        popular: true,
        features: [
          "16 posts/month",
          "Stories & reels covers",
          "Hashtag strategy",
          "Comment management",
          "Bi-weekly reports",
        ],
      },
      {
        name: "Premium",
        price: "₹30,000+/mo",
        features: [
          "30+ posts/month",
          "Full community management",
          "DM responses",
          "Competitor analysis",
          "Weekly strategy calls",
        ],
      },
    ],
  },
  {
    slug: "web-development",
    name: "Web Development",
    shortDescription:
      "Fast, beautiful websites and landing pages built with modern tech that converts visitors.",
    tagline: "Websites that work as hard as you do.",
    category: "web",
    icon: "code2",
    heroImage:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop",
    deliverables: [
      "Landing pages & corporate websites",
      "E-commerce stores (Shopify, WooCommerce)",
      "Portfolio & blog websites",
      "WordPress development",
      "Basic SEO setup",
      "Website maintenance",
    ],
    whoItsFor: [
      "Startups needing a launch site",
      "Agencies & freelancers (portfolios)",
      "Local businesses going online",
      "E-commerce brands",
    ],
    processSteps: [
      { title: "Wireframe", description: "Low-fidelity layout approved before design." },
      { title: "Design", description: "High-fidelity UI matching your brand." },
      { title: "Development", description: "Built with Next.js or WordPress as needed." },
      { title: "Launch", description: "Deployed, SEO configured, and handed over." },
    ],
    faq: [
      {
        q: "Do you build on WordPress or custom code?",
        a: "Both. We recommend Next.js for performance; WordPress when you need easy CMS editing.",
      },
      {
        q: "Is hosting included?",
        a: "We set up Vercel or your preferred host. Hosting costs are separate.",
      },
      {
        q: "Do you provide ongoing maintenance?",
        a: "Yes — monthly maintenance plans available from ₹3,000/month.",
      },
    ],
    pricingTiers: [
      {
        name: "Basic",
        price: "₹15,000 – ₹30,000",
        features: [
          "Single landing page",
          "Mobile responsive",
          "Contact form",
          "Basic SEO",
          "1 revision round",
        ],
      },
      {
        name: "Standard",
        price: "₹30,000 – ₹75,000",
        popular: true,
        features: [
          "Multi-page website (up to 5 pages)",
          "CMS integration",
          "Google Analytics setup",
          "2 revision rounds",
          "30-day support",
        ],
      },
      {
        name: "Premium",
        price: "₹75,000+",
        features: [
          "Full custom website",
          "E-commerce functionality",
          "Advanced SEO",
          "Performance optimisation",
          "3-month maintenance included",
        ],
      },
    ],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export const serviceSlugs = services.map((s) => s.slug);

export const categoryLabels: Record<ServiceCategory | "all", string> = {
  all: "All",
  video: "Video",
  design: "Design",
  social: "Social",
  web: "Web",
};
