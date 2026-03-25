import React from "react";
import { PageHero } from "../../components/GLOBAL";
import BiblePromise from "../../components/RESOURCES/BiblePromise";
import SabbathPodcast from "../../components/RESOURCES/SabbathPodcast";
import { Resource } from "../../components/RESOURCES/Resource";
import LatestResource from "../../components/RESOURCES/LatestResource";

export const metadata = {
  title: "Resources | Emmasdale SDA Church",
  description: "Access church manuals, daily Bible promises, podcasts, and other spiritual resources.",
};

export default function ResourcesPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <PageHero 
        title="RESOURCES" 
        subtitle="Grow Spiritually" 
        description="Access church manuals, daily Bible promises, podcasts, and other spiritual resources." 
      />
      
      <div className="max-w-7xl w-[90%] mx-auto py-24">
        
        <div className="text-center mb-16 flex flex-col items-center">
          <p className="text-teal-600 font-bold tracking-wider uppercase text-sm mb-4">Grow Spiritually</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">Church Resources</h2>
          <p className="text-lg text-slate-600 max-w-2xl text-center">
            Everything you need to stay connected, study the Word, and understand our church governance.
          </p>
        </div>

        {/* Top Row: Podcast (Full Width) */}
        <div className="mb-8">
          <SabbathPodcast />
        </div>

        {/* Second Row: Promise & Main Manual */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24">
          <BiblePromise />
          <Resource />
        </div>

        {/* Third Row: Latest Resources Library */}
        <div className="border-t border-slate-200 pt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900">Document Library</h2>
            <p className="text-slate-600 mt-4">Download official forms, guidelines, and manuals.</p>
          </div>
          
          <LatestResource />
        </div>
        
      </div>
    </main>
  );
}