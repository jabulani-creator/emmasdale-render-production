import React from 'react';
import Image from 'next/image';

interface GalleryBlockProps {
  data: {
    heading?: string;
    description?: string;
    images: { url: string; caption?: string }[];
  };
}

export default function GalleryBlock({ data }: GalleryBlockProps) {
  if (!data || !data.images || data.images.length === 0) return null;

  const { heading, description, images } = data;

  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-7xl w-[90%] mx-auto">
        {(heading || description) && (
          <div className="text-center mb-12 flex flex-col items-center">
            {heading && <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{heading}</h2>}
            {description && <p className="text-lg text-slate-600 max-w-2xl">{description}</p>}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((img, idx) => (
            <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all group">
              <Image 
                src={img.url} 
                alt={img.caption || `Gallery image ${idx + 1}`} 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {img.caption && (
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                  <p className="text-white p-6 font-medium">{img.caption}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}