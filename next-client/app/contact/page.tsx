import React from "react";
import {
  DepartmentContainer,
  EldersContainer,
  PastorsContainer,
  WorkersContainer,
} from "../../components/CONTACT";
import { Form, PageHero } from "../../components/GLOBAL";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

async function getContactData() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

  const [pastorsRes, eldersRes, leadersRes, workersRes] = await Promise.all([
    fetch(`${baseUrl}/pastor`, { next: { revalidate: 3600 } }).catch(() => null),
    fetch(`${baseUrl}/elder`, { next: { revalidate: 3600 } }).catch(() => null),
    fetch(`${baseUrl}/position`, { next: { revalidate: 3600 } }).catch(() => null),
    fetch(`${baseUrl}/worker`, { next: { revalidate: 3600 } }).catch(() => null),
  ]);

  const pastorsData = pastorsRes?.ok ? await pastorsRes.json() : { pastors: [] };
  const eldersData = eldersRes?.ok ? await eldersRes.json() : { elders: [] };
  const leadersData = leadersRes?.ok ? await leadersRes.json() : { leaders: [] };
  const workersData = workersRes?.ok ? await workersRes.json() : { workers: [] };

  return {
    pastors: pastorsData.pastors || [],
    elders: eldersData.elders || [],
    leaders: leadersData.leaders || [],
    workers: workersData.workers || [],
  };
}

export default async function ContactPage() {
  const { pastors, elders, leaders, workers } = await getContactData();

  return (
    <main className="min-h-screen bg-slate-50">
      <PageHero 
        title="CONTACT US" 
        subtitle="Get In Touch" 
        description="We would love to hear from you. Reach out to our leadership or pastoral team below." 
      />
      
      {/* Contact Info & Form Section */}
      <section className="py-24 max-w-7xl w-[90%] mx-auto">
        <div className="text-center mb-16 flex flex-col items-center">
          <p className="text-teal-600 font-bold tracking-wider uppercase text-sm mb-4">Get In Touch</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">How can we help you?</h2>
          <p className="text-lg text-slate-600 leading-relaxed max-w-3xl">
            Need a prayer? Interested in becoming a member? Considering Baptism? We are here to serve! Let us know how we can help you on your spiritual journey.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Left Side: Contact Info & Map placeholder */}
          <div>
            <div className="space-y-8 mb-12">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-teal-600 text-xl shrink-0 shadow-sm border border-slate-100">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Address</h4>
                  <p className="text-slate-600 mt-1">Private Bag FW 42 Off Vubu Road<br/>Emmasdale, Lusaka, Zambia</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-teal-600 text-xl shrink-0 shadow-sm border border-slate-100">
                  <FaPhoneAlt />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Phone</h4>
                  <p className="text-slate-600 mt-1">+260 972 975 737</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-teal-600 text-xl shrink-0 shadow-sm border border-slate-100">
                  <FaEnvelope />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Email</h4>
                  <p className="text-slate-600 mt-1">emmasdale@gmail.com</p>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="w-full h-64 bg-slate-200 rounded-3xl overflow-hidden shadow-inner relative">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3846.545719773426!2d28.2731!3d-15.3951!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTXCsDIzJzQyLjQiUyAyOMKwMTYnMjMuMiJF!5e0!3m2!1sen!2szm!4v1620000000000!5m2!1sen!2szm" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy"
                className="grayscale opacity-80 mix-blend-multiply"
              ></iframe>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="lg:pl-8">
            <Form />
          </div>

        </div>
      </section>

      {/* Leadership Section */}
      <section className="bg-white border-t border-slate-100 py-24">
        <div className="max-w-6xl w-[90%] mx-auto text-center">
          <div className="mb-20 flex flex-col items-center">
            <p className="text-teal-600 font-bold tracking-wider uppercase text-sm mb-4">Our Team</p>
            <h2 className="text-3xl font-semibold text-slate-800">Church Leadership</h2>
          </div>

          <div className="space-y-24">
            <div className="flex flex-col items-center">
              <h3 className="text-[22px] font-medium text-slate-700 mb-10 pb-1 border-b-[1px] border-slate-300 px-4">Pastoral Staff</h3>
              <PastorsContainer pastors={pastors} />
            </div>

            <div className="flex flex-col items-center">
              <h3 className="text-[22px] font-medium text-slate-700 mb-10 pb-1 border-b-[1px] border-slate-300 px-4">Church Elders</h3>
              <EldersContainer elders={elders} />
            </div>

            <div className="flex flex-col items-center">
              <h3 className="text-[22px] font-medium text-slate-700 mb-10 pb-1 border-b-[1px] border-slate-300 px-4">Department Heads</h3>
              <DepartmentContainer leaders={leaders} />
            </div>

            <div className="flex flex-col items-center">
              <h3 className="text-[22px] font-medium text-slate-700 mb-10 pb-1 border-b-[1px] border-slate-300 px-4">General Workers</h3>
              <WorkersContainer workers={workers} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}