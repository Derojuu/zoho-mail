import React from "react";
import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingContactModal from "@/components/ui/FloatingContactModal";
import { CartSection } from "@/components/sections/CartSection";

export const metadata: Metadata = {
  title: "Zoho Mail Pricing & Plan Configurator | Business Email Cart",
  description:
    "Configure your Zoho Mail business email plan, customize user seats, connect your domain, and choose your local data residency region.",
};

export default function CartPage() {
  return (
    <>
      <Header />
      <main>
        <CartSection />
      </main>
      <Footer />
      <FloatingContactModal />
    </>
  );
}
