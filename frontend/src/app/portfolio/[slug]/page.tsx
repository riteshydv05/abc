import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import {
  getProjectBySlug,
  getRelatedProjects,
  portfolioSlugs,
} from "@/lib/portfolio";
import { categoryLabels } from "@/lib/services";
import { createMetadata } from "@/lib/metadata";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { FadeInUp } from "@/components/motion/FadeInUp";
import { CtaBanner } from "@/components/sections/CtaBanner";

export function generateStaticParams() {
  return portfolioSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return createMetadata({
    title: project.title,
    description: project.brief,
    path: `/portfolio/${slug}`,
  });
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const related = getRelatedProjects(slug);

  return (
    <>
      <section className="mesh-bg pt-28 pb-8 md:pt-36">
        <div className="container-main">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-accent mb-6"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Portfolio
          </Link>
          <Badge className="mb-4">{categoryLabels[project.category]}</Badge>
          <h1 className="font-display text-4xl font-bold text-text-primary md:text-5xl">
            {project.title}
          </h1>
          <p className="mt-2 text-text-secondary">
            {project.client} · <span className="text-accent">{project.result}</span>
          </p>
        </div>
      </section>

      <section className="section-padding pt-0">
        <div className="container-main">
          <FadeInUp>
            <div className="relative aspect-video overflow-hidden rounded-2xl glass">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
            </div>
          </FadeInUp>

          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            <FadeInUp className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="font-display text-xl font-semibold text-text-primary">The Brief</h2>
                <p className="mt-3 text-text-secondary leading-relaxed">{project.brief}</p>
              </div>
              <div>
                <h2 className="font-display text-xl font-semibold text-text-primary">The Solution</h2>
                <p className="mt-3 text-text-secondary leading-relaxed">{project.solution}</p>
              </div>
              <div>
                <h2 className="font-display text-xl font-semibold text-text-primary">The Result</h2>
                <p className="mt-3 text-text-secondary leading-relaxed">{project.outcome}</p>
              </div>
            </FadeInUp>
            <FadeInUp delay={0.1}>
              <GlassCard hover={false}>
                <h3 className="font-semibold text-text-primary">Tags</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t border-white/10">
                  <p className="text-sm text-text-secondary">Key Result</p>
                  <p className="mt-1 text-lg font-semibold text-accent">{project.result}</p>
                </div>
                <Button href="/contact" variant="primary" className="mt-6 w-full">
                  Start a Similar Project
                </Button>
              </GlassCard>
            </FadeInUp>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section-padding bg-bg-secondary">
          <div className="container-main">
            <h2 className="font-display text-2xl font-bold text-text-primary mb-8">
              Related Projects
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {related.map((p) => (
                <Link key={p.slug} href={`/portfolio/${p.slug}`}>
                  <GlassCard>
                    <h3 className="font-semibold text-text-primary">{p.title}</h3>
                    <p className="mt-1 text-sm text-accent">{p.result}</p>
                  </GlassCard>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBanner />
    </>
  );
}
