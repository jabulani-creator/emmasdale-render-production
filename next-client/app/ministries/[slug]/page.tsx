import React from "react";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "../../../components/GLOBAL";
import BlockRenderer from "../../../components/MINISTRIES/dynamic/BlockRenderer";
import { FaCalendarAlt, FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaFacebook, FaInstagram } from "react-icons/fa";

// In a real app, you would fetch this using the slug parameter
async function getMinistryData(slug: string) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
  
  try {
    const res = await fetch(`${baseUrl}/ministry/${slug}`, { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      return data.ministry;
    }
  } catch (error) {
    console.error("Failed to fetch ministry data", error);
  }

  // If fetch fails or no ministry is found, return null
  return null;
}

export default async function DynamicMinistryPage({ params }: { params: { slug: string } }) {
  const ministry = await getMinistryData(params.slug);

  if (!ministry) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Ministry Not Found</h1>
          <Link href="/ministries" className="text-teal-600 hover:underline">Return to all ministries</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white font-sans flex-grow">
      
      {/* DYNAMIC HERO */}
      <PageHero 
        title={ministry.name} 
        subtitle={ministry.hero?.motto} 
        description={ministry.hero?.description}
        bgImage={ministry.hero?.image}
      />

      {/* DYNAMIC CONTENT BLOCKS */}
      {ministry.contentBlocks && ministry.contentBlocks.length > 0 && (
        <BlockRenderer blocks={ministry.contentBlocks} />
      )}

      {/* FIXED FOOTER/CONTACT SECTION FOR MINISTRY */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-5xl w-[90%] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Get Involved</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              We would love for you to be a part of what God is doing through the {ministry.name}. Connect with us below!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl">
            {/* Logistics */}
            <div className="space-y-8">
              <h3 className="text-xl font-bold text-teal-400 border-b border-slate-700 pb-4">Meeting Details</h3>
              
              {ministry.contact?.meetingTime && (
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-teal-400 shrink-0">
                    <FaCalendarAlt />
                  </div>
                  <div>
                    <p className="font-semibold">When we meet</p>
                    <p className="text-slate-400">{ministry.contact.meetingTime}</p>
                  </div>
                </div>
              )}

              {ministry.contact?.meetingLocation && (
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-teal-400 shrink-0">
                    <FaMapMarkerAlt />
                  </div>
                  <div>
                    <p className="font-semibold">Where we meet</p>
                    <p className="text-slate-400">{ministry.contact.meetingLocation}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Contact */}
            <div className="space-y-8">
              <h3 className="text-xl font-bold text-teal-400 border-b border-slate-700 pb-4">Contact Us</h3>
              
              {ministry.contact?.email && (
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-teal-400 shrink-0">
                    <FaEnvelope />
                  </div>
                  <a href={`mailto:${ministry.contact.email}`} className="text-slate-300 hover:text-white transition-colors">
                    {ministry.contact.email}
                  </a>
                </div>
              )}

              {ministry.contact?.phone && (
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-teal-400 shrink-0">
                    <FaPhoneAlt />
                  </div>
                  <a href={`tel:${ministry.contact.phone}`} className="text-slate-300 hover:text-white transition-colors">
                    {ministry.contact.phone}
                  </a>
                </div>
              )}

              {/* Social Links */}
              {ministry.contact?.socialLinks && (
                <div className="flex gap-4 pt-4">
                  {ministry.contact.socialLinks.facebook && (
                    <a href={ministry.contact.socialLinks.facebook} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white hover:bg-blue-500 transition-colors">
                      <FaFacebook />
                    </a>
                  )}
                  {ministry.contact.socialLinks.instagram && (
                    <a href={ministry.contact.socialLinks.instagram} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-pink-600 flex items-center justify-center text-white hover:bg-pink-500 transition-colors">
                      <FaInstagram />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
          
        </div>
      </section>

    </main>
  );
}