"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

interface ContactFormData {
  fullName: string;
  workEmail: string;
  companyName: string;
  phone: string;
  teamSize: string;
  currentProvider: string;
  message: string;
}

const INITIAL_FORM: ContactFormData = {
  fullName: "",
  workEmail: "",
  companyName: "",
  phone: "",
  teamSize: "10-50",
  currentProvider: "Google Workspace",
  message: "",
};

export default function FloatingContactModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>(INITIAL_FORM);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    function handleDocumentClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const triggerBtn = target.closest(
        "[data-open-contact-modal], .zwc-zmodal-toggle-trigger"
      );
      if (triggerBtn) {
        e.preventDefault();
        setIsOpen(true);
        return;
      }

      const buttonOrLink = target.closest("button, a");
      if (buttonOrLink) {
        const text = (buttonOrLink.textContent || "").trim().toLowerCase();
        const ctAttr = (buttonOrLink.getAttribute("jf-ext-button-ct") || "").toLowerCase();
        if (
          text === "talk to an expert" ||
          ctAttr === "talk to an expert" ||
          text === "request a quote"
        ) {
          e.preventDefault();
          setIsOpen(true);
        }
      }
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("click", handleDocumentClick);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setFormData(INITIAL_FORM);
    setIsSubmitted(false);
    setIsOpen(false);
  };

  return (
    <>
      <aside>
        <div className="zw-other-info"></div>
        <div
          className="zwc-zmodal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="zwc-modal-heading"
          aria-describedby="zwc-modal-description"
        >
          <div className="zwc-zmodal-wrapper-out">
            <div
              className="zwc-zmodal-overlay zwc-zmodal-toggle"
              onClick={() => setIsOpen(false)}
            ></div>
            <div className="zwc-zmodal-wrapper zwc-zmodal-transition sf-hidden"></div>
          </div>
        </div>
        <div className="z-mobile-menu-v2">
          <div className="z-bottom-cta-menu sf-hidden"> </div>
          <div className="zmobile-menu-new sf-hidden"> </div>
        </div>
      </aside>

      <div className="multi-form-wrap">
        <div
          className={`cwf-container cwf-on-slide cwf-label-type-top cwf-border-radius${
            isOpen ? " cwf-open" : ""
          }`}
          id="z_crmwebform_1_dialog"
          role="dialog"
          aria-modal="true"
          tabIndex={-1}
          aria-labelledby="z_crmwebform_1_title"
          style={{ height: "auto" }}
        >
          <div className={`cwf-title-form-wrap${isOpen ? "" : " sf-hidden"}`}></div>
          <div className="cwf-controls">
            <div
              className="cwf-overlay"
              onClick={() => setIsOpen(false)}
            ></div>
            <button
              type="button"
              className="cwf-close-button"
              aria-label="Close form"
              onClick={() => setIsOpen(false)}
            ></button>
          </div>
          <div className="cwf-sr-only" role="alert" aria-live="polite">
            {isSubmitted
              ? "Your inquiry has been submitted to Zoho Mail sales specialists."
              : ""}
          </div>
        </div>
      </div>

      <button
        type="button"
        className="multi-sales-btn"
        style={{ opacity: 1, visibility: "visible" }}
        jf-ext-button-ct="contact sales"
        onClick={() => setIsOpen(true)}
      >
        Contact sales
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="z_crmwebform_1_title"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99999,
            display: "flex",
            justifyContent: "flex-end",
            backgroundColor: "rgba(10, 18, 36, 0.55)",
            backdropFilter: "blur(3px)",
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsOpen(false);
            }
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "460px",
              height: "100%",
              backgroundColor: "#ffffff",
              boxShadow: "-12px 0 40px rgba(0, 0, 0, 0.2)",
              display: "flex",
              flexDirection: "column",
              overflowY: "auto",
              padding: "32px 28px",
              fontFamily: "var(--zf-primary-regular), sans-serif",
              color: "#111827",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                marginBottom: "20px",
                borderBottom: "1px solid #e5e7eb",
                paddingBottom: "16px",
              }}
            >
              <div>
                <span
                  style={{
                    display: "inline-block",
                    fontSize: "11px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "#0067ff",
                    backgroundColor: "#eef5ff",
                    padding: "4px 10px",
                    borderRadius: "999px",
                    marginBottom: "8px",
                  }}
                >
                  24×7 Enterprise Solutions
                </span>
                <h2
                  id="z_crmwebform_1_title"
                  style={{
                    fontSize: "22px",
                    fontWeight: 700,
                    margin: 0,
                    color: "#0f172a",
                  }}
                >
                  Talk to a Zoho Mail Expert
                </h2>
                <p
                  id="zwc-modal-description"
                  style={{
                    fontSize: "13.5px",
                    color: "#4b5563",
                    margin: "6px 0 0 0",
                    lineHeight: 1.5,
                  }}
                >
                  Get a custom quote, assisted migration plan, or compliance walkthrough for your organization.
                </p>
              </div>
              <button
                type="button"
                aria-label="Close modal"
                onClick={() => setIsOpen(false)}
                style={{
                  background: "#f3f4f6",
                  border: "none",
                  borderRadius: "50%",
                  width: "34px",
                  height: "34px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "18px",
                  color: "#374151",
                  flexShrink: 0,
                }}
              >
                ×
              </button>
            </div>

            {isSubmitted ? (
              <div
                style={{
                  padding: "32px 16px",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "14px",
                }}
              >
                <div
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "50%",
                    backgroundColor: "#dcfce7",
                    color: "#15803d",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "28px",
                    fontWeight: 700,
                  }}
                >
                  ✓
                </div>
                <h3 style={{ fontSize: "20px", fontWeight: 700, margin: 0 }}>
                  Request Received!
                </h3>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#4b5563",
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  Thank you, <strong>{formData.fullName || "there"}</strong>. A Zoho Mail migration &amp; deployment specialist will reach out to{" "}
                  <strong>{formData.workEmail}</strong> within 2 hours.
                </p>
                <div
                  style={{
                    display: "flex",
                    gap: "12px",
                    marginTop: "16px",
                    width: "100%",
                  }}
                >
                  <Link
                    href="/cart"
                    onClick={handleReset}
                    style={{
                      flex: 1,
                      padding: "12px 16px",
                      backgroundColor: "#0067ff",
                      color: "#ffffff",
                      borderRadius: "8px",
                      fontWeight: 600,
                      fontSize: "14px",
                      textDecoration: "none",
                      textAlign: "center",
                    }}
                  >
                    Configure Plan &amp; Pricing
                  </Link>
                  <button
                    type="button"
                    onClick={handleReset}
                    style={{
                      padding: "12px 16px",
                      backgroundColor: "#f3f4f6",
                      color: "#1f2937",
                      border: "none",
                      borderRadius: "8px",
                      fontWeight: 600,
                      fontSize: "14px",
                      cursor: "pointer",
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                  flex: 1,
                }}
              >
                <div>
                  <label
                    htmlFor="cwf-fullname"
                    style={{
                      display: "block",
                      fontSize: "13px",
                      fontWeight: 600,
                      marginBottom: "5px",
                      color: "#1f2937",
                    }}
                  >
                    Full Name *
                  </label>
                  <input
                    id="cwf-fullname"
                    type="text"
                    required
                    placeholder="e.g. Priya Sharma"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, fullName: e.target.value }))
                    }
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      borderRadius: "6px",
                      border: "1px solid #d1d5db",
                      fontSize: "14px",
                    }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="cwf-email"
                    style={{
                      display: "block",
                      fontSize: "13px",
                      fontWeight: 600,
                      marginBottom: "5px",
                      color: "#1f2937",
                    }}
                  >
                    Work Email *
                  </label>
                  <input
                    id="cwf-email"
                    type="email"
                    required
                    placeholder="name@yourcompany.com"
                    value={formData.workEmail}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, workEmail: e.target.value }))
                    }
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      borderRadius: "6px",
                      border: "1px solid #d1d5db",
                      fontSize: "14px",
                    }}
                  />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  <div>
                    <label
                      htmlFor="cwf-company"
                      style={{
                        display: "block",
                        fontSize: "13px",
                        fontWeight: 600,
                        marginBottom: "5px",
                        color: "#1f2937",
                      }}
                    >
                      Company Name *
                    </label>
                    <input
                      id="cwf-company"
                      type="text"
                      required
                      placeholder="Acme Corp"
                      value={formData.companyName}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          companyName: e.target.value,
                        }))
                      }
                      style={{
                        width: "100%",
                        padding: "10px 12px",
                        borderRadius: "6px",
                        border: "1px solid #d1d5db",
                        fontSize: "14px",
                      }}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="cwf-phone"
                      style={{
                        display: "block",
                        fontSize: "13px",
                        fontWeight: 600,
                        marginBottom: "5px",
                        color: "#1f2937",
                      }}
                    >
                      Phone Number
                    </label>
                    <input
                      id="cwf-phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, phone: e.target.value }))
                      }
                      style={{
                        width: "100%",
                        padding: "10px 12px",
                        borderRadius: "6px",
                        border: "1px solid #d1d5db",
                        fontSize: "14px",
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  <div>
                    <label
                      htmlFor="cwf-seats"
                      style={{
                        display: "block",
                        fontSize: "13px",
                        fontWeight: 600,
                        marginBottom: "5px",
                        color: "#1f2937",
                      }}
                    >
                      Number of Mailboxes
                    </label>
                    <select
                      id="cwf-seats"
                      value={formData.teamSize}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, teamSize: e.target.value }))
                      }
                      style={{
                        width: "100%",
                        padding: "10px 12px",
                        borderRadius: "6px",
                        border: "1px solid #d1d5db",
                        fontSize: "14px",
                        backgroundColor: "#fff",
                      }}
                    >
                      <option value="1-10">1 – 10 users</option>
                      <option value="10-50">10 – 50 users</option>
                      <option value="51-250">51 – 250 users</option>
                      <option value="251-1000">251 – 1,000 users</option>
                      <option value="1000+">1,000+ Enterprise</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="cwf-provider"
                      style={{
                        display: "block",
                        fontSize: "13px",
                        fontWeight: 600,
                        marginBottom: "5px",
                        color: "#1f2937",
                      }}
                    >
                      Current Email Provider
                    </label>
                    <select
                      id="cwf-provider"
                      value={formData.currentProvider}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          currentProvider: e.target.value,
                        }))
                      }
                      style={{
                        width: "100%",
                        padding: "10px 12px",
                        borderRadius: "6px",
                        border: "1px solid #d1d5db",
                        fontSize: "14px",
                        backgroundColor: "#fff",
                      }}
                    >
                      <option value="Google Workspace">Google Workspace</option>
                      <option value="Microsoft 365">Microsoft 365</option>
                      <option value="Exchange / On-Prem">Exchange / On-Prem</option>
                      <option value="GoDaddy / Rackspace">GoDaddy / Rackspace</option>
                      <option value="New Setup">Setting up new domain</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="cwf-message"
                    style={{
                      display: "block",
                      fontSize: "13px",
                      fontWeight: 600,
                      marginBottom: "5px",
                      color: "#1f2937",
                    }}
                  >
                    How can our migration &amp; solutions team help?
                  </label>
                  <textarea
                    id="cwf-message"
                    rows={3}
                    placeholder="Tell us about your domain setup, data residency requirements, or timeline..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, message: e.target.value }))
                    }
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      borderRadius: "6px",
                      border: "1px solid #d1d5db",
                      fontSize: "14px",
                      resize: "vertical",
                    }}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    marginTop: "6px",
                    padding: "13px 20px",
                    backgroundColor: "#e42527",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "6px",
                    fontSize: "15px",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Request Custom Quote &amp; Consultation
                </button>

                <div
                  style={{
                    marginTop: "auto",
                    paddingTop: "14px",
                    borderTop: "1px solid #f3f4f6",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    fontSize: "12.5px",
                    color: "#6b7280",
                  }}
                >
                  <span>Want to self-configure your seats now?</span>
                  <Link
                    href="/cart"
                    onClick={() => setIsOpen(false)}
                    style={{
                      color: "#0067ff",
                      fontWeight: 600,
                      textDecoration: "none",
                    }}
                  >
                    Go to Plan Configurator →
                  </Link>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
