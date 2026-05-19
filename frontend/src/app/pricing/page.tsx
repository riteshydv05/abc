import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { createMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/ui/PageHeader";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { FadeInUp } from "@/components/motion/FadeInUp";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Pricing1 } from "@/components/ui/pricing-1";
import type { PricingPlan } from "@/components/ui/pricing-1";

export const metadata = createMetadata({
  title: "Pricing",
  description:
    "Transparent pricing for video editing, design, social media, and web development. Packages from ₹3,000.",
  path: "/pricing",
});

const visualisePlans: PricingPlan[] = [
  {
    title: "Starter",
    popular: false,
    description:
      "Ideal for individuals or small brands who need a professional creative presence without the overhead.",
    price: "₹9,999",
    period: "/ month",
    features: [
      "2 short-form video edits",
      "8 social media graphics",
      "Basic caption copywriting",
      "1 revision round per deliverable",
      "48-hour turnaround",
      "Cancel anytime",
    ],
    ctaLabel: "Book a call",
    ctaHref: "/contact",
  },
  {
    title: "Growth",
    popular: true,
    description:
      "Our most popular plan — perfect for growing brands that need consistent, high-quality content every month.",
    price: "₹24,999",
    period: "/ month",
    features: [
      "6 short-form video edits",
      "20 social media graphics",
      "Full caption & hashtag strategy",
      "2 revision rounds per deliverable",
      "24-hour priority turnaround",
      "Monthly strategy check-in",
      "Cancel anytime",
    ],
    ctaLabel: "Book a call",
    ctaHref: "/contact",
  },
  {
    title: "Enterprise",
    popular: false,
    description:
      "Full-service retainer for brands that demand dedicated support, custom strategy, and end-to-end execution.",
    price: "Custom",
    period: "",
    features: [
      "Unlimited video & design requests",
      "Dedicated account manager",
      "Web development included",
      "Custom content calendar",
      "Weekly performance reports",
      "Onboarding & brand audit",
      "Cancel anytime",
    ],
    ctaLabel: "Contact us",
    ctaHref: "/contact",
  },
];

export default function PricingPage() {
  return (
    <>
      <PageHeader
        label="Pricing"
        title="Clear Pricing, No Surprises"
        description="Rough ranges to help you budget. Every project gets a custom quote after our discovery call."
      />

      {/* ── Main Pricing1 section ── */}
      <section className="section-padding pt-8">
        <FadeInUp>
          <Pricing1
            heading="Simple and transparent pricing"
            subheading="Pick a plan that works for your goals — or contact us for a tailored quote."
            plans={visualisePlans}
          />
        </FadeInUp>
      </section>

      {/* ── FAQ ── */}
      <section className="section-padding bg-bg-secondary">
        <div className="container-main max-w-3xl mx-auto">
          <FadeInUp>
            <h2 className="font-display text-2xl font-bold text-text-primary mb-8 text-center">
              Pricing FAQ
            </h2>
          </FadeInUp>
          <FaqAccordion items={siteConfig.pricingFaq} />
          <p className="mt-8 text-center text-text-secondary">
            Need a custom enterprise plan?{" "}
            <Link href="/contact" className="text-accent hover:underline">
              Contact us
            </Link>
          </p>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
