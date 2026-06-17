"use client";
import React, { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";

export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const scaleDimensions = () => {
    return isMobile ? [0.7, 0.9] : [1.05, 1];
  };

  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div
      className="relative h-[75rem] md:h-[80rem] flex items-center justify-center p-2 md:p-20"
      ref={containerRef}
    >
      <div
        className="py-6 md:py-40 w-full relative"
        style={{ perspective: "1000px" }}
      >
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} translate={translate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  );
};

export const Header = ({
  translate,
  titleComponent,
}: {
  translate: MotionValue<number>;
  titleComponent: React.ReactNode;
}) => {
  return (
    <motion.div
      style={{ translateY: translate }}
      className="max-w-5xl mx-auto text-center"
    >
      {titleComponent}
    </motion.div>
  );
};

export const Card = ({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  translate: MotionValue<number>;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex justify-center -mt-12 px-4 md:px-0">
      <motion.div
        style={{
          rotateX: rotate,
          scale,
          boxShadow:
            "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
        }}
        className="relative w-full max-w-[320px] md:w-[320px] border-[6px] border-[#3a3a3a] bg-[#1a1a1a] rounded-[48px] shadow-2xl select-none"
      >
        {/* Side buttons — volume up */}
        <div className="absolute -left-[9px] top-[88px] w-[4px] h-7 bg-[#444] rounded-l-full" />
        <div className="absolute -left-[9px] top-[124px] w-[4px] h-7 bg-[#444] rounded-l-full" />
        {/* Side button — power */}
        <div className="absolute -right-[9px] top-[108px] w-[4px] h-12 bg-[#444] rounded-r-full" />

        {/* Top speaker + Dynamic island */}
        <div className="flex justify-center items-center pt-3 pb-2 gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#2a2a2a] border border-zinc-700" />
          <div className="w-[88px] h-[26px] bg-black rounded-full" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#2a2a2a] border border-zinc-700" />
        </div>

        {/* ── Phone screen — the key fix: position relative + overflow hidden ── */}
        <div
          className="relative mx-[3px] mb-[3px] overflow-hidden rounded-[36px] bg-black"
          style={{ aspectRatio: "9 / 19.5" }}
        >
          {/* Children fill absolutely */}
          <div className="absolute inset-0">
            {children}
          </div>
        </div>

        {/* Home bar */}
        <div className="flex justify-center py-2.5">
          <div className="w-20 h-1 bg-[#555] rounded-full" />
        </div>
      </motion.div>
    </div>
  );
};
