import React from "react";
import Image from "next/image";
import { FaExpandArrowsAlt } from "react-icons/fa";

const ImageGallery = ({ image, department, onClick }) => {
  const aspectRatios = [
    "aspect-[4/3]", 
    "aspect-[3/4]", 
    "aspect-square", 
    "aspect-[16/9]"
  ];
  
  const seed = image ? image.length : 0;
  const aspectClass = aspectRatios[seed % aspectRatios.length];

  return (
    <div 
      onClick={() => onClick(image, department)}
      className={`group relative w-full ${aspectClass} rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 bg-slate-100 cursor-pointer`}
    >
      <Image 
        src={image} 
        alt={department || "Church Media"} 
        fill 
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out" 
      />
      
      {/* Overlay on Hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6">
        <div className="self-end bg-white/20 backdrop-blur-md p-3 rounded-full text-white transform -translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          <FaExpandArrowsAlt />
        </div>
        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          <p className="text-teal-400 text-xs font-bold uppercase tracking-widest mb-1">Gallery</p>
          <h3 className="text-white text-xl font-bold capitalize">{department || "General Event"}</h3>
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;
