import React from 'react';
import Image from 'next/image';

interface TextBlockProps {
  data: {
    heading?: string;
    content: string;
    imageAlign?: 'left' | 'right' | 'none';
    imageUrl?: string;
  };
}

export default function TextBlock({ data }: TextBlockProps) {
  if (!data) return null;

  const { heading, content, imageAlign = 'none', imageUrl } = data;

  if (imageAlign !== 'none' && imageUrl) {
    return (
      <section className="py-16">
        <div className="max-w-7xl w-[90%] mx-auto">
          <div className={`flex flex-col lg:flex-row gap-12 items-center ${imageAlign === 'right' ? 'lg:flex-row-reverse' : ''}`}>
            <div className="lg:w-1/2 w-full relative h-[400px] rounded-3xl overflow-hidden shadow-xl">
              <Image 
                src={imageUrl} 
                alt={heading || "Ministry Image"} 
                fill 
                className="object-cover"
              />
            </div>
            <div className="lg:w-1/2">
              {heading && <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">{heading}</h2>}
              <div 
                className="prose prose-lg text-slate-600 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Standard text block without image
  return (
    <section className="py-16">
      <div className="max-w-4xl w-[90%] mx-auto text-center md:text-left">
        {heading && <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">{heading}</h2>}
        <div 
          className="prose prose-lg mx-auto text-slate-600 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </section>
  );
}