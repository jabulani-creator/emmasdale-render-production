"use client";

import { useEffect, useState } from "react";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { FaQuoteRight } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

const Review = ({ reviews = [] }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const lastIndex = reviews.length - 1;
    if (index < 0) {
      setIndex(lastIndex);
    }
    if (index > lastIndex) {
      setIndex(0);
    }
  }, [index, reviews]);

  useEffect(() => {
    let slider = setInterval(() => {
      setIndex(index + 1);
    }, 9000);
    return () => {
      clearInterval(slider);
    };
  }, [index]);

  if (!reviews || reviews.length === 0) {
    return (
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 border-t border-slate-200 overflow-hidden relative">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-teal-600 font-bold tracking-wider uppercase text-sm mb-4">Testimonials</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-8">What We Love About Emmasdale</h2>
          <p className="text-lg text-slate-500 mb-12">No reviews available yet.</p>
          <Link 
            href="/add-review" 
            className="inline-block px-8 py-3 bg-white border-2 border-slate-200 hover:border-teal-500 text-slate-600 hover:text-teal-600 font-bold rounded-xl transition-colors shadow-sm"
          >
            Share Your Story
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 border-t border-slate-200 overflow-hidden relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 relative z-10">
          <p className="text-teal-600 font-bold tracking-wider uppercase text-sm mb-4">Testimonials</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900">What We Love About Emmasdale</h2>
        </div>

        <div className="relative max-w-4xl mx-auto flex items-center justify-center min-h-[400px]">
          {reviews.map((person, personIndex) => {
            const { _id, ReviewPhoto, ReviewName, ReviewDesc } = person;

            if (personIndex !== index) {
              return null; // Don't render inactive slides at all to guarantee they don't break layout
            }

            return (
              <article 
                className="w-full animate-fade-in" 
                key={_id || personIndex}
              >
                <div className="flex flex-col items-center justify-center text-center px-4 md:px-16">
                  <div className="relative mb-8">
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white shadow-xl relative z-10 mx-auto">
                      <Image 
                        src={ReviewPhoto || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80"} 
                        alt={ReviewName || "Reviewer"} 
                        fill
                        sizes="(max-width: 768px) 96px, 128px"
                        className="object-cover" 
                      />
                    </div>
                    <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center text-white text-xl shadow-lg z-20">
                      <FaQuoteRight />
                    </div>
                  </div>
                  
                  <p className="text-xl md:text-2xl text-slate-600 italic leading-relaxed mb-8 max-w-3xl mx-auto">
                    "{ReviewDesc}"
                  </p>
                  <h4 className="text-xl font-bold text-slate-900 tracking-wide uppercase">{ReviewName}</h4>
                </div>
              </article>
            );
          })}

          <button 
            className="absolute top-1/2 -translate-y-1/2 left-0 md:-left-12 w-12 h-12 bg-white rounded-full flex items-center justify-center text-slate-600 hover:text-teal-600 hover:bg-slate-50 shadow-md transition-all z-20 focus:outline-none" 
            onClick={() => setIndex(index - 1)}
          >
            <FiChevronLeft className="text-2xl" />
          </button>
          <button 
            className="absolute top-1/2 -translate-y-1/2 right-0 md:-right-12 w-12 h-12 bg-white rounded-full flex items-center justify-center text-slate-600 hover:text-teal-600 hover:bg-slate-50 shadow-md transition-all z-20 focus:outline-none" 
            onClick={() => setIndex(index + 1)}
          >
            <FiChevronRight className="text-2xl" />
          </button>
        </div>

        <div className="text-center mt-12">
          <Link 
            href="/add-review" 
            className="inline-block px-8 py-3 bg-white border-2 border-slate-200 hover:border-teal-500 text-slate-600 hover:text-teal-600 font-bold rounded-xl transition-colors shadow-sm"
          >
            Share Your Story
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Review;
