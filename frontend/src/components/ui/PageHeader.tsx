import { FadeInUp } from "@/components/motion/FadeInUp";

export function PageHeader({
  label,
  title,
  description,
}: {
  label?: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="mesh-bg pt-32 pb-16 md:pt-40 md:pb-20">
      <div className="container-main">
        <FadeInUp>
          {label && (
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.15em] text-accent">
              {label}
            </p>
          )}
          <h1 className="font-display text-4xl font-bold tracking-tight text-text-primary md:text-5xl lg:text-6xl">
            {title}
          </h1>
          {description && (
            <p className="mt-4 max-w-2xl text-lg text-text-secondary">{description}</p>
          )}
        </FadeInUp>
      </div>
    </section>
  );
}
