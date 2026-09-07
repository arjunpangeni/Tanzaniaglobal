import { HomeHero } from "@/components/home/hero";
import { DestinationsStrip } from "@/components/home/destinations-strip";
import { StatsBar } from "@/components/home/stats-bar";
import { ServicesPreview } from "@/components/home/services-preview";
import { WhyUs } from "@/components/home/why-us";
import { HowItWorks } from "@/components/home/how-it-works";
import { Testimonials } from "@/components/home/testimonials";
import { Partners } from "@/components/home/partners";
import { FaqSection } from "@/components/home/faq-section";
import { CtaBand } from "@/components/home/cta-band";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <DestinationsStrip />
      <StatsBar />
      <ServicesPreview />
      <WhyUs />
      <HowItWorks />
      <Testimonials />
      <Partners />
      <FaqSection />
      <CtaBand />
    </>
  );
}
