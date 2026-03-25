import React from "react";
import Image from "next/image";
import Link from "next/link";
import Review from "../../components/HOME/Review";
import { FaCross, FaUsers, FaGraduationCap, FaBookOpen, FaStar, FaGlobeAfrica, FaCrown } from "react-icons/fa";

export const metadata = {
  title: "Our History & Values | Emmasdale SDA Church",
  description: "Learn about the history, mission, and core values of Emmasdale Seventh-Day Adventist Church.",
};

const values = [
  { id: 1, title: "Jesus First, Always", message: "Our primary goal is to reflect Him in all we do so that others might be drawn closer to Him.", icon: FaCross },
  { id: 2, title: "Build A Community That Serves", message: "We grow together, connect, and learn to serve our members, their families, and our community.", icon: FaUsers },
  { id: 3, title: "Grow Leaders", message: "We mentor and equip all ages to be ambassadors for Christ.", icon: FaGraduationCap },
  { id: 4, title: "Bring The Word To Life", message: "Through the Bible, we aim to nurture spiritual and intellectual growth in our community at every age.", icon: FaBookOpen },
  { id: 5, title: "Distinctive & Unique", message: "We aim to be authentic in community as we live out the Gospel of Jesus both in worship and lifestyle.", icon: FaStar },
  { id: 6, title: "Diverse Yet United", message: "We celebrate and capitalize on our diversity as we work together collaboratively to make a powerful impact in our community.", icon: FaGlobeAfrica },
  { id: 7, title: "Honor Christ With Our Best", message: "We aim to do everything for the glory of Jesus Christ; thus, we will do everything to the best of our abilities.", icon: FaCrown },
];

async function getReviewsData() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
  console.log(`[HistoryPage] Fetching reviews from: ${baseUrl}/review`);
  
  try {
    const reviewsRes = await fetch(`${baseUrl}/review`, { 
      // Changed to cache: 'no-store' during development so it always fetches fresh data from your running backend
      cache: 'no-store'
    });
    
    console.log(`[HistoryPage] Review fetch status: ${reviewsRes.status}`);
    
    if (reviewsRes.ok) {
      const reviewsData = await reviewsRes.json();
      console.log(`[HistoryPage] Reviews fetched successfully: ${reviewsData?.reviews?.length || 0} reviews found`);
      
      if (reviewsData.reviews && reviewsData.reviews.length > 0) {
        return reviewsData.reviews;
      }
    } else {
      console.log(`[HistoryPage] Backend responded with error: ${reviewsRes.statusText}`);
    }
  } catch (error) {
    console.error("[HistoryPage] Failed to fetch reviews from API, using fallback data", error);
  }

  console.log("[HistoryPage] Using fallback data for reviews");
  return [
    {
      _id: "63304076ef36263bea59aa16",
      ReviewName: "Charinga Jabulani",
      ReviewDesc: "Beautiful music, amazing and welcoming people",
      ReviewPhoto: "https://res.cloudinary.com/dw82gpxt3/image/upload/v1664106614/emmsadale-church/ReviewPhoto-1664106591884_uq3p9o.jpg",
    },
    {
      _id: "63304147ef36263bea59aa18",
      ReviewName: "Beauty Mubanga",
      ReviewDesc: "Engaging programs for all age groups",
      ReviewPhoto: "https://res.cloudinary.com/dw82gpxt3/image/upload/v1664106822/emmsadale-church/ReviewPhoto-1664106819888_tllrp9.jpg",
    }
  ];
}

