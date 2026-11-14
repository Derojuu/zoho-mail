"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FOOTER_LINK_COLUMNS,
  OTHER_PRODUCTS_BY_ZOHO_MAIL,
  FOOTER_PRIVACY_LINKS,
  LANGUAGE_OPTIONS,
} from "@/constants";
import { ASSETS } from "@/assets";

const FOOTER_ISO_BADGES = [
  {
    className: "zsb-iso-ism",
    ariaLabel: "ISO/IEC 27001 Information Security Management Certified",
  },
  {
    className: "zsb-iso-pim",
    ariaLabel: "ISO/IEC 27701 Privacy Information Management Certified",
  },
  {
    className: "zsb-iso-csm",
    ariaLabel: "ISO/IEC 27017 Cloud Security Management Certified",
  },
  {
    className: "zsb-iso-pdc",
    ariaLabel: "ISO/IEC 27018 Personal Data in the Cloud Certified",
  },
  {
    className: "zsb-iso-qms",
    ariaLabel: "ISO 9001 Quality Management System Certified",
  },
  {
    className: "zsb-iso-bcm",
    ariaLabel: "ISO 22301 Business Continuity Management",
  },
  {
    className: "zsb-iso-gdpr",
    ariaLabel: "GDPR - General Data Protection Regulation",
  },
  {
    className: "zsb-iso-soc2",
    ariaLabel: "AICPA SOC",
  },
  {
    className: "zsb-iso-hippa",
    ariaLabel: "HIPAA",
  },
];

