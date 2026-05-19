"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

const slides = [
  {
    src: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1400&h=720&fit=crop",
    label: "Video Editing",
    alt: "Professional video editing timeline — cinematic colour grading",
  },
  {
    src: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1400&h=720&fit=crop",
    label: "Graphic Design",
    alt: "Brand identity and graphic design work for a client",
  },
  {
    src: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=1400&h=720&fit=crop",
    label: "Social Media",
    alt: "Social media content strategy and creative posts",
  },
  {
    src: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=1400&h=720&fit=crop",
    label: "Web Development",
    alt: "Modern web development — responsive UI on laptop",
  },
];

const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? "60%" : "-60%", opacity: 0, scale: 0.95 }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? "-60%" : "60%", opacity: 0, scale: 0.95 }),
};

export function ShowreelScroll() {
  const [[page, dir], setPage] = useState([0, 0]);
  const idx = ((page % slides.length) + slides.length) % slides.length;

  const paginate = useCallback(
    (newDir: number) => setPage(([p]) => [p + newDir, newDir]),
    []
  );

  // Auto-advance every 4 s
  useEffect(() => {
    const t = setTimeout(() => paginate(1), 4000);
    return () => clearTimeout(t);
  }, [page, paginate]);

  return (
    <div className="flex flex-col overflow-hidden bg-bg-primary">
      <ContainerScroll
        titleComponent={
          <div className="flex flex-col items-center gap-4">
            <span className="inline-block border border-accent/30 text-accent text-xs font-medium px-4 py-1.5 rounded-full tracking-wider uppercase">
              Our Work
            </span>
            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-text-primary leading-none tracking-tight">
              Crafted to{" "}
              <span
                style={{
                  background: "linear-gradient(135deg,#ffffff 0%,#ff5c00 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Convert
              </span>
            </h2>
            <p className="text-text-secondary text-base md:text-lg max-w-lg text-center">
              From cinematic reels to full brand identities — scroll to see how
              we bring ideas to life.
            </p>
          </div>
        }
      >
        {/* ── Carousel inside the scroll card ── */}
        <div className="relative h-full w-full overflow-hidden rounded-2xl select-none">
          <AnimatePresence initial={false} custom={dir} mode="popLayout">
            <motion.div
              key={page}
              custom={dir}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.55, ease: [0.32, 0.72, 0, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={slides[idx].src}
                alt={slides[idx].alt}
                fill
                className="object-cover object-center"
                draggable={false}
                priority={idx === 0}
              />
              {/* Slide label */}
              <div className="absolute bottom-4 left-4 flex items-center gap-2">
                <span className="rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md border border-white/10">
                  {slides[idx].label}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Prev / Next arrows */}
          <button
            onClick={() => paginate(-1)}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md border border-white/10 transition hover:bg-black/70"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => paginate(1)}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md border border-white/10 transition hover:bg-black/70"
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Dot indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(([p]) => [p + (i - idx), i > idx ? 1 : -1])}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === idx ? "w-5 bg-[#ff5c00]" : "w-1.5 bg-white/40"}`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </ContainerScroll>
    </div>
  );
}
