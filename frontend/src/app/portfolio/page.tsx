import { createMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/ui/PageHeader";
import { PortfolioGrid } from "@/components/sections/PortfolioGrid";
import { CtaBanner } from "@/components/sections/CtaBanner";

export const metadata = createMetadata({
  title: "Portfolio",
  description:
    "Explore our video editing, design, social media, and web development work — real projects with real results.",
  path: "/portfolio",
});

export default function PortfolioPage() {
  return (
    <>
      <PageHeader
        label="Portfolio"
        title="Work That Speaks for Itself"
        description="Filter by category and explore projects we've delivered for clients across India."
      />
      <section className="section-padding pt-0">
        <div className="container-main">
          <PortfolioGrid />
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
