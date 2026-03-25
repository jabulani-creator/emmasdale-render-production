"use client";

import { useState, useEffect } from "react";
import { authFetch } from "../../store/useAuthStore";
import { FaFilePdf, FaDownload, FaSpinner } from "react-icons/fa";

export const Resource = () => {
  const [manual, setManual] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);
  const manualId = "63346ecff7c21413766c2b46";

  const openInNewTab = (url) => {
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  };

  useEffect(() => {
    const getManual = async () => {
      try {
        const response = await authFetch.get(`/resource/${manualId}`);
        setManual(response.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };
    getManual();
  }, [manualId]);

  return (
    <section className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 h-full flex flex-col">
      <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-sm">
        <FaFilePdf />
      </div>
      
      <div className="flex-grow">
        <p className="text-teal-600 font-bold tracking-widest uppercase text-xs mb-2">Document</p>
        <h3 className="text-2xl font-bold text-slate-900 mb-3">
          {isLoading ? "Loading..." : manual.title || "SDA Church Manual"}
        </h3>
        <p className="text-slate-600 mb-8 leading-relaxed">
          {isLoading 
            ? "Fetching resource description..." 
            : manual.description || "The official guide for church operations, governance, and organizational structure of the Seventh-day Adventist Church."}
        </p>
      </div>

      <button 
        className="w-full py-4 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold rounded-xl transition-colors border border-slate-200 flex items-center justify-center gap-3 shadow-sm" 
        onClick={() => openInNewTab(manual.pdf)}
        disabled={isLoading || !manual.pdf}
      >
        {isLoading ? <FaSpinner className="animate-spin" /> : <FaDownload />}
        {isLoading ? "Loading..." : "Download Manual"}
      </button>
    </section>
  );
};
