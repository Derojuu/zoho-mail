"use client";

import React, { useRef, useState, useEffect } from "react";
import { MIGRATION_STEPS } from "@/constants";
import { useMigrationScrollProgress } from "@/hooks/useMigrationScroll";
import { cn } from "@/utils";

export function MigrationSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { activeStep: scrollActiveStep, progressPercent: scrollProgressPercent } =
    useMigrationScrollProgress(sectionRef);

  const [manualStep, setManualStep] = useState<number | null>(null);

  useEffect(() => {
    setManualStep(null);
  }, [scrollActiveStep]);

  const currentStep = manualStep ?? scrollActiveStep;
  const fillPercent =
    manualStep !== null
      ? manualStep === 1
        ? 0
        : manualStep === 2
          ? 50
          : 100
      : scrollProgressPercent;

  return (
    <section
      ref={sectionRef}
      className="zwc-migration-section zwc-section-space"
    >
      <div className="content-wrap bottom-animated middle-animated animated">
        <div className="zwc-migration-content-box">
          <div className="zwc-migration-steps-block">
            <h2 className="zwc-migration-heading">
              {" "}
              Be ready before your next coffee
              <br />
              <span className="zwc-gradient-text">Go live in 3 steps</span>
            </h2>
            <div
              className="zwc-migration-steps"
              data-ztrans-current-step={currentStep}
            >
              <div className="zwc-migration-progress" aria-hidden="true">
                <span
                  className="zwc-migration-progress-fill"
                  style={
                    {
                      "--ztrans-migration-fill": `${fillPercent}%`,
                    } as React.CSSProperties
                  }
                />
              </div>

              {MIGRATION_STEPS.map((item) => {
                const isActive = currentStep === item.step;
                return (
                  <div
                    key={item.step}
                    className={cn(
                      "zwc-migration-step",
                      isActive && "zwc-step-active"
                    )}
                    data-ztrans-step={item.step}
                    onClick={() => setManualStep(item.step)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setManualStep(item.step);
                      }
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <span
                      className={cn(
                        "zwc-step-number",
                        isActive && "zwc-step-number-active"
                      )}
                    >
                      {item.step}
                    </span>
                    <h3
                      className={cn(
                        "zwc-step-title",
                        isActive && "zwc-gradient-text"
                      )}
                    >
                      {item.title}
                    </h3>
                    <p className="zwc-step-desc">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="zwc-migration-handbook">
            <div className="zwc-handbook-text">
              <h3 className="zwc-handbook-title">
                Be better prepared for migration
              </h3>
              <p className="zwc-handbook-desc">
                Download our free migration handbook—a step-by-step playbook
                covering setup, data transfer, user onboarding, and
                hybrid-migration options.
              </p>
            </div>
            <div className="zwc-handbook-banner">
              <img
                data-lazy=""
                src="/images/banners/migration-handbook.jpg"
                alt="Cover of the Migration to Zoho Workplace handbook"
                width={340}
                height={216}
                className="data-loaded"
              />
              <a
                href="https://www.zoho.com/sites/zweb/images/mail/homepage/zoho-workplace-migration-guide.pdf"
                className="zwc-handbook-btn"
                target="_blank"
                rel="noopener"
                aria-label="Download Free Handbook (PDF, 13.7 MB, opens in a new tab)"
              >
                <span>Download Free Handbook</span>
                <span className="zwc-handbook-dl-ic" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MigrationSection;
