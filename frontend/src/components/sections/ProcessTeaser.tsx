"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { siteConfig } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StaggerContainer, StaggerItem } from "@/components/motion/StaggerContainer";
import { cn } from "@/lib/utils";

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
              <motion.div
                className={cn(
                  "glass rounded-2xl p-6 h-full border-l-2 border-l-accent group relative",
                  "transition-all duration-500 ease-out",
                  "hover:shadow-[0_8px_32px_rgba(255,92,0,0.08)]",
                  "hover:-translate-y-1"
                )}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 font-display text-sm font-bold text-accent transition-all duration-500 group-hover:bg-accent/20 group-hover:scale-110">
                    {step.step}
                  </div>
                </div>

                <h3 className="font-display text-lg font-semibold text-text-primary">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                  {step.description}
                </p>

                <div className="mt-4 flex items-center gap-1 text-sm font-medium text-accent opacity-0 -translate-x-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                  <span>Learn more</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </motion.div>
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
