"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { PRICING_PLANS } from "@/constants";
import type { CartSelection } from "@/types";
import { formatCurrency } from "@/utils";
import {
  HugeiconsIcon,
  ShoppingCart01Icon,
  CheckmarkCircle02Icon,
  Shield01Icon,
  Add01Icon,
  Remove01Icon,
  Delete02Icon,
  CreditCardIcon,
  LockPasswordIcon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
  Globe02Icon,
  CustomerSupportIcon,
  SparklesIcon,
} from "@/lib/icons";

interface AddOnItem {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  annualPrice: number;
  perSeat: boolean;
}

const OPTIONAL_ADDONS: AddOnItem[] = [
  {
    id: "extra-storage-25gb",
    name: "Extra 25 GB Storage",
    description: "Expand mailbox capacity by 25 GB per user for large attachments and media",
    monthlyPrice: 2.0,
    annualPrice: 1.5,
    perSeat: true,
  },
  {
    id: "email-archiving-ediscovery",
    name: "Email Archiving & eDiscovery",
    description: "Compliance-ready retention policies, legal hold, and instant audit search",
    monthlyPrice: 1.5,
    annualPrice: 1.15,
    perSeat: true,
  },
  {
    id: "dedicated-ip",
    name: "Dedicated IP Address",
    description: "Isolated outbound sending reputation with automated warmup & PTR setup",
    monthlyPrice: 19.0,
    annualPrice: 15.0,
    perSeat: false,
  },
];

const DATA_CENTERS = [
  { code: "US", label: "United States (US — Virginia & Oregon)" },
  { code: "EU", label: "European Union (EU — Amsterdam & Dublin)" },
  { code: "IN", label: "India (IN — Chennai & Mumbai)" },
  { code: "AU", label: "Australia (AU — Sydney)" },
  { code: "JP", label: "Japan (JP — Tokyo)" },
  { code: "CA", label: "Canada (CA — Montreal)" },
];

const PROMO_CODES: Record<string, { discountPercent: number; label: string }> = {
  ZOHO20: { discountPercent: 20, label: "20% Switcher Discount" },
  SWITCH25: { discountPercent: 25, label: "25% Migration Special" },
  WELCOME10: { discountPercent: 10, label: "10% New Customer Offer" },
};

