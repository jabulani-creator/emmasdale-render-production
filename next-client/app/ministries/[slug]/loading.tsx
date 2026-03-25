import React from "react";

export default function Loading() {
  return (
    <main className="min-h-screen bg-white font-sans flex-grow">
      
      {/* SKELETON HERO */}
      <section className="relative h-[40vh] w-full flex items-center justify-center bg-slate-900">
        <div className="absolute inset-0 bg-slate-800 animate-pulse"></div>
        <div className="relative z-10 text-center flex flex-col items-center gap-4 w-[90%] max-w-4xl">
          <div className="h-4 w-32 bg-slate-700 rounded animate-pulse"></div>
          <div className="h-16 w-64 md:w-96 bg-slate-700 rounded animate-pulse"></div>
          <div className="h-4 w-full max-w-2xl bg-slate-700 rounded animate-pulse"></div>
          <div className="h-4 w-3/4 max-w-xl bg-slate-700 rounded animate-pulse"></div>
        </div>
      </section>

      {/* SKELETON CONTENT BLOCKS */}
      <section className="py-16">
        <div className="max-w-4xl w-[90%] mx-auto flex flex-col gap-12">
          
          {/* Skeleton Text Block 1 */}
          <div>
            <div className="h-8 w-48 bg-slate-200 rounded animate-pulse mb-6"></div>
            <div className="space-y-3">
              <div className="h-4 w-full bg-slate-200 rounded animate-pulse"></div>
              <div className="h-4 w-full bg-slate-200 rounded animate-pulse"></div>
              <div className="h-4 w-5/6 bg-slate-200 rounded animate-pulse"></div>
              <div className="h-4 w-full bg-slate-200 rounded animate-pulse"></div>
              <div className="h-4 w-3/4 bg-slate-200 rounded animate-pulse"></div>
            </div>
          </div>

          {/* Skeleton Side-by-Side Block */}
          <div className="flex flex-col md:flex-row gap-10">
            <div className="w-full md:w-1/2 h-[300px] bg-slate-200 rounded-xl animate-pulse"></div>
            <div className="w-full md:w-1/2 space-y-3 py-4">
              <div className="h-8 w-3/4 bg-slate-200 rounded animate-pulse mb-4"></div>
              <div className="h-4 w-full bg-slate-200 rounded animate-pulse"></div>
              <div className="h-4 w-full bg-slate-200 rounded animate-pulse"></div>
              <div className="h-4 w-5/6 bg-slate-200 rounded animate-pulse"></div>
              <div className="h-4 w-full bg-slate-200 rounded animate-pulse"></div>
            </div>
          </div>

        </div>
      </section>

    </main>
  );
}