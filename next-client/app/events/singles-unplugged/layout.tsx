import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";

const singlesSerif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-singles-serif",
  display: "swap",
});

/** Local asset: `next-client/public/single.jpg` (resolved with `metadataBase` for OG/Twitter) */
const OG_IMAGE = "/single.jpg";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: "Singles Unplugged | Emmasdale SDA Church",
  description:
    "Prayerfully Pursuing Purpose and Partnership — Sunday 3 May 2026, 8am–6pm at Honeycomb Junction, Lusaka. Register online for a limited number of seats.",
  openGraph: {
    title: "Singles Unplugged — Digital invitation",
    description:
      "Honest conversation, prayer, fellowship & purposeful connection for young singles. Tap to view details and register.",
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
