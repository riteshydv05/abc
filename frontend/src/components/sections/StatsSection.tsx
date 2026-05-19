import { siteConfig } from "@/lib/site";
import { CountUp } from "@/components/motion/CountUp";
import { FadeInUp } from "@/components/motion/FadeInUp";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function StatsSection() {
  return (
    <section className="section-padding">
      <div className="container-main">
        <SectionHeading
          label="By The Numbers"
          title="Results That Speak"
          align="center"
        />
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {siteConfig.stats.map((stat, i) => (
            <FadeInUp key={stat.label} delay={i * 0.08}>
              <div className="glass rounded-2xl p-8 text-center">
                <p className="font-display text-4xl font-bold text-accent md:text-5xl">
                  <CountUp value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-2 text-sm text-text-secondary">{stat.label}</p>
              </div>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>
  );
}
