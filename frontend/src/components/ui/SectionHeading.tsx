"use client";

import { FadeInUp } from "@/components/motion/FadeInUp";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  label,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <FadeInUp className={cn("mb-12 md:mb-16", align === "center" && "text-center", className)}>
      {label && (
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.15em] text-accent">
          {label}
        </p>
      )}
      <h2 className="font-display text-3xl font-bold tracking-tight text-text-primary md:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 max-w-2xl text-lg text-text-secondary",
            align === "center" && "mx-auto"
          )}
        >
          {description}
        </p>
      )}
    </FadeInUp>
  );
}
