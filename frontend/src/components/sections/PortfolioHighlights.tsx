"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { getFeaturedProjects } from "@/lib/portfolio";
import { categoryLabels, type ServiceCategory } from "@/lib/services";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeInUp } from "@/components/motion/FadeInUp";
import { cn } from "@/lib/utils";

const filters: (ServiceCategory | "all")[] = ["all", "video", "design", "social", "web"];

export function PortfolioHighlights() {
  const [active, setActive] = useState<ServiceCategory | "all">("all");
  const projects = getFeaturedProjects().filter(
    (p) => active === "all" || p.category === active
  );

  return (
    <section className="section-padding bg-bg-secondary">
      <div className="container-main">
        <SectionHeading
          label="Our Work"
          title="Portfolio Highlights"
          description="Real projects. Real results. See what we've built for brands like yours."
        />

        <FadeInUp className="mb-10 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setActive(f)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-all min-h-[44px]",
                active === f
                  ? "bg-accent text-white"
                  : "glass text-text-secondary hover:text-text-primary"
              )}
            >
              {categoryLabels[f]}
            </button>
          ))}
        </FadeInUp>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.slice(0, 6).map((project, i) => (
            <FadeInUp key={project.slug} delay={i * 0.05}>
              <Link href={`/portfolio/${project.slug}`} className="group block">
                <article className="glass glass-hover rounded-2xl overflow-hidden">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-black/50 backdrop-blur-sm">
                        {categoryLabels[project.category]}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-display font-semibold text-text-primary group-hover:text-accent transition-colors">
                      {project.title}
                    </h3>
                    <p className="mt-1 text-sm text-text-secondary">{project.client}</p>
                    <p className="mt-2 text-xs text-accent">{project.result}</p>
                  </div>
                </article>
              </Link>
            </FadeInUp>
          ))}
        </div>

        <FadeInUp className="mt-12 text-center">
          <Button href="/portfolio" variant="secondary">
            View Full Portfolio
            <ArrowRight className="h-4 w-4" />
          </Button>
        </FadeInUp>
      </div>
    </section>
  );
}
