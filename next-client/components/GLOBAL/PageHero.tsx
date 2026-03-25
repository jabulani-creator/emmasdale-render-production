"use client";

import { useUIStore } from "../../store/useUIStore";
import Image from "next/image";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  bgImage?: string;
}

const PageHero = ({ 
  title, 
  subtitle, 
  description, 
  bgImage = "https://images.unsplash.com/photo-1438283173091-5dbf5c5a3206?auto=format&fit=crop&w=2000&q=80" 
}: PageHeroProps) => {
  const { closeSubmenu } = useUIStore();
  
  return (
    <section 
      onMouseOver={closeSubmenu}
      className="relative h-[40vh] min-h-[350px] flex items-center justify-center pt-20 bg-slate-900"
    >
      <div className="absolute inset-0 z-0">
        <Image 
          src={bgImage}
          alt={title}
          fill 
          className="object-cover opacity-30"
          priority
        />
      </div>
      <div className="relative z-10 text-center px-4 flex flex-col items-center">
        {subtitle && (
          <p className="text-teal-400 font-bold tracking-widest uppercase text-sm mb-4">
            {subtitle}
          </p>
        )}
        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 uppercase tracking-tight">
          {title}
        </h1>
        {description && (
          <p className="text-xl text-slate-300 max-w-2xl text-center">
            {description}
          </p>
        )}
      </div>
    </section>
  );
};

export default PageHero;
