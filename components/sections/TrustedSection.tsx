"use client";

import React, { useMemo, useState } from "react";
import { ASSETS } from "@/assets";
import { COMPLIANCE_BADGES, TESTIMONIALS, TRUST_BADGES } from "@/constants";
import type { TestimonialItem } from "@/types";
import { cn, createPlaceholderSvgUri } from "@/utils";

interface SlickSlideEntry {
  slickIndex: number;
  isCloned: boolean;
  item: TestimonialItem;
}

const SLIDE_WIDTH = 369;

export function TrustedSection() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);

  const slides = useMemo<SlickSlideEntry[]>(() => {
    const preClones: SlickSlideEntry[] = [
      { slickIndex: -4, isCloned: true, item: TESTIMONIALS[2] },
      { slickIndex: -3, isCloned: true, item: TESTIMONIALS[3] },
      { slickIndex: -2, isCloned: true, item: TESTIMONIALS[4] },
      { slickIndex: -1, isCloned: true, item: TESTIMONIALS[5] },
    ];

    const originals: SlickSlideEntry[] = TESTIMONIALS.map((item, idx) => ({
      slickIndex: idx,
      isCloned: false,
      item,
    }));

    const postClones: SlickSlideEntry[] = TESTIMONIALS.map((item, idx) => ({
      slickIndex: idx + TESTIMONIALS.length,
      isCloned: true,
      item,
    }));

    return [...preClones, ...originals, ...postClones];
  }, []);

  const handlePrev = () => {
    setHasInteracted(true);
    setCurrentIndex(
      (prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length
    );
  };

  const handleNext = () => {
    setHasInteracted(true);
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const avatarPlaceholder = createPlaceholderSvgUri(96, 96);
  const trackWidth = slides.length * SLIDE_WIDTH;
  const translateX = -(currentIndex + 3) * SLIDE_WIDTH;

  return (
    <section className="zwc-trusted-section">
      <div className="zwc-trusted-section-inner zwc-section-space">
        <div className="content-wrap bottom-animated middle-animated animated">
          <div className="zwc-trusted-content-box">
            <div className="zwc-trusted-stats">
              <div
                className="zwc-trusted-stats-text zwe-ot zwe-om zwe-ob zwe-op"
                data-onscroll="7"
              >
                <h2 className="zwc-trusted-heading">
                  <span className="zwc-gradient-text">
                    <span className="zwc-mail-cust-count">550,000</span>+
                    businesses
                  </span>
                  <span className="heading-text-sm">
                    run on Zoho Mail globally
                  </span>
                </h2>
                <p className="zwc-trusted-desc">
                  See why enterprises are dropping legacy email systems for Zoho
                  Mail.
                </p>
                <a
                  href="https://www.zoho.com/workplace/customers/"
                  className="zwc-trusted-stories-link"
                  aria-label="Read all stories from Zoho Workplace customers"
                >
                  Read all stories
                  <svg
                    className="zwc-trusted-stories-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path
                      d="M5 12h13M12.5 5.5 19 12l-6.5 6.5"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>

              <div
                className="zwc-trusted-badges zwe-ot zwe-om zwe-ob zwe-op"
                data-onscroll="7"
              >
                {TRUST_BADGES.map((badge) => (
                  <div
                    key={badge.id}
                    className="zwc-badge-item"
                    role="button"
                    tabIndex={0}
                    aria-label={badge.label}
                    aria-describedby={badge.tooltipId}
                  >
                    <span className="zwc-badge-icon">
                      <span
                        className={cn("zwc-badge-ic", badge.iconClass)}
                        aria-hidden="true"
                      />
                    </span>
                    <span className="zwc-badge-text">{badge.label}</span>
                    <span className="zwc-badge-info sf-hidden" aria-hidden="true">
                      <svg viewBox="0 0 16 16" focusable="false">
                        <circle
                          cx={8}
                          cy={8}
                          r={7}
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={1.4}
                        />
                        <path
                          d="M8 7.4v4"
                          stroke="currentColor"
                          strokeWidth={1.6}
                          strokeLinecap="round"
                        />
                        <circle cx={8} cy={4.9} r={1} fill="currentColor" />
                      </svg>
                    </span>
                    <span
                      className="zwc-badge-tooltip"
                      id={badge.tooltipId}
                      role="tooltip"
                    >
                      {badge.tooltip}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="zwc-testimonials data-loaded" data-lazy="child">
              <div className="zwc-testimonials-track slick-initialized slick-slider">
                <div className="slick-list draggable">
                  <div
                    className="slick-track"
                    style={{
                      opacity: 1,
                      width: `${trackWidth}px`,
                      transform: `translate3d(${translateX}px, 0px, 0px)`,
                      transition: hasInteracted
                        ? "transform 450ms cubic-bezier(0.22, 1, 0.36, 1)"
                        : undefined,
                    }}
                  >
                    {slides.map(({ slickIndex, isCloned, item }) => {
                      const isActive =
                        slickIndex >= currentIndex - 1 &&
                        slickIndex <= currentIndex + 1;
                      const isCurrent = slickIndex === currentIndex;
                      const isCenter =
                        slickIndex === currentIndex ||
                        (currentIndex === 0 && slickIndex === 8);

                      return (
                        <div
                          key={`slick-slide-${slickIndex}`}
                          className={cn(
                            "zwc-testimonial-card slick-slide",
                            isCloned && "slick-cloned",
                            isCurrent && "slick-current",
                            isActive && "slick-active",
                            isCenter && "slick-center"
                          )}
                          data-slick-index={slickIndex}
                          aria-hidden={!isActive}
                          tabIndex={isActive ? undefined : -1}
                          style={{ width: `${SLIDE_WIDTH}px` }}
                        >
                          <div className="zwc-testimonial-card-inner">
                            <div className="zwc-testimonial-body">
                              <p className="zwc-testimonial-quote">
                                {item.quote}
                              </p>
                              {item.sourceLink && (
                                <a
                                  href={item.sourceLink.href}
                                  className="zwc-testimonial-source"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  aria-label={item.sourceLink.ariaLabel}
                                  tabIndex={isActive ? undefined : -1}
                                >
                                  {" "}
                                  {item.sourceLink.label}
                                  <svg
                                    className="zwc-testimonial-source-icon"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    aria-hidden="true"
                                    focusable="false"
                                  >
                                    <path
                                      d="M14 4h6v6M20 4l-8.5 8.5M17 14.5V19a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h4.5"
                                      stroke="currentColor"
                                      strokeWidth={2}
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                </a>
                              )}
                            </div>

                            <div className="zwc-testimonial-author">
                              <img
                                src={avatarPlaceholder}
                                alt=""
                                className="zwc-testimonial-avatar"
                                width={48}
                                height={48}
                                style={{
                                  backgroundBlendMode: "normal",
                                  backgroundClip: "content-box",
                                  backgroundPosition: "50% 50%",
                                  backgroundColor: "rgba(0,0,0,0)",
                                  backgroundImage: item.avatarVar,
                                  backgroundSize: "cover",
                                  backgroundOrigin: "content-box",
                                  backgroundRepeat: "no-repeat",
                                  backgroundAttachment: "scroll",
                                }}
                              />
                              <div className="zwc-testimonial-info">
                                <span className="zwc-testimonial-name">
                                  {item.authorName}
                                </span>
                                <span className="zwc-testimonial-role">
                                  {item.authorRole}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="zwc-testimonials-nav">
                <button
                  type="button"
                  className="zwc-testimonial-prev slick-arrow"
                  aria-label="Previous testimonial"
                  onClick={handlePrev}
                >
                  <img
                    src={ASSETS.hero.arrowPrev}
                    alt=""
                    width={20}
                    height={20}
                  />
                </button>
                <button
                  type="button"
                  className="zwc-testimonial-next slick-arrow"
                  aria-label="Next testimonial"
                  onClick={handleNext}
                >
                  <img
                    src={ASSETS.hero.arrowNext}
                    alt=""
                    width={20}
                    height={20}
                  />
                </button>
              </div>
            </div>

            <div
              className="zwc-compliance-block data-loaded zwe-ot zwe-om zwe-ob zwe-op"
              data-lazy="child"
              data-onscroll="8"
            >
              <div className="zwc-compliance-intro">
                <span className="zwc-compliance-eyebrow">
                  Security and compliance
                </span>
                <h3 className="zwc-compliance-heading">
                  Independently certified.
                </h3>
                <p className="zwc-compliance-desc">
                  Zoho Mail is constantly verified against the highest global
                  compliance standards.
                </p>
              </div>

              <ul className="zwc-compliance-badges">
                {COMPLIANCE_BADGES.map((badge) => (
                  <li key={badge.className} className={badge.className}>
                    <span
                      className="zwc-badge-ic-label"
                      role="img"
                      aria-label={badge.ariaLabel}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TrustedSection;
