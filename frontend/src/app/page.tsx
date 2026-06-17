import { Hero } from "@/components/sections/Hero";
import { ServicesSnapshot } from "@/components/sections/ServicesSnapshot";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { ShowreelScroll } from "@/components/sections/ShowreelScroll";
import { StatsSection } from "@/components/sections/StatsSection";
import { Testimonials } from "@/components/sections/Testimonials";
import { ProcessTeaser } from "@/components/sections/ProcessTeaser";
import { CtaBanner } from "@/components/sections/CtaBanner";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesSnapshot />
      <WhyChooseUs />
      <ShowreelScroll />
      <StatsSection />
      <Testimonials />
      <ProcessTeaser />
      <CtaBanner />
    </>
  );
}
