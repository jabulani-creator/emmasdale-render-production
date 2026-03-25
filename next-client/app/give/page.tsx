import React from 'react';
import { FaHeart, FaHandHoldingUsd, FaMobileAlt, FaBuilding } from 'react-icons/fa';

export default function GivePage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-slate-900/90 mix-blend-multiply z-10" />
        </div>
        <div className="relative z-20 max-w-4xl mx-auto text-center">
          <div className="w-20 h-20 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaHeart className="text-4xl text-amber-500" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Partner With Us
          </h1>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Your generosity helps us continue our mission of sharing the love of Christ with our community and the world.
          </p>
          <a 
            href="#" 
            className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-bold text-lg py-4 px-10 rounded-xl transition-all hover:scale-105 shadow-lg"
          >
            Give Online Now
          </a>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Ways to Give</h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            We offer several secure and convenient ways for you to return your tithes and give your offerings.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Online Giving */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 text-center hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center mx-auto text-teal-600 text-2xl mb-6">
              <FaMobileAlt />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Online & Mobile</h3>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Give securely through our online portal. You can set up a one-time gift or recurring donations.
            </p>
            <a href="#" className="text-teal-600 font-bold hover:text-teal-700">Give Online &rarr;</a>
          </div>

          {/* Bank Transfer */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 text-center hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto text-amber-600 text-2xl mb-6">
              <FaBuilding />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Bank Transfer</h3>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Directly transfer funds to the church bank account using our details below.
            </p>
            <div className="bg-slate-50 p-4 rounded-xl text-sm text-slate-700 text-left mb-4">
              <p><strong>Bank:</strong> Example Bank Name</p>
              <p><strong>Account Name:</strong> Emmasdale SDA Church</p>
              <p><strong>Account No:</strong> 1234567890</p>
              <p><strong>Branch Code:</strong> 00000</p>
            </div>
          </div>

          {/* In Person */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 text-center hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto text-blue-600 text-2xl mb-6">
              <FaHandHoldingUsd />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">In Person</h3>
            <p className="text-slate-600 leading-relaxed">
              You can give during our Sabbath worship services by placing your tithe envelope in the offering plate during the collection.
            </p>
          </div>

        </div>

        {/* Biblical Context Section */}
        <div className="mt-24 bg-slate-50 rounded-3xl p-8 md:p-12 border border-slate-100">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Tithes & Offerings</h2>
            <div className="grid md:grid-cols-2 gap-8 text-left">
              <div>
                <h4 className="font-bold text-slate-800 mb-2">Tithe</h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  The tithe is holy unto the Lord. It is 10% of our income and is used strictly to support the global gospel ministry and pastoral staff.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-slate-800 mb-2">Offerings</h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Offerings are our freewill gifts given out of gratitude. These funds support our local church budget, building maintenance, and community outreach programs.
                </p>
              </div>
            </div>
          </div>
        </div>

      </section>
    </div>
  );
}