"use client";

import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { HeroGeometric } from "@/components/ui/shape-landing-hero";

export function Hero() {
  return (
    <HeroGeometric
      badge={siteConfig.socialProof}
      title1="We Turn Ideas Into"
      title2="Visual Impact"
      description="Video Editing · Graphic Design · Social Media · Web Development — one team, every deliverable."
    >
      {/* CTA buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 rounded-full bg-[#ff5c00] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#ff5c00]/30 transition-all duration-200 hover:bg-[#ff5c00]/90 hover:shadow-[#ff5c00]/50 hover:scale-105 active:scale-95"
        >
          See Our Work
          <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white/80 backdrop-blur-sm transition-all duration-200 hover:bg-white/10 hover:text-white hover:border-white/40 hover:scale-105 active:scale-95"
        >
          <Play className="h-4 w-4 fill-current" />
          Let&apos;s Talk
        </Link>
      </div>
    </HeroGeometric>
  );
}
