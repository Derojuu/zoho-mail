import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingContactModal from "@/components/ui/FloatingContactModal";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProblemsSection } from "@/components/sections/ProblemsSection";
import { TrustedSection } from "@/components/sections/TrustedSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { MigrationSection } from "@/components/sections/MigrationSection";
import { BenefitsSection } from "@/components/sections/BenefitsSection";
import { CtaSection } from "@/components/sections/CtaSection";
import { FaqSection } from "@/components/sections/FaqSection";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <div
          className="zw-template-inner ztrans-hero-ready ztrans-mailcover-ready"
          id="zw-template-inner"
        >
          <HeroSection />
          <ProblemsSection />
          <TrustedSection />
          <FeaturesSection />
          <MigrationSection />
          <BenefitsSection />
          <CtaSection />
          <FaqSection />
        </div>
      </main>
      <Footer />
      <FloatingContactModal />
    </>
  );
}
