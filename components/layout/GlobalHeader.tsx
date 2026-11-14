"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { RELATED_PRODUCTS, LANGUAGE_OPTIONS } from "@/constants";
import { ASSETS } from "@/assets";

export default function GlobalHeader() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isAllProductsOpen, setIsAllProductsOpen] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const langRef = useRef<HTMLDivElement>(null);
  const userBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
      if (userBoxRef.current && !userBoxRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.open(
        `https://www.zoho.com/search-results.html?query=${encodeURIComponent(searchQuery.trim())}`,
        "_blank",
        "noopener,noreferrer"
      );
    }
  };

  return (
    <>
      <div className="zw-promo-top">
        <div className="ztopstrip-container"></div>
      </div>
      <div className="zw-global-header">
        <a
          href="#zw-product-header-skip"
          tabIndex={0}
          className="zwc_global_header_skip"
        >
          Skip to product menu
        </a>
        <div className="header uheader">
          <div className="zgh-headerWrap" id="header">
            <div className="zgh-brand">
              <span
                className="zgh-menu"
                onClick={() => setIsAllProductsOpen((prev) => !prev)}
                role="button"
                tabIndex={0}
                aria-label="Toggle global menu"
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setIsAllProductsOpen((prev) => !prev);
                  }
                }}
              >
                <span className="hamburger-box">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
              </span>
              <a aria-label="Zoho.com" href="https://www.zoho.com/">
                Zoho.com
              </a>
            </div>

            <div className="zgh-nav">
              <ul className="zwc-relatedPrd-wrap">
                {RELATED_PRODUCTS.map((item) => (
                  <li key={item.id} className={item.className}>
                    <a href={item.href} aria-label={item.ariaLabel}>
                      {item.label}
                    </a>
                    <p style={{ top: "0px", left: "0px" }} className="sf-hidden">
                      {item.description}
                    </p>
                  </li>
                ))}
                <li
                  className={`zwc-all-product${isAllProductsOpen ? " active" : ""}`}
                  tabIndex={0}
                  aria-haspopup="true"
                  aria-controls="zwc-global-menu-container"
                  aria-expanded={isAllProductsOpen}
                  onClick={() => setIsAllProductsOpen((prev) => !prev)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setIsAllProductsOpen((prev) => !prev);
                    }
                  }}
                >
                  All Products
                </li>
              </ul>
            </div>

            <div className="zgh-utilities">
              <div className={`zgh-search${isSearchOpen ? " is-open active" : ""}`}>
                <button
                  type="button"
                  className="zgh-search-icon"
                  aria-label="Zoho Search"
                  aria-haspopup="true"
                  aria-expanded={isSearchOpen}
                  onClick={() => setIsSearchOpen((prev) => !prev)}
                ></button>
                <div
                  className="zgh-search-container"
                  style={isSearchOpen ? { display: "block" } : undefined}
                >
                  <div className="zgh-search-wrap">
                    <div className="zgh-search-box">
                      <form
                        id="zgh-search-action"
                        onSubmit={handleSearchSubmit}
                      >
                        <input
                          ref={searchInputRef}
                          className="zgh-search-field"
                          aria-label="Search for product overviews, FAQs, and more..."
                          id="zgh-search-query"
                          autoComplete="off"
                          name="query"
                          placeholder="Search for product overviews, FAQs, and more..."
                          type="text"
                          aria-required="true"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button
                          type="submit"
                          className="zgh-search-btn"
                          aria-label="Search"
                        ></button>
                        <span
                          className={`zgh-search-clear${searchQuery ? "" : " sf-hidden"}`}
                          onClick={() => setSearchQuery("")}
                          role="button"
                          tabIndex={0}
                          aria-label="Clear search"
                        ></span>
                      </form>
                    </div>
                  </div>
                  <div
                    className="zgh-search-overlay"
                    onClick={() => setIsSearchOpen(false)}
                  ></div>
                </div>
              </div>

              <div
                ref={langRef}
                className={`zgh-localization init${isLangOpen ? " active is-open" : ""}`}
              >
                <button
                  type="button"
                  className="zgh-localSelect"
                  aria-haspopup="menu"
                  aria-expanded={isLangOpen}
                  onClick={() => setIsLangOpen((prev) => !prev)}
                >
                  English
                </button>
                <div
                  className="zgh-localBox"
                  style={isLangOpen ? { display: "block", opacity: 1, visibility: "visible" } : undefined}
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

              <Link
                href="/cart"
                aria-label="Configure & Cart"
                title="Configure Plan & Cart"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "0 10px",
                  color: "#0067ff",
                  fontSize: "13px",
                  fontWeight: 600,
                  textDecoration: "none",
                  gap: "4px",
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
                <span>Cart</span>
              </Link>

              <div className="zgh-accounts">
                <div
                  ref={userBoxRef}
                  className={`zgh-user-box${isUserMenuOpen ? " active is-open" : ""}`}
                >
                  <div className="zgh-userPanel">
                    <button
                      type="button"
                      className="zgh-userAvatar"
                      aria-haspopup="menu"
                      aria-label="Account menu"
                      aria-expanded={isUserMenuOpen}
                      onClick={() => setIsUserMenuOpen((prev) => !prev)}
                    >
                      <img
                        src={ASSETS.avatars.userAvatar}
                        alt="Abdulwaris Odumbo"
                        style={{
                          backgroundBlendMode: "normal",
                          backgroundClip: "content-box",
                          backgroundPosition: "50% 50%",
                          backgroundColor: "rgba(0,0,0,0)",
                          backgroundImage: "var(--sf-img-32)",
                          backgroundSize: "cover",
                          backgroundOrigin: "content-box",
                          backgroundRepeat: "no-repeat",
                          backgroundAttachment: "scroll",
                        }}
                      />
                    </button>
                    <div
                      className="zgh-userLink"
                      style={
                        isUserMenuOpen
                          ? { display: "block", opacity: 1, visibility: "visible" }
                          : undefined
                      }
                    >
                      <ul>
                        <li className="zgh-userImage">
                          <img
                            src={ASSETS.avatars.userAvatar}
                            alt="Abdulwaris Odumbo"
                            style={{
                              backgroundBlendMode: "normal",
                              backgroundClip: "content-box",
                              backgroundPosition: "50% 50%",
                              backgroundColor: "rgba(0,0,0,0)",
                              backgroundImage: "var(--sf-img-32)",
                              backgroundSize: "100% 100%",
                              backgroundOrigin: "content-box",
                              backgroundRepeat: "no-repeat",
                              backgroundAttachment: "scroll",
                            }}
                          />
                        </li>
                        <li className="zgh-userName">Abdulwaris Odumbo</li>
                        <li className="zgh-userAccess">
                          <a href="https://mail.zoho.com/">Access Zoho Mail</a>
                        </li>
                        <li className="zgh-userAccount">
                          <a href="https://accounts.zoho.com/u/h#home">My Account</a>
                        </li>
                        <li className="zgh-userLogout">
                          <a href="https://accounts.zoho.com/logout?serviceurl=https://www.zoho.com/mail/&servicename=VirtualOffice">
                            Sign Out
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="product-header-top sf-hidden"> </div>
        <div
          className={`zwc-global-menu-container${isAllProductsOpen ? "" : " sf-hidden"}`}
          id="zwc-global-menu-container"
        ></div>
      </div>
    </>
  );
}
