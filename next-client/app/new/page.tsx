import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaClock, FaMapMarkerAlt, FaUsers, FaChild, FaBookOpen } from "react-icons/fa";

export const metadata = {
  title: "I'm New Here | Emmasdale SDA Church",
  description: "Plan your visit to Emmasdale SDA Church. Find service times, what to expect, and how to get connected.",
};

export default function NewPage() {
  return (
    <main className="min-h-screen bg-slate-50 font-sans">
      
      {/* PAGE HERO */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center pt-20 bg-slate-900">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1438032005730-c779502df39b?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80" 
            alt="Church Welcome" 
            fill 
            className="object-cover opacity-40"
            priority
          />
        </div>
        <div className="relative z-10 text-center px-4">
          <p className="text-teal-400 font-bold tracking-widest uppercase text-sm mb-4">Welcome Home</p>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6">I'm New Here</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            We are so glad you are considering visiting us. Here is everything you need to know about our Sabbath worship.
          </p>
        </div>
      </section>

      {/* TEXT INTRO */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Sabbath Worship</h2>
        <p className="text-lg text-slate-600 leading-relaxed">
          Our Sabbath Worship is packed with activities for the entire day with special programs for each age group. Whether you are joining us in person or online, we want you to experience the presence of God.
        </p>
      </section>

      {/* ONLINE WORSHIP CALLOUT */}
      <section className="bg-teal-600 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4">Prefer to watch online first?</h3>
          <p className="text-teal-100 mb-8">Join our live stream every Saturday at 09:00 AM on YouTube and Facebook.</p>
          <Link href="https://www.facebook.com/emmasdalesda" target="_blank" className="px-8 py-4 bg-white text-teal-700 font-bold rounded-xl hover:bg-slate-100 transition-colors shadow-lg">
            Watch Online
          </Link>
        </div>
      </section>

      {/* MAIN SERVICE (NORMAL FLEX) */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <div className="flex items-center gap-4 text-teal-600 font-bold tracking-wider uppercase text-sm mb-4">
              <FaClock className="text-xl" /> 10:00 - 12:00
            </div>
            <h2 className="text-4xl font-bold text-slate-900 mb-6">Main Service</h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              Our main worship service features uplifting music, heartfelt prayer, and a powerful, Bible-based message. It's a time for the whole church family to come together and celebrate God's goodness.
            </p>
          </div>
          <div className="lg:w-1/2 w-full">
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
              <Image src="https://images.unsplash.com/photo-1543702404-38c2035462ad?auto=format&fit=crop&w=800&q=80" alt="Main Service" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* BIBLE STUDY (REVERSE FLEX) */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white rounded-3xl shadow-sm border border-slate-100 my-12">
        <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
          <div className="lg:w-1/2">
            <div className="flex items-center gap-4 text-teal-600 font-bold tracking-wider uppercase text-sm mb-4">
              <FaClock className="text-xl" /> 14:00 - 17:00
            </div>
            <h2 className="text-4xl font-bold text-slate-900 mb-6">Bible Study & Afternoon Programs</h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              After a fellowship lunch, we gather again in the afternoon for deep Bible study, choir practices, and various ministry activities. It's the perfect time to ask questions and grow deeper in the Word.
            </p>
          </div>
          <div className="lg:w-1/2 w-full">
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
              <Image src="https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=800&q=80" alt="Bible Study" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* KIDS SECTION (NORMAL FLEX) */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <div className="flex items-center gap-4 text-teal-600 font-bold tracking-wider uppercase text-sm mb-4">
              <FaChild className="text-xl" /> Children's Ministry
            </div>
            <h2 className="text-4xl font-bold text-slate-900 mb-6">Do You Have Kids?</h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              We love kids! We have dedicated Sabbath School classes for every age group from cradle roll to teens, ensuring your children learn about Jesus in a fun, safe, and age-appropriate environment.
            </p>
          </div>
          <div className="lg:w-1/2 w-full">
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
              <Image src="https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=800&q=80" alt="Children" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* YOUTH SECTION (REVERSE FLEX) */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white rounded-3xl shadow-sm border border-slate-100 mb-24">
        <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
          <div className="lg:w-1/2">
            <div className="flex items-center gap-4 text-teal-600 font-bold tracking-wider uppercase text-sm mb-4">
              <FaUsers className="text-xl" /> Adventist Youth Society
            </div>
            <h2 className="text-4xl font-bold text-slate-900 mb-6">Youths & Young Adults</h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              Our vibrant youth and young adult ministries provide a space for the younger generation to connect, serve the community, and navigate life's challenges through a biblical lens.
            </p>
          </div>
          <div className="lg:w-1/2 w-full">
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
              <Image src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=800&q=80" alt="Youth" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* VISIT FORM SECTION */}
      <section className="py-24 bg-slate-900 text-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6">Optionally, let us know you're coming!</h2>
            <p className="text-lg text-slate-300 leading-relaxed">
              Let us know that you are planning a visit, and we'll have a friendly face waiting to greet you! Our guests often find it helpful to have someone show them around during their first visit. A team member can show you where classes are located, where restrooms can be found, and answer any questions.
            </p>
          </div>

          <form className="bg-white/5 p-8 md:p-12 rounded-2xl border border-white/10 backdrop-blur-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">First Name</label>
                <input type="text" className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500" placeholder="John" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Last Name</label>
                <input type="text" className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500" placeholder="Doe" />
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
              <input type="email" className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500" placeholder="john@example.com" />
            </div>

            <div className="mb-8">
              <label className="block text-sm font-medium text-slate-300 mb-2">Planned Visit Date</label>
              <input type="date" className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500" />
            </div>

              <button type="button" className="w-full bg-teal-500 hover:bg-teal-400 text-slate-900 font-bold text-lg py-4 rounded-xl transition-colors shadow-lg">
                Plan My Visit
              </button>
          </form>
        </div>
      </section>

    </main>
  );
}