"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { portfolioProjects } from "@/lib/portfolio";
import { categoryLabels, type ServiceCategory } from "@/lib/services";
import { Badge } from "@/components/ui/Badge";
import { FadeInUp } from "@/components/motion/FadeInUp";
import { cn } from "@/lib/utils";

const filters: (ServiceCategory | "all")[] = ["all", "video", "design", "social", "web"];

export function PortfolioGrid() {
  const [active, setActive] = useState<ServiceCategory | "all">("all");
  const projects = portfolioProjects.filter(
    (p) => active === "all" || p.category === active
  );

  return (
    <>
      <div className="sticky top-[60px] z-30 glass border-b border-white/10 py-4 mb-10">
        <div className="container-main flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setActive(f)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-all min-h-[44px]",
                active === f
                  ? "bg-accent text-white"
                  : "text-text-secondary hover:text-text-primary hover:bg-white/5"
              )}
            >
              {categoryLabels[f]}
            </button>
          ))}
        </div>
      </div>

      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        {projects.map((project, i) => (
          <FadeInUp key={project.slug} delay={(i % 3) * 0.05} className="break-inside-avoid">
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
                    <Badge>{categoryLabels[project.category]}</Badge>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-display font-semibold text-text-primary group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                  <p className="mt-1 text-sm text-text-secondary">{project.client}</p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {project.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="text-xs text-text-secondary">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="mt-2 text-xs font-medium text-accent">{project.result}</p>
                </div>
              </article>
            </Link>
          </FadeInUp>
        ))}
      </div>
    </>
  );
}
