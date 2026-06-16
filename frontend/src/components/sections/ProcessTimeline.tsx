"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

function TimelineStep({
  step,
  title,
  description,
  index,
  isLast,
}: {
  step: string;
  title: string;
  description: string;
  index: number;
  isLast: boolean;
}) {
  const reduced = useReducedMotion();

  return (
    <div className="relative flex gap-5 sm:gap-6 pb-14 last:pb-0 group">
      {!isLast && (
        <motion.div
          className="absolute left-[22px] sm:left-6 top-12 h-[calc(100%+0.5rem)] w-px bg-gradient-to-b from-accent/40 via-accent/20 to-transparent origin-top"
          initial={reduced ? false : { scaleY: 0 }}
          whileInView={reduced ? undefined : { scaleY: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        />
      )}

      <motion.div
        className="relative flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center z-10"
        initial={reduced ? false : { opacity: 0, scale: 0.5 }}
        whileInView={reduced ? undefined : { opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      >
        <div className="absolute inset-0 rounded-full bg-accent/20 ring-[3px] ring-bg-primary transition-all duration-500 group-hover:bg-accent/30" />
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent/25 to-accent/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        {!reduced && (
          <motion.div
            className="absolute -inset-1.5 rounded-full border border-accent/20"
            animate={{
              opacity: [0.3, 0.1, 0.3],
              scale: [1, 1.06, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5 + index * 0.15,
            }}
          />
        )}
        <span className="relative font-display text-sm font-bold text-accent select-none">
          {step}
        </span>
      </motion.div>

      <motion.div
        className={cn(
          "glass rounded-2xl p-5 sm:p-6 md:p-8 flex-1 min-w-0",
          "transition-all duration-500 ease-out",
          "group-hover:border-accent/30",
          "group-hover:shadow-[0_8px_32px_rgba(255,92,0,0.1)]",
          "group-hover:-translate-y-0.5"
        )}
        initial={reduced ? false : { opacity: 0, x: -24 }}
        whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="font-display text-xl sm:text-2xl font-semibold text-text-primary">
              {title}
            </h3>
            <p className="mt-2.5 text-text-secondary leading-relaxed text-[15px] sm:text-base">
              {description}
            </p>
          </div>

          <motion.div
            className="hidden sm:flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent opacity-0 -translate-x-2 transition-all duration-400 group-hover:opacity-100 group-hover:translate-x-0"
            whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 92, 0, 0.2)" }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <ArrowRight className="h-4 w-4" />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export function ProcessTimeline() {
  const steps = siteConfig.processSteps;

  return (
    <div className="relative">
      {steps.map((step, i) => (
        <TimelineStep
          key={step.step}
          step={step.step}
          title={step.title}
          description={step.description}
          index={i}
          isLast={i === steps.length - 1}
        />
      ))}
    </div>
  );
}
