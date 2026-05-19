import Link from "next/link";
import { Share2, Link2, Play } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { whatsappUrl } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-bg-secondary section-padding">
      <div className="container-main">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="font-display text-xl font-bold text-text-primary">
              Visualise<span className="text-accent">.Co</span>
            </Link>
            <p className="mt-4 text-sm text-text-secondary">{siteConfig.tagline}</p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-primary">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {siteConfig.footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-primary">
              Contact
            </h3>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li>
                <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-accent">
                  {siteConfig.contact.email}
                </a>
              </li>
              <li>
                <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`} className="hover:text-accent">
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li>{siteConfig.location.city}, {siteConfig.location.country}</li>
            </ul>
            <div className="mt-4">
              <Button href="/admin" variant="secondary" className="w-fit">
                Admin Login
              </Button>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-primary">
              Follow Us
            </h3>
            <div className="flex gap-4">
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full glass glass-hover text-text-secondary hover:text-accent"
                aria-label="Instagram"
              >
                <Share2 className="h-5 w-5" />
              </a>
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full glass glass-hover text-text-secondary hover:text-accent"
                aria-label="LinkedIn"
              >
                <Link2 className="h-5 w-5" />
              </a>
              <a
                href={siteConfig.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full glass glass-hover text-text-secondary hover:text-accent"
                aria-label="YouTube"
              >
                <Play className="h-5 w-5" />
              </a>
              <a
                href={siteConfig.social.behance}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full glass glass-hover text-text-secondary hover:text-accent text-xs font-bold"
                aria-label="Behance"
              >
                Be
              </a>
            </div>
            <a
              href={whatsappUrl(siteConfig.contact.whatsapp)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-sm text-accent hover:underline"
            >
              Chat on WhatsApp →
            </a>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 text-center text-sm text-text-secondary">
          © {year} {siteConfig.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