export default async function HistoryPage() {
  const reviews = await getReviewsData();

  return (
    <main className="min-h-screen bg-slate-50 font-sans flex-grow">
      
      {/* PAGE HERO */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center pt-20 bg-slate-900">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1490424660416-359912d314b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80" 
            alt="Church History" 
            fill 
            className="object-cover opacity-40"
            priority
          />
        </div>
        <div className="relative z-10 text-center px-4 flex flex-col items-center">
          <p className="text-teal-400 font-bold tracking-widest uppercase text-sm mb-4">Our Roots</p>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6">Our History</h1>
          <p className="text-xl text-slate-300 max-w-2xl text-center">
            Discover the journey of Emmasdale SDA Church, our mission, and the core values that guide us today.
          </p>
        </div>
      </section>

      {/* OUR MISSION */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center flex flex-col items-center">
        <h2 className="text-3xl font-bold text-slate-900 mb-6 uppercase tracking-widest text-teal-600">Our Mission</h2>
        <p className="text-2xl text-slate-700 leading-relaxed font-light italic text-center">
          "To Lift up Jesus Christ and Proclaim the Everlasting Gospel to All the World, Baptizing them in the name of the Father, the Son, and the Holy Spirit."
        </p>
      </section>

      {/* OUR HISTORY (Placeholder text replaced with styling) */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white border-y border-slate-200">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-slate-900 mb-8 text-center">How It All Began</h2>
          <div className="prose prose-lg prose-slate mx-auto text-slate-600 leading-relaxed">
            <p>
              Emmasdale Seventh-Day Adventist Church began with a small group of dedicated believers who shared a common vision: to create a vibrant, worshiping community in the heart of Lusaka. Over the years, by the grace of God, our congregation has grown significantly.
            </p>
            <p>
              Through periods of both challenge and triumph, our church has remained a beacon of hope. We have expanded our ministries, built lasting relationships within the community, and continually sought to live out the principles of the Gospel. 
            </p>
            <p>
              Today, we stand on the shoulders of those early pioneers, looking forward with anticipation to the imminent return of Jesus Christ, while actively working to serve our local community and spread His love to the world.
            </p>
          </div>
        </div>
      </section>

      {/* OUR VALUES (Redesigned Alternate Layout) */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 border-t border-slate-200">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20 flex flex-col items-center">
            <p className="text-teal-600 font-bold tracking-wider uppercase text-sm mb-4">What Drives Us</p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900">Our Core Values</h2>
          </div>
          
          <div className="space-y-12">
            {values.map((val, index) => (
              <div 
                key={val.id} 
                className={`flex flex-col md:flex-row items-center gap-8 md:gap-12 p-8 md:p-12 bg-white rounded-3xl shadow-sm border border-slate-100 hover:shadow-lg transition-all group ${
                  index % 2 === 1 ? 'md:flex-row-reverse' : ''
                }`}
              >
                <div className="w-24 h-24 md:w-32 md:h-32 shrink-0 bg-slate-900 rounded-full flex items-center justify-center text-teal-400 text-4xl md:text-5xl shadow-inner group-hover:scale-110 transition-transform duration-500">
                  <val.icon />
                </div>
                
                <div className={`flex-grow text-center ${index % 2 === 1 ? 'md:text-right' : 'md:text-left'}`}>
                  <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">{val.title}</h3>
                  <p className="text-lg text-slate-600 leading-relaxed">{val.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS SECTION */}
      <div className="bg-white py-16 border-t border-slate-200">
        <Review reviews={reviews} />
      </div>

      {/* CALL TO ACTION */}
      <section className="py-24 bg-slate-900 text-white text-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">Be Part of Our Future</h2>
          <p className="text-xl text-slate-300 mb-10 leading-relaxed">
            Our history is still being written. We invite you to join our community and help us make a lasting impact for the Kingdom of God.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link href="/new" className="px-10 py-4 bg-teal-500 hover:bg-teal-400 text-slate-900 font-bold text-lg rounded-xl transition-all shadow-lg transform hover:-translate-y-1">
              Plan A Visit
            </Link>
            <Link href="/about" className="px-10 py-4 bg-transparent border-2 border-slate-700 hover:border-slate-500 text-white font-bold text-lg rounded-xl transition-all">
              Back to About
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}