import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StaggerContainer, StaggerItem } from "@/components/motion/StaggerContainer";

export function ProcessTeaser() {
  return (
    <section className="section-padding">
      <div className="container-main">
        <SectionHeading
          label="How We Work"
          title="From Brief to Delivery"
          description="A clear, proven process so you always know what's happening."
        />
        <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {siteConfig.processTeaser.map((step) => (
            <StaggerItem key={step.step}>
              <div className="glass rounded-2xl p-6 h-full border-l-2 border-l-accent">
                <span className="text-xs font-bold text-accent">{step.step}</span>
                <h3 className="mt-2 font-display text-lg font-semibold text-text-primary">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-text-secondary">{step.description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
        <div className="mt-10 text-center">
          <Button href="/process" variant="secondary">
            See How We Work
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
