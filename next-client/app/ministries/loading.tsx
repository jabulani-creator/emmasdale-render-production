import React from "react";
import { PageHero } from "../../components/GLOBAL";

export default function Loading() {
  return (
    <main className="min-h-screen bg-slate-50 font-sans flex-grow">
      {/* PAGE HERO SKELETON (Static text so it doesn't jump) */}
      <PageHero 
        title="OUR MINISTRIES" 
        subtitle="Get Involved" 
        description="Discover the various ways you can connect, serve, and grow in your faith. There is a place for everyone to belong." 
      />

      {/* MINISTRIES SKELETON GRID */}
      <section className="py-24 bg-slate-50 min-h-screen">
        <div className="max-w-7xl w-[90%] mx-auto">
          <div className="text-center mb-16 flex flex-col items-center">
            <div className="h-4 w-32 bg-slate-200 rounded animate-pulse mb-4"></div>
            <div className="h-12 w-64 md:w-96 bg-slate-200 rounded animate-pulse mb-6"></div>
            <div className="h-16 w-full max-w-2xl bg-slate-200 rounded animate-pulse"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 flex flex-col h-[350px]">
                {/* Image Placeholder */}
                <div className="h-48 w-full bg-slate-200 animate-pulse"></div>
                
                {/* Content Placeholder */}
                <div className="p-6 flex-grow flex flex-col gap-3">
                  <div className="h-6 w-3/4 bg-slate-200 rounded animate-pulse"></div>
                  <div className="h-4 w-full bg-slate-200 rounded animate-pulse mt-2"></div>
                  <div className="h-4 w-5/6 bg-slate-200 rounded animate-pulse"></div>
                  <div className="mt-auto h-4 w-24 bg-slate-200 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}