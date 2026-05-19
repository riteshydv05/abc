"use client";
import React from "react";
import { motion } from "motion/react";

export interface Testimonial {
  text: string;
  image: string;
  name: string;
  role: string;
}

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{ translateY: "-50%" }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[...new Array(2).fill(0).map((_, index) => (
          <React.Fragment key={index}>
            {props.testimonials.map(({ text, image, name, role }, i) => (
              <div
                key={i}
                className="p-7 rounded-2xl border border-white/10 bg-white/[0.03] shadow-lg shadow-black/20 max-w-xs w-full backdrop-blur-sm"
              >
                {/* Quote mark */}
                <span className="text-accent text-2xl font-serif leading-none">&ldquo;</span>
                <p className="text-text-secondary text-sm leading-relaxed mt-1">{text}</p>
                <div className="flex items-center gap-3 mt-5">
                  <img
                    width={40}
                    height={40}
                    src={image}
                    alt={name}
                    className="h-10 w-10 rounded-full object-cover ring-2 ring-accent/30"
                  />
                  <div className="flex flex-col">
                    <div className="font-semibold text-sm text-text-primary tracking-tight leading-5">
                      {name}
                    </div>
                    <div className="text-xs text-text-secondary leading-5 opacity-70">
                      {role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))]}
      </motion.div>
    </div>
  );
};
