import "./globals.css";
import AuthProvider from '../components/AuthProvider';
import { RootLayoutClient } from "./RootLayoutClient";
import { ToasterProvider } from "../components/ToasterProvider";
import { Outfit, Source_Sans_3 } from "next/font/google";

const fontDisplay = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const fontSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
  display: "swap",
});

export const metadata = {
  title: "Emmasdale SDA Church",
  description: "To Lift up Jesus Christ and Proclaim the Everlasting Gospel to All the World Baptizing them in the name of the Father the Son and the Holy Spirit",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`h-full antialiased ${fontDisplay.variable} ${fontSans.variable}`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col font-sans" suppressHydrationWarning>
          <AuthProvider>
            <RootLayoutClient>
              {children}
            </RootLayoutClient>
            <ToasterProvider />
          </AuthProvider>
      </body>
    </html>
  );
}
