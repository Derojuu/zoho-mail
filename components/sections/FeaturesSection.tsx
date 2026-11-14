import React from "react";
import { FEATURE_CARDS } from "@/constants";

export function FeaturesSection() {
  return (
    <section className="zwc-features-section zwc-section-space">
      <div className="content-wrap bottom-animated middle-animated animated">
        <div className="zwc-features-content-box">
          <h2 className="zwc-features-heading">
            All great tools. <span>Minus the bloat.</span>
          </h2>
          <div className="zwc-features-grid">
            {FEATURE_CARDS.map((card) => {
              const isIconCard = Boolean(card.image?.isIcon);

              return (
                <div
                  key={card.id}
                  className={card.cardClass}
                  data-onscroll={card.onScroll}
                >
                  {isIconCard && card.image && (
                    <div className="zwc-feature-card-icon">
                      {card.image.isEncryptBar ? (
                        <div className="zwc-encrypt-bars" aria-hidden="true">
                          <img
                            data-lazy=""
                            src={card.image.src}
                            alt={card.image.alt}
                            className="zwc-encrypt-bar zwc-encrypt-bar-1 data-loaded"
                            width={card.image.width}
                            height={card.image.height}
                          />
                        </div>
                      ) : (
                        <img
                          data-lazy=""
                          src={card.image.src}
                          alt={card.image.alt}
                          width={card.image.width}
                          height={card.image.height}
                          className="data-loaded"
                        />
                      )}
                    </div>
                  )}

                  <div className="zwc-feature-card-text">
                    <h3 className="zwc-feature-title">
                      {card.titlePrefix}
                      {card.titleHighlight && <span>{card.titleHighlight}</span>}
                    </h3>
                    <p className="zwc-feature-desc">{card.description}</p>
                  </div>

                  {!isIconCard && card.image && (
                    <div className="zwc-feature-card-img">
                      <img
                        data-lazy=""
                        src={card.image.src}
                        alt={card.image.alt}
                        width={card.image.width}
                        height={card.image.height}
                        className="data-loaded"
                      />
                    </div>
                  )}

                  <a
                    href={card.href}
                    className="zwc-feature-link"
                    aria-label={card.linkAriaLabel}
                  >
                    <svg
                      className="zwc-feature-link-icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <path
                        d="M7 17 17 7M9 7h8v8"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;
