"use client";

import React, { useState } from "react";
import { PROBLEM_SOLUTION_CARDS, TRUSTED_LOGOS } from "@/constants";
import type { TrustedLogoItem } from "@/types";
import { cn, createPlaceholderSvgUri } from "@/utils";

function renderLogoImage(logo: TrustedLogoItem) {
  if (logo.sfVar && logo.svgWidth && logo.svgHeight) {
    return (
      <img
        data-lazy=""
        src={createPlaceholderSvgUri(logo.svgWidth, logo.svgHeight)}
        width={logo.width}
        height={logo.height}
        alt={logo.name}
        className="data-loaded"
        style={{
          backgroundBlendMode: "normal",
          backgroundClip: "content-box",
          backgroundPosition: "50% 50%",
          backgroundColor: "rgba(0,0,0,0)",
          backgroundImage: logo.sfVar,
          backgroundSize: "100% 100%",
          backgroundOrigin: "content-box",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "scroll",
        }}
      />
    );
  }

  return (
    <img
      data-lazy=""
      src={logo.src}
      width={logo.width}
      height={logo.height}
      alt={logo.name}
      className="data-loaded"
    />
  );
}

export function ProblemsSection() {
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
  const [isMarqueePaused, setIsMarqueePaused] = useState<boolean>(false);

  const toggleCardFlip = (id: string) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section className="zwc-problems-section zwc-section-space">
      <div className="content-wrap bottom-animated animated middle-animated">
        <div className="zwc-problems-content-box" data-ztrans-reveal="1">
          <div className="zwc-problems-heading">
            <h2 className="zwc-problems-title">
              Three email headaches.{" "}
              <span className="heading-text-sm">Now sorted.</span>
            </h2>
          </div>

          <div className="zwc-problems-cards-top">
            {PROBLEM_SOLUTION_CARDS.map((card) => {
              const isFlipped = Boolean(flippedCards[card.id]);
              return (
                <div
                  key={card.id}
                  className={cn(
                    "zwc-problem-card-wrap",
                    isFlipped && "is-flipped"
                  )}
                >
                  <span
                    className="zwc-problem-card-border"
                    aria-hidden="true"
                  />
                  <button
                    type="button"
                    className="zwc-problem-card-toggle"
                    aria-pressed={isFlipped}
                    aria-label={card.toggleAriaLabel}
                    onClick={() => toggleCardFlip(card.id)}
                  />
                  <div className="zwc-problem-card-flip">
                    <div className="zwc-problem-card zwc-problem-card-front">
                      <span className="zwc-problem-label">Problem</span>
                      <div className="zwc-problem-title-row">
                        <span className="zwc-problem-icon-wrap">
                          <span
                            className={cn("zwc-problem-icon", card.iconClass)}
                            aria-hidden="true"
                          />
                        </span>
                        <h3 className="zwc-problem-title">
                          {card.problemTitle}
                        </h3>
                      </div>
                      <p className="zwc-problem-desc">{card.problemDesc}</p>
                    </div>
                    <div
                      className="zwc-problem-card zwc-problem-card-back"
                      aria-hidden={!isFlipped}
                    >
                      <span className="zwc-problem-label">Solution</span>
                      <h3 className="zwc-problem-title">
                        {card.solutionTitle}
                      </h3>
                      <p className="zwc-problem-desc">{card.solutionDesc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div
          className="zwc-trusted-logos-block zwe-ot zwe-om zwe-ob zwe-op"
          data-onscroll="8"
        >
          <p className="zwc-trusted-logos-label">
            Trusted by leading enterprises worldwide
          </p>

          <div
            className={cn(
              "zwc-trusted-logos ztrans-logos-marquee",
              isMarqueePaused && "is-paused"
            )}
            style={
              { "--ztrans-marquee-duration": "29s" } as React.CSSProperties
            }
          >
            <div className="zwc-trusted-logos-track">
              <div className="zwc-trusted-logos-group">
                {TRUSTED_LOGOS.map((logo) => (
                  <div key={`group-1-${logo.name}`} className="zwc-logo-item">
                    {renderLogoImage(logo)}
                  </div>
                ))}
              </div>

              <div className="zwc-trusted-logos-group" aria-hidden="true">
                {TRUSTED_LOGOS.map((logo) => (
                  <div key={`group-2-${logo.name}`} className="zwc-logo-item">
                    {renderLogoImage(logo)}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button
            type="button"
            className="zwc-marquee-toggle"
            aria-pressed={isMarqueePaused}
            aria-label="Pause the scrolling customer logos"
            onClick={() => setIsMarqueePaused((prev) => !prev)}
          >
            <span className="zwc-marquee-ic" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default ProblemsSection;
