import { ArrowRight } from "lucide-react";
import { createMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/ui/PageHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { FadeInUp } from "@/components/motion/FadeInUp";

export const metadata = createMetadata({
  title: "Blog",
  description:
    "Insights on video editing, web development, and social media — coming soon from Visualise.Co.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <>
      <PageHeader
        label="Blog"
        title="Insights & Case Studies"
        description="We're preparing articles on video editing tips, web trends, and social media strategy."
      />
      <section className="section-padding pt-0">
        <div className="container-main max-w-2xl mx-auto text-center">
          <FadeInUp>
            <GlassCard hover={false} className="py-16">
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-accent">
                Launching soon
              </p>
              <h2 className="font-display text-2xl font-bold text-text-primary">Coming Soon</h2>
              <p className="mt-4 text-text-secondary">
                Our blog will feature case studies, behind-the-scenes content, and tips for growing
                your brand online.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Button href="/portfolio" variant="primary">
                  View Portfolio
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button href="/contact" variant="secondary">
                  Get in Touch
                </Button>
              </div>
            </GlassCard>
          </FadeInUp>
        </div>
      </section>
    </>
  );
}
