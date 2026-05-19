"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/lib/site";
import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";
import type { Testimonial } from "@/components/ui/testimonials-columns-1";

// Map siteConfig testimonials to the column format.
// We use real Unsplash portrait images to match the avatar slot.
const testimonialData: Testimonial[] = [
  {
    text: siteConfig.testimonials[0].quote,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
    name: siteConfig.testimonials[0].name,
    role: siteConfig.testimonials[0].company,
  },
  {
    text: siteConfig.testimonials[1].quote,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face",
    name: siteConfig.testimonials[1].name,
    role: siteConfig.testimonials[1].company,
  },
  {
    text: siteConfig.testimonials[2].quote,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
    name: siteConfig.testimonials[2].name,
    role: siteConfig.testimonials[2].company,
  },
  {
    text: siteConfig.testimonials[3].quote,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
    name: siteConfig.testimonials[3].name,
    role: siteConfig.testimonials[3].company,
  },
  // Extra cards to fill third column on large screens
  {
    text: "From concept to delivery, every detail was handled with care. Our brand finally looks as good as it actually is.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face",
    name: "Arjun Kapoor",
    role: "GrowthLab",
  },
  {
    text: "They understood our aesthetic immediately. The social creatives they produce are consistently on-brand and high quality.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face",
    name: "Nisha Reddy",
    role: "StyleCo Fashion",
  },
  {
    text: "One team for everything — video, design, website, and social. That's rare and incredibly valuable for a growing startup.",
    image: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=80&h=80&fit=crop&crop=face",
    name: "Vikram Joshi",
    role: "FoodHub India",
  },
  {
    text: "Fast turnarounds and zero compromise on quality. We've partnered with Visualise.Co for over a year and won't look back.",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=80&h=80&fit=crop&crop=face",
    name: "Meera Singh",
    role: "EduPro Academy",
  },
  {
    text: "Our YouTube retention rate jumped after switching to their editors. The storytelling they bring to raw footage is exceptional.",
    image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=80&h=80&fit=crop&crop=face",
    name: "Dev Ahuja",
    role: "TechStart India",
  },
];

const firstColumn  = testimonialData.slice(0, 3);
const secondColumn = testimonialData.slice(3, 6);
const thirdColumn  = testimonialData.slice(6, 9);

export function Testimonials() {
  return (
    <section className="section-padding bg-bg-secondary relative overflow-hidden">
      {/* Subtle ambient glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 40% at 50% 0%, rgba(255,92,0,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="container-main relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center max-w-xl mx-auto mb-14"
        >
          <span className="inline-block border border-accent/30 text-accent text-xs font-medium px-4 py-1.5 rounded-full mb-5 tracking-wider uppercase">
            Testimonials
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary tracking-tight">
            What Clients Say
          </h2>
          <p className="mt-4 text-text-secondary text-base">
            Real results, real feedback — from brands that trust us with their
            creative presence.
          </p>
        </motion.div>

        {/* Scrolling columns */}
        <div className="flex justify-center gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)] max-h-[680px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn}  duration={18} />
          <TestimonialsColumn testimonials={secondColumn} duration={22} className="hidden md:block" />
          <TestimonialsColumn testimonials={thirdColumn}  duration={20} className="hidden lg:block" />
        </div>
      </div>
    </section>
  );
}
