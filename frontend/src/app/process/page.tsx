import { siteConfig } from "@/lib/site";
import { createMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/ui/PageHeader";
import { StaggerContainer, StaggerItem } from "@/components/motion/StaggerContainer";
import { CtaBanner } from "@/components/sections/CtaBanner";

export const metadata = createMetadata({
  title: "Process",
  description:
    "See how Visualise.Co works — from discovery call to delivery and support. A clear 6-step process.",
  path: "/process",
});

export default function ProcessPage() {
  return (
    <>
      <PageHeader
        label="Process"
        title="How We Work With You"
        description="No surprises. A transparent process from first call to final delivery."
      />

      <section className="section-padding pt-0">
        <div className="container-main max-w-4xl">
          <StaggerContainer className="relative space-y-0">
            {siteConfig.processSteps.map((step, i) => (
              <StaggerItem key={step.step}>
                <div className="relative flex gap-6 pb-12 last:pb-0">
                  {i < siteConfig.processSteps.length - 1 && (
                    <div className="absolute left-[23px] top-12 h-full w-px bg-gradient-to-b from-accent/50 to-transparent" />
                  )}
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent/20 font-display text-sm font-bold text-accent ring-4 ring-bg-primary">
                    {step.step}
                  </div>
                  <div className="glass rounded-2xl p-6 flex-1">
                    <h3 className="font-display text-xl font-semibold text-text-primary">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-text-secondary">{step.description}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
