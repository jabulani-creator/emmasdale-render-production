"use client";

import Image from "next/image";
import { FaHeadphonesAlt } from "react-icons/fa";

const SabbathPodcast = () => {
  const openInNewTab = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };
  
  return (
    <section className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 flex flex-col sm:flex-row h-full">
      <div className="relative w-full sm:w-2/5 h-48 sm:h-auto bg-slate-900">
        <Image
          src="https://res.cloudinary.com/dw82gpxt3/image/upload/v1664386580/emmsadale-church/sabbath_podcast_p91qgs.jpg"
          alt="Sabbath School Lesson Podcast"
          fill
          className="object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/60 to-transparent"></div>
        <div className="absolute bottom-4 left-4 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white text-xl">
          <FaHeadphonesAlt />
        </div>
      </div>
      
      <div className="p-8 flex-grow flex flex-col justify-center sm:w-3/5">
        <p className="text-teal-600 font-bold tracking-widest uppercase text-xs mb-2">Audio Resource</p>
        <h3 className="text-2xl font-bold text-slate-900 mb-4">Sabbath School Podcast</h3>
        <p className="text-slate-600 mb-8 leading-relaxed">
          Listen to weekly discussions and deep dives into the Sabbath School lesson. Perfect for studying on the go or during your daily commute.
        </p>
        
        <button
          className="mt-auto self-start px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-all shadow-sm flex items-center gap-2"
          onClick={() =>
            openInNewTab("https://soundcloud.com/sabbath-school-podcast/sets")
          }
        >
          <FaHeadphonesAlt /> Listen Now
        </button>
      </div>
    </section>
  );
};

export default SabbathPodcast;
