import React from 'react';
import Image from 'next/image';

interface LeaderProfileBlockProps {
  data: {
    name: string;
    role: string;
    bio: string;
    imageUrl: string;
    email?: string;
  };
}

export default function LeaderProfileBlock({ data }: LeaderProfileBlockProps) {
  if (!data) return null;
  const { name, role, bio, imageUrl, email } = data;

  return (
    <section className="py-16">
      <div className="max-w-4xl w-[90%] mx-auto">
        <div className="flex flex-col md:flex-row gap-10 items-start">
          
          {/* Leader Image */}
          <div className="w-48 h-64 md:w-64 md:h-80 relative shrink-0 rounded-lg overflow-hidden shadow-lg border border-slate-200">
            <Image 
              src={imageUrl || "https://res.cloudinary.com/dw82gpxt3/image/upload/v1664386580/emmsadale-church/sabbath_podcast_p91qgs.jpg"} 
              alt={name} 
              fill 
              className="object-cover"
            />
          </div>

          {/* Leader Details */}
          <div className="flex-grow pt-2">
            <h3 className="text-3xl font-bold text-slate-900 mb-1">{name}</h3>
            <p className="text-teal-600 font-bold uppercase tracking-wider text-sm mb-6">{role}</p>
            
            <div 
              className="prose prose-slate text-slate-600 leading-relaxed mb-6"
              dangerouslySetInnerHTML={{ __html: bio }}
            />

            {email && (
              <a 
                href={`mailto:${email}`}
                className="inline-block px-6 py-3 border-2 border-slate-900 text-slate-900 font-bold text-sm hover:bg-slate-900 hover:text-white transition-colors"
              >
                CONTACT LEADER
              </a>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}