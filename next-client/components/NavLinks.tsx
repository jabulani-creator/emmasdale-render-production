"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import links from "../utils/links";
import { useAuthStore } from "../store/useAuthStore";

export const NavLinks = ({ toggleSidebar }: { toggleSidebar?: () => void }) => {
  const pathname = usePathname();
  const { user } = useAuthStore();
  
  // Define which roles have full access
  const hasFullAccess = user?.role === 'superadmin' || user?.role === 'admin';
  
  return (
    <div className="flex flex-col gap-1.5">
      {links.map((link) => {
        const { text, path, id, icon } = link;
        
        // If the user is a standard leader, only show Profile and their Ministry page links
        if (!hasFullAccess) {
          const isAllowedLink = path === 'profile' || path === 'add-ministry' || path === 'all-ministries';
          if (!isAllowedLink) return null;
        }

        // Ensure path starts with /dashboard/ for checking active state
        const fullPath = path.startsWith('/') ? path : `/dashboard/${path}`;
        const isActive = pathname === fullPath;

        return (
          <Link
            href={fullPath}
            key={id}
            onClick={toggleSidebar}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 group ${
              isActive 
                ? "bg-teal-50 text-teal-700 font-bold" 
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-900 font-medium"
            }`}
          >
            <span className={`text-lg transition-transform duration-200 ${isActive ? 'text-teal-600 scale-110' : 'text-slate-400 group-hover:scale-110 group-hover:text-slate-600'}`}>
              {icon}
            </span>
            <span className="capitalize tracking-wide text-sm">{text}</span>
          </Link>
        );
      })}
    </div>
  );
};
