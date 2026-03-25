"use client";

import React from 'react';
import { FaPlay } from 'react-icons/fa';

export default function AudioPlayer({ audioUrl, title, author }: { audioUrl: string, title: string, author: string }) {
  // Blubrry/Squarespace strictly block inline playback on external domains.
  // The only reliable way to play this without errors is to link directly to the audio stream.
  const secureUrl = audioUrl.replace('http://', 'https://');

  return (
    <div className="bg-[#111] text-white flex items-center mb-6 rounded overflow-hidden h-20 group hover:bg-[#1a1a1a] transition-colors cursor-pointer" onClick={() => window.open(secureUrl, '_blank')}>
      <div className="w-20 h-full flex items-center justify-center bg-black/40 group-hover:bg-teal-500 transition-colors border-r border-white/10 shrink-0">
        <FaPlay className="text-white text-2xl" />
      </div>
      
      <div className="p-4 flex-grow flex flex-col justify-center">
        <h5 className="font-medium text-sm md:text-base mb-1 truncate group-hover:text-teal-400 transition-colors">{title}</h5>
        <p className="text-gray-400 text-xs md:text-sm truncate">{author}</p>
      </div>

      <div className="px-6 shrink-0 flex items-center text-xs text-gray-500 uppercase tracking-widest font-bold group-hover:text-white transition-colors hidden md:block">
        Listen Now &rarr;
      </div>
    </div>
  );
}