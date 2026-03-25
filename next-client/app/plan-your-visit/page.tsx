import React from 'react';
import Link from 'next/link';
import { FaClock, FaMapMarkerAlt, FaCar, FaChild, FaTshirt, FaMusic } from 'react-icons/fa';

export default function PlanYourVisit() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-teal-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-teal-900/80 mix-blend-multiply z-10" />
        </div>
        <div className="relative z-20 max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            We're Saving a Seat for You
          </h1>
          <p className="text-xl text-teal-50 mb-8 max-w-2xl mx-auto leading-relaxed">
            Visiting a new church can be intimidating. We want to make your first experience at Emmasdale SDA Church a great one!
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Key Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 -mt-24 relative z-30">
          {/* Times Card */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100">
            <div className="w-14 h-14 bg-teal-50 rounded-xl flex items-center justify-center text-teal-600 text-2xl mb-6">
              <FaClock />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Sabbath Services</h3>
            <ul className="space-y-4 text-slate-600">
              <li className="flex justify-between items-center pb-4 border-b border-slate-100">
                <span className="font-medium">Song Service</span>
                <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-lg text-sm font-bold">08:30 AM</span>
              </li>
              <li className="flex justify-between items-center pb-4 border-b border-slate-100">
                <span className="font-medium">Sabbath School</span>
                <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-lg text-sm font-bold">09:00 AM</span>
              </li>
              <li className="flex justify-between items-center pb-4 border-b border-slate-100">
                <span className="font-medium">Sabbath School Classes</span>
                <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-lg text-sm font-bold">09:30 AM</span>
              </li>
              <li className="flex justify-between items-center pb-4 border-b border-slate-100">
                <span className="font-medium">Divine Service</span>
                <span className="bg-teal-50 text-teal-700 px-3 py-1 rounded-lg text-sm font-bold">10:00 AM</span>
              </li>
              <li className="flex justify-between items-center pb-4 border-b border-slate-100">
                <span className="font-medium">Fellowship Lunch</span>
                <span className="bg-amber-50 text-amber-700 px-3 py-1 rounded-lg text-sm font-bold">12:00 PM</span>
              </li>
              <li className="flex justify-between items-center pb-4 border-b border-slate-100">
                <span className="font-medium">Departmental Meetings</span>
                <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-lg text-sm font-bold">02:00 PM</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="font-medium">Bible Study / AY</span>
                <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-lg text-sm font-bold">03:00 PM</span>
              </li>
            </ul>
          </div>

          {/* Location Card */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100">
            <div className="w-14 h-14 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600 text-2xl mb-6">
              <FaMapMarkerAlt />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Location</h3>
            <p className="text-slate-600 mb-6 leading-relaxed">
              We are located in the heart of Emmasdale. We have ample parking and our greeting team will be ready to welcome you at the door!
            </p>
            <div className="bg-slate-50 p-4 rounded-xl text-slate-700 font-medium mb-6">
              Emmasdale SDA Church<br/>
              Lusaka, Zambia
            </div>
            <a 
              href="https://maps.google.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full text-center bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-6 rounded-xl transition-colors"
            >
              Get Directions
            </a>
          </div>
        </div>

        {/* What to Expect Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">What to Expect</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <FaTshirt className="text-3xl text-teal-500 mb-4" />
              <h4 className="text-xl font-bold text-slate-900 mb-2">What should I wear?</h4>
              <p className="text-slate-600 leading-relaxed">
                Come exactly as you are! You'll find everything from suits and ties to casual weekend wear. We care about you, not your wardrobe.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <FaChild className="text-3xl text-teal-500 mb-4" />
              <h4 className="text-xl font-bold text-slate-900 mb-2">What about kids?</h4>
              <p className="text-slate-600 leading-relaxed">
                We love families! We have engaging, age-appropriate Sabbath School classes for children of all ages starting at 9:00 AM.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <FaMusic className="text-3xl text-teal-500 mb-4" />
              <h4 className="text-xl font-bold text-slate-900 mb-2">What is the service like?</h4>
              <p className="text-slate-600 leading-relaxed">
                Our services feature uplifting congregational singing, special music from our choirs, and a Bible-based, inspiring message from our pastoral team.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-teal-900 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Let Us Know You're Coming!</h2>
            <p className="text-teal-100 mb-8 max-w-2xl mx-auto text-lg">
              Fill out a quick form so our hospitality team can greet you, show you around, and introduce you to some great people.
            </p>
            <Link 
              href="/contact" 
              className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-bold text-lg py-4 px-10 rounded-xl transition-all hover:scale-105 shadow-lg"
            >
              Plan My Visit
            </Link>
          </div>
        </div>

      </section>
    </div>
  );
}