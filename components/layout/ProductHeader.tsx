"use client";

import React from "react";
import Link from "next/link";
import { ASSETS } from "@/assets";

export default function ProductHeader() {
  return (
    <div className="zw-product-header" id="zw-product-header">
      <a
        href="#zw-template-inner"
        id="zw-product-header-skip"
        tabIndex={0}
        className="zwc_global_header_skip"
      >
        Skip to main content
      </a>
      <div
        className="content-wrap bottom-animated top-animated middle-animated animated"
        style={{ opacity: 1 }}
      >
        <div className="product-title">
          <Link href="/">
            <img
              className="product-icon"
              alt="Zoho mail"
              src={ASSETS.logos.zohoMail}
              width="auto"
              height={44}
            />
          </Link>
        </div>
        <div className="product-nav-links">
          <ul
            className="menu nav"
            style={{ height: "auto", top: "auto", display: "block" }}
          >
            {/* Features */}
            <li
              className="expanded dropdown first zmenu-features"
              data-noshowlang="cn,jp"
            >
              <span
                data-target="#"
                className="dropdown-toggle nolink"
                data-toggle="dropdown"
                role="button"
                tabIndex={0}
                aria-haspopup="menu"
                aria-expanded="false"
              >
                Features<span className="caret"></span>
              </span>
              <ul className="dropdown-menu" style={{ width: "212.052px" }}>
                <li>
                  <a href="https://www.zoho.com/mail/mailsuite-apps.html?src=mpd-menu">
                    Email Suite
                  </a>
                </li>
                <li>
                  <a href="https://www.zoho.com/mail/custom-domain-email.html?src=mpd-menu">
                    Custom Domain
                  </a>
                </li>
                <li className="sub-level">
                  <span
                    className="dropdown-toggle nolink"
                    data-target="#"
                    data-toggle="dropdown"
                    role="button"
                    tabIndex={0}
                    aria-haspopup="menu"
                    aria-expanded="false"
                  >
                    Security &amp; Privacy
                  </span>
                  <ul
                    className="sub-dropdown third-level"
                    style={{ minHeight: "504.333px", width: "184.323px" }}
                  >
                    <li>
                      <a href="https://www.zoho.com/mail/security/physical-security.html?src=mpd-menu">
                        Physical Security
                      </a>
                    </li>
                    <li>
                      <a href="https://www.zoho.com/mail/security/data-and-threat-protection.html?src=mpd-menu">
                        Threat Protection
                      </a>
                    </li>
                    <li>
                      <a href="https://www.zoho.com/mail/security/secure-access.html?src=mpd-menu">
                        Secure Access
                      </a>
                    </li>
                    <li>
                      <a href="https://www.zoho.com/mail/security/certificates-and-compliance.html?src=mpd-menu">
                        Organization Security
                      </a>
                    </li>
                    <li>
                      <a href="https://www.zoho.com/mail/security/email-encryption.html?src=mpd-menu">
                        Email Encryption
                      </a>
                    </li>
                    <li>
                      <a href="https://www.zoho.com/mail/data-privacy.html?src=mpd-menu">
                        Email Privacy
                      </a>
                    </li>
                    <li className="zmenu-dropdown-all">
                      <a href="https://www.zoho.com/mail/secure-email.html?src=mpd-menu">
                        Overall Security
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="sub-level">
                  <span
                    className="dropdown-toggle nolink"
                    data-target="#"
                    data-toggle="dropdown"
                    role="button"
                    tabIndex={0}
                    aria-haspopup="menu"
                    aria-expanded="false"
                  >
                    Admin Control
                  </span>
                  <ul
                    className="sub-dropdown third-level"
                    style={{ minHeight: "504.333px", width: "184.323px" }}
                  >
                    <li>
                      <a href="https://www.zoho.com/mail/admin-console.html?src=mpd-menu">
                        Admin Console
                      </a>
                    </li>
                    <li>
                      <a href="https://www.zoho.com/mail/ediscovery.html?src=mpd-menu">
                        Email Retention
                      </a>
                    </li>
                    <li>
                      <a href="https://www.zoho.com/mail/email-groups.html?src=mpd-menu">
                        Email Groups
                      </a>
                    </li>
                    <li>
                      <a href="https://www.zoho.com/mail/enterprise-email.html?src=mpd-menu">
                        Enterprise Features
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="sub-level">
                  <span
                    className="dropdown-toggle nolink"
                    data-target="#"
                    data-toggle="dropdown"
                    role="button"
                    tabIndex={0}
                    aria-haspopup="menu"
                    aria-expanded="false"
                  >
                    Uninterrupted Access
                  </span>
                  <ul
                    className="sub-dropdown third-level"
                    style={{ minHeight: "504.333px", width: "184.323px" }}
                  >
                    <li>
                      <a href="https://www.zoho.com/mail/zohomail-offline.html?src=mpd-menu">
                        Offline Access
                      </a>
                    </li>
                    <li>
                      <a href="https://www.zoho.com/mail/mobile/?src=mpd-menu">
                        Mobile Access
                      </a>
                    </li>
                    <li>
                      <a href="https://www.zoho.com/mail/desktop/?src=mpd-menu">
                        Desktop Client
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="https://www.zoho.com/mail/streams.html?src=mpd-menu">
                    Collaboration
                  </a>
                </li>
                <li>
                  <a href="https://www.zoho.com/mail/integrations.html?src=mpd-menu">
                    Integrations
                  </a>
                </li>
                <li>
                  <a href="https://www.zoho.com/mail/migration/?src=mpd-menu">
                    Easy Migration
                  </a>
                </li>
                <li>
                  <a href="https://www.zoho.com/mail/zia-with-openai.html?src=mpd-menu">
                    AI Assistance <span className="new-badge">New!</span>
                  </a>
                </li>
                <li>
                  <a href="https://www.zoho.com/mail/hybrid-email-solution.html?src=mpd-menu">
                    Hybrid email
                  </a>
                </li>
                <li>
                  <a href="https://www.zoho.com/mail/features.html?src=mpd-menu">
                    All features
                  </a>
                </li>
                <li className="zmenu-dropdown-all">
                  <a href="https://www.zoho.com/mail/why-choose-zoho-mail.html?src=mpd-menu">
                    Why Zoho Mail
                  </a>
                </li>
              </ul>
            </li>

            {/* Pricing -> Linked to /cart */}
            <li className="leaf zmenu-pricing">
              <Link href="/cart">Pricing</Link>
            </li>

            {/* Enterprise */}
            <li data-showonlylang="en" className="leaf zmenu-features">
              <a href="https://www.zoho.com/mail/enterprise-email.html?src=mpd-menu">
                Enterprise
              </a>
            </li>

            {/* Migration */}
            <li
              className="expanded dropdown zmenu-migration dropdown-right"
              data-showonlylang="en"
            >
              <span
                data-target="#"
                className="dropdown-toggle nolink"
                data-toggle="dropdown"
                role="button"
                tabIndex={0}
                aria-haspopup="menu"
                aria-expanded="false"
              >
                Migration<span className="caret"></span>
              </span>
              <ul
                className="dropdown-menu twoCol-sec-parent"
                style={{ width: "400px" }}
              >
                <li>
                  <ul className="twoCol-sec" style={{ minHeight: "427px" }}>
                    <li className="zwc-zmenu-submenu-list">
                      <div>
                        <h5 className="menuColTitle">Compare with</h5>
                        <ul style={{ minHeight: "427px" }}>
                          <li>
                            <a href="https://www.zoho.com/workplace/google-workspace-alternative.html?src=mpd-menu">
                              Google Workspace
                            </a>
                          </li>
                          <li>
                            <a href="https://www.zoho.com/workplace/microsoft365-alternative.html?src=mpd-menu">
                              Microsoft 365
                            </a>
                          </li>
                          <li>
                            <a href="https://www.zoho.com/workplace/transition/gmail-to-zoho-mail.html?src=mpd-menu">
                              Gmail
                            </a>
                          </li>
                          <li>
                            <a href="https://www.zoho.com/workplace/transition/outlook-to-zoho-mail.html?src=mpd-menu">
                              Outlook
                            </a>
                          </li>
                          <li>
                            <a href="https://www.zoho.com/mail/transition/godaddy-workspace-email-to-zoho-mail.html?src=mpd-menu">
                              Godaddy Email
                            </a>
                          </li>
                          <li>
                            <a href="https://www.zoho.com/workplace/transition/google-calendar-to-zoho-calendar.html?src=mpd-menu">
                              Google Calendar
                            </a>
                          </li>
                          <li>
                            <a href="https://www.zoho.com/workplace/transition/outlook-calendar-to-zoho-calendar.html?src=mpd-menu">
                              Outlook Calendar
                            </a>
                          </li>
                          <li>
                            <a href="https://www.zoho.com/mail/transition/amazon-workmail-to-zoho-mail.html?src=mpd-menu">
                              Amazon WorkMail
                            </a>
                          </li>
                          <li>
                            <a href="https://www.zoho.com/mail/transition/zimbra-to-zoho-mail.html?src=mpd-menu">
                              Zimbra Mail
                            </a>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li className="zwc-zmenu-submenu-list">
                      <div>
                        <h5 className="menuColTitle">Migration guides</h5>
                        <ul style={{ minHeight: "427px" }}>
                          <li>
                            <a href="https://www.zoho.com/mail/migration/google-workspace.html?src=mpd-menu">
                              Google Workspace
                            </a>
                          </li>
                          <li>
                            <a href="https://www.zoho.com/mail/migration/office-365.html?src=mpd-menu">
                              Microsoft 365
                            </a>
                          </li>
                          <li>
                            <a href="https://www.zoho.com/mail/migration/exchange-server.html?src=mpd-menu">
                              Microsoft Exchange
                            </a>
                          </li>
                          <li>
                            <a href="https://www.zoho.com/mail/help/adminconsole/amazon-workmail-to-zoho-mail-migration.html?src=mpd-menu">
                              Amazon WorkMail
                            </a>
                          </li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>

            {/* Resources */}
            <li
              className="expanded dropdown zmenu-resources dropdown-right"
              data-showonlylang="en"
            >
              <span
                data-target="#"
                className="dropdown-toggle nolink"
                data-toggle="dropdown"
                role="button"
                tabIndex={0}
                aria-haspopup="menu"
                aria-expanded="false"
              >
                Resources<span className="caret"></span>
              </span>
              <ul
                className="dropdown-menu twoCol-sec-parent"
                style={{ width: "400px" }}
              >
                <li>
                  <ul className="twoCol-sec" style={{ minHeight: "547px" }}>
                    <li className="zwc-zmenu-submenu-list">
                      <div>
                        <h5 className="menuColTitle">Guides &amp; How-tos</h5>
                        <ul style={{ minHeight: "547px" }}>
                          <li>
                            <a href="https://www.zoho.com/mail/help/adminconsole/email-hosting-setup.html?src=mpd-menu">
                              Admin Guide
                            </a>
                          </li>
                          <li>
                            <a href="https://www.zoho.com/mail/help/getting-started.html?src=mpd-menu">
                              User Guide
                            </a>
                          </li>
                          <li>
                            <a href="https://www.zoho.com/mail/complete-guide-to-setup-zohomail.html?src=mpd-menu">
                              Complete Setup Guide
                            </a>
                          </li>
                          <li className="sub-level zmenu-submenu">
                            <span
                              className="dropdown-toggle nolink"
                              data-target="#"
                              data-toggle="dropdown"
                              role="button"
                              tabIndex={0}
                              aria-haspopup="menu"
                              aria-expanded="false"
                            >
                              Developers&apos; Guide
                            </span>
                            <div className="submenu-dd">
                              <h5 className="menuColTitle">
                                Developers&apos; Guide
                              </h5>
                              <ul style={{ minHeight: "547px" }}>
                                <li>
                                  <a href="https://www.zoho.com/mail/help/api/?src=mpd-menu">
                                    REST API
                                  </a>
                                </li>
                                <li>
                                  <a href="https://www.zoho.com/mail/help/cli/overview.html?src=mpd-menu">
                                    CLI Guide
                                  </a>
                                </li>
                                <li>
                                  <a href="https://www.zoho.com/mail/help/developer-platform.html?src=mpd-menu">
                                    Developer Platform
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </li>
                          <li>
                            <a href="https://www.zoho.com/mail/reviews.html?src=pd-menu">
                              Reviews
                            </a>
                          </li>
                          <li className="sub-level zmenu-submenu">
                            <span
                              className="dropdown-toggle nolink"
                              data-target="#"
                              data-toggle="dropdown"
                              role="button"
                              tabIndex={0}
                              aria-haspopup="menu"
                              aria-expanded="false"
                            >
                              How-to
                            </span>
                            <div className="submenu-dd">
                              <h5 className="menuColTitle">How-to</h5>
                              <ul style={{ minHeight: "547px" }}>
                                <li>
                                  <a href="https://www.zoho.com/mail/how-to/?src=mpd-menu#getting-started">
                                    Getting started
                                  </a>
                                </li>
                                <li>
                                  <a href="https://www.zoho.com/mail/how-to/?src=mpd-menu#setting-up-zoho-mail">
                                    Setting up
                                  </a>
                                </li>
                                <li>
                                  <a href="https://www.zoho.com/mail/how-to/?src=mpd-menu#managing-inbox">
                                    Managing Inbox
                                  </a>
                                </li>
                                <li>
                                  <a href="https://www.zoho.com/mail/how-to/?src=mpd-menu#sending-emails">
                                    Sending emails
                                  </a>
                                </li>
                                <li>
                                  <a href="https://www.zoho.com/mail/how-to/?src=mpd-menu#admin-settings">
                                    Admin settings
                                  </a>
                                </li>
                                <li className="zmenu-dropdown-all">
                                  <a href="https://www.zoho.com/mail/how-to/?src=mpd-menu">
                                    All How-tos
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </li>
                          <li className="sub-level">
                            <span
                              className="dropdown-toggle nolink"
                              data-target="#"
                              data-toggle="dropdown"
                              role="button"
                              tabIndex={0}
                              aria-haspopup="menu"
                              aria-expanded="false"
                            >
                              Deployment Guide
                            </span>
                            <div className="submenu-dd">
                              <h5 className="menuColTitle">Deployment Guide</h5>
                              <ul style={{ minHeight: "547px" }}>
                                <li>
                                  <a href="https://www.zoho.com/mail/deployment/solopreneur.html?src=mpd-menu">
                                    Solopreneur
                                  </a>
                                </li>
                                <li>
                                  <a href="https://www.zoho.com/mail/deployment/small-business.html?src=mpd-menu">
                                    Small business and startup
                                  </a>
                                </li>
                                <li>
                                  <a href="https://www.zoho.com/mail/deployment/medium-large-business.html?src=mpd-menu">
                                    Medium and large business
                                  </a>
                                </li>
                                <li>
                                  <a href="https://www.zoho.com/mail/deployment/enterprise.html?src=mpd-menu">
                                    Enterprise
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li className="zwc-zmenu-submenu-list">
                      <div>
                        <h5 className="menuColTitle">
                          Resources&nbsp;&amp;&nbsp;Support
                        </h5>
                        <ul style={{ minHeight: "547px" }}>
                          <li>
                            <a href="https://www.zoho.com/workplace/customers/?src=mpd-menu">
                              Customers
                            </a>
                          </li>
                          <li>
                            <a href="https://www.zoho.com/mail/whats-new.html?src=mpd-menu">
                              What&apos;s New?
                            </a>
                          </li>
                          <li>
                            <a
                              href="https://www.zoho.com/blog/mail?src=mpd-menu"
                              target="_blank"
                              rel="noopener"
                            >
                              Blogs
                            </a>
                          </li>
                          <li>
                            <a href="https://www.zoho.com/mail/webinars/?src=mpd-menu">
                              Webinars
                            </a>
                          </li>
                          <li>
                            <a href="https://www.zoho.com/mail/training-certification.html?src=mpd-menu">
                              Trainings
                            </a>
                          </li>
                          <li>
                            <a href="https://www.zoho.com/mail/videos/?src=mpd-menu">
                              Videos
                            </a>
                          </li>
                          <li>
                            <a href="https://www.zoho.com/mail/glossary/?src=mpd-menu">
                              Glossary
                            </a>
                          </li>
                          <li>
                            <a
                              href="https://help.zoho.com/portal/en/community/zoho-mail/?src=mpd-menu"
                              target="_blank"
                              rel="noopener"
                            >
                              Forums
                            </a>
                          </li>
                          <li>
                            <a href="https://www.zoho.com/mail/support.html?src=mpd-menu">
                              Support Tiers
                            </a>
                          </li>
                          <li>
                            <a
                              href="https://www.zoho.com/workplace/digital-transformation.html?src=mpd-menu"
                              target="_blank"
                              rel="noopener"
                            >
                              The Future of Work
                            </a>
                          </li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                  <ul
                    className="twoCol-sec-bottom-btn"
                    style={{ minHeight: "547px" }}
                  >
                    <li className="zmenu-dropdown-all">
                      <a href="https://www.zoho.com/mail/help/?src=mpd-menu">
                        All Resources
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>

            {/* Contact */}
            <li
              className="expanded dropdown last zmenu-contact"
              data-showonlylang="en"
            >
              <span
                data-target="#"
                className="dropdown-toggle nolink"
                data-toggle="dropdown"
                role="button"
                tabIndex={0}
                aria-haspopup="menu"
                aria-expanded="false"
              >
                Contact<span className="caret"></span>
              </span>
              <ul className="dropdown-menu" style={{ width: "172.854px" }}>
                <li>
                  <a
                    target="_blank"
                    href="https://www.zoho.com/partners/workplace-partnership-program.html?src=mpd-menu"
                    rel="noopener"
                  >
                    Become a partner
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    href="https://www.zoho.com/affiliate/?src=mpd-menu"
                    rel="noopener"
                  >
                    Become an affiliate
                  </a>
                </li>
                <li>
                  <a href="https://www.zoho.com/mail/request-quote.html?src=mpd-menu">
                    Request a quote
                  </a>
                </li>
                <li>
                  <a href="https://www.zoho.com/mail/contact.html?src=mpd-menu">
                    Contact us
                  </a>
                </li>
              </ul>
            </li>
            <li
              className="featured-apps-part"
              style={{ display: "none" }}
            ></li>
          </ul>
        </div>
        <div className="zgh-accounts sf-hidden"></div>
      </div>
    </div>
  );
}
