import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { StickyMobileCTA } from "@/components/layout/StickyMobileCTA";
import { JsonLd } from "@/components/layout/JsonLd";
import { PageTransition } from "@/components/motion/PageTransition";
import { siteConfig } from "@/lib/site";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Digital Creative Agency`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "digital creative agency Varanasi",
    "video editing company India",
    "web development agency",
    "social media management",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable} h-full`}>
      <body className="min-h-full flex flex-col font-body antialiased bg-bg-primary text-text-primary pb-20 lg:pb-0">
        {/* ── Purple atmospheric background — visible through section scrolls ── */}
        <div
          aria-hidden="true"
          className="fixed inset-0 pointer-events-none"
          style={{ zIndex: 0 }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse 110% 60% at 50% 30%, rgba(90,20,180,0.20) 0%, rgba(60,10,120,0.12) 40%, transparent 70%)," +
                "radial-gradient(ellipse 80% 55% at 15% 65%, rgba(100,30,200,0.14) 0%, transparent 55%)," +
                "radial-gradient(ellipse 70% 50% at 85% 20%, rgba(120,40,220,0.10) 0%, transparent 55%)," +
                "radial-gradient(ellipse 60% 40% at 50% 85%, rgba(80,20,160,0.10) 0%, transparent 60%)",
            }}
          />
        </div>

        <JsonLd />
        <Navbar />
        <main className="flex-1 relative z-10">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
        <StickyMobileCTA />
      </body>
    </html>
  );
}

