import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { FadeInUp } from "@/components/motion/FadeInUp";

export function CtaBanner() {
  return (
    <section className="section-padding">
      <div className="container-main">
        <FadeInUp>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-accent/20 via-accent/10 to-transparent glass p-10 md:p-16 text-center">
            <div className="absolute inset-0 bg-accent/5 pointer-events-none" />
            <div className="relative z-10">
              <h2 className="font-display text-3xl font-bold text-text-primary md:text-4xl lg:text-5xl">
                Ready to Grow Your Brand?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-text-secondary">
                Let&apos;s turn your vision into something your audience can&apos;t ignore.
              </p>
              <div className="mt-8">
                <Button href="/contact" variant="primary" className="text-base px-8">
                  Start a Project
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </FadeInUp>
      </div>
    </section>
  );
}
