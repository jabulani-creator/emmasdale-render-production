"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaAlignLeft, FaUserCircle, FaCaretDown, FaSignOutAlt, FaTimes } from "react-icons/fa";
import { useAuthStore } from "../../store/useAuthStore";
import { NavLinks } from "../../components/NavLinks";
import logo from "../assets/images/LOGO.png"; // Using the full logo for light theme

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, logoutUser } = useAuthStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  return (
    <div className="flex h-screen bg-[#F8FAFC] font-sans overflow-hidden">
      
      {/* DESKTOP SIDEBAR (Hidden on mobile) */}
      <aside 
        className={`${
          isSidebarOpen ? "w-64 translate-x-0" : "w-0 -translate-x-full"
        } hidden md:flex flex-shrink-0 bg-white text-slate-700 transition-all duration-300 ease-in-out flex-col h-full border-r border-slate-200 relative z-20`}
      >
        {/* Sidebar Header */}
        <div className="h-20 flex items-center justify-center border-b border-slate-100 bg-white px-6">
          <Link href="/">
            <Image 
              src={logo} 
              alt="Emmasdale" 
              width={180} 
              height={50} 
              className="object-contain brightness-0" 
            />
          </Link>
        </div>

        {/* Sidebar Navigation */}
        <div className="flex-1 overflow-y-auto py-6 custom-scrollbar px-3">
          <NavLinks />
        </div>
        
        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center font-bold text-sm">
            {user?.name?.charAt(0) || "S"}
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-slate-700 truncate w-32">{user?.name || "System Admin"}</span>
            <span className="text-[10px] text-slate-500 uppercase tracking-wider">{user?.role === 'superadmin' ? 'System Admin' : user?.role || "System Admin"}</span>
          </div>
        </div>
      </aside>

      {/* MOBILE TOP DROPDOWN MENU */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex flex-col bg-white">
          {/* Mobile Menu Header */}
          <div className="h-20 flex items-center justify-between px-6 border-b border-slate-100 bg-white">
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
              <Image 
                src={logo} 
                alt="Emmasdale" 
                width={140} 
                height={40} 
                className="object-contain brightness-0" 
              />
            </Link>
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-red-600 transition-colors"
            >
              <FaTimes className="text-xl" />
            </button>
          </div>

          {/* Mobile Menu Navigation */}
          <div className="flex-1 overflow-y-auto py-6 px-4">
            <NavLinks toggleSidebar={() => setIsMobileMenuOpen(false)} />
          </div>

          {/* Mobile Menu Footer (Logout) */}
          <div className="p-6 border-t border-slate-100 bg-slate-50">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center font-bold text-lg">
                {user?.name?.charAt(0) || "S"}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-slate-700">{user?.name || "System Admin"}</span>
                <span className="text-xs text-slate-500 uppercase tracking-wider">{user?.role === 'superadmin' ? 'System Admin' : user?.role || "System Admin"}</span>
              </div>
            </div>
            <button
              onClick={() => {
                logoutUser();
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-center px-4 py-3 bg-white border border-red-200 text-red-600 rounded-xl font-bold flex items-center justify-center gap-2"
            >
              <FaSignOutAlt /> Log out
            </button>
          </div>
        </div>
      )}

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden relative z-10">
        
        {/* TOP NAVBAR */}
        <header className="h-20 bg-white flex items-center justify-between px-6 lg:px-10 border-b border-slate-200">
          <div className="flex items-center">
            {/* Desktop Sidebar Toggle */}
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="hidden md:block p-2 -ml-2 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-teal-600 transition-colors focus:outline-none"
            >
              <FaAlignLeft className="text-xl" />
            </button>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 -ml-2 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-teal-600 transition-colors focus:outline-none"
            >
              <FaAlignLeft className="text-xl" />
            </button>

            <h2 className="ml-4 text-xl font-bold text-slate-800 tracking-tight">Overview</h2>
          </div>

          {/* User Menu */}
          <div className="relative">
            <button 
              onClick={() => setShowLogout(!showLogout)}
              className="flex items-center gap-2 bg-white hover:bg-slate-50 border border-slate-200 py-1.5 pl-1.5 pr-3 rounded-full transition-all duration-200"
            >
              <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center">
                <FaUserCircle className="text-lg" />
              </div>
              <span className="font-semibold text-sm text-slate-700 hidden sm:block">{user?.name || "System Admin"}</span>
              <FaCaretDown className="text-slate-400 text-xs ml-1" />
            </button>

            {/* Dropdown (Desktop Only, since mobile has logout in menu) */}
            {showLogout && (
              <div className="hidden md:block absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-xl border border-slate-100 py-2 animate-fade-in origin-top-right z-50">
                <div className="px-4 py-3 border-b border-slate-50 mb-2">
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">Signed in as</p>
                  <p className="text-sm font-bold text-slate-800 truncate">{user?.email || "admin@emmasdale.org"}</p>
                </div>
                <button
                  onClick={() => {
                    logoutUser();
                    setShowLogout(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors font-medium"
                >
                  <FaSignOutAlt />
                  Log out
                </button>
              </div>
            )}
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 overflow-y-auto bg-[#F8FAFC] p-4 sm:p-6 lg:p-10 custom-scrollbar">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>

      </div>
      
    </div>
  );
}
