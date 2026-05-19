"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Zap } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed left-1/2 z-50 -translate-x-1/2 transition-all duration-500",
          scrolled ? "top-4 w-auto" : "top-0 w-full"
        )}
      >
        <motion.nav
          layout
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className={cn(
            "flex items-center justify-between gap-6 transition-all duration-500",
            scrolled
              ? "mx-auto rounded-full border border-white/10 bg-black/50 px-5 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-2xl"
              : "container-main rounded-none border-none bg-transparent py-5"
          )}
        >
          {/* Logo */}
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="font-display text-xl font-bold tracking-tight text-white shrink-0"
          >
            Visualise<span className="text-[#ff5c00]">.Co</span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden items-center gap-6 lg:flex">
            {siteConfig.navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "relative text-sm transition-colors duration-200",
                      isActive ? "text-white font-medium" : "text-white/60 hover:text-white"
                    )}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-dot"
                        className="absolute -bottom-1 left-1/2 h-[3px] w-[3px] -translate-x-1/2 rounded-full bg-[#ff5c00]"
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* ── Desktop CTA — clean orange pill ── */}
          <Link
            href="/contact"
            className="hidden lg:inline-flex items-center gap-1.5 rounded-full bg-[#ff5c00] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#ff5c00]/25 transition-all duration-200 hover:bg-[#e04e00] hover:shadow-[#ff5c00]/40 hover:scale-105 active:scale-95"
          >
            <Zap className="h-3.5 w-3.5" />
            Let&apos;s Talk
          </Link>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-md lg:hidden"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <AnimatePresence mode="wait" initial={false}>
              {open ? (
                <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <X className="h-4 w-4 text-white" />
                </motion.span>
              ) : (
                <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <Menu className="h-4 w-4 text-white" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </motion.nav>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-40 flex flex-col pt-20 lg:hidden"
            style={{
              background: "linear-gradient(135deg, rgba(13,13,13,0.97) 0%, rgba(30,10,50,0.97) 100%)",
              backdropFilter: "blur(32px)",
            }}
          >
            <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(255,92,0,0.12) 0%, transparent 70%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(100,40,200,0.15) 0%, transparent 60%)" }} />
            <ul className="container-main relative flex flex-col gap-1 py-4">
              {siteConfig.navLinks.map((link, i) => {
                const isActive = pathname === link.href;
                return (
                  <motion.li key={link.href} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06, duration: 0.2 }}>
                    <Link href={link.href} onClick={() => setOpen(false)} className={cn("flex items-center justify-between rounded-xl px-4 py-4 text-lg font-medium transition-colors", isActive ? "text-white bg-white/5" : "text-white/60 hover:text-white hover:bg-white/5")}>
                      {link.label}
                      {isActive && <span className="h-2 w-2 rounded-full bg-[#ff5c00]" />}
                    </Link>
                  </motion.li>
                );
              })}
              <motion.li className="mt-4 px-0" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 w-full rounded-full bg-[#ff5c00] px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-[#ff5c00]/25 transition-all hover:bg-[#e04e00]"
                >
                  <Zap className="h-4 w-4" />
                  Let&apos;s Talk
                </Link>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
