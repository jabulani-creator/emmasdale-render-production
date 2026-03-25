"use client";

import { Resource as ResourceType } from "../../types";
import { FaFilePdf, FaDownload } from "react-icons/fa";

export const ResourceList = ({ title, description, pdf }: Partial<ResourceType>) => {
  const openInNewTab = (url) => {
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 h-full flex flex-col">
      <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-sm">
        <FaFilePdf />
      </div>
      
      <div className="flex-grow">
        <p className="text-teal-600 font-bold tracking-widest uppercase text-xs mb-2">Document</p>
        <h3 className="text-2xl font-bold text-slate-900 mb-3">{title || "Church Document"}</h3>
        <p className="text-slate-600 mb-8 leading-relaxed">
          {description || "Download this resource to learn more about our church operations and guidelines."}
        </p>
      </div>

      <button 
        className="w-full py-4 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold rounded-xl transition-colors border border-slate-200 flex items-center justify-center gap-3 shadow-sm" 
        onClick={() => openInNewTab(pdf)}
        disabled={!pdf}
      >
        <FaDownload /> Download File
      </button>
    </section>
  );
};
