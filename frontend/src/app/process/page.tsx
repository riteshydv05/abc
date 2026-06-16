import { createMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/ui/PageHeader";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { CtaBanner } from "@/components/sections/CtaBanner";

export const metadata = createMetadata({
  title: "Process",
  description:
    "See how Visualise.Co works — from discovery call to delivery and support. A clear 6-step process.",
  path: "/process",
});

export default function ProcessPage() {
  return (
    <>
      <PageHeader
        label="Process"
        title="How We Work With You"
        description="No surprises. A transparent process from first call to final delivery."
      />

      <section className="section-padding pt-0">
        <div className="container-main max-w-4xl">
          <ProcessTimeline />
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
