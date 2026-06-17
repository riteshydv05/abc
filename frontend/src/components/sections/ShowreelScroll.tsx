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

const variants = {
  enter: { opacity: 0, scale: 1.04 },
  center: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.97 },
};

/** Shared slide content — used in both mobile and desktop layouts */
function SlideContent({
  page,
  dir,
  idx,
  videoRef,
  paginate,
  setPage,
}: {
  page: number;
  dir: number;
  idx: number;
  videoRef: React.RefObject<HTMLVideoElement>;
  paginate: (d: number) => void;
  setPage: React.Dispatch<React.SetStateAction<[number, number]>>;
}) {
  return (
    <>
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
      <div className="absolute top-3 left-3 z-20 pointer-events-none">
        <span className="rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur-md border border-white/10">
          {slides[idx].label}
        </span>
      </div>

      {/* Prev arrow */}
      <button
        onClick={() => paginate(-1)}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md border border-white/10 transition hover:bg-black/70"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {/* Next arrow */}
      <button
        onClick={() => paginate(1)}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md border border-white/10 transition hover:bg-black/70"
        aria-label="Next slide"
      >
        <ChevronRight className="h-4 w-4" />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
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
    </>
  );
}

export function ShowreelScroll() {
  const [[page, dir], setPage] = useState<[number, number]>([0, 0]);
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

  const titleComponent = (
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
        From cinematic reels to full brand identities — scroll to see how we
        bring ideas to life.
      </p>
    </div>
  );

  return (
    <div className="bg-bg-primary">
      {/* ── MOBILE: no phone frame, full-width video ── */}
      <section className="flex flex-col md:hidden">
        {/* Header */}
        <div className="flex flex-col items-center gap-4 pt-16 pb-8 px-6 text-center">
          {titleComponent}
        </div>

        {/* Full-width video carousel — 9:16 aspect ratio */}
        <div className="relative w-full overflow-hidden bg-black" style={{ aspectRatio: "9 / 16" }}>
          <SlideContent
            page={page}
            dir={dir}
            idx={idx}
            videoRef={videoRef}
            paginate={paginate}
            setPage={setPage}
          />
        </div>
      </section>

      {/* ── DESKTOP: phone mockup with scroll animation ── */}
      <div className="hidden md:flex flex-col overflow-hidden">
        <ContainerScroll titleComponent={titleComponent}>
          <div className="absolute inset-0 overflow-hidden bg-black">
            <SlideContent
              page={page}
              dir={dir}
              idx={idx}
              videoRef={videoRef}
              paginate={paginate}
              setPage={setPage}
            />
          </div>
        </ContainerScroll>
      </div>
    </div>
  );
}
