import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { TrustStrip } from "@/components/landing/TrustStrip";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { FeatureShowcase } from "@/components/landing/FeatureShowcase";
import { AIQAShowcase } from "@/components/landing/AIQAShowcase";
import { ClauseShowcase } from "@/components/landing/ClauseShowcase";
import { InsightsShowcase } from "@/components/landing/InsightsShowcase";
import { DocumentTypes } from "@/components/landing/DocumentTypes";
import { Testimonials } from "@/components/landing/Testimonials";
import { Pricing } from "@/components/landing/Pricing";
import { FAQ } from "@/components/landing/FAQ";
import { Disclaimer } from "@/components/landing/Disclaimer";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { Footer } from "@/components/landing/Footer";

export default function HomePage() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <TrustStrip />
      <HowItWorks />
      <FeatureShowcase />
      <AIQAShowcase />
      <ClauseShowcase />
      <InsightsShowcase />
      <DocumentTypes />
      <Testimonials />
      <Pricing />
      <FAQ />
      <Disclaimer />
      <FinalCTA />
      <Footer />
    </main>
  );
}
