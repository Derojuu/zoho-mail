import React from "react";
import { BENEFITS_WITH_ZOHO, BENEFITS_WITHOUT_ZOHO } from "@/constants";

export function BenefitsSection() {
  return (
    <section className="zwc-benefits-section">
      <div className="zwc-benefits-section-inner zwc-section-space">
        <div className="content-wrap bottom-animated middle-animated animated">
          <div className="zwc-benefits-content-box">
            <div className="zwc-benefits-heading">
              <span className="zwc-gradient-text zwc-benefits-label">
                Let&apos;s face it.
              </span>
              <h2 className="zwc-benefits-title">
                <span className="heading-text-sm">
                  Switching takes a few days.{" "}
                </span>
                <span className="heading-text-sm">
                  The alternative costs you every day.
                </span>
              </h2>
            </div>

            <div className="zwc-benefits-comparison">
              <div
                className="zwc-benefits-col zwc-benefits-with zwe-ot zwe-om zwe-ob zwe-op"
                data-onscroll={7}
              >
                <div
                  className="zwc-benefits-col-header zwc-benefits-header-orange"
                  style={{ minHeight: "60px" }}
                >
                  <span className="zwc-benefits-header-text">
                    With Zoho Mail
                  </span>
                </div>
                {BENEFITS_WITH_ZOHO.map((item, index) => (
                  <div
                    key={index}
                    className="zwc-benefits-item zwc-benefits-item-orange"
                    style={{ minHeight: "60px" }}
                  >
                    <span className="zwc-benefits-item-icon">
                      <span
                        className={`zwc-benefit-ic ${item.iconClass}`}
                        aria-hidden="true"
                      />
                    </span>
                    <p>{item.text}</p>
                  </div>
                ))}
              </div>

              <div
                className="zwc-benefits-col zwc-benefits-without zwe-ot zwe-om zwe-ob zwe-op"
                data-onscroll={7}
              >
                <div
                  className="zwc-benefits-col-header zwc-benefits-header-black"
                  style={{ minHeight: "60px" }}
                >
                  <span className="zwc-benefits-header-text">
                    Without Zoho Mail
                  </span>
                </div>
                {BENEFITS_WITHOUT_ZOHO.map((item, index) => (
                  <div
                    key={index}
                    className="zwc-benefits-item zwc-benefits-item-white"
                    style={{ minHeight: "60px" }}
                  >
                    <span className="zwc-benefits-item-icon">
                      <span
                        className={`zwc-benefit-ic ${item.iconClass}`}
                        aria-hidden="true"
                      />
                    </span>
                    <p>{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BenefitsSection;
