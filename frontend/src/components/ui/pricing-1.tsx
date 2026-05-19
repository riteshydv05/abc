"use client";

import { CheckIcon } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";

export interface PricingPlan {
  title: string;
  popular: boolean;
  description: string;
  price: string;
  period?: string;
  features: string[];
  ctaLabel?: string;
  ctaHref?: string;
}

interface Pricing1Props {
  heading?: string;
  subheading?: string;
  plans: PricingPlan[];
}

const Pricing1 = ({ heading, subheading, plans }: Pricing1Props) => {
  return (
    <section className="flex flex-col items-center justify-center gap-16 w-[95%] mx-auto py-20 text-text-primary">
      {/* Header */}
      <div className="flex flex-col items-center gap-4 w-full text-center">
        {heading && (
          <h2 className="font-display font-bold text-3xl md:text-4xl leading-tight text-text-primary">
            {heading}
          </h2>
        )}
        {subheading && (
          <p className="text-text-secondary text-base max-w-xl">{subheading}</p>
        )}
      </div>

      {/* Cards */}
      <div className="flex justify-center flex-wrap w-full max-w-4xl">
        {plans.map((plan, index) => {
          const isMiddle = index === 1;
          const isFirst = index === 0;
          const isLast = index === plans.length - 1;

          return (
            <div
              key={index}
              className={cn(
                "flex-1 min-w-[240px] border border-white/10 transition-colors duration-300",
                // Rounded corners only on outer edges
                isFirst && "rounded-l-2xl",
                isLast && "rounded-r-2xl",
                // Middle card gets accent border top/bottom, no side borders
                isMiddle
                  ? "border-t-2 border-b-2 border-l-0 border-r-0 border-accent/60 bg-white/[0.04]"
                  : "bg-white/[0.02]",
                "hover:bg-white/[0.06]"
              )}
            >
              <div className="p-8 flex flex-col h-full gap-6 justify-between">
                {/* Plan info */}
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-3">
                    <div className="font-display font-semibold text-xl text-text-primary flex items-center gap-2">
                      {plan.title}
                      {plan.popular && (
                        <span className="text-xs text-accent font-normal opacity-90 tracking-wide">
                          // most popular
                        </span>
                      )}
                    </div>
                    <p className="text-text-secondary text-sm leading-relaxed">
                      {plan.description}
                    </p>
                    <div className="text-xs text-text-secondary">
                      <span className="font-bold text-lg text-text-primary">
                        {plan.price}
                      </span>
                      <span className="ml-1">{plan.period ?? "monthly"}</span>
                    </div>
                  </div>

                  <hr className="border-white/10" />

                  {/* Features */}
                  <ul className="flex flex-col gap-3">
                    {plan.features.map((feature, fi) => (
                      <li key={fi} className="flex items-start gap-2">
                        <CheckIcon
                          className={cn(
                            "w-4 h-4 mt-0.5 shrink-0",
                            isMiddle ? "text-accent" : "text-text-secondary"
                          )}
                        />
                        <span className="text-sm text-text-secondary leading-snug">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <hr className="border-white/10" />

                {/* CTA */}
                <div>
                  <a
                    href={plan.ctaHref ?? "/contact"}
                    className={cn(
                      "inline-flex items-center justify-center px-6 h-10 rounded-full text-sm font-semibold transition-all duration-200",
                      isMiddle
                        ? "bg-accent text-white hover:bg-accent/90 shadow-lg shadow-accent/20"
                        : "border border-white/15 text-text-secondary hover:text-text-primary hover:border-white/30 hover:bg-white/5"
                    )}
                  >
                    {plan.ctaLabel ?? "Book a call"}
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export { Pricing1 };
