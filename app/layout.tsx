import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Canada Cleaning — Premium Cleaning Service",
  description:
    "Canada's premium residential and commercial cleaning professionals. Vetted, insured, and satisfaction-guaranteed. Serving Toronto, Vancouver, Calgary, Montreal, Ottawa, and Edmonton.",
  keywords: [
    "cleaning service Canada",
    "house cleaning Toronto",
    "maid service Vancouver",
    "deep cleaning Calgary",
    "commercial cleaning Montreal",
    "move in move out cleaning",
    "eco-friendly cleaning Canada",
  ],
  openGraph: {
    type: "website",
    title: "Canada Cleaning — Premium Cleaning Service",
    description:
      "Canada's premium residential and commercial cleaning professionals. Insured, vetted, satisfaction guaranteed.",
    url: "https://canadacleaning.ca",
    siteName: "Canada Cleaning",
    images: [
      {
        url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "Canada Cleaning — Premium Cleaning Service",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Canada Cleaning — Premium Cleaning Service",
    description:
      "Canada's premium residential and commercial cleaning professionals.",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop",
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: "Canada Cleaning",
  url: "https://canadacleaning.ca",
  telephone: "+18005550199",
  email: "hello@canadacleaning.ca",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    addressCountry: "CA",
  },
  areaServed: [
    "Toronto", "Vancouver", "Calgary", "Montreal", "Ottawa", "Edmonton",
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "1240",
  },
  description:
    "Premium residential and commercial cleaning service serving major Canadian cities. Insured, bonded, background-checked professionals with 100% satisfaction guarantee.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>✦</text></svg>" />
      </head>
      <body>{children}</body>
    </html>
  );
}
