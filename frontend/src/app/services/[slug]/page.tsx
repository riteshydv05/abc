import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getServiceBySlug, serviceSlugs } from "@/lib/services";
import { getProjectsByCategory } from "@/lib/portfolio";
import { createMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/ui/PageHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { FadeInUp } from "@/components/motion/FadeInUp";
import { StaggerContainer, StaggerItem } from "@/components/motion/StaggerContainer";
import { CtaBanner } from "@/components/sections/CtaBanner";

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return createMetadata({
    title: service.name,
    description: service.shortDescription,
    path: `/services/${slug}`,
  });
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const relatedProjects = getProjectsByCategory(service.category).slice(0, 3);

  return (
    <>
      <PageHeader label="Service" title={service.name} description={service.tagline} />

      <section className="section-padding pt-0">
        <div className="container-main">
          <FadeInUp>
            <div className="relative aspect-[21/9] overflow-hidden rounded-2xl glass">
              <Image
                src={service.heroImage}
                alt={service.name}
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
            </div>
          </FadeInUp>
        </div>
      </section>

      <section className="section-padding pt-0">
        <div className="container-main grid gap-12 lg:grid-cols-2">
          <FadeInUp>
            <h2 className="font-display text-2xl font-bold text-text-primary">What We Do</h2>
            <ul className="mt-6 space-y-3">
              {service.deliverables.map((d) => (
                <li key={d} className="flex items-start gap-3 text-text-secondary">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {d}
                </li>
              ))}
            </ul>
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <h2 className="font-display text-2xl font-bold text-text-primary">Who It&apos;s For</h2>
            <ul className="mt-6 space-y-3">
              {service.whoItsFor.map((w) => (
                <li key={w} className="flex items-start gap-3 text-text-secondary">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {w}
                </li>
              ))}
            </ul>
          </FadeInUp>
        </div>
      </section>

      <section className="section-padding bg-bg-secondary">
        <div className="container-main">
          <h2 className="font-display text-2xl font-bold text-text-primary mb-8">Our Process</h2>
          <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {service.processSteps.map((step, i) => (
              <StaggerItem key={step.title}>
                <div className="glass rounded-xl p-6 h-full">
                  <span className="text-xs font-bold text-accent">0{i + 1}</span>
                  <h3 className="mt-2 font-semibold text-text-primary">{step.title}</h3>
                  <p className="mt-2 text-sm text-text-secondary">{step.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {relatedProjects.length > 0 && (
        <section className="section-padding">
          <div className="container-main">
            <h2 className="font-display text-2xl font-bold text-text-primary mb-8">
              Related Work
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {relatedProjects.map((p) => (
                <Link key={p.slug} href={`/portfolio/${p.slug}`}>
                  <GlassCard>
                    <h3 className="font-semibold text-text-primary hover:text-accent">{p.title}</h3>
                    <p className="mt-1 text-sm text-text-secondary">{p.client}</p>
                    <p className="mt-2 text-xs text-accent">{p.result}</p>
                  </GlassCard>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section-padding bg-bg-secondary">
        <div className="container-main">
          <h2 className="font-display text-2xl font-bold text-text-primary mb-8 text-center">
            Pricing
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {service.pricingTiers.map((tier) => (
              <GlassCard
                key={tier.name}
                className={tier.popular ? "ring-2 ring-accent relative" : ""}
              >
                {tier.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-white border-accent">
                    Most Popular
                  </Badge>
                )}
                <h3 className="font-display text-xl font-semibold text-text-primary">{tier.name}</h3>
                <p className="mt-2 text-2xl font-bold text-accent">{tier.price}</p>
                <ul className="mt-6 space-y-2">
                  {tier.features.map((f) => (
                    <li key={f} className="text-sm text-text-secondary flex gap-2">
                      <span className="text-accent">✓</span> {f}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-text-secondary">
            Custom enterprise plans available —{" "}
            <Link href="/contact" className="text-accent hover:underline">
              contact us
            </Link>
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-main max-w-3xl mx-auto">
          <h2 className="font-display text-2xl font-bold text-text-primary mb-8 text-center">FAQ</h2>
          <FaqAccordion items={service.faq} />
          <div className="mt-10 text-center">
            <Button href="/contact" variant="primary">
              Book a Free Consultation
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
