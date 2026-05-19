import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { createMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/ui/PageHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { StatsSection } from "@/components/sections/StatsSection";
import { FadeInUp } from "@/components/motion/FadeInUp";
import { StaggerContainer, StaggerItem } from "@/components/motion/StaggerContainer";
import { CtaBanner } from "@/components/sections/CtaBanner";

export const metadata = createMetadata({
  title: "About",
  description:
    "Meet the Visualise.Co team — a Varanasi-based creative agency specialising in video, design, social, and web.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHeader
        label="About"
        title="We Help Brands Look as Good as They Are"
        description={siteConfig.about.mission}
      />

      <section className="section-padding pt-0">
        <div className="container-main max-w-3xl">
          <FadeInUp>
            <h2 className="font-display text-2xl font-bold text-text-primary">Our Story</h2>
            <p className="mt-4 text-text-secondary leading-relaxed">{siteConfig.about.story}</p>
          </FadeInUp>
        </div>
      </section>

      <section className="section-padding bg-bg-secondary">
        <div className="container-main">
          <h2 className="font-display text-2xl font-bold text-text-primary mb-8 text-center">
            Our Values
          </h2>
          <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {siteConfig.values.map((v) => (
              <StaggerItem key={v.title}>
                <GlassCard className="text-center h-full">
                  <h3 className="font-display text-lg font-semibold text-accent">{v.title}</h3>
                  <p className="mt-2 text-sm text-text-secondary">{v.description}</p>
                </GlassCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-main">
          <h2 className="font-display text-2xl font-bold text-text-primary mb-8 text-center">
            The Team
          </h2>
          <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {siteConfig.team.map((member) => (
              <StaggerItem key={member.name}>
                <GlassCard className="text-center h-full">
                  <div className="relative mx-auto h-24 w-24 overflow-hidden rounded-full">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </div>
                  <h3 className="mt-4 font-semibold text-text-primary">{member.name}</h3>
                  <p className="text-sm text-accent">{member.role}</p>
                  <p className="mt-2 text-xs text-text-secondary">{member.specialty}</p>
                </GlassCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <StatsSection />

      <section className="section-padding bg-bg-secondary">
        <div className="container-main">
          <h2 className="font-display text-2xl font-bold text-text-primary mb-8 text-center">
            Clients We&apos;ve Worked With
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {siteConfig.clientLogos.map((logo) => (
              <div
                key={logo}
                className="glass rounded-xl px-8 py-4 text-lg font-display font-semibold text-text-secondary"
              >
                {logo}
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button href="/contact" variant="primary">
              Become Our Next Success Story
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
