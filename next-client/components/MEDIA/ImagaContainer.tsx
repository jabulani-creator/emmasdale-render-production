"use client";

import { useState } from "react";
import ImageGallery from "./ImageGallery";
import { FaCameraRetro, FaTimes } from "react-icons/fa";
import Image from "next/image";

const ImagaContainer = ({ images = [] }) => {
  const [selectedImage, setSelectedImage] = useState<{src: string, dept: string} | null>(null);

  const openLightbox = (src: string, dept: string) => {
    setSelectedImage({ src, dept });
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto'; // Restore scrolling
  };

  if (images.length === 0) {
    return (
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white min-h-[60vh] flex flex-col items-center justify-center">
        <div className="w-32 h-32 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 text-5xl mb-8 shadow-inner">
          <FaCameraRetro />
        </div>
        <h2 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">No Memories Found</h2>
        <p className="text-slate-500 text-lg max-w-md text-center leading-relaxed">
          We couldn't find any images matching your current filters. Try adjusting your search to explore more moments.
        </p>
      </section>
    );
  }

  return (
    <>
      <section className="py-12 bg-white min-h-screen">
        <div className="max-w-7xl w-[90%] mx-auto">
          {/* Header */}
          <div className="text-center mb-16 flex flex-col items-center">
            <p className="text-teal-600 font-bold tracking-wider uppercase text-sm mb-4">Photo Gallery</p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">Explore Our Memories</h2>
          </div>

          {/* CSS Columns approach for Masonry layout */}
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
            {images.map((img) => {
              return (
                <div key={img._id} className="break-inside-avoid">
                  <ImageGallery {...img} onClick={openLightbox} />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Fullscreen Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] bg-slate-900/95 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8 animate-fade-in"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button 
            className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white text-xl transition-colors z-[101]"
            onClick={closeLightbox}
          >
            <FaTimes />
          </button>

          {/* Image Container */}
          <div 
            className="relative w-full max-w-6xl h-[80vh] flex flex-col"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image itself
          >
            <div className="relative flex-grow rounded-xl overflow-hidden shadow-2xl">
              <Image 
                src={selectedImage.src} 
                alt={selectedImage.dept || "Gallery Image"} 
                fill 
                className="object-contain" 
                sizes="100vw"
                priority
              />
            </div>
            
            {/* Caption */}
            <div className="mt-6 text-center">
              <p className="text-teal-400 font-bold tracking-widest uppercase text-sm mb-2">Department</p>
              <h3 className="text-white text-2xl font-bold capitalize">{selectedImage.dept || "General Event"}</h3>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ImagaContainer;
