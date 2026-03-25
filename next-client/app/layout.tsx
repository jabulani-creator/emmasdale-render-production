import "./globals.css";
import AuthProvider from '../components/AuthProvider';
import { RootLayoutClient } from "./RootLayoutClient";
import { ToasterProvider } from "../components/ToasterProvider";

export const metadata = {
  title: "Emmasdale SDA Church",
  description: "To Lift up Jesus Christ and Proclaim the Everlasting Gospel to All the World Baptizing them in the name of the Father the Son and the Holy Spirit",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
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
