"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { FadeInUp } from "@/components/motion/FadeInUp";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface Client {
  name: string;
  initials: string;
  industry: string;
  color: string;
}

interface TestimonialData {
  text: string;
  name: string;
  company: string;
  rating: number;
  initials: string;
}

const clients: Client[] = [
  { name: "Crypto Millionaire Rohit", initials: "CM", industry: "Finance & Crypto", color: "#f59e0b" },
  { name: "Crypto Asad", initials: "CA", industry: "Finance & Crypto", color: "#8b5cf6" },
  { name: "Learn With Haripriyaa", initials: "LH", industry: "Education", color: "#06b6d4" },
  { name: "GoZero Official", initials: "GZ", industry: "Sustainability", color: "#22c55e" },
  { name: "Cryptovelps", initials: "CV", industry: "Finance & Crypto", color: "#f97316" },
  { name: "Nerd With A Bindi", initials: "NB", industry: "Lifestyle & Content", color: "#ec4899" },
  { name: "Startup Decoding", initials: "SD", industry: "Business & Startup", color: "#3b82f6" },
  { name: "Adore Skin Clinic", initials: "AS", industry: "Healthcare & Beauty", color: "#a855f7" },
  { name: "Zoomer Health", initials: "ZH", industry: "Health & Wellness", color: "#14b8a6" },
  { name: "Indian Stories", initials: "IS", industry: "Entertainment", color: "#ef4444" },
  { name: "The Unconventional CA", initials: "UC", industry: "Finance & Consulting", color: "#6366f1" },
];

const testimonials: TestimonialData[] = [
  {
    text: "Visualise.Co transformed our YouTube channel completely. Our watch time doubled within two months of their edits. They understand exactly what our audience wants.",
    name: "Crypto Millionaire Rohit",
    company: "Crypto Millionaire Rohit",
    rating: 5,
    initials: "CM",
  },
  {
    text: "The level of professionalism and creativity is unmatched. From thumbnails to full edits, everything is polished to perfection. Our engagement has never been better.",
    name: "Crypto Asad",
    company: "Crypto Asad",
    rating: 5,
    initials: "CA",
  },
  {
    text: "They brought our educational content to life. The visual storytelling they add makes complex topics easy and enjoyable to watch. Our students love the new format.",
    name: "Learn With Haripriyaa",
    company: "Learn With Haripriyaa",
    rating: 5,
    initials: "LH",
  },
  {
    text: "Working with Visualise.Co has been a game-changer for our brand. Their design sensibilities are world-class and they genuinely care about delivering excellence every single time.",
    name: "Nerd With A Bindi",
    company: "Nerd With A Bindi",
    rating: 5,
    initials: "NB",
  },
  {
    text: "The team at Visualise.Co handles our entire creative pipeline. Fast turnarounds, zero compromise on quality. They're an extension of our team now.",
    name: "Startup Decoding",
    company: "Startup Decoding",
    rating: 5,
    initials: "SD",
  },
  {
    text: "From social creatives to brand design, every deliverable exceeds expectations. Our clinic's online presence looks premium and professional thanks to their work.",
    name: "Adore Skin Clinic",
    company: "Adore Skin Clinic",
    rating: 5,
    initials: "AS",
  },
];

const trustIndicators = [
  { value: "11+", label: "Clients Served" },
  { value: "8+", label: "Industries" },
  { value: "200+", label: "Projects Delivered" },
];

function ClientCard({ client, index }: { client: Client; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="group relative flex flex-col items-center gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 transition-all duration-300 hover:border-accent/20 hover:bg-white/[0.04] hover:shadow-lg hover:shadow-accent/5"
    >
      <div
        className="flex h-14 w-14 items-center justify-center rounded-xl text-lg font-bold tracking-tight text-white transition-transform duration-300 group-hover:scale-110"
        style={{ background: `linear-gradient(135deg, ${client.color}, ${client.color}88)` }}
      >
        {client.initials}
      </div>
      <div className="text-center">
        <p className="text-sm font-semibold text-text-primary leading-tight">
          {client.name}
        </p>
        <p className="mt-1 text-[11px] font-medium uppercase tracking-wider text-text-secondary/60">
          {client.industry}
        </p>
      </div>
    </motion.div>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={cn("h-3.5 w-3.5", i < rating ? "text-accent" : "text-white/10")}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export function Testimonials() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(0);

  const goTo = useCallback((index: number) => {
    setDirection(index > active ? 1 : -1);
    setActive(index);
  }, [active]);

  const next = useCallback(() => {
    setDirection(1);
    setActive((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 120 : -120, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -120 : 120, opacity: 0 }),
  };

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 35% at 50% 0%, rgba(255,92,0,0.05) 0%, transparent 70%), radial-gradient(ellipse 40% 40% at 80% 100%, rgba(255,92,0,0.03) 0%, transparent 60%)",
        }}
      />

      <div className="container-main relative z-10">
        {/* ——— Header ——— */}
        <SectionHeading
          label="Clients & Testimonials"
          title="Trusted by Creators & Brands"
          description="We partner with creators, startups, and enterprises to craft visuals that build authority and drive growth."
          align="center"
        />


        {/* ——— Testimonial Carousel ——— */}
        <FadeInUp>
          <div className="relative mx-auto max-w-4xl">
            {/* Section sub-label */}
            <div className="mb-8 text-center">
              <span className="inline-block rounded-full border border-accent/30 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-accent">
                Kind Words
              </span>
            </div>

            {/* Card */}
            <div className="relative">
              <button
                onClick={prev}
                aria-label="Previous testimonial"
                className="absolute -left-3 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-white/10 bg-bg-card/80 p-2.5 text-text-secondary backdrop-blur-sm transition-all duration-300 hover:border-accent/30 hover:text-accent hover:shadow-lg hover:shadow-accent/10 md:flex"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={next}
                aria-label="Next testimonial"
                className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-white/10 bg-bg-card/80 p-2.5 text-text-secondary backdrop-blur-sm transition-all duration-300 hover:border-accent/30 hover:text-accent hover:shadow-lg hover:shadow-accent/10 md:flex"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <div className="overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] px-6 py-10 md:px-12 md:py-14">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={active}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col items-center text-center"
                  >
                    {/* Quote icon */}
                    <svg
                      className="mb-6 h-8 w-8 text-accent/30"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>

                    {/* Rating */}
                    <StarRating rating={testimonials[active].rating} />

                    {/* Quote text */}
                    <p className="mt-5 text-base leading-relaxed text-text-secondary md:text-lg">
                      &ldquo;{testimonials[active].text}&rdquo;
                    </p>

                    {/* Author */}
                    <div className="mt-8 flex items-center gap-3">
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white"
                        style={{
                          background: `linear-gradient(135deg, ${clients.find((c) => c.name === testimonials[active].name)?.color || "#ff5c00"}, ${clients.find((c) => c.name === testimonials[active].name)?.color || "#ff5c00"}88)`,
                        }}
                      >
                        {testimonials[active].initials}
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-semibold text-text-primary">
                          {testimonials[active].name}
                        </p>
                        <p className="text-xs text-text-secondary/60">
                          {testimonials[active].company}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Dots */}
            <div className="mt-6 flex items-center justify-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-500",
                    i === active
                      ? "w-8 bg-accent"
                      : "w-1.5 bg-white/20 hover:bg-white/40"
                  )}
                />
              ))}
            </div>
          </div>
        </FadeInUp>
      </div>
    </section>
  );
}
