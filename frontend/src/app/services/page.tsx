import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/lib/services";
import { createMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/ui/PageHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { StaggerContainer, StaggerItem } from "@/components/motion/StaggerContainer";
import { CtaBanner } from "@/components/sections/CtaBanner";

export const metadata = createMetadata({
  title: "Services",
  description:
    "Video editing, graphic design, social media management, and web development — all from one dedicated team in Varanasi, India.",
  path: "/services",
});

export default function ServicesPage() {
  const ordered = [
    services.find((s) => s.slug === "video-editing")!,
    ...services.filter((s) => s.slug !== "video-editing"),
  ];

  return (
    <>
      <PageHeader
        label="Services"
        title="Everything Your Brand Needs"
        description="Everything your brand needs, handled by one dedicated team."
      />
      <section className="section-padding pt-0">
        <div className="container-main">
          <StaggerContainer className="grid gap-8 md:grid-cols-2">
            {ordered.map((service) => (
              <StaggerItem key={service.slug}>
                <Link href={`/services/${service.slug}`}>
                  <GlassCard className="h-full">
                    <div className="flex items-start gap-4">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                        <ServiceIcon name={service.icon} className="h-7 w-7" />
                      </div>
                      <div>
                        <h2 className="font-display text-2xl font-semibold text-text-primary">
                          {service.name}
                        </h2>
                        <p className="mt-2 text-text-secondary">{service.shortDescription}</p>
                        <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent">
                          View Service <ArrowRight className="h-4 w-4" />
                        </span>
                      </div>
                    </div>
                  </GlassCard>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