export function CartSection() {
  const [cart, setCart] = useState<CartSelection>({
    planId: "mail-premium",
    seats: 10,
    billingCycle: "annual",
    domainOption: "existing",
    domainName: "yourcompany.com",
    addOns: ["email-archiving-ediscovery"],
  });

  const [domainInput, setDomainInput] = useState<string>("yourcompany.com");
  const [selectedTld, setSelectedTld] = useState<string>(".com");
  const [domainStatus, setDomainStatus] = useState<
    "idle" | "checking" | "available" | "verified"
  >("verified");
  const [dataCenter, setDataCenter] = useState<string>("US");
  const [promoInput, setPromoInput] = useState<string>("");
  const [appliedPromo, setAppliedPromo] = useState<string | null>("ZOHO20");
  const [promoError, setPromoError] = useState<string | null>(null);
  const [checkoutStep, setCheckoutStep] = useState<"configure" | "success">(
    "configure"
  );
  const [companyName, setCompanyName] = useState<string>("Acme Corporation");
  const [adminEmail, setAdminEmail] = useState<string>("it-admin@yourcompany.com");
  const [orderReference, setOrderReference] = useState<string>("ZM-948201");

  const selectedPlan = useMemo(
    () =>
      PRICING_PLANS.find((p) => p.id === cart.planId) ?? PRICING_PLANS[2],
    [cart.planId]
  );

  const isAnnual = cart.billingCycle === "annual";
  const monthsMultiplier = isAnnual ? 12 : 1;

  const unitPlanPrice = isAnnual
    ? selectedPlan.annualPrice
    : selectedPlan.monthlyPrice;

  const planSubtotal = unitPlanPrice * cart.seats * monthsMultiplier;

  const regularMonthlyEquivalent =
    selectedPlan.monthlyPrice * cart.seats * monthsMultiplier;
  const annualCycleSavings = isAnnual
    ? Math.max(0, regularMonthlyEquivalent - planSubtotal)
    : 0;

  const addOnsBreakdown = useMemo(() => {
    return OPTIONAL_ADDONS.filter((addon) => cart.addOns.includes(addon.id)).map(
      (addon) => {
        const unit = isAnnual ? addon.annualPrice : addon.monthlyPrice;
        const qty = addon.perSeat ? cart.seats : 1;
        const lineTotal = unit * qty * monthsMultiplier;
        return {
          ...addon,
          unit,
          qty,
          lineTotal,
        };
      }
    );
  }, [cart.addOns, cart.seats, isAnnual, monthsMultiplier]);

  const addOnsTotal = useMemo(
    () => addOnsBreakdown.reduce((acc, item) => acc + item.lineTotal, 0),
    [addOnsBreakdown]
  );

  const domainRegistrationCost =
    cart.domainOption === "new" && domainStatus === "available" ? 12.0 : 0;

  const subtotalBeforePromo =
    planSubtotal + addOnsTotal + domainRegistrationCost;

  const promoDiscountAmount = useMemo(() => {
    if (!appliedPromo || !PROMO_CODES[appliedPromo]) return 0;
    return (subtotalBeforePromo * PROMO_CODES[appliedPromo].discountPercent) / 100;
  }, [appliedPromo, subtotalBeforePromo]);

  const finalTotal = Math.max(0, subtotalBeforePromo - promoDiscountAmount);

  const handleSeatChange = (nextSeats: number) => {
    const clamped = Math.max(1, Math.min(1000, nextSeats));
    setCart((prev) => ({ ...prev, seats: clamped }));
  };

  const toggleAddOn = (addonId: string) => {
    setCart((prev) => {
      const exists = prev.addOns.includes(addonId);
      return {
        ...prev,
        addOns: exists
          ? prev.addOns.filter((id) => id !== addonId)
          : [...prev.addOns, addonId],
      };
    });
  };

  const handleCheckDomain = () => {
    const cleaned = domainInput.trim().toLowerCase().replace(/^https?:\/\//, "");
    if (!cleaned) return;
    setDomainStatus("checking");
    setTimeout(() => {
      if (cart.domainOption === "new") {
        const base = cleaned.split(".")[0] || "yourcompany";
        const fullDomain = `${base}${selectedTld}`;
        setDomainInput(fullDomain);
        setCart((prev) => ({ ...prev, domainName: fullDomain }));
        setDomainStatus("available");
      } else {
        const finalDom = cleaned.includes(".") ? cleaned : `${cleaned}.com`;
        setDomainInput(finalDom);
        setCart((prev) => ({ ...prev, domainName: finalDom }));
        setDomainStatus("verified");
      }
    }, 350);
  };

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoInput.trim().toUpperCase();
    if (!code) return;
    if (PROMO_CODES[code]) {
      setAppliedPromo(code);
      setPromoError(null);
      setPromoInput("");
    } else {
      setPromoError("Invalid promo code. Try ZOHO20, SWITCH25, or WELCOME10.");
    }
  };

  const handleCompleteCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    const randomRef = `ZM-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderReference(randomRef);
    setCheckoutStep("success");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f8fafd",
        color: "#161619",
        fontFamily: "var(--primaryfont-regular), sans-serif",
      }}
    >
      {/* Top Navigation Bar */}
      <header
        style={{
          backgroundColor: "#ffffff",
          borderBottom: "1px solid #e6ebf2",
          position: "sticky",
          top: 0,
          zIndex: 50,
          boxShadow: "0 2px 12px rgba(8, 102, 254, 0.04)",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "16px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <Link
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                color: "#0866fe",
                textDecoration: "none",
                fontFamily: "var(--primaryfont-semibold), sans-serif",
                fontSize: "14px",
                padding: "8px 14px",
                borderRadius: "8px",
                backgroundColor: "#f3f9ff",
                border: "1px solid #d0e4ff",
              }}
            >
              <HugeiconsIcon icon={ArrowLeft01Icon} size={18} />
              <span>Back to Zoho Mail</span>
            </Link>

            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <img
                src="/images/logos/zoho-mail-logo.svg"
                alt="Zoho Mail"
                width={120}
                height={36}
                style={{ height: "32px", width: "auto" }}
              />
              <span
                style={{
                  fontFamily: "var(--primaryfont-bold), sans-serif",
                  fontSize: "20px",
                  color: "#161619",
                  letterSpacing: "-0.02em",
                }}
              >
                Mail
              </span>
              <span
                style={{
                  fontSize: "12px",
                  fontFamily: "var(--primaryfont-semibold), sans-serif",
                  backgroundColor: "#eef5ff",
                  color: "#0866fe",
                  padding: "3px 10px",
                  borderRadius: "999px",
                }}
              >
                Plan Configurator &amp; Checkout
              </span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              fontSize: "13px",
              color: "#4b5563",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <HugeiconsIcon icon={Shield01Icon} size={18} color="#0866fe" />
              <span>ISO 27001, SOC 2 &amp; GDPR Compliant</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <HugeiconsIcon
                icon={CustomerSupportIcon}
                size={18}
                color="#0866fe"
              />
              <span>24×7 Human Engineer Support</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "40px 24px 80px",
        }}
      >
        {/* Hero Banner */}
        <div
          style={{
            background:
              "linear-gradient(135deg, #ffffff 0%, #f3f9ff 65%, #e6f1ff 100%)",
            border: "1px solid #d8e8ff",
            borderRadius: "20px",
            padding: "32px 36px",
            marginBottom: "36px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "24px",
            boxShadow: "0 12px 32px rgba(8, 102, 254, 0.06)",
          }}
        >
          <div style={{ maxWidth: "680px" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                backgroundColor: "#ffffff",
                border: "1px solid #cce0ff",
                color: "#0866fe",
                padding: "4px 12px",
                borderRadius: "999px",
                fontSize: "13px",
                fontFamily: "var(--primaryfont-semibold), sans-serif",
                marginBottom: "12px",
              }}
            >
              <HugeiconsIcon icon={SparklesIcon} size={15} />
              <span>Mix &amp; match plans • 15-day risk-free trial included</span>
            </div>
            <h1
              style={{
                fontFamily: "var(--primaryfont-bold), sans-serif",
                fontSize: "clamp(26px, 3.5vw, 38px)",
                lineHeight: 1.2,
                color: "#161619",
                margin: "0 0 10px",
              }}
            >
              Configure your{" "}
              <span className="zwc-gradient-text">Zoho Mail</span> workspace
            </h1>
            <p
              style={{
                fontSize: "16px",
                lineHeight: 1.6,
                color: "#4b5563",
                margin: 0,
              }}
            >
              Transparent, predictable pricing with zero ad-profiling. Save up
              to 60% compared to Google Workspace and Microsoft 365.
            </p>
          </div>

          {/* Billing Cycle Toggle */}
          <div
            style={{
              backgroundColor: "#ffffff",
              padding: "8px",
              borderRadius: "14px",
              border: "1px solid #dce6f5",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              boxShadow: "0 4px 14px rgba(0,0,0,0.03)",
            }}
          >
            <button
              type="button"
              onClick={() =>
                setCart((prev) => ({ ...prev, billingCycle: "annual" }))
              }
              style={{
                padding: "10px 18px",
                borderRadius: "10px",
                border: "none",
                cursor: "pointer",
                fontFamily: "var(--primaryfont-semibold), sans-serif",
                fontSize: "14px",
                backgroundColor: isAnnual ? "#0866fe" : "transparent",
                color: isAnnual ? "#ffffff" : "#4b5563",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                transition: "all 0.2s ease",
              }}
            >
              <span>Annual Billing</span>
              <span
                style={{
                  fontSize: "11px",
                  padding: "2px 8px",
                  borderRadius: "999px",
                  backgroundColor: isAnnual ? "#ffffff" : "#e42527",
                  color: isAnnual ? "#0866fe" : "#ffffff",
                  fontFamily: "var(--primaryfont-bold), sans-serif",
                }}
              >
                SAVE 20%
              </span>
            </button>

            <button
              type="button"
              onClick={() =>
                setCart((prev) => ({ ...prev, billingCycle: "monthly" }))
              }
              style={{
                padding: "10px 18px",
                borderRadius: "10px",
                border: "none",
                cursor: "pointer",
                fontFamily: "var(--primaryfont-semibold), sans-serif",
                fontSize: "14px",
                backgroundColor: !isAnnual ? "#0866fe" : "transparent",
                color: !isAnnual ? "#ffffff" : "#4b5563",
                transition: "all 0.2s ease",
              }}
            >
              Monthly Billing
            </button>
          </div>
        </div>

        {checkoutStep === "success" ? (
          <div
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid #d8e8ff",
              borderRadius: "20px",
              padding: "48px 36px",
              maxWidth: "760px",
              margin: "0 auto",
              textAlign: "center",
              boxShadow: "0 16px 40px rgba(8, 102, 254, 0.08)",
            }}
          >
            <div
              style={{
                width: "68px",
                height: "68px",
                borderRadius: "50%",
                backgroundColor: "#ecfdf5",
                color: "#059669",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px",
              }}
            >
              <HugeiconsIcon icon={CheckmarkCircle02Icon} size={38} />
            </div>

            <span
              style={{
                fontSize: "13px",
                fontFamily: "var(--primaryfont-bold), sans-serif",
                color: "#0866fe",
                backgroundColor: "#f3f9ff",
                padding: "5px 14px",
                borderRadius: "999px",
              }}
            >
              Order Reference #{orderReference}
            </span>

            <h2
              style={{
                fontFamily: "var(--primaryfont-bold), sans-serif",
                fontSize: "30px",
                color: "#161619",
                margin: "16px 0 10px",
              }}
            >
              Your Zoho Mail workspace is ready!
            </h2>
            <p
              style={{
                fontSize: "16px",
                color: "#4b5563",
                maxWidth: "540px",
                margin: "0 auto 28px",
                lineHeight: 1.6,
              }}
            >
              We&apos;ve provisioned <strong>{cart.seats} user seats</strong> on{" "}
              <strong>{selectedPlan.name}</strong> for{" "}
              <strong>{cart.domainName}</strong> in the{" "}
              <strong>{dataCenter}</strong> data center.
            </p>

            <div
              style={{
                backgroundColor: "#f8fafd",
                border: "1px solid #e5edf7",
                borderRadius: "14px",
                padding: "20px 24px",
                textAlign: "left",
                marginBottom: "28px",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "16px",
              }}
            >
              <div>
                <div style={{ fontSize: "12px", color: "#6b7280" }}>
                  Organization
                </div>
                <div
                  style={{
                    fontFamily: "var(--primaryfont-semibold), sans-serif",
                    fontSize: "15px",
                  }}
                >
                  {companyName}
                </div>
              </div>
              <div>
                <div style={{ fontSize: "12px", color: "#6b7280" }}>
                  Primary Domain
                </div>
                <div
                  style={{
                    fontFamily: "var(--primaryfont-semibold), sans-serif",
                    fontSize: "15px",
                  }}
                >
                  {cart.domainName}
                </div>
              </div>
              <div>
                <div style={{ fontSize: "12px", color: "#6b7280" }}>
                  Admin Console Login
                </div>
                <div
                  style={{
                    fontFamily: "var(--primaryfont-semibold), sans-serif",
                    fontSize: "15px",
                  }}
                >
                  {adminEmail}
                </div>
              </div>
              <div>
                <div style={{ fontSize: "12px", color: "#6b7280" }}>
                  Total Billed ({isAnnual ? "Annual" : "Monthly"})
                </div>
                <div
                  style={{
                    fontFamily: "var(--primaryfont-bold), sans-serif",
                    fontSize: "16px",
                    color: "#0866fe",
                  }}
                >
                  {formatCurrency(finalTotal)}
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "14px",
                flexWrap: "wrap",
              }}
            >
              <button
                type="button"
                onClick={() => setCheckoutStep("configure")}
                style={{
                  padding: "12px 22px",
                  borderRadius: "10px",
                  border: "1px solid #cbd5e1",
                  backgroundColor: "#ffffff",
                  color: "#161619",
                  fontFamily: "var(--primaryfont-semibold), sans-serif",
                  fontSize: "14px",
                  cursor: "pointer",
                }}
              >
                Modify Configuration
              </button>
              <Link
                href="/"
                style={{
                  padding: "12px 24px",
                  borderRadius: "10px",
                  backgroundColor: "#e42527",
                  color: "#ffffff",
                  fontFamily: "var(--primaryfont-semibold), sans-serif",
                  fontSize: "14px",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <span>Return to Zoho Mail Home</span>
                <HugeiconsIcon icon={ArrowRight01Icon} size={18} />
              </Link>
            </div>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
              gap: "32px",
              alignItems: "start",
            }}
          >
            {/* Left Column: Configuration Steps */}
            <div
              style={{
                gridColumn: "span 1",
                display: "flex",
                flexDirection: "column",
                gap: "28px",
              }}
            >
              {/* Step 1: Select Plan */}
              <section
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "18px",
                  border: "1px solid #e6ebf2",
                  padding: "28px",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.03)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "20px",
                  }}
                >
                  <span
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                      backgroundColor: "#0866fe",
                      color: "#ffffff",
                      fontFamily: "var(--primaryfont-bold), sans-serif",
                      fontSize: "14px",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    1
                  </span>
                  <div>
                    <h2
                      style={{
                        fontFamily: "var(--primaryfont-bold), sans-serif",
                        fontSize: "20px",
                        margin: 0,
                      }}
                    >
                      Choose your Zoho Mail plan
                    </h2>
                    <p
                      style={{
                        fontSize: "13px",
                        color: "#6b7280",
                        margin: "2px 0 0",
                      }}
                    >
                      All plans include custom domain email, SPF/DKIM/DMARC, and
                      24×7 human support.
                    </p>
                  </div>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
                    gap: "16px",
                  }}
                >
                  {PRICING_PLANS.map((plan) => {
                    const isSelected = plan.id === cart.planId;
                    const price = isAnnual
                      ? plan.annualPrice
                      : plan.monthlyPrice;

                    return (
                      <div
                        key={plan.id}
                        onClick={() =>
                          setCart((prev) => ({ ...prev, planId: plan.id }))
                        }
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            setCart((prev) => ({ ...prev, planId: plan.id }));
                          }
                        }}
                        style={{
                          borderRadius: "14px",
                          padding: "20px",
                          cursor: "pointer",
                          position: "relative",
                          border: isSelected
                            ? "2px solid #0866fe"
                            : "1px solid #e2e8f0",
                          backgroundColor: isSelected ? "#f3f9ff" : "#ffffff",
                          transition: "all 0.2s ease",
                        }}
                      >
                        {plan.popular && (
                          <span
                            style={{
                              position: "absolute",
                              top: "-11px",
                              right: "14px",
                              backgroundColor: "#e42527",
                              color: "#ffffff",
                              fontSize: "11px",
                              fontFamily: "var(--primaryfont-bold), sans-serif",
                              padding: "3px 10px",
                              borderRadius: "999px",
                              letterSpacing: "0.03em",
                            }}
                          >
                            MOST POPULAR
                          </span>
                        )}

                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginBottom: "6px",
                          }}
                        >
                          <h3
                            style={{
                              fontFamily: "var(--primaryfont-bold), sans-serif",
                              fontSize: "16px",
                              margin: 0,
                              color: "#161619",
                            }}
                          >
                            {plan.name}
                          </h3>
                          {isSelected && (
                            <HugeiconsIcon
                              icon={CheckmarkCircle02Icon}
                              size={20}
                              color="#0866fe"
                            />
                          )}
                        </div>

                        <p
                          style={{
                            fontSize: "12px",
                            color: "#6b7280",
                            margin: "0 0 14px",
                            minHeight: "34px",
                          }}
                        >
                          {plan.tagline}
                        </p>

                        <div
                          style={{
                            display: "flex",
                            alignItems: "baseline",
                            gap: "4px",
                            marginBottom: "10px",
                          }}
                        >
                          <span
                            style={{
                              fontFamily: "var(--primaryfont-bold), sans-serif",
                              fontSize: "26px",
                              color: "#161619",
                            }}
                          >
                            {formatCurrency(price)}
                          </span>
                          <span style={{ fontSize: "12px", color: "#6b7280" }}>
                            /user/mo {isAnnual ? "billed annually" : ""}
                          </span>
                        </div>

                        <div
                          style={{
                            fontSize: "12px",
                            fontFamily:
                              "var(--primaryfont-semibold), sans-serif",
                            color: "#0866fe",
                            backgroundColor: isSelected ? "#ffffff" : "#f3f9ff",
                            padding: "5px 10px",
                            borderRadius: "8px",
                            marginBottom: "14px",
                            display: "inline-block",
                          }}
                        >
                          {plan.storage}
                        </div>

                        <ul
                          style={{
                            listStyle: "none",
                            padding: 0,
                            margin: 0,
                            display: "flex",
                            flexDirection: "column",
                            gap: "7px",
                          }}
                        >
                          {plan.features.map((feat, idx) => (
                            <li
                              key={idx}
                              style={{
                                fontSize: "12.5px",
                                color: "#374151",
                                display: "flex",
                                alignItems: "flex-start",
                                gap: "6px",
                              }}
                            >
                              <HugeiconsIcon
                                icon={CheckmarkCircle02Icon}
                                size={15}
                                color="#0866fe"
                                style={{ flexShrink: 0, marginTop: "2px" }}
                              />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* Step 2: Team Size & Data Residency */}
              <section
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "18px",
                  border: "1px solid #e6ebf2",
                  padding: "28px",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.03)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "20px",
                  }}
                >
                  <span
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                      backgroundColor: "#0866fe",
                      color: "#ffffff",
                      fontFamily: "var(--primaryfont-bold), sans-serif",
                      fontSize: "14px",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    2
                  </span>
                  <div>
                    <h2
                      style={{
                        fontFamily: "var(--primaryfont-bold), sans-serif",
                        fontSize: "20px",
                        margin: 0,
                      }}
                    >
                      Configure User Seats &amp; Data Center
                    </h2>
                    <p
                      style={{
                        fontSize: "13px",
                        color: "#6b7280",
                        margin: "2px 0 0",
                      }}
                    >
                      Scale effortlessly from 1 user to 500+ seats with
                      guaranteed data residency.
                    </p>
                  </div>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                    gap: "20px",
                    alignItems: "center",
                  }}
                >
                  {/* Seat Counter */}
                  <div
                    style={{
                      backgroundColor: "#f8fafd",
                      padding: "18px",
                      borderRadius: "14px",
                      border: "1px solid #e2e8f0",
                    }}
                  >
                    <label
                      htmlFor="cart-seat-input"
                      style={{
                        display: "block",
                        fontFamily: "var(--primaryfont-semibold), sans-serif",
                        fontSize: "13px",
                        marginBottom: "10px",
                        color: "#374151",
                      }}
                    >
                      Number of User Mailboxes
                    </label>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <button
                        type="button"
                        aria-label="Decrease user seats"
                        onClick={() => handleSeatChange(cart.seats - 1)}
                        style={{
                          width: "38px",
                          height: "38px",
                          borderRadius: "10px",
                          border: "1px solid #cbd5e1",
                          backgroundColor: "#ffffff",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                        }}
                      >
                        <HugeiconsIcon icon={Remove01Icon} size={18} />
                      </button>

                      <input
                        id="cart-seat-input"
                        type="number"
                        min={1}
                        max={1000}
                        value={cart.seats}
                        onChange={(e) =>
                          handleSeatChange(parseInt(e.target.value, 10) || 1)
                        }
                        style={{
                          width: "84px",
                          height: "38px",
                          textAlign: "center",
                          fontFamily: "var(--primaryfont-bold), sans-serif",
                          fontSize: "16px",
                          borderRadius: "10px",
                          border: "1px solid #cbd5e1",
                          backgroundColor: "#ffffff",
                        }}
                      />

                      <button
                        type="button"
                        aria-label="Increase user seats"
                        onClick={() => handleSeatChange(cart.seats + 1)}
                        style={{
                          width: "38px",
                          height: "38px",
                          borderRadius: "10px",
                          border: "1px solid #cbd5e1",
                          backgroundColor: "#ffffff",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                        }}
                      >
                        <HugeiconsIcon icon={Add01Icon} size={18} />
                      </button>
                    </div>

                    {/* Quick Presets */}
                    <div
                      style={{
                        display: "flex",
                        gap: "6px",
                        marginTop: "12px",
                        flexWrap: "wrap",
                      }}
                    >
                      {[5, 10, 25, 50, 100, 250].map((preset) => (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => handleSeatChange(preset)}
                          style={{
                            padding: "4px 10px",
                            fontSize: "12px",
                            borderRadius: "6px",
                            border:
                              cart.seats === preset
                                ? "1px solid #0866fe"
                                : "1px solid #dbe3ef",
                            backgroundColor:
                              cart.seats === preset ? "#0866fe" : "#ffffff",
                            color:
                              cart.seats === preset ? "#ffffff" : "#4b5563",
                            cursor: "pointer",
                            fontFamily:
                              "var(--primaryfont-semibold), sans-serif",
                          }}
                        >
                          {preset} seats
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Data Center Selector */}
                  <div
                    style={{
                      backgroundColor: "#f8fafd",
                      padding: "18px",
                      borderRadius: "14px",
                      border: "1px solid #e2e8f0",
                    }}
                  >
                    <label
                      htmlFor="data-center-select"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        fontFamily: "var(--primaryfont-semibold), sans-serif",
                        fontSize: "13px",
                        marginBottom: "10px",
                        color: "#374151",
                      }}
                    >
                      <HugeiconsIcon
                        icon={Globe02Icon}
                        size={16}
                        color="#0866fe"
                      />
                      <span>Data Residency Region</span>
                    </label>
                    <select
                      id="data-center-select"
                      value={dataCenter}
                      onChange={(e) => setDataCenter(e.target.value)}
                      style={{
                        width: "100%",
                        height: "40px",
                        borderRadius: "10px",
                        border: "1px solid #cbd5e1",
                        padding: "0 12px",
                        backgroundColor: "#ffffff",
                        fontFamily: "var(--primaryfont-regular), sans-serif",
                        fontSize: "14px",
                        color: "#161619",
                      }}
                    >
                      {DATA_CENTERS.map((dc) => (
                        <option key={dc.code} value={dc.code}>
                          {dc.label}
                        </option>
                      ))}
                    </select>
                    <p
                      style={{
                        fontSize: "12px",
                        color: "#6b7280",
                        margin: "10px 0 0",
                      }}
                    >
                      100% of your emails, calendars, and backups stay strictly
                      within your chosen jurisdiction.
                    </p>
                  </div>
                </div>
              </section>

              {/* Step 3: Domain Configuration */}
              <section
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "18px",
                  border: "1px solid #e6ebf2",
                  padding: "28px",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.03)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "20px",
                  }}
                >
                  <span
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                      backgroundColor: "#0866fe",
                      color: "#ffffff",
                      fontFamily: "var(--primaryfont-bold), sans-serif",
                      fontSize: "14px",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    3
                  </span>
                  <div>
                    <h2
                      style={{
                        fontFamily: "var(--primaryfont-bold), sans-serif",
                        fontSize: "20px",
                        margin: 0,
                      }}
                    >
                      Connect or Register Your Domain
                    </h2>
                    <p
                      style={{
                        fontSize: "13px",
                        color: "#6b7280",
                        margin: "2px 0 0",
                      }}
                    >
                      Set up custom @yourcompany.com addresses with automated
                      SPF, DKIM, and DMARC wizard.
                    </p>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: "12px",
                    marginBottom: "18px",
                    flexWrap: "wrap",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => {
                      setCart((prev) => ({
                        ...prev,
                        domainOption: "existing",
                      }));
                      setDomainStatus("verified");
                    }}
                    style={{
                      padding: "10px 18px",
                      borderRadius: "10px",
                      border:
                        cart.domainOption === "existing"
                          ? "2px solid #0866fe"
                          : "1px solid #cbd5e1",
                      backgroundColor:
                        cart.domainOption === "existing"
                          ? "#f3f9ff"
                          : "#ffffff",
                      fontFamily: "var(--primaryfont-semibold), sans-serif",
                      fontSize: "13.5px",
                      cursor: "pointer",
                      color: "#161619",
                    }}
                  >
                    I already own a domain (Free setup)
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setCart((prev) => ({ ...prev, domainOption: "new" }));
                      setDomainStatus("available");
                    }}
                    style={{
                      padding: "10px 18px",
                      borderRadius: "10px",
                      border:
                        cart.domainOption === "new"
                          ? "2px solid #0866fe"
                          : "1px solid #cbd5e1",
                      backgroundColor:
                        cart.domainOption === "new" ? "#f3f9ff" : "#ffffff",
                      fontFamily: "var(--primaryfont-semibold), sans-serif",
                      fontSize: "13.5px",
                      cursor: "pointer",
                      color: "#161619",
                    }}
                  >
                    Register a new domain ($12.00/yr)
                  </button>
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    flexWrap: "wrap",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      flex: 1,
                      minWidth: "220px",
                      display: "flex",
                      alignItems: "center",
                      border: "1px solid #cbd5e1",
                      borderRadius: "10px",
                      padding: "0 12px",
                      backgroundColor: "#ffffff",
                    }}
                  >
                    <HugeiconsIcon
                      icon={Globe02Icon}
                      size={18}
                      color="#6b7280"
                    />
                    <input
                      type="text"
                      value={domainInput}
                      onChange={(e) => {
                        setDomainInput(e.target.value);
                        setDomainStatus("idle");
                      }}
                      placeholder="yourcompany.com"
                      aria-label="Domain name"
                      style={{
                        border: "none",
                        outline: "none",
                        width: "100%",
                        height: "42px",
                        padding: "0 10px",
                        fontSize: "14px",
                        fontFamily: "var(--primaryfont-regular), sans-serif",
                      }}
                    />
                  </div>

                  {cart.domainOption === "new" && (
                    <select
                      aria-label="Select domain extension"
                      value={selectedTld}
                      onChange={(e) => setSelectedTld(e.target.value)}
                      style={{
                        height: "44px",
                        borderRadius: "10px",
                        border: "1px solid #cbd5e1",
                        padding: "0 12px",
                        fontFamily: "var(--primaryfont-semibold), sans-serif",
                        fontSize: "14px",
                      }}
                    >
                      <option value=".com">.com</option>
                      <option value=".org">.org</option>
                      <option value=".io">.io</option>
                      <option value=".net">.net</option>
                      <option value=".co">.co</option>
                    </select>
                  )}

                  <button
                    type="button"
                    onClick={handleCheckDomain}
                    style={{
                      height: "44px",
                      padding: "0 20px",
                      borderRadius: "10px",
                      border: "none",
                      backgroundColor: "#0866fe",
                      color: "#ffffff",
                      fontFamily: "var(--primaryfont-semibold), sans-serif",
                      fontSize: "14px",
                      cursor: "pointer",
                    }}
                  >
                    {domainStatus === "checking"
                      ? "Checking..."
                      : cart.domainOption === "new"
                        ? "Check Availability"
                        : "Verify Domain"}
                  </button>
                </div>

                {domainStatus === "verified" && (
                  <div
                    style={{
                      marginTop: "12px",
                      fontSize: "13px",
                      color: "#059669",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <HugeiconsIcon icon={CheckmarkCircle02Icon} size={16} />
                    <span>
                      <strong>{cart.domainName}</strong> is ready for guided
                      one-click DNS &amp; MX verification.
                    </span>
                  </div>
                )}

                {domainStatus === "available" && (
                  <div
                    style={{
                      marginTop: "12px",
                      fontSize: "13px",
                      color: "#059669",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <HugeiconsIcon icon={CheckmarkCircle02Icon} size={16} />
                    <span>
                      <strong>{cart.domainName}</strong> is available! Includes
                      free WHOIS privacy &amp; automatic DNS setup ($12.00/yr).
                    </span>
                  </div>
                )}
              </section>

              {/* Step 4: Optional Add-ons */}
              <section
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "18px",
                  border: "1px solid #e6ebf2",
                  padding: "28px",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.03)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "20px",
                  }}
                >
                  <span
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                      backgroundColor: "#0866fe",
                      color: "#ffffff",
                      fontFamily: "var(--primaryfont-bold), sans-serif",
                      fontSize: "14px",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    4
                  </span>
                  <div>
                    <h2
                      style={{
                        fontFamily: "var(--primaryfont-bold), sans-serif",
                        fontSize: "20px",
                        margin: 0,
                      }}
                    >
                      Optional Enterprise Add-ons
                    </h2>
                    <p
                      style={{
                        fontSize: "13px",
                        color: "#6b7280",
                        margin: "2px 0 0",
                      }}
                    >
                      Enhance storage, compliance archival, or dedicated sending
                      infrastructure.
                    </p>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                  }}
                >
                  {OPTIONAL_ADDONS.map((addon) => {
                    const isAdded = cart.addOns.includes(addon.id);
                    const price = isAnnual
                      ? addon.annualPrice
                      : addon.monthlyPrice;

                    return (
                      <div
                        key={addon.id}
                        onClick={() => toggleAddOn(addon.id)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            toggleAddOn(addon.id);
                          }
                        }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: "16px",
                          padding: "16px 20px",
                          borderRadius: "12px",
                          border: isAdded
                            ? "2px solid #0866fe"
                            : "1px solid #e2e8f0",
                          backgroundColor: isAdded ? "#f3f9ff" : "#ffffff",
                          cursor: "pointer",
                          flexWrap: "wrap",
                        }}
                      >
                        <div style={{ flex: 1, minWidth: "220px" }}>
                          <div
                            style={{
                              fontFamily: "var(--primaryfont-bold), sans-serif",
                              fontSize: "15px",
                              color: "#161619",
                            }}
                          >
                            {addon.name}
                          </div>
                          <div
                            style={{
                              fontSize: "13px",
                              color: "#6b7280",
                              marginTop: "2px",
                            }}
                          >
                            {addon.description}
                          </div>
                        </div>

                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "14px",
                          }}
                        >
                          <div style={{ textAlign: "right" }}>
                            <div
                              style={{
                                fontFamily:
                                  "var(--primaryfont-bold), sans-serif",
                                fontSize: "15px",
                              }}
                            >
                              {formatCurrency(price)}
                            </div>
                            <div style={{ fontSize: "11px", color: "#6b7280" }}>
                              {addon.perSeat ? "/user/mo" : "/org/mo"}
                            </div>
                          </div>

                          <span
                            style={{
                              padding: "7px 14px",
                              borderRadius: "8px",
                              fontSize: "12.5px",
                              fontFamily:
                                "var(--primaryfont-semibold), sans-serif",
                              backgroundColor: isAdded ? "#0866fe" : "#f1f5f9",
                              color: isAdded ? "#ffffff" : "#334155",
                            }}
                          >
                            {isAdded ? "Added" : "+ Add"}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            </div>

            {/* Right Column: Order Summary & Checkout */}
            <aside
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "20px",
                border: "1px solid #d8e8ff",
                padding: "28px",
                position: "sticky",
                top: "88px",
                boxShadow: "0 14px 34px rgba(8, 102, 254, 0.08)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingBottom: "18px",
                  borderBottom: "1px solid #e6ebf2",
                  marginBottom: "20px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <HugeiconsIcon
                    icon={ShoppingCart01Icon}
                    size={22}
                    color="#0866fe"
                  />
                  <h2
                    style={{
                      fontFamily: "var(--primaryfont-bold), sans-serif",
                      fontSize: "20px",
                      margin: 0,
                    }}
                  >
                    Order Summary
                  </h2>
                </div>
                <span
                  style={{
                    fontSize: "12px",
                    fontFamily: "var(--primaryfont-semibold), sans-serif",
                    backgroundColor: "#f3f9ff",
                    color: "#0866fe",
                    padding: "4px 10px",
                    borderRadius: "999px",
                  }}
                >
                  {dataCenter} Data Center
                </span>
              </div>

              {/* Line Items */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                  marginBottom: "20px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontFamily: "var(--primaryfont-bold), sans-serif",
                        fontSize: "15px",
                      }}
                    >
                      {selectedPlan.name}
                    </div>
                    <div style={{ fontSize: "12.5px", color: "#6b7280" }}>
                      {cart.seats} {cart.seats === 1 ? "user" : "users"} ×{" "}
                      {formatCurrency(unitPlanPrice)}/mo × {monthsMultiplier}{" "}
                      {monthsMultiplier === 12 ? "mos" : "mo"}
                    </div>
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--primaryfont-bold), sans-serif",
                      fontSize: "15px",
                    }}
                  >
                    {formatCurrency(planSubtotal)}
                  </div>
                </div>

                {/* Add-ons in Cart */}
                {addOnsBreakdown.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      backgroundColor: "#f8fafd",
                      padding: "10px 12px",
                      borderRadius: "10px",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontFamily: "var(--primaryfont-semibold), sans-serif",
                          fontSize: "13.5px",
                        }}
                      >
                        {item.name}
                      </div>
                      <div style={{ fontSize: "12px", color: "#6b7280" }}>
                        {item.perSeat ? `${item.qty} seats` : "Organization"} •{" "}
                        {formatCurrency(item.unit)}/mo
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--primaryfont-semibold), sans-serif",
                          fontSize: "13.5px",
                        }}
                      >
                        {formatCurrency(item.lineTotal)}
                      </span>
                      <button
                        type="button"
                        onClick={() => toggleAddOn(item.id)}
                        aria-label={`Remove ${item.name}`}
                        style={{
                          border: "none",
                          background: "transparent",
                          color: "#ef4444",
                          cursor: "pointer",
                          padding: "2px",
                          display: "inline-flex",
                        }}
                      >
                        <HugeiconsIcon icon={Delete02Icon} size={16} />
                      </button>
                    </div>
                  </div>
                ))}

                {/* Domain Line */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "13.5px",
                    color: "#374151",
                  }}
                >
                  <span>
                    Domain ({cart.domainName} —{" "}
                    {cart.domainOption === "new" ? "New Reg." : "Existing"})
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--primaryfont-semibold), sans-serif",
                    }}
                  >
                    {domainRegistrationCost > 0
                      ? formatCurrency(domainRegistrationCost)
                      : "FREE"}
                  </span>
                </div>

                {annualCycleSavings > 0 && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "13px",
                      color: "#059669",
                      backgroundColor: "#ecfdf5",
                      padding: "8px 12px",
                      borderRadius: "8px",
                    }}
                  >
                    <span>Annual Billing Cycle Savings (20%)</span>
                    <span
                      style={{
                        fontFamily: "var(--primaryfont-bold), sans-serif",
                      }}
                    >
                      -{formatCurrency(annualCycleSavings)}
                    </span>
                  </div>
                )}

                {appliedPromo && PROMO_CODES[appliedPromo] && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      fontSize: "13px",
                      color: "#0866fe",
                      backgroundColor: "#f3f9ff",
                      padding: "8px 12px",
                      borderRadius: "8px",
                    }}
                  >
                    <div>
                      <strong>{appliedPromo}</strong> (
                      {PROMO_CODES[appliedPromo].label})
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--primaryfont-bold), sans-serif",
                        }}
                      >
                        -{formatCurrency(promoDiscountAmount)}
                      </span>
                      <button
                        type="button"
                        onClick={() => setAppliedPromo(null)}
                        aria-label="Remove promo code"
                        style={{
                          border: "none",
                          background: "transparent",
                          color: "#6b7280",
                          cursor: "pointer",
                        }}
                      >
                        <HugeiconsIcon icon={Delete02Icon} size={15} />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Promo Code Form */}
              <form
                onSubmit={handleApplyPromo}
                style={{
                  display: "flex",
                  gap: "8px",
                  marginBottom: "18px",
                }}
              >
                <input
                  type="text"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  placeholder="Promo code (e.g. SWITCH25)"
                  aria-label="Promo code"
                  style={{
                    flex: 1,
                    height: "38px",
                    borderRadius: "8px",
                    border: "1px solid #cbd5e1",
                    padding: "0 12px",
                    fontSize: "13px",
                  }}
                />
                <button
                  type="submit"
                  style={{
                    height: "38px",
                    padding: "0 14px",
                    borderRadius: "8px",
                    border: "1px solid #0866fe",
                    backgroundColor: "#f3f9ff",
                    color: "#0866fe",
                    fontFamily: "var(--primaryfont-semibold), sans-serif",
                    fontSize: "13px",
                    cursor: "pointer",
                  }}
                >
                  Apply
                </button>
              </form>
              {promoError && (
                <p
                  style={{
                    fontSize: "12px",
                    color: "#e42527",
                    marginTop: "-10px",
                    marginBottom: "14px",
                  }}
                >
                  {promoError}
                </p>
              )}

              {/* Total Due */}
              <div
                style={{
                  borderTop: "1px solid #e6ebf2",
                  paddingTop: "16px",
                  marginBottom: "22px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--primaryfont-bold), sans-serif",
                      fontSize: "16px",
                    }}
                  >
                    Total Due Today
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--primaryfont-bold), sans-serif",
                      fontSize: "28px",
                      color: "#0866fe",
                    }}
                  >
                    {formatCurrency(finalTotal)}
                  </span>
                </div>
                <p
                  style={{
                    fontSize: "12px",
                    color: "#6b7280",
                    margin: "4px 0 0",
                  }}
                >
                  Billed {isAnnual ? "annually" : "monthly"} • 30-day money-back
                  guarantee
                </p>
              </div>

              {/* Quick Organization Checkout Form */}
              <form
                onSubmit={handleCompleteCheckout}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                <div>
                  <label
                    htmlFor="org-name-input"
                    style={{
                      display: "block",
                      fontSize: "12px",
                      fontFamily: "var(--primaryfont-semibold), sans-serif",
                      color: "#374151",
                      marginBottom: "4px",
                    }}
                  >
                    Organization Name
                  </label>
                  <input
                    id="org-name-input"
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    style={{
                      width: "100%",
                      height: "40px",
                      borderRadius: "8px",
                      border: "1px solid #cbd5e1",
                      padding: "0 12px",
                      fontSize: "13.5px",
                    }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="admin-email-input"
                    style={{
                      display: "block",
                      fontSize: "12px",
                      fontFamily: "var(--primaryfont-semibold), sans-serif",
                      color: "#374151",
                      marginBottom: "4px",
                    }}
                  >
                    Super Admin Email
                  </label>
                  <input
                    id="admin-email-input"
                    type="email"
                    required
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    style={{
                      width: "100%",
                      height: "40px",
                      borderRadius: "8px",
                      border: "1px solid #cbd5e1",
                      padding: "0 12px",
                      fontSize: "13.5px",
                    }}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    marginTop: "6px",
                    height: "48px",
                    borderRadius: "12px",
                    border: "none",
                    backgroundColor: "#e42527",
                    color: "#ffffff",
                    fontFamily: "var(--primaryfont-bold), sans-serif",
                    fontSize: "15px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                    boxShadow: "0 8px 20px rgba(228, 37, 39, 0.25)",
                  }}
                >
                  <HugeiconsIcon icon={CreditCardIcon} size={20} />
                  <span>Complete Workspace Order</span>
                  <HugeiconsIcon icon={ArrowRight01Icon} size={18} />
                </button>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                    fontSize: "12px",
                    color: "#6b7280",
                    marginTop: "6px",
                  }}
                >
                  <HugeiconsIcon
                    icon={LockPasswordIcon}
                    size={15}
                    color="#059669"
                  />
                  <span>256-bit TLS encrypted checkout • Zero ads forever</span>
                </div>
              </form>
            </aside>
          </div>
        )}
      </main>
    </div>
  );
}

export default CartSection;
