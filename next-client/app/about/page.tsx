import React from "react";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "../../components/GLOBAL";
import { FaHeart, FaBook, FaHandsHelping, FaGlobeAfrica, FaHistory, FaListUl } from "react-icons/fa";

export const metadata = {
  title: "Who We Are | Emmasdale SDA Church",
  description: "Learn about the mission, vision, and core beliefs of Emmasdale Seventh-Day Adventist Church.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-50 font-sans flex-grow">
      
      {/* PAGE HERO */}
      <PageHero 
        title="ABOUT US" 
        subtitle="Our Identity" 
        description="A community of believers dedicated to serving God and our neighbors in Lusaka, Zambia." 
      />

      {/* OUR STORY & MISSION */}
      <section className="py-24 max-w-7xl w-[90%] mx-auto">
        <div className="text-center mb-16 flex flex-col items-center">
          <p className="text-teal-600 font-bold tracking-wider uppercase text-sm mb-4">Our Story</p>
          <h2 className="text-4xl font-bold text-slate-900 mb-6">Our Mission & Vision</h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-6 max-w-3xl">
            At Emmasdale SDA Church, our mission is to lift up Jesus Christ and proclaim the everlasting gospel to all the world, baptizing them in the name of the Father, the Son, and the Holy Spirit.
          </p>
          <p className="text-lg text-slate-600 leading-relaxed max-w-3xl">
            We are a Bible-believing community that looks forward to the imminent return of Jesus Christ. We strive to be a place of healing, hope, and spiritual growth for everyone who walks through our doors.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2">
            <div className="grid grid-cols-2 gap-6 mb-10">
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <FaHeart className="text-3xl text-teal-500 mb-4" />
                <h4 className="font-bold text-slate-900 mb-2">Love God</h4>
                <p className="text-sm text-slate-500">Through heartfelt worship and devotion.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <FaHandsHelping className="text-3xl text-teal-500 mb-4" />
                <h4 className="font-bold text-slate-900 mb-2">Love People</h4>
                <p className="text-sm text-slate-500">Through active community service.</p>
              </div>
            </div>

            {/* QUICK LINKS */}
            <div className="flex flex-wrap gap-4 pt-6 border-t border-slate-200">
              <Link href="/beliefs" className="flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl transition-colors shadow-md">
                <FaListUl /> Our 28 Beliefs
              </Link>
              <Link href="/history" className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-slate-200 hover:border-teal-500 font-bold rounded-xl transition-colors shadow-sm" style={{ color: '#0f172a' }}>
                <FaHistory /> Our History
              </Link>
            </div>
          </div>
          <div className="lg:w-1/2 w-full relative h-[500px] rounded-3xl overflow-hidden shadow-xl">
            <Image 
              src="https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=1000&q=80" 
              alt="Church Family" 
              fill 
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* WHAT WE BELIEVE (Core Values Grid) */}
      <section className="py-24 bg-white border-y border-slate-100">
        <div className="max-w-7xl w-[90%] mx-auto text-center">
          <div className="mb-16 flex flex-col items-center">
            <p className="text-teal-600 font-bold tracking-wider uppercase text-sm mb-4">Our Foundation</p>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900">What We Believe</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-left">
            <div className="bg-slate-50 p-10 rounded-3xl border border-slate-100 hover:shadow-lg transition-all group">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-teal-600 text-2xl mb-8 shadow-sm group-hover:bg-teal-600 group-hover:text-white transition-colors">
                <FaBook />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">The Holy Bible</h3>
              <p className="text-slate-600 leading-relaxed">
                We believe the Bible is the inspired word of God. It is our only rule of faith and practice, providing the ultimate standard for living a life pleasing to our Creator.
              </p>
            </div>

            <div className="bg-slate-50 p-10 rounded-3xl border border-slate-100 hover:shadow-lg transition-all group">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-teal-600 text-2xl mb-8 shadow-sm group-hover:bg-teal-600 group-hover:text-white transition-colors">
                <FaGlobeAfrica />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">The Sabbath</h3>
              <p className="text-slate-600 leading-relaxed">
                We observe the seventh-day Sabbath (Saturday) as a memorial of creation and a day of rest, worship, and fellowship, just as Jesus and the apostles did.
              </p>
            </div>

            <div className="bg-slate-50 p-10 rounded-3xl border border-slate-100 hover:shadow-lg transition-all group">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-teal-600 text-2xl mb-8 shadow-sm group-hover:bg-teal-600 group-hover:text-white transition-colors">
                <FaHeart />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">The Second Coming</h3>
              <p className="text-slate-600 leading-relaxed">
                We look forward with great hope to the literal, visible, and imminent return of Jesus Christ to this earth to claim His people and restore all things.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* LEADERSHIP / CALL TO ACTION */}
      <section className="py-24 bg-slate-900 text-white text-center">
        <div className="max-w-3xl w-[90%] mx-auto">
          <h2 className="text-4xl font-bold mb-6">Ready to Join Us?</h2>
          <p className="text-xl text-slate-300 mb-10 leading-relaxed">
            We would love to welcome you into our church family. Whether you have questions about faith or are looking for a new church home, there is a place for you here.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link href="/new" className="px-10 py-4 bg-teal-500 hover:bg-teal-400 text-slate-900 font-bold text-lg rounded-xl transition-all shadow-lg transform hover:-translate-y-1">
              Plan A Visit
            </Link>
            <Link href="/contact" className="px-10 py-4 bg-transparent border-2 border-slate-700 hover:border-slate-500 text-white font-bold text-lg rounded-xl transition-all">
              Contact Pastor
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}