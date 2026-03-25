"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaPlus, FaMinus } from "react-icons/fa";
import { God, Humanity, Salvation, Church, Living, Restoration } from "../../components/ABOUT/individualbelief/beliefData";

const categories = [
  { title: "Doctrine of God", data: God },
  { title: "Doctrine of Humanity", data: Humanity },
  { title: "Doctrine of Salvation", data: Salvation },
  { title: "Doctrine of the Church", data: Church },
  { title: "Doctrine of Christian Living", data: Living },
  { title: "Doctrine of Restoration", data: Restoration },
];

function AccordionItem({ title, message }: { title: string, message: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-slate-200 rounded-xl mb-4 bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
      >
        <h3 className="text-xl font-bold text-slate-900 pr-8">{title}</h3>
        <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-teal-600 shrink-0 transition-transform duration-300">
          {isOpen ? <FaMinus /> : <FaPlus />}
        </div>
      </button>
      
      <div 
        className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="p-6 pt-0 text-slate-600 leading-relaxed border-t border-slate-100">
          {message}
        </div>
      </div>
    </div>
  );
}

export default function BeliefsPage() {
  return (
    <main className="min-h-screen bg-slate-50 font-sans flex-grow">
      
      {/* PAGE HERO */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center pt-20 bg-slate-900">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1504052434569-70ad5836ab65?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80" 
            alt="Open Bible" 
            fill 
            className="object-cover opacity-40"
            priority
          />
        </div>
        <div className="relative z-10 text-center px-4 flex flex-col items-center">
          <p className="text-teal-400 font-bold tracking-widest uppercase text-sm mb-4">What We Believe</p>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6">Our 28 Beliefs</h1>
          <p className="text-xl text-slate-300 max-w-2xl text-center">
            Seventh-day Adventists accept the Bible as their only creed and hold certain fundamental beliefs to be the teaching of the Holy Scriptures.
          </p>
        </div>
      </section>

      {/* IDENTITY (VIDEO) SECTION */}
      <section className="py-24 max-w-7xl w-[90%] mx-auto text-center flex flex-col items-center">
        <h2 className="text-4xl font-bold text-slate-900 mb-6">Who Are Seventh-day Adventists?</h2>
        <p className="text-lg text-slate-600 max-w-3xl text-center mb-12 leading-relaxed">
          We are a global family of Christians who hold the Bible as our only creed. We believe that God is the architect of the world, and in His infinite love, He is actively working to restore a relationship with humanity that will last for eternity.
        </p>
        <div className="w-full max-w-4xl mx-auto aspect-video rounded-3xl overflow-hidden shadow-2xl bg-slate-900">
          <iframe 
            width="100%" 
            height="100%" 
            src="https://www.youtube.com/embed/-CwVPt6r7pY" 
            title="Who Are Seventh-day Adventists" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          ></iframe>
        </div>
      </section>

      {/* MODERN ACCORDION BELIEFS LIST */}
      <section className="py-24 bg-white border-t border-slate-200">
        <div className="max-w-4xl w-[90%] mx-auto">
          
          {categories.map((category, index) => (
            <div key={index} className="mb-16">
              <div className="flex items-center gap-4 mb-8">
                <div className="h-px bg-teal-200 flex-grow"></div>
                <h2 className="text-3xl font-extrabold text-slate-900 uppercase tracking-widest">{category.title}</h2>
                <div className="h-px bg-teal-200 flex-grow"></div>
              </div>
              
              <div className="space-y-4">
                {category.data.map((belief) => (
                  <AccordionItem 
                    key={belief.id} 
                    title={belief.title} 
                    message={belief.message} 
                  />
                ))}
              </div>
            </div>
          ))}

        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="py-24 bg-slate-900 text-white text-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">Have Questions About Faith?</h2>
          <p className="text-xl text-slate-300 mb-10 leading-relaxed">
            We would love to study the Bible with you and answer any questions you might have about our beliefs.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link href="/contact" className="px-10 py-4 bg-teal-500 hover:bg-teal-400 text-slate-900 font-bold text-lg rounded-xl transition-all shadow-lg transform hover:-translate-y-1">
              Request Bible Study
            </Link>
            <Link href="/about" className="px-10 py-4 bg-transparent border-2 border-slate-700 hover:border-slate-500 text-white font-bold text-lg rounded-xl transition-all">
              Back to About
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}