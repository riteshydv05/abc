"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

const slides = [
  {
    src: "https://res.cloudinary.com/dbqau6whg/video/upload/v1781621758/1_a4czgw.mp4",
    label: "Showreel",
  },
  {
    src: "https://res.cloudinary.com/dbqau6whg/video/upload/v1781621789/2_2_wunuab.mp4",
    label: "Video Editing",
  },
  {
    src: "https://res.cloudinary.com/dbqau6whg/video/upload/v1781621789/3_1_quqi52.mp4",
    label: "Creative Production",
  },
];

/** Simple fade between slides — no x-slide so no "bleed outside" on clip */
const variants = {
  enter: { opacity: 0, scale: 1.04 },
  center: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.97 },
};

export function ShowreelScroll() {
  const [[page, dir], setPage] = useState([0, 0]);
  const idx = ((page % slides.length) + slides.length) % slides.length;
  const videoRef = useRef<HTMLVideoElement>(null);

  const paginate = useCallback(
    (newDir: number) => setPage(([p]) => [p + newDir, newDir]),
    []
  );

  // Reset & autoplay on slide change
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  }, [idx]);

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
        {/*
          Parent gives us an `absolute inset-0` box whose size is set by
          the phone-screen's aspect-ratio container. Everything here must
          fill that box absolutely.
        */}
        <div className="absolute inset-0 overflow-hidden bg-black">

          {/* Animated slide */}
          <AnimatePresence initial={false} custom={dir} mode="sync">
            <motion.div
              key={page}
              custom={dir}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <video
                ref={videoRef}
                src={slides[idx].src}
                controls
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 h-full w-full object-cover"
              />
            </motion.div>
          </AnimatePresence>

          {/* Slide label — top left */}
          <div className="absolute top-2 left-2 z-20 pointer-events-none">
            <span className="rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur-md border border-white/10">
              {slides[idx].label}
            </span>
          </div>

          {/* Prev arrow */}
          <button
            onClick={() => paginate(-1)}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 flex h-7 w-7 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md border border-white/10 transition hover:bg-black/70"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          {/* Next arrow */}
          <button
            onClick={() => paginate(1)}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 flex h-7 w-7 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md border border-white/10 transition hover:bg-black/70"
            aria-label="Next slide"
          >
            <ChevronRight className="h-4 w-4" />
          </button>

          {/* Dot indicators — sits above native video controls */}
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() =>
                  setPage(([p]) => [p + (i - idx), i > idx ? 1 : -1])
                }
                className={`h-1 rounded-full transition-all duration-300 ${
                  i === idx ? "w-4 bg-[#ff5c00]" : "w-1 bg-white/40"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

        </div>
      </ContainerScroll>
    </div>
  );
}
