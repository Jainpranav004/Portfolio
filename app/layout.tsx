import type { Metadata } from "next";
import Script from "next/script";
import { Bricolage_Grotesque, Geist, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Cursor } from "@/components/Cursor";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["300", "400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Pranav Jain | Full-Stack & AI/ML Developer",
    template: "%s | Pranav Jain",
  },
  description:
    "Pre-final year B.Tech CSE student skilled in Full-Stack Development, AI/ML, and RAG-based systems. Seeking SDE / AI Intern roles.",
  openGraph: {
    title: "Pranav Jain | Full-Stack & AI/ML Developer",
    description:
      "Pre-final year B.Tech CSE student skilled in Full-Stack Development, AI/ML, and RAG-based systems. Seeking SDE / AI Intern roles.",
    url: "",
    siteName: "Pranav Jain",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pranav Jain | Full-Stack & AI/ML Developer",
    description:
      "Pre-final year B.Tech CSE student skilled in Full-Stack Development, AI/ML, and RAG-based systems. Seeking SDE / AI Intern roles.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLdPerson = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Pranav Jain",
    url: "",
    jobTitle: "Full-Stack & AI/ML Developer",
    sameAs: [
      "https://github.com/Jainpranav004",
      "https://www.linkedin.com/in/pranav-jain-pj/",
      "https://leetcode.com/u/Jainpranav004/",
      "https://www.instagram.com/hyy.pranav/",
    ],
  };

  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${geist.variable} ${jetbrains.variable}`}
    >
      <body>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-PBH8C3Q6GW"
          async
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-PBH8C3Q6GW');
          `}
        </Script>
        <Cursor />
        <Navbar />
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPerson) }}
        />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
