import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Secure & Professional Business Email for your Organization | Zoho Mail",
  description:
    "Ad-free Business Email Hosting with a clean, easy-to-use interface. Secure & professional with integrated business Calendar, Contacts, Notes & Tasks.",
  openGraph: {
    title: "Secure & Professional Business Email for your Organization | Zoho Mail",
    description:
      "Ad-free Business Email Hosting with a clean, easy-to-use interface. Secure & professional with integrated business Calendar, Contacts, Notes & Tasks.",
    url: "https://www.zoho.com/mail/",
    siteName: "Zoho",
    type: "website",
  },
  twitter: {
    card: "summary",
    site: "@zoho",
    title: "Secure & Professional Business Email for your Organization | Zoho Mail",
    description:
      "Ad-free Business Email Hosting with a clean, easy-to-use interface. Secure & professional with integrated business Calendar, Contacts, Notes & Tasks.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="zw-page-46934 zw-product-48 zw-product-mail zw-template-zp_home i18n-en body-signupform ccode-ng region-africa lang-en zos-windows zb-chrome zbv-chrome-155 domain-com zwc-multiform-floatbtn-added zph-sticky body-umain umain zNewDcSetup"
        data-prdname="mail"
        data-prdname-display="Mail"
        data-service-name="VirtualOffice"
      >
        {children}
      </body>
    </html>
  );
}
