"use client";

import React from "react";
import Link from "next/link";

interface CtaSectionProps {
  onTalkToExpertClick?: () => void;
}

export function CtaSection({ onTalkToExpertClick }: CtaSectionProps) {
  return (
    <section className="zwc-cta-section zwc-section-space">
      <div className="mailcover-top-shape" aria-hidden="true" />
      <div className="content-wrap bottom-animated middle-animated animated">
        <div className="zwc-cta-content-box">
          <h2 className="zwc-cta-heading">
            <span className="zwc-gradient-text">Host your business email</span>{" "}
            with Zoho Mail
          </h2>
          <p className="zwc-cta-desc">
            Start your free trial today—or talk to a solutions expert who can
            walk you through pricing, migration, and compliance.
          </p>
          <div className="zwc-cta-buttons">
            <a
              href="https://mail.zoho.com/"
              className="act-btn cta-btn zwc-cta-primary"
              style={{
                display: "inline-block",
                opacity: 1,
                visibility: "visible",
              }}
            >
              Access Zoho Mail
            </a>
            <button
              type="button"
              className="act-btn zwc-cta-secondary getquote-btn"
              jf-ext-button-ct="talk to an expert"
              onClick={onTalkToExpertClick}
            >
              Talk to an Expert
            </button>
            <Link
              href="/cart"
              className="act-btn zwc-cta-secondary"
              style={{
                display: "inline-block",
                textDecoration: "none",
              }}
            >
              Configure Plan &amp; Cart
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CtaSection;
