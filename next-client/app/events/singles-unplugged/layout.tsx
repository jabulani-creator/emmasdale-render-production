import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";

const singlesSerif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-singles-serif",
  display: "swap",
});

const OG_IMAGE =
  "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&h=630&q=80";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: "Singles Unplugged | Emmasdale SDA Church",
  description:
    "Prayerfully Pursuing Purpose and Partnership — Sunday 3 May 2026, 8am–6pm at Honeycomb Junction, Lusaka. Register online for a limited number of seats.",
  openGraph: {
    title: "Singles Unplugged — Digital invitation",
    description:
      "Honest conversation, prayer, dinner & purposeful connection for young singles. Tap to view details and register.",
    type: "website",
    locale: "en_ZM",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Singles Unplugged — young adults in fellowship",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Singles Unplugged | Emmasdale SDA Church",
    description: "Sunday 3 May 2026, 8am–6pm · Honeycomb Junction, Lusaka · Reserve your seat.",
    images: [OG_IMAGE],
  },
};

export default function SinglesUnpluggedLayout({ children }: { children: React.ReactNode }) {
  return <div className={`${singlesSerif.variable} singles-unplugged-theme`}>{children}</div>;
}
