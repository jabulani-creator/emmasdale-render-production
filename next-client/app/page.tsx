import React from "react";
import Link from "next/link";
import Image from "next/image";
import Parser from "rss-parser";
import { FaPlay, FaCalendarAlt, FaPrayingHands, FaHeartbeat, FaChild, FaUsers, FaBook, FaMapMarkerAlt, FaClock, FaQuoteRight, FaVideo, FaArrowRight } from "react-icons/fa";
import AudioPlayer from "../components/HOME/podcast/AudioPlayer";

async function getHomeData() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

  // Parse the RSS feed for the 1 Year Bible Plan
  let latestPodcast = null;
  try {
    const parser = new Parser();
    const feed = await parser.parseURL("https://oneyearbiblepodcast.com/daily-bible-reading?format=rss");
    if (feed.items && feed.items.length > 0) {
      const item = feed.items[0];
      
      // Extract the reading text from the content (which contains the HTML anchor tags)
      let readingPlanHTML = "";
      if (item.content) {
        // The content usually has an h3 tag containing the links, followed by paragraph tags.
        // We'll extract just the h3 tag contents to match the screenshot.
        const h3Match = item.content.match(/<h3>(.*?)<\/h3>/i);
        if (h3Match && h3Match[1]) {
          readingPlanHTML = h3Match[1];
        } else {
          // Fallback if no h3 is found
          const parts = item.content.split("<p");
          readingPlanHTML = parts[0].trim();
        }
      }

      // The RSS feed provides a Blubrry tracking URL that often fails due to CORS/Redirect loops.
      // We can extract the actual direct Squarespace MP3 URL from the end of the Blubrry string.
      let rawAudioUrl = item.enclosure?.url || "";
      let directMp3Url = rawAudioUrl;
      
      if (rawAudioUrl.includes("blubrry.com") && rawAudioUrl.includes("squarespace.com")) {
        // Example: http://media.blubrry.com/oneyearbiblepodcast/static1.squarespace.com/.../file.mp3
        // We want to extract everything from "static1.squarespace.com" onwards
        const splitUrl = rawAudioUrl.split("static1.squarespace.com");
        if (splitUrl.length > 1) {
          directMp3Url = "https://static1.squarespace.com" + splitUrl[1];
        }
      }

      latestPodcast = {
        title: item.title,
        date: new Date(item.pubDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        audioUrl: directMp3Url,
        readingPlanHTML: readingPlanHTML,
        author: item.creator || "One Year Bible Podcast"
      };
    }
  } catch (error) {
    console.error("Failed to parse RSS feed:", error);
  }

  const [eventsRes, healthRes, reviewsRes, pdfRes, postsRes] = await Promise.all([
    fetch(`${baseUrl}/events`, { next: { revalidate: 3600 } }).catch(() => null),
    fetch(`${baseUrl}/health`, { next: { revalidate: 3600 } }).catch(() => null),
    fetch(`${baseUrl}/review`, { next: { revalidate: 3600 } }).catch(() => null),
    fetch(`${baseUrl}/pdf`, { next: { revalidate: 3600 } }).catch(() => null),
    fetch(`${baseUrl}/posts`, { next: { revalidate: 3600 } }).catch(() => null),
  ]);

  const eventsData = eventsRes?.ok ? await eventsRes.json() : { events: [] };
  const healthData = healthRes?.ok ? await healthRes.json() : { healthPosts: [] };
  const reviewsData = reviewsRes?.ok ? await reviewsRes.json() : { reviews: [] };
  const pdfData = pdfRes?.ok ? await pdfRes.json() : { upload: { pdf: "" } };
  const postsData = postsRes?.ok ? await postsRes.json() : { posts: [] };

  return {
    events: eventsData.events || [],
    healthPosts: healthData.healthPosts || [],
    reviews: reviewsData.reviews || [],
    bulletingPdf: pdfData.upload?.pdf || "",
    latestPodcast,
    posts: postsData.posts || []
  };
}

