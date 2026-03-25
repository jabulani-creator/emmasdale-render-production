"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback, useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";

const departmentOptions = [
  "children",
  "dorcus",
  "amo",
  "media",
  "health",
  "youth",
  "singing",
  "building",
];

const MediaSearch = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [localSearch, setLocalSearch] = useState(searchParams.get("search") || "");

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value && value !== "all") {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      return params.toString();
    },
    [searchParams]
  );

  const handleSearch = (e: any) => {
    const { name, value } = e.target;
    
    if (name === "search") {
      setLocalSearch(value);
      clearTimeout((window as any).mediaSearchTimeout);
      (window as any).mediaSearchTimeout = setTimeout(() => {
        router.push(`${pathname}?${createQueryString(name, value)}`, { scroll: false });
      }, 500);
    } else {
      router.push(`${pathname}?${createQueryString(name, value)}`, { scroll: false });
    }
  };

  const handleClearFilters = (e) => {
    e.preventDefault();
    setLocalSearch("");
    router.push(pathname, { scroll: false });
  };

  return (
    <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-slate-200 py-6 px-4 sm:px-6 lg:px-8 shadow-sm">
      <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        <div className="w-full md:w-auto">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Photo Gallery</h2>
          <p className="text-sm text-slate-500">Explore memories from our church family.</p>
        </div>

        <form className="flex w-full md:w-auto flex-col sm:flex-row items-center gap-4" onSubmit={(e) => e.preventDefault()}>
          
          {/* Search Input */}
          <div className="w-full sm:w-64 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-slate-400 text-sm" />
            </div>
            <input
              type="text"
              id="search"
              placeholder="Search..."
              name="search"
              value={localSearch}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-100 border-transparent rounded-full text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all"
            />
          </div>

          {/* Department Select */}
          <div className="w-full sm:w-48 relative">
            <select
              id="department"
              name="department"
              value={searchParams.get("department") || "all"}
              onChange={handleSearch}
              className="w-full pl-4 pr-10 py-2.5 bg-slate-100 border-transparent rounded-full text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white appearance-none transition-all capitalize"
            >
              <option value="all">All Departments</option>
              {departmentOptions.map((dept, index) => (
                <option key={index} value={dept}>{dept}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg className="h-4 w-4 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>

          {/* Clear Button */}
          {(localSearch || searchParams.get("department")) && (
            <button
              onClick={handleClearFilters}
              type="button"
              className="w-full sm:w-auto px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold rounded-full transition-colors flex items-center justify-center gap-2 shadow-sm whitespace-nowrap"
            >
              <FaTimes />
              Clear
            </button>
          )}

        </form>
      </div>
    </div>
  );
};

export default MediaSearch;
