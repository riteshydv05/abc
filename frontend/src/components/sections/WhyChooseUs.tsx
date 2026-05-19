import { Sparkles, Zap, Users } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StaggerContainer, StaggerItem } from "@/components/motion/StaggerContainer";

const iconMap = {
  sparkles: Sparkles,
  zap: Zap,
  users: Users,
};

export function WhyChooseUs() {
  return (
    <section className="section-padding">
      <div className="container-main">
        <SectionHeading
          label="Why Us"
          title="Why Choose Visualise.Co"
          description="We're not a faceless platform. We're a dedicated creative team obsessed with results."
          align="center"
        />
        <StaggerContainer className="grid gap-6 md:grid-cols-3">
          {siteConfig.whyChooseUs.map((item) => {
            const Icon = iconMap[item.icon];
            return (
              <StaggerItem key={item.title}>
                <GlassCard className="text-center h-full">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-accent">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-text-primary">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-text-secondary">{item.description}</p>
                </GlassCard>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