export default async function Home() {
  const { events, healthPosts, reviews, bulletingPdf, latestPodcast, posts } = await getHomeData();

  return (
    <main className="min-h-screen bg-slate-50 font-sans flex-grow">
      {/* HERO SECTION - Dark with Image Overlay */}
      <section className="relative pt-24 pb-32 md:pt-32 md:pb-48 px-4 sm:px-6 lg:px-8 overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/1.jpg" 
            alt="Congregation worshiping" 
            fill 
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto pt-10 text-center">
          <p className="text-amber-400 font-bold tracking-widest uppercase text-sm mb-4">Welcome Home</p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight max-w-4xl mx-auto drop-shadow-lg">
            Emmasdale <span className="text-amber-400">SDA</span> Church
          </h1>
          <p className="text-lg md:text-2xl text-slate-200 mb-8 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
            The perfect place for people who are not. Whatever you have been through, this is the right place to grow in Christ's love.
          </p>
          
          {/* Service Times Above the Fold */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-10 text-white/90 font-medium">
            <div className="flex items-center gap-2">
              <FaClock className="text-amber-400" />
              <span>Sabbath Services begin at 8:30 AM</span>
            </div>
            <div className="hidden sm:block text-white/30">•</div>
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-amber-400" />
              <span>Lusaka, Zambia</span>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/plan-your-visit" className="px-8 py-4 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold rounded-full shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all transform hover:-translate-y-1 text-lg">
              Plan Your Visit
            </Link>
          </div>
        </div>
      </section>

      {/* FLOATING LIVE STREAM CARD */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20">
        <div className="bg-white rounded-lg shadow-xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-8">
          <div className="relative w-full md:w-64 h-40 rounded-lg overflow-hidden shrink-0">
            <Image 
              src="https://images.unsplash.com/photo-1543702404-38c2035462ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
              alt="Live Stream" 
              fill 
              className="object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
              <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center text-teal-600">
                <FaPlay className="ml-1" />
              </div>
            </div>
          </div>
          <div className="flex-grow text-center md:text-left">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Join the Sabbath Live Stream</h3>
            <p className="text-slate-500 mb-6">Every Saturday at 09:00 AM. Worship with us from anywhere.</p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <Link href="https://www.facebook.com/emmasdalesda" target="_blank" className="px-6 py-2.5 bg-teal-500 hover:bg-teal-600 text-white font-medium rounded transition-colors">
                Watch Live
              </Link>
              <Link href="/media" className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded transition-colors">
                Past Messages
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* THE WEEK WITH US - New Section */}
      <section className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-teal-600 tracking-wider uppercase mb-2">Connect With Us</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900">The Week with Us</h3>
            <p className="text-slate-500 mt-4 max-w-2xl mx-auto">Church isn't just for Sabbath. Join us throughout the week for prayer, study, and community.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
              <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-6">
                <FaPrayingHands className="text-xl" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-2">Mid-Week Prayer</h4>
              <p className="text-slate-500 mb-4">Recharge your spiritual batteries with our mid-week prayer and testimony service.</p>
              <p className="text-sm font-bold text-indigo-600">Wednesdays @ 5:30 PM</p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
              <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mb-6">
                <FaUsers className="text-xl" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-2">Vespers Service</h4>
              <p className="text-slate-500 mb-4">Welcome the Sabbath hours together with song, praise, and a short message.</p>
              <p className="text-sm font-bold text-amber-600">Fridays @ 5:30 PM</p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
              <div className="w-12 h-12 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mb-6">
                <FaBook className="text-xl" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-2">Adventist Youth (AY)</h4>
              <p className="text-slate-500 mb-4">Interactive programs, Bible games, and discussions designed for youth and young adults.</p>
              <p className="text-sm font-bold text-teal-600">Sabbaths @ 3:30 PM</p>
            </div>
          </div>
        </div>
      </section>

      {/* MINISTRIES SECTION */}
      <section className="py-24 max-w-7xl w-[90%] mx-auto">
        <div className="text-center mb-16 flex flex-col items-center">
          <p className="text-teal-600 font-bold tracking-wider uppercase text-sm mb-2">Our Ministries</p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 max-w-2xl">
            We Love Serving Our Local Community
          </h2>
          <p className="text-slate-500 mt-4 max-w-2xl">
            We have several ministries, clubs and associations to help you grow in your spiritual journey as well as serve the community around us.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { icon: FaUsers, title: "Connect Groups", desc: "Find a community where you can feel at home and grow together." },
            { icon: FaChild, title: "Children's Ministry", desc: "Leading the little ones to discover Jesus in a fun, safe environment." },
            { icon: FaHeartbeat, title: "Health & Wellness", desc: "Discover tips and resources for a healthier, balanced lifestyle." },
            { icon: FaPrayingHands, title: "Prayer Ministry", desc: "Join us as we intercede for our community and each other." },
            { icon: FaBook, title: "Sabbath School", desc: "Deep dive into the Word of God every week with structured lessons." },
            { icon: FaPlay, title: "Media & Tech", desc: "Helping spread the gospel through digital platforms and sound." },
          ].map((min, idx) => (
            <div key={idx} className="bg-white p-8 rounded-lg shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-lg flex items-center justify-center mb-6">
                <min.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{min.title}</h3>
              <p className="text-slate-500">{min.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* THEME SECTION (Dark Blue) */}
      <section className="bg-slate-900 text-white py-20">
        <div className="max-w-7xl w-[90%] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center text-center md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <p className="text-teal-400 font-bold tracking-wider uppercase text-sm mb-4">2024 Theme</p>
            <h2 className="text-4xl font-bold mb-6">Anchored In Hope</h2>
            <p className="text-slate-300 mb-8 leading-relaxed text-lg italic">
              "This hope we have as an anchor of the soul, both sure and steadfast, and which enters the Presence behind the veil." — Hebrews 6:19
            </p>
            <p className="text-slate-400 mb-8">
              Join us this year as we dive deeper into what it means to be firmly anchored in Christ, regardless of the storms we face.
            </p>
            <Link href="/about" className="px-8 py-3.5 bg-teal-500 hover:bg-teal-400 text-white font-semibold rounded transition-colors inline-block">
              Read Our Beliefs
            </Link>
          </div>
          <div className="relative h-[500px] rounded-lg overflow-hidden border-4 border-slate-800">
            <Image 
              src="https://res.cloudinary.com/dw82gpxt3/image/upload/v1664103138/emmsadale-church/photo-1664103120340_ulej6e.jpg" 
              alt="Pastor" 
              fill 
              className="object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900 to-transparent p-6 pt-20">
              <h4 className="text-xl font-bold">Church Leadership</h4>
              <p className="text-teal-400">Guiding our congregation</p>
            </div>
          </div>
        </div>
      </section>

      {/* HEALTH & WELLNESS (DYNAMIC) */}
      {healthPosts && healthPosts.length > 0 && (
        <section className="py-24 bg-white">
          <div className="max-w-7xl w-[90%] mx-auto">
            <div className="flex flex-col items-center text-center mb-12">
              <p className="text-teal-600 font-bold tracking-wider uppercase text-sm mb-2">Healthy Living</p>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Latest Health Tips</h2>
              <Link href="/health" className="text-teal-600 font-semibold hover:text-teal-700 flex items-center gap-2">
                View All Tips &rarr;
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {healthPosts.slice(0, 3).map((post: any) => (
                <div key={post._id} className="bg-slate-50 rounded-xl overflow-hidden border border-slate-100 group">
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image 
                      src={post.healthPhoto || "https://images.unsplash.com/photo-1494390248081-4e521a5940db?auto=format&fit=crop&w=600&q=80"} 
                      alt={post.healthTitle || "Health Tip"} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2">{post.healthTitle}</h3>
                    <p className="text-slate-500 line-clamp-3 mb-4 text-sm">{post.healthDesc}</p>
                    <Link href={`/health/${post._id}`} className="text-teal-600 font-medium text-sm hover:underline">
                      Read More
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* LATEST NEWS / BLOG SECTION (DYNAMIC) */}
      {posts && posts.length > 0 && (
        <section className="py-24 bg-slate-50 border-t border-slate-200">
          <div className="max-w-7xl w-[90%] mx-auto">
            <div className="flex flex-col items-center text-center mb-12">
              <p className="text-amber-500 font-bold tracking-wider uppercase text-sm mb-2">Stay Updated</p>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Latest News & Announcements</h2>
              <Link href="/posts" className="text-amber-600 font-semibold hover:text-amber-700 flex items-center gap-2">
                Read All News &rarr;
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {posts.slice(0, 3).map((post: any) => (
                <div key={post._id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
                  <div className="relative h-56 w-full overflow-hidden">
                    <Image 
                      src={post.postPhoto || "https://images.unsplash.com/photo-1438283173091-5dbf5c5a3206?auto=format&fit=crop&w=600&q=80"} 
                      alt={post.postTitle || "News"} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-8">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                      {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                    <h3 className="text-2xl font-bold text-slate-900 mb-4 line-clamp-2 leading-tight">{post.postTitle}</h3>
                    <p className="text-slate-600 line-clamp-3 mb-6">{post.postDesc}</p>
                    <Link href={`/posts/${post._id}`} className="inline-block px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg transition-colors text-sm">
                      Read Full Story
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CORE SPIRITUAL LIFE SECTION (Prayer, Bible, Tithing, Sabbath School) */}
      <section className="py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl w-[90%] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
            
            {/* 1. PRAYER REQUEST */}
            <Link href="/contact" className="relative rounded-2xl overflow-hidden group cursor-pointer block min-h-[350px] shadow-sm hover:shadow-xl transition-all">
              <Image src="https://images.unsplash.com/photo-1529070538774-1843cb3265df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Prayer Request" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-slate-900/60 flex flex-col items-center justify-center p-8 text-center group-hover:bg-slate-900/40 transition-colors">
                <FaPrayingHands className="text-white/80 text-6xl mb-6" />
                <h4 className="text-white font-bold text-4xl tracking-wide mb-4">Need Prayer?</h4>
                <p className="text-slate-200 font-medium text-lg">Submit a request to our intercessory team &rarr;</p>
              </div>
            </Link>

            {/* 2. BIBLE READING (PODCAST) */}
            {latestPodcast ? (
              <div className="bg-white rounded-2xl p-8 lg:p-10 font-sans shadow-sm border border-slate-100 hover:shadow-md transition-shadow flex flex-col justify-center min-h-[350px]">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-teal-100 text-teal-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Bible Plan</span>
                  <p className="text-gray-400 text-sm font-semibold tracking-wider uppercase">{latestPodcast.date}</p>
                </div>
                <h4 className="text-3xl text-gray-800 font-bold mb-6">{latestPodcast.title}</h4>
                
                <div 
                  className="text-[#45c3bc] font-bold text-sm tracking-widest mb-8 leading-relaxed uppercase [&>a]:text-[#45c3bc] hover:[&>a]:text-teal-400 [&>a]:transition-colors"
                  dangerouslySetInnerHTML={{ __html: latestPodcast.readingPlanHTML }}
                />

                <div className="mt-auto">
                  <AudioPlayer 
                    audioUrl={latestPodcast.audioUrl} 
                    title={latestPodcast.title} 
                    author={latestPodcast.author} 
                  />
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-8 lg:p-10 font-sans shadow-sm border border-slate-100 flex flex-col justify-center items-center text-center min-h-[350px]">
                 <FaBook className="text-slate-300 text-6xl mb-6" />
                 <h4 className="text-2xl text-slate-500 font-bold">1 Year Bible Plan</h4>
                 <p className="text-slate-400 mt-2">Loading today's reading...</p>
              </div>
            )}

            {/* 3. TITHES & OFFERINGS */}
            <div className="bg-teal-600 rounded-2xl p-8 lg:p-10 text-white relative overflow-hidden shadow-xl hover:shadow-2xl transition-shadow flex flex-col justify-center min-h-[350px]">
              <div className="relative z-10">
                <h4 className="text-4xl font-bold mb-6">Tithes & Offerings</h4>
                <p className="text-teal-100 text-xl max-w-md leading-relaxed mb-10">
                  "Bring the whole tithe into the storehouse, that there may be food in my house." <br/><br/>— Malachi 3:10
                </p>
                <Link href="/give" className="inline-block px-10 py-5 bg-white text-teal-700 hover:bg-slate-50 text-lg font-bold rounded-xl transition-colors whitespace-nowrap shadow-lg">
                  Ways to Give
                </Link>
              </div>
              <FaHeartbeat className="absolute -right-8 -bottom-12 text-9xl text-teal-700 opacity-30 transform -rotate-12" />
            </div>

            {/* 4. SABBATH SCHOOL */}
            <div className="bg-slate-900 rounded-2xl p-8 lg:p-10 text-white shadow-xl hover:shadow-2xl transition-shadow border border-slate-800 relative group flex flex-col items-center justify-center text-center min-h-[350px]">
              <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center mb-8 text-teal-400 shadow-inner">
                <FaBook className="text-5xl" />
              </div>
              <h3 className="text-4xl font-bold mb-6">Sabbath School Lesson</h3>
              <p className="text-slate-400 text-xl max-w-md mb-10">
                Access the official interactive Adult Bible Study Guide and daily readings.
              </p>
              <Link 
                href="https://sabbath-school.adventech.io/" 
                target="_blank"
                className="px-10 py-5 bg-teal-500 hover:bg-teal-400 text-slate-900 text-lg font-bold rounded-xl transition-all flex items-center gap-3 shadow-lg transform hover:-translate-y-1 duration-200"
              >
                Open Today's Lesson <FaQuoteRight className="text-sm opacity-70" />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* EVENTS SECTION - ITS OWN DEDICATED FULL-WIDTH SECTION NOW */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl w-[90%] mx-auto">
        
        {/* BULLETIN */}
        <div className="bg-slate-100 rounded-2xl p-8 md:p-12 mb-20 flex flex-col md:flex-row items-center justify-between gap-8 border border-slate-200">
          <div>
            <h4 className="text-3xl font-bold text-slate-900 mb-3">Weekly Bulletin</h4>
            <p className="text-slate-500 text-lg">Stay updated with the latest church announcements and schedules.</p>
          </div>
          {bulletingPdf ? (
            <a href={bulletingPdf} target="_blank" rel="noopener noreferrer" className="px-10 py-5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-lg rounded-xl transition-colors whitespace-nowrap shadow-lg">
              Download PDF
            </a>
          ) : (
            <span className="text-slate-400 italic">Not available</span>
          )}
        </div>

        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center">
          <p className="text-teal-600 font-bold tracking-wider uppercase text-sm mb-4">Join Us</p>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Upcoming Programs</h2>
          <p className="text-slate-500 text-lg leading-relaxed">
            Get involved in our church community. Mark your calendars for these upcoming events and gatherings.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {events && events.length > 0 ? (
            events.slice(0, 4).map((event: any) => (
              <div key={event._id} className="flex flex-col sm:flex-row gap-6 p-6 md:p-8 rounded-2xl border border-slate-100 bg-slate-50 hover:shadow-md hover:border-teal-100 transition-all group">
                <div className="flex flex-col items-center justify-center bg-white border border-slate-200 rounded-xl p-4 min-w-[110px] shrink-0 text-center group-hover:border-teal-200 transition-colors">
                  <FaCalendarAlt className="text-teal-600 text-3xl mb-2" />
                  <span className="text-slate-600 text-xs font-bold uppercase tracking-wider">{event.eventMonth || 'Event'}</span>
                </div>
                <div className="flex flex-col justify-center">
                  <h4 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-teal-700 transition-colors">{event.eventTitle || event.eventName}</h4>
                  <div className="flex flex-col gap-2 text-sm text-slate-500">
                    <span className="flex items-center gap-3"><FaClock className="text-teal-500 text-base"/> {event.time || event.eventTime}</span>
                    <span className="flex items-center gap-3"><FaMapMarkerAlt className="text-teal-500 text-base"/> {event.venue || event.eventVenue}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-1 md:col-span-2 p-12 rounded-2xl border border-slate-100 bg-slate-50 text-slate-500 text-center text-lg">
              No upcoming events scheduled at the moment.
            </div>
          )}
        </div>
        
        <div className="mt-16 text-center">
            <Link href="/events" className="inline-block px-10 py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-colors shadow-lg hover:shadow-xl">
              View Full Calendar
            </Link>
          </div>
        </div>
      </section>
      </main>
  );
}
