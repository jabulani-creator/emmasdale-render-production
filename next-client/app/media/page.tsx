import React from "react";
import Image from "next/image";
import { FaYoutube, FaFacebook, FaPlayCircle } from "react-icons/fa";

async function getSermonsData() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
  const sermonsRes = await fetch(`${baseUrl}/sermons`, { next: { revalidate: 60 } }).catch(() => null);
  const sermonsData = sermonsRes?.ok ? await sermonsRes.json() : { sermons: [] };
  
  return sermonsData.sermons || [];
}

// Helper function to extract YouTube video ID from a URL
function getYouTubeId(url: string) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

export default async function MediaPage() {
  const sermons = await getSermonsData();
  
  // Find the sermon marked as 'live', or just default to the most recent one if none are marked live
  const liveSermon = sermons.find((s: any) => s.isLive) || sermons[0];
  const liveVideoId = liveSermon ? getYouTubeId(liveSermon.youtubeLink) : null;
  
  // The rest of the sermons go into the archive
  const archiveSermons = liveSermon ? sermons.filter((s: any) => s._id !== liveSermon._id) : sermons;

  return (
    <main className="min-h-screen bg-slate-50 font-sans flex-grow">
      
      {/* 1. LOMA LINDA INSPIRED HERO */}
      <section className="relative pt-32 pb-24 px-4 sm:px-6 lg:px-8 bg-slate-900 overflow-hidden text-center">
        <div className="absolute inset-0 z-0">
          {/* Subtle background image or color gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 z-10" />
        </div>
        <div className="relative z-20 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight">
            Watch Live
          </h1>
          <div className="w-8 h-1 bg-amber-500 mx-auto mb-8"></div>
          
          {/* Service Times Text */}
          <p className="text-xs md:text-sm font-bold text-slate-300 tracking-[0.2em] uppercase">
            SONG SERVICE 8:30AM <span className="mx-2 text-amber-500">|</span> 
            SABBATH SCHOOL 9:00AM <span className="mx-2 text-amber-500">|</span> 
            DIVINE SERVICE 10:00AM
          </p>
        </div>
      </section>

      {/* 2. LIVE STREAM PLAYER SECTION */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto -mt-10 relative z-30">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100">
          
          <div className="p-6 md:p-8 text-center border-b border-slate-100">
            <h2 className="text-3xl font-bold text-slate-900">Sanctuary Live Stream</h2>
            <p className="text-slate-500 mt-2">Join us every Sabbath morning as we worship together.</p>
          </div>

          {/* 16:9 Video Aspect Ratio Container */}
          <div className="relative w-full aspect-video bg-slate-900 flex items-center justify-center">
            {liveVideoId ? (
              <iframe 
                src={`https://www.youtube.com/embed/${liveVideoId}?autoplay=0`}
                className="absolute inset-0 w-full h-full"
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <div className="text-center text-white p-8">
                <FaPlayCircle className="text-6xl text-slate-600 mx-auto mb-4" />
                <h3 className="text-3xl font-bold text-slate-400 mb-2">Stream Offline</h3>
                <p className="text-slate-500">Our next live broadcast begins this Sabbath at 8:30 AM (CAT).</p>
              </div>
            )}
          </div>

          {/* Fallback Links */}
          <div className="p-6 bg-slate-50 text-center">
            <p className="text-sm text-slate-600 mb-4 font-medium">
              If there are issues with the player above, view the stream directly on:
            </p>
            <div className="flex justify-center gap-4">
              <a href="https://youtube.com" target="_blank" className="flex items-center gap-2 px-6 py-2.5 bg-white border border-slate-200 rounded-full text-slate-700 hover:bg-slate-100 transition-colors font-bold text-sm">
                <FaYoutube className="text-red-600 text-lg" /> YouTube
              </a>
              <a href="https://facebook.com/emmasdalesda" target="_blank" className="flex items-center gap-2 px-6 py-2.5 bg-white border border-slate-200 rounded-full text-slate-700 hover:bg-slate-100 transition-colors font-bold text-sm">
                <FaFacebook className="text-blue-600 text-lg" /> Facebook
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* 3. MISSED THE LIVESTREAM? (Sermon Archive) */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200 mt-12">
        <div className="text-center mb-16">
          <h3 className="text-3xl font-bold text-slate-900 mb-4">Missed the livestream?</h3>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Watch a replay of the most recent divine service, sabbath school, or afternoon bible studies below. 
            Replays will be available shortly after the livestream concludes.
          </p>
        </div>

        {/* Video Archive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {archiveSermons.length > 0 ? (
            archiveSermons.map((sermon: any) => {
              const videoId = getYouTubeId(sermon.youtubeLink);
              const thumbnailUrl = videoId 
                ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
                : "https://images.unsplash.com/photo-1438283173091-5dbf5c5a3206?auto=format&fit=crop&w=800&q=80";

              return (
                <a href={sermon.youtubeLink} target="_blank" rel="noopener noreferrer" key={sermon._id} className="group cursor-pointer block">
                  <div className="relative aspect-video rounded-xl overflow-hidden mb-4 bg-slate-200">
                    <Image 
                      src={thumbnailUrl} 
                      alt={sermon.title} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center">
                      <FaPlayCircle className="text-white/80 text-6xl group-hover:text-white transition-colors drop-shadow-lg" />
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <span className="bg-teal-500 text-white text-xs font-bold px-3 py-1 rounded uppercase tracking-wider shadow-sm">
                        {sermon.category || "Service"}
                      </span>
                    </div>
                  </div>
                  <h4 className="font-bold text-slate-900 text-lg group-hover:text-teal-600 transition-colors line-clamp-2">{sermon.title}</h4>
                  <p className="text-sm text-slate-500 mt-1">{sermon.speaker} • {new Date(sermon.date).toLocaleDateString()}</p>
                </a>
              );
            })
          ) : (
            <div className="col-span-3 text-center text-slate-500 py-10">
              No archived sermons found yet.
            </div>
          )}

        </div>

        <div className="mt-12 text-center">
          <button className="px-8 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-full transition-colors">
            Load More Replays
          </button>
        </div>
      </section>

    </main>
  );
}