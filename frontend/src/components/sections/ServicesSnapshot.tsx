import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/lib/services";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { StaggerContainer, StaggerItem } from "@/components/motion/StaggerContainer";

export function ServicesSnapshot() {
  const ordered = [
    services.find((s) => s.slug === "video-editing")!,
    ...services.filter((s) => s.slug !== "video-editing"),
  ];

  return (
    <section className="section-padding bg-bg-secondary">
      <div className="container-main">
        <SectionHeading
          label="What We Do"
          title="Services Under One Roof"
          description="From cinematic edits to high-converting websites — one team handles it all."
        />
        <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ordered.map((service) => (
            <StaggerItem key={service.slug}>
              <Link href={`/services/${service.slug}`}>
                <GlassCard className="h-full flex flex-col">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                    <ServiceIcon name={service.icon} className="h-6 w-6" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-text-primary">
                    {service.name}
                  </h3>
                  <p className="mt-2 flex-1 text-sm text-text-secondary">
                    {service.shortDescription}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent">
                    Learn More <ArrowRight className="h-4 w-4" />
                  </span>
                </GlassCard>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
