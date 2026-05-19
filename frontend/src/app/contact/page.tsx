import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { whatsappUrl } from "@/lib/utils";
import { createMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import { ContactForm } from "@/components/sections/ContactForm";
import { FadeInUp } from "@/components/motion/FadeInUp";

export const metadata = createMetadata({
  title: "Contact",
  description:
    "Get in touch with Visualise.Co — video editing, web development, and social media agency in Varanasi, India.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHeader
        label="Contact"
        title="Let's Build Something Great"
        description={siteConfig.contact.responseTime}
      />

      <section className="section-padding pt-0">
        <div className="container-main grid gap-12 lg:grid-cols-2">
          <FadeInUp>
            <ContactForm />
          </FadeInUp>

          <FadeInUp delay={0.1} className="space-y-6">
            <Button
              href={whatsappUrl(siteConfig.contact.whatsapp)}
              variant="whatsapp"
              external
              className="w-full"
            >
              <MessageCircle className="h-5 w-5" />
              Chat on WhatsApp
            </Button>

            <div className="glass rounded-2xl p-6 space-y-4">
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="flex items-center gap-3 text-text-secondary hover:text-accent transition-colors"
              >
                <Mail className="h-5 w-5 text-accent" />
                {siteConfig.contact.email}
              </a>
              <a
                href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-3 text-text-secondary hover:text-accent transition-colors"
              >
                <Phone className="h-5 w-5 text-accent" />
                {siteConfig.contact.phone}
              </a>
              <p className="flex items-start gap-3 text-text-secondary">
                <MapPin className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                {siteConfig.location.address}
              </p>
            </div>

            <div className="glass rounded-2xl overflow-hidden aspect-video">
              <iframe
                src={siteConfig.location.mapEmbed}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: 280 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Visualise.Co location map"
              />
            </div>
          </FadeInUp>
        </div>
      </section>
    </>
  );
}