export default function Footer() {
  const [footerQuery, setFooterQuery] = useState("");
  const [isFooterLangOpen, setIsFooterLangOpen] = useState(false);

  const handleFooterSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (footerQuery.trim()) {
      window.open(
        `https://www.zoho.com/search-results.html?query=${encodeURIComponent(footerQuery.trim())}`,
        "_blank",
        "noopener,noreferrer"
      );
    }
  };

  return (
    <footer className="zwf-new-footer">
      <div className="zw-product-footer zwf-product-footer">
        <div className="footer-sec-wrap" data-showonlylang="en">
          <div className="content-wrap bottom-animated middle-animated animated">
            <div className="zw-primary-wrap zw-slide-promobnr-links">
              <div className="promo-section-wrap">
                <div className="zw-promo-banner-block">
                  <a
                    href="https://www.zoho.com/mail/webinars/?src=ft"
                    className="pri-banner"
                    aria-label="Zoho Mail webinars"
                  >
                    <img
                      width={360}
                      height={240}
                      data-lazy=""
                      alt="Zoho Mail webinars"
                      src={ASSETS.banners.promoWebinars}
                      className="data-loaded"
                    />
                  </a>
                  <a
                    href="https://www.zoho.com/blog/mail/enterprise-email-security-leader-se-labs.html?src=ft"
                    target="_blank"
                    className="sec-banner"
                    aria-label="Zoho Mail SE Labs Security Award webinar"
                    rel="noopener"
                  >
                    <img
                      width={360}
                      height={240}
                      data-lazy=""
                      alt="Zoho Mail SE Labs Security Award webinar"
                      src={ASSETS.banners.promoSeLabs}
                      className="data-loaded"
                    />
                  </a>
                </div>
              </div>

              <div className="footer-links-wrap">
                <div className="product-links">
                  {FOOTER_LINK_COLUMNS.map((colGroups, colIndex) => (
                    <div key={colIndex} className="zw-prod-link-block">
                      {colGroups.map((group) => (
                        <div key={group.title} className="zw-prod-link-box">
                          <h3>{group.title}</h3>
                          <ul>
                            {group.links.map((link) => (
                              <li key={link.label}>
                                {link.href.startsWith("/") ? (
                                  <Link href={link.href}>{link.label}</Link>
                                ) : (
                                  <a
                                    href={link.href}
                                    target={link.external ? "_blank" : undefined}
                                    rel={link.external ? "noopener" : undefined}
                                  >
                                    {link.label}
                                  </a>
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="zw-common-footer">
        <div className="content-wrap bottom-animated middle-animated">
          <div className="zw-footer-op-block">
            <div className="zw-other-products">
              <h4>Other Products by Zoho Mail</h4>
              <ul data-lazy="" className="data-loaded">
                {OTHER_PRODUCTS_BY_ZOHO_MAIL.map((product) => (
                  <li key={product.name}>
                    <a
                      aria-label={product.ariaLabel}
                      href={product.href}
                      className={product.className}
                    >
                      <div className="zw-op-box">
                        <p>{product.name}</p>
                        <span>{product.subtitle}</span>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="zw-other-products">
              <h4>Also a part of</h4>
              <ul data-lazy="" className="data-loaded">
                <li>
                  <a
                    href="https://www.zoho.com/workplace/?src=mft"
                    className="op-workplace"
                  >
                    <div className="zw-op-box">
                      <p>Workplace</p>
                      <span>Email and Office Suite</span>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="zw-support-links-wrap">
            <div className="zw-support-links-block">
              <div className="zw-support-mail-links">
                <span className="zf-support-mail-wrap">
                  <a
                    aria-label="Send an email to sales@zohocorp.com"
                    id="zf-support-mailid"
                    href="mailto:sales@zohocorp.com"
                    className="zf-support-id-small"
                  >
                    sales@zohocorp.com
                  </a>
                </span>
              </div>
              <div className="zw-apps-links-wrap">
                <div className="zw-apps-link">
                  <div className="app-play-store apps-download-links-wrap">
                    <a
                      className="app-store"
                      href="https://zoho.to/MailApple"
                      target="_blank"
                      aria-label="Download Zoho mail from the App Store"
                      rel="noopener"
                    ></a>
                    <a
                      className="g-play"
                      href="https://zoho.to/MailAndroid"
                      target="_blank"
                      aria-label="Download Zoho mail from the Play Store"
                      rel="noopener"
                    ></a>
                  </div>
                </div>
              </div>
              <div className="zw-social-links-wrap">
                <div className="zw-social-link">
                  <ul className="zft-social-icons">
                    <li className="zft-facebook">
                      <a
                        href="https://www.facebook.com/zoho/"
                        target="_blank"
                        aria-label="Check us out on Facebook - opens in a new tab"
                        rel="noopener"
                      ></a>
                    </li>
                    <li className="zft-twitter">
                      <a
                        href="https://twitter.com/ZohoMail/"
                        target="_blank"
                        aria-label="Check us out on Twitter - opens in a new tab"
                        rel="noopener"
                      ></a>
                    </li>
                    <li className="zft-youtube">
                      <a
                        href="https://www.youtube.com/ZohoMailofficial"
                        target="_blank"
                        aria-label="Check us out on Youtube - opens in a new tab"
                        rel="noopener"
                      ></a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="zw-footer-badge-block">
            <div className="zw-highly-rated">
              <div className="zw-awards-wrap">
                <span className="f-badge f-badge1"></span>
                <span className="f-badge f-badge2"></span>
                <span className="f-badge f-badge3"></span>
              </div>
            </div>
            <div className="zw-privacy-badge">
              <h4>Choose Privacy. Choose Zoho.</h4>
              <ul>
                {FOOTER_ISO_BADGES.map((badge) => (
                  <li
                    key={badge.className}
                    className={badge.className}
                    aria-label={badge.ariaLabel}
                  ></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="zw-global-footer zwf-global-footer">
        <div className="common-links">
          <div className="zw-footer-search-lang-block">
            <div className="footer-search">
              <form id="footer-search-action" onSubmit={handleFooterSearch}>
                <input
                  className="footer-search-input"
                  aria-label="Search for product overviews, FAQs, and more..."
                  autoComplete="off"
                  placeholder="Search for product overviews, FAQs, and more..."
                  type="text"
                  value={footerQuery}
                  onChange={(e) => setFooterQuery(e.target.value)}
                />
                <button
                  className="footer-search-btn"
                  aria-label="footer search button"
                  type="submit"
                  value="Submit"
                >
                  <span></span>
                </button>
              </form>
            </div>
            <div className="zlang-container">
              <button
                type="button"
                aria-haspopup="menu"
                aria-expanded={isFooterLangOpen}
                className="zlang-text"
                onClick={() => setIsFooterLangOpen((prev) => !prev)}
              >
                English
              </button>
              <div
                className="zlang-container-inner"
                style={{ display: isFooterLangOpen ? "block" : "none" }}
              >
                <ul>
                  {LANGUAGE_OPTIONS.map((lang) => (
                    <li key={lang.code} className={lang.className}>
                      <a
                        className="nonlang-ld"
                        data-lang={lang.code}
                        href={lang.href}
                        target={lang.external ? "_blank" : undefined}
                        rel={lang.external ? "noopener" : undefined}
                      >
                        {lang.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <ul className="ZPprivacy">
            {FOOTER_PRIVACY_LINKS.map((item) => (
              <li
                key={item.className}
                className={item.className}
                id={item.id}
                style={item.style}
              >
                <a className={item.linkClass} href={item.href}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="zw-only-copyright zwf-only-copyright">
        <p>© 2026, Zoho Corporation Pvt. Ltd. All Rights Reserved.</p>
      </div>
      <div className="zw-promo-bottom"></div>
    </footer>
  );
}
