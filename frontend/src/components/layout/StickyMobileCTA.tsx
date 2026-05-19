"use client";

import { MessageCircle, FileText } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { whatsappUrl } from "@/lib/utils";
import Link from "next/link";

export function StickyMobileCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 flex gap-2 border-t border-white/10 glass p-3 lg:hidden">
      <a
        href={whatsappUrl(siteConfig.contact.whatsapp)}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-1 items-center justify-center gap-2 rounded-full bg-success py-3 text-sm font-medium text-white min-h-[44px]"
      >
        <MessageCircle className="h-4 w-4" />
        Chat With Us
      </a>
      <Link
        href="/contact"
        className="flex flex-1 items-center justify-center gap-2 rounded-full bg-accent py-3 text-sm font-medium text-white min-h-[44px]"
      >
        <FileText className="h-4 w-4" />
        Get Quote
      </Link>
    </div>
  );
}
