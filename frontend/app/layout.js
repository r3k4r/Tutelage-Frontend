import { Toaster } from "sonner";
import "./globals.css";
import AuthProvider from "@/components/providers/AuthProvider";
import Navbar from "@/components/layouts/site/Navbar";
import NavbarWrapper from "@/components/layouts/site/NavbarWrapper";
import FooterWrapper from "@/components/layouts/site/FooterWrapper";
import ThemeProvider from "@/components/providers/ThemeProvider";
import { Footer } from "@/components/layouts/site/Footer";
import Script from "next/script";
import { GA_MEASUREMENT_ID } from "@/common/utils/gtag";
import GoogleAnalytics from "@/components/app/GoogleAnalytics";
import { Suspense } from "react";
import SnowFallWrapper from '@/components/layouts/site/SnowFallWrapper';
import { constructMetadata } from '@/common/utils/seo';

export const metadata = constructMetadata({
  title: "Tutelage | Online English Learning Platform in Kurdistan",
  description: "Tutelage is Kurdistan's innovative online English learning platform offering comprehensive courses for kids, teens, and adults. Master English with expert-led courses, free ESL resources (videos, audios, blogs, stories), CEFR-leveled practice (A1-C1), IELTS/TOEFL/PTE preparation, and English proficiency testing. Founded in 2022, providing structured learning, interactive exercises, and personalized support to help you achieve fluency.",
  path: '/'
});

export default function RootLayout({ children }) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Tutelage",
    "url": "https://tutelage.krd",
    "logo": "https://tutelage.krd/only-logo-black-border-yellow-bg.svg",
    "description": "Kurdistan's innovative online English learning platform",
    "foundingDate": "2026",
    "sameAs": [
      "https://www.facebook.com/share/1EXoYc3xG4/",
      "https://www.instagram.com/tutelage.esl?igsh=MWhhZmhlZzJ1MTB2ZA=="
    ]
  };

  return (
    <html lang="en" className="mt-0 pt-0" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema)
          }}
        />
      </head>
      <body className="relative">
        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-RM0EWLJGN8`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-RM0EWLJGN8', {
                page_path: window.location.pathname,
                send_page_view: false
              });
            `,
          }}
        />
        <ThemeProvider>
          <AuthProvider>
            <Suspense fallback={null}>
              <GoogleAnalytics GA_MEASUREMENT_ID={GA_MEASUREMENT_ID} />
            </Suspense>
            <SnowFallWrapper />
            <NavbarWrapper>
              <Suspense fallback={null}>
                <Navbar />
              </Suspense>
            </NavbarWrapper>
            {/* overflow-x-clip: slide-in animations start off-screen and must not widen the page on phones */}
            <div className="relative z-10 overflow-x-clip">{children}</div>
            <FooterWrapper>
              <Footer />
            </FooterWrapper>
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
