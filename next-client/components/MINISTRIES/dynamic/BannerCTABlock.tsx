import React from 'react';
import Link from 'next/link';

interface BannerCTABlockProps {
  data: {
    heading: string;
    subheading?: string;
    buttonText: string;
    buttonLink: string;
    backgroundColor?: string; // e.g. 'bg-slate-900', 'bg-teal-600'
  };
}

export default function BannerCTABlock({ data }: BannerCTABlockProps) {
  if (!data) return null;

  const { 
    heading, 
    subheading, 
    buttonText, 
    buttonLink, 
    backgroundColor = 'bg-slate-900' 
  } = data;

  return (
    <section className={`py-20 ${backgroundColor} text-white text-center`}>
      <div className="max-w-4xl w-[90%] mx-auto flex flex-col items-center">
        {subheading && (
          <p className="text-teal-400 font-bold tracking-widest uppercase text-sm mb-4">
            {subheading}
          </p>
        )}
        <h2 className="text-4xl md:text-5xl font-extrabold mb-8 leading-tight">
          {heading}
        </h2>
        
        {buttonLink.startsWith('http') ? (
          <a 
            href={buttonLink} 
            target="_blank" 
            rel="noreferrer"
            className="inline-block px-10 py-4 bg-white text-slate-900 font-bold text-lg rounded-full hover:bg-teal-50 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-1 transform duration-300"
          >
            {buttonText}
          </a>
        ) : (
          <Link 
            href={buttonLink}
            className="inline-block px-10 py-4 bg-white text-slate-900 font-bold text-lg rounded-full hover:bg-teal-50 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-1 transform duration-300"
          >
            {buttonText}
          </Link>
        )}
      </div>
    </section>
  );
}