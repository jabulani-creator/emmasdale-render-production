import React from 'react';
import Image from 'next/image';
import { FaPlay } from 'react-icons/fa';

interface VideoGridBlockProps {
  data: {
    heading?: string;
    description?: string;
    videos: { 
      id: string; 
      title: string; 
      thumbnailUrl: string; 
      videoUrl: string; 
    }[];
  };
}

export default function VideoGridBlock({ data }: VideoGridBlockProps) {
  if (!data || !data.videos || data.videos.length === 0) return null;

  const { heading, description, videos } = data;

  return (
    <section className="py-16">
      <div className="max-w-7xl w-[90%] mx-auto">
        {(heading || description) && (
          <div className="text-center mb-12 flex flex-col items-center">
            {heading && <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{heading}</h2>}
            {description && <p className="text-lg text-slate-600 max-w-2xl">{description}</p>}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((vid) => (
            <a 
              key={vid.id} 
              href={vid.videoUrl} 
              target="_blank" 
              rel="noreferrer"
              className="group block"
            >
              <div className="relative aspect-video rounded-xl overflow-hidden shadow-md mb-4 bg-slate-900">
                <Image 
                  src={vid.thumbnailUrl} 
                  alt={vid.title} 
                  fill 
                  className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white group-hover:bg-teal-500 group-hover:scale-110 transition-all duration-300">
                    <FaPlay className="ml-1" />
                  </div>
                </div>
              </div>
              <h4 className="text-lg font-bold text-slate-900 group-hover:text-teal-600 transition-colors line-clamp-2">
                {vid.title}
              </h4>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}