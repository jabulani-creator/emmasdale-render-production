"use client";

import { usePathname } from "next/navigation";
import { Navigation } from "../components/Navigation";
import { Footer } from "../components/GLOBAL";

export function RootLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Do not show public header/footer on dashboard routes or the login page
  const isDashboard = pathname?.startsWith('/dashboard');
  const isLogin = pathname === '/register';
  const hidePublicUI = isDashboard || isLogin;

  return (
    <>
      {!hidePublicUI && <Navigation />}
      
      {/* If it's the dashboard, we don't want flex-grow to interfere with the h-screen dashboard layout */}
      <div className={hidePublicUI ? "h-full w-full" : "flex-grow"}>
        {children}
      </div>
      
      {!hidePublicUI && <Footer />}
    </>
  );
}