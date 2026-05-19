"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface FaqItem {
  readonly q: string;
  readonly a: string;
}

export function FaqAccordion({
  items,
}: {
  items: readonly FaqItem[];
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={item.q} className="glass rounded-xl overflow-hidden">
          <button
            type="button"
            className="flex w-full items-center justify-between gap-4 p-5 text-left min-h-[44px]"
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
          >
            <span className="font-medium text-text-primary">{item.q}</span>
            <ChevronDown
              className={cn(
                "h-5 w-5 shrink-0 text-accent transition-transform",
                open === i && "rotate-180"
              )}
            />
          </button>
          <AnimatePresence>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <p className="px-5 pb-5 text-text-secondary">{item.a}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
