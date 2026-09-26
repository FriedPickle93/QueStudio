import type { Metadata } from "next";
import { Bricolage_Grotesque, Figtree } from "next/font/google";
import { siteUrl } from "@/lib/offer";
import "./globals.css";

const display = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const body = Figtree({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "QueStudio — Websites that get bookings and calls",
  description:
    "Custom websites for local businesses, priced by scope. One-pagers $300–$1,500 · 4–6 page sites $1,000–$5,000 · booking sites $2,500–$6,000+.",
  openGraph: {
    title: "QueStudio — Websites that get bookings and calls",
    description:
      "Custom websites for local shops, trades, food, beauty, and home services. Transparent price ranges, one fixed quote.",
    type: "website",
    url: siteUrl,
    siteName: "QueStudio",
  },
  twitter: {
    card: "summary_large_image",
    title: "QueStudio — Websites that get bookings and calls",
    description:
      "Custom websites for local businesses, priced by scope. One-pagers from $300, booking sites to $6,000+.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} h-full`}>
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
