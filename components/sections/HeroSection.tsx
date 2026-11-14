"use client";

import React, { useState } from "react";
import { ASSETS } from "@/assets";
import { cn, createPlaceholderSvgUri } from "@/utils";

export type DashboardTabId = "mail" | "calendar" | "todo";

export interface HeroSectionProps {
  onOpenQuoteModal?: () => void;
}

const TAB_INDICATOR_OFFSETS: Record<DashboardTabId, number> = {
  mail: 0,
  calendar: 92.6697,
  todo: 178.4097,
};

const PEDESTAL_STYLE: React.CSSProperties = {
  backgroundBlendMode: "normal",
  backgroundClip: "content-box",
  backgroundPosition: "50% 50%",
  backgroundColor: "rgba(0,0,0,0)",
  backgroundImage: "var(--sf-img-35)",
  backgroundSize: "100% 100%",
  backgroundOrigin: "content-box",
  backgroundRepeat: "no-repeat",
  backgroundAttachment: "scroll",
};

export function HeroSection({ onOpenQuoteModal }: HeroSectionProps) {
  const [activeTab, setActiveTab] = useState<DashboardTabId>("mail");

  const handleTabKeyDown = (
    e: React.KeyboardEvent<SVGGElement>,
    tab: DashboardTabId
  ) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setActiveTab(tab);
    } else if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      const order: DashboardTabId[] = ["mail", "calendar", "todo"];
      const next = order[(order.indexOf(tab) + 1) % order.length];
      setActiveTab(next);
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      const order: DashboardTabId[] = ["mail", "calendar", "todo"];
      const prev =
        order[(order.indexOf(tab) - 1 + order.length) % order.length];
      setActiveTab(prev);
    }
  };

  const indicatorOffset = TAB_INDICATOR_OFFSETS[activeTab];
  const pedestalPlaceholder = createPlaceholderSvgUri(337, 586);

  return (
    <section className="zwc-hero-section">
      <div className="zwc-hero-section-inner zwc-section-space">
        <div
          className="content-wrap bottom-animated top-animated middle-animated animated"
          style={{ "--ztrans-hero-runway": "1100.95px" } as React.CSSProperties}
        >
          <div className="zwc-hero-content-box">
            <div className="zwc-hero-info">
              <h1
                className="zwc-hero-heading"
                aria-label="Easy, reliable business email"
              >
                {" "}
                Easy, reliable{" "}
                <span className="zwc-gradient-text">business email</span>
              </h1>
              <p className="zwc-hero-desc">
                Custom domain email hosting with award-winning spam protection,
                enterprise-grade encryption, and 24×7 support. Trusted by{" "}
                <span className="zwc-mail-cust-count">550,000</span>+ businesses
                worldwide.
              </p>
              <div className="zwc-hero-buttons">
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
                  onClick={onOpenQuoteModal}
                  {...{ "jf-ext-button-ct": "talk to an expert" }}
                >
                  Talk to an Expert
                </button>
              </div>
            </div>

            <div className="zwc-hero-card sf-hidden" />

            <div className="zwc-hero-decorative" aria-hidden="true">
              <div className="zwc-hero-deco-group zwc-hero-deco-left">
                <img
                  src={ASSETS.hero.envelope3d}
                  alt=""
                  className="zwc-hero-3d-obj zwc-hero-3d-envelope"
                  width={141}
                  height={180}
                />
                <img
                  src={pedestalPlaceholder}
                  alt=""
                  className="zwc-hero-pedestal"
                  width={168}
                  height={516}
                  style={PEDESTAL_STYLE}
                />
              </div>
              <div className="zwc-hero-deco-group zwc-hero-deco-right">
                <img
                  src={ASSETS.hero.shield3d}
                  alt=""
                  className="zwc-hero-3d-obj zwc-hero-3d-shield"
                  width={153}
                  height={133}
                />
                <img
                  src={pedestalPlaceholder}
                  alt=""
                  className="zwc-hero-pedestal"
                  width={168}
                  height={516}
                  style={PEDESTAL_STYLE}
                />
              </div>
            </div>
          </div>

          <div className="zwc-hero-scroll sf-hidden" aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              width={40}
              height={40}
              fill="none"
              focusable="false"
            >
              <path
                d="M5 10l7-6 7 6"
                stroke="currentColor"
                strokeWidth={1}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5 17l7-6 7 6"
                stroke="currentColor"
                strokeWidth={1}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className="zwc-hero-dashboard">
            <div className="zwc-hero-dashboard-frame">
              <svg
                className="zwc-hero-dashboard-panel-svg"
                viewBox="-20 3 1305 806"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
              >
                <g className="zwc-dash-screens">
                  <image
                    className="zwc-hero-dashboard-screen zwc-is-active"
                    id="zwc-dash-mail"
                    x={5.332}
                    y={0}
                    width={1280}
                    height={806}
                    preserveAspectRatio="xMidYMid slice"
                    role="tabpanel"
                    aria-label="Zoho Mail inbox showing folders, email list, and message preview"
                    href={ASSETS.hero.dashboardMail}
                    data-ztrans-loaded="1"
                  />
                </g>

                <rect
                  x={5.332}
                  y={103.568}
                  width={90}
                  height={672}
                  fill="#242933"
                  aria-hidden="true"
                />

                <g
                  className="zwc-tab-indicator"
                  aria-hidden="true"
                  style={
                    indicatorOffset
                      ? { transform: `translateY(${indicatorOffset}px)` }
                      : undefined
                  }
                >
                  <path
                    d="M5.33203 74.0677H95.332V155.959H5.33203V74.0677Z"
                    fill="#303A59"
                  />
                  <rect
                    x={5.33203}
                    y={74.0677}
                    width={4}
                    height={81.8913}
                    fill="#007DFF"
                  />
                </g>

                <image
                  className="zwc-dash-frame-img"
                  x={0}
                  y={0}
                  width={1291}
                  height={806}
                  aria-hidden="true"
                  href={ASSETS.hero.dashboardFrame}
                />

                <g
                  className="zwc-dash-tabs"
                  role="tablist"
                  aria-label="Dashboard view"
                >
                  <g
                    className={cn(
                      "zwc-hero-dashboard-tab zwc-hero-dashboard-tab-mail",
                      activeTab === "mail" && "zwc-is-active"
                    )}
                    id="zwc-dash-tab-mail"
                    data-ztrans-target="mail"
                    role="tab"
                    tabIndex={activeTab === "mail" ? 0 : -1}
                    aria-selected={activeTab === "mail"}
                    aria-controls="zwc-dash-mail"
                    onClick={() => setActiveTab("mail")}
                    onKeyDown={(e) => handleTabKeyDown(e, "mail")}
                  >
                    <title>Show mail dashboard</title>
                    <rect
                      className="zwc-dash-tab-hotspot"
                      x={5.332}
                      y={74.0677}
                      width={90}
                      height={81.8913}
                    />
                    <g
                      className="zwc-dash-tab-ripple"
                      style={{ opacity: activeTab === "mail" ? 0 : 1 }}
                    >
                      <circle
                        className="zwc-dash-ripple-halo"
                        cx={20}
                        cy={103.5677}
                        r={14}
                      />
                      <circle
                        className="zwc-dash-ripple-ring"
                        cx={20}
                        cy={103.5677}
                        r={8}
                      />
                      <circle
                        className="zwc-dash-ripple-dot"
                        cx={20}
                        cy={103.5677}
                        r={7}
                      />
                    </g>
                  </g>

                  <g
                    className={cn(
                      "zwc-hero-dashboard-tab zwc-hero-dashboard-tab-calendar",
                      activeTab === "calendar" && "zwc-is-active"
                    )}
                    id="zwc-dash-tab-calendar"
                    data-ztrans-target="calendar"
                    role="tab"
                    tabIndex={activeTab === "calendar" ? 0 : -1}
                    aria-selected={activeTab === "calendar"}
                    onClick={() => setActiveTab("calendar")}
                    onKeyDown={(e) => handleTabKeyDown(e, "calendar")}
                  >
                    <title>Show calendar dashboard</title>
                    <rect
                      className="zwc-dash-tab-hotspot"
                      x={5.332}
                      y={166.7374}
                      width={90}
                      height={81.8913}
                    />
                    <g
                      className="zwc-dash-tab-ripple"
                      style={{ opacity: activeTab === "calendar" ? 0 : 1 }}
                    >
                      <circle
                        className="zwc-dash-ripple-halo"
                        cx={20}
                        cy={196.2374}
                        r={14}
                      />
                      <circle
                        className="zwc-dash-ripple-ring"
                        cx={20}
                        cy={196.2374}
                        r={8}
                      />
                      <circle
                        className="zwc-dash-ripple-dot"
                        cx={20}
                        cy={196.2374}
                        r={7}
                      />
                    </g>
                  </g>

                  <g
                    className={cn(
                      "zwc-hero-dashboard-tab zwc-hero-dashboard-tab-todo",
                      activeTab === "todo" && "zwc-is-active"
                    )}
                    id="zwc-dash-tab-todo"
                    data-ztrans-target="todo"
                    role="tab"
                    tabIndex={activeTab === "todo" ? 0 : -1}
                    aria-selected={activeTab === "todo"}
                    onClick={() => setActiveTab("todo")}
                    onKeyDown={(e) => handleTabKeyDown(e, "todo")}
                  >
                    <title>Show to-do dashboard</title>
                    <rect
                      className="zwc-dash-tab-hotspot"
                      x={5.332}
                      y={252.4774}
                      width={90}
                      height={81.8913}
                    />
                    <g
                      className="zwc-dash-tab-ripple"
                      style={{ opacity: activeTab === "todo" ? 0 : 1 }}
                    >
                      <circle
                        className="zwc-dash-ripple-halo"
                        cx={20}
                        cy={281.9774}
                        r={14}
                      />
                      <circle
                        className="zwc-dash-ripple-ring"
                        cx={20}
                        cy={281.9774}
                        r={8}
                      />
                      <circle
                        className="zwc-dash-ripple-dot"
                        cx={20}
                        cy={281.9774}
                        r={7}
                      />
                    </g>
                  </g>
                </g>
              </svg>

              <img
                className="zwc-hero-dashboard-mobile sf-hidden"
                src={ASSETS.hero.dashboardMail}
                alt="Zoho Mail dashboard"
                width={600}
                height={1269}
                fetchPriority="high"
              />
            </div>
          </div>
        </div>
      </div>

      <div
        className="mailcover-top-shape"
        style={{ "--ztrans-mailcover-shift": "60.00px" } as React.CSSProperties}
      />
    </section>
  );
}

export default HeroSection;
