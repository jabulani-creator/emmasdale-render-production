import React from "react";
import { PageHero } from "../../components/GLOBAL";
import { Ministry } from "../../components/MINISTRIES";

async function getMinistries() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
  try {
    const res = await fetch(`${baseUrl}/ministry`, { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      return data.ministries || [];
    }
  } catch (error) {
    console.error("Failed to fetch ministries", error);
  }
  return [];
}

export default async function MinistriesPage() {
  const ministries = await getMinistries();

  return (
    <main className="min-h-screen bg-slate-50 font-sans flex-grow">
      
      {/* PAGE HERO */}
      <PageHero 
        title="OUR MINISTRIES" 
        subtitle="Get Involved" 
        description="Discover the various ways you can connect, serve, and grow in your faith. There is a place for everyone to belong." 
      />

      {/* MINISTRIES LIST */}
      <Ministry ministries={ministries} />
    </main>
  );
}