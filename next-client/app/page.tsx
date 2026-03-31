import React from "react";
import Link from "next/link";
import Image from "next/image";
import Parser from "rss-parser";
import { FaPlay, FaPrayingHands, FaHeartbeat, FaChild, FaUsers, FaBook, FaMapMarkerAlt, FaClock, FaQuoteRight, FaArrowRight, FaBullseye, FaEye, FaHeart, FaFacebook, FaYoutube, FaInstagram } from "react-icons/fa";
import AudioPlayer from "../components/HOME/podcast/AudioPlayer";
import { EventTicketList } from "../components/EVENTS/EventTicketList";

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
  const { events, healthPosts, bulletingPdf, latestPodcast, posts } = await getHomeData();

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
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight max-w-4xl mx-auto drop-shadow-lg tracking-tight">
            Emmasdale <span className="text-amber-400">SDA</span> Church
          </h1>
          <p className="text-lg md:text-2xl text-slate-200 mb-8 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
            The perfect place for people who are not. Whatever you have been through, this is the right place to grow in Christ&apos;s love.
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
            <h3 className="font-display text-2xl font-bold text-slate-900 mb-2 tracking-tight">Join the Sabbath Live Stream</h3>
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

      {/* When we gather — replaces separate “stats” bar (same times, one place) */}
      <section className="relative overflow-hidden border-y border-slate-800 bg-slate-950 py-20 md:py-28 text-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(20,184,166,0.25),transparent)]" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-teal-400">This week</p>
            <h2 className="font-display text-3xl font-extrabold tracking-tight md:text-5xl">Rhythm of gathering</h2>
            <p className="mt-4 text-slate-400 leading-relaxed">
              Sabbath is our anchor—these mid-week and weekend touchpoints help you stay connected all week long.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
            <div className="group flex flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-sm transition-colors hover:border-teal-500/40 hover:bg-white/[0.07]">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-300">
                <FaPrayingHands className="text-xl" aria-hidden />
              </div>
              <p className="font-display text-4xl font-extrabold tracking-tight text-white md:text-5xl">5:30 PM</p>
              <p className="mt-1 text-sm font-semibold uppercase tracking-wider text-indigo-300">Wednesdays</p>
              <h3 className="mt-4 font-display text-xl font-bold text-white">Mid-week prayer</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                Prayer and testimony—recharge mid-week with the family of faith.
              </p>
            </div>
            <div className="group flex flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-sm transition-colors hover:border-amber-500/40 hover:bg-white/[0.07]">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/20 text-amber-300">
                <FaUsers className="text-xl" aria-hidden />
              </div>
              <p className="font-display text-4xl font-extrabold tracking-tight text-white md:text-5xl">5:30 PM</p>
              <p className="mt-1 text-sm font-semibold uppercase tracking-wider text-amber-300">Fridays</p>
              <h3 className="mt-4 font-display text-xl font-bold text-white">Vespers</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                Song, praise, and a short message as we welcome the Sabbath together.
              </p>
            </div>
            <div className="group flex flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-sm transition-colors hover:border-teal-400/40 hover:bg-white/[0.07]">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-teal-500/20 text-teal-300">
                <FaBook className="text-xl" aria-hidden />
              </div>
              <p className="font-display text-4xl font-extrabold tracking-tight text-white md:text-5xl">3:30 PM</p>
              <p className="mt-1 text-sm font-semibold uppercase tracking-wider text-teal-300">Sabbaths</p>
              <h3 className="mt-4 font-display text-xl font-bold text-white">Adventist Youth (AY)</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                Programs, Bible study, and community tailored for youth and young adults.
              </p>
            </div>
          </div>
          <p className="mt-10 text-center text-sm text-slate-500">
            Main worship Saturdays from <span className="font-semibold text-slate-300">8:30 AM</span> ·{" "}
            <Link href="/plan-your-visit" className="text-teal-400 underline-offset-4 hover:underline">
              Plan your first visit
            </Link>
          </p>
        </div>
      </section>

      {/* Mission / Vision / Values — contained cards (no full-bleed color slabs) */}
      <section className="border-y border-slate-200/80 bg-stone-50 py-16 md:py-24" aria-label="Mission, vision, and values">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-10 max-w-2xl text-center md:mb-14">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-teal-700">Who we are</p>
            <h2 className="font-display text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              Mission, vision &amp; values
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 md:text-base">
              Three commitments that shape how we worship, welcome, and walk together.
            </p>
          </div>

          <ul className="flex flex-col gap-5 md:grid md:grid-cols-3 md:gap-6">
            <li className="rounded-2xl border border-slate-200/90 bg-white p-7 shadow-sm md:p-8 border-l-[3px] border-l-teal-600">
              <div className="mb-5 flex items-center gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-700 ring-1 ring-teal-100">
                  <FaBullseye className="text-lg" aria-hidden />
                </span>
                <h3 className="font-display text-left text-xl font-bold tracking-tight text-slate-900">Mission</h3>
              </div>
              <p className="text-left text-[15px] leading-relaxed text-slate-600">
                To lift up Jesus Christ and proclaim the everlasting gospel—inviting every person into worship, discipleship, and service in our community.
              </p>
            </li>
            <li className="rounded-2xl border border-slate-200/90 bg-white p-7 shadow-sm md:p-8 border-l-[3px] border-l-slate-700">
              <div className="mb-5 flex items-center gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700 ring-1 ring-slate-200/80">
                  <FaEye className="text-lg" aria-hidden />
                </span>
                <h3 className="font-display text-left text-xl font-bold tracking-tight text-slate-900">Vision</h3>
              </div>
              <p className="text-left text-[15px] leading-relaxed text-slate-600">
                A Christ-centered church family growing in faith, reflecting God&apos;s love in Emmasdale and beyond—rooted in hope and anchored in Scripture.
              </p>
            </li>
            <li className="rounded-2xl border border-slate-200/90 bg-white p-7 shadow-sm md:p-8 border-l-[3px] border-l-amber-600">
              <div className="mb-5 flex items-center gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-800 ring-1 ring-amber-100">
                  <FaHeart className="text-lg" aria-hidden />
                </span>
                <h3 className="font-display text-left text-xl font-bold tracking-tight text-slate-900">Values</h3>
              </div>
              <p className="text-left text-[15px] leading-relaxed text-slate-600">
                Biblical truth, warm hospitality, prayerful dependence on God, and practical compassion for neighbors and newcomers alike.
              </p>
            </li>
          </ul>
        </div>
      </section>

      {/* Spiritual life — prayer, Bible plan, giving, Sabbath School */}
      <section className="border-y border-slate-200 bg-white py-16 md:py-24">
        <div className="mx-auto mb-12 max-w-3xl px-4 text-center sm:px-6">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-teal-700">Grow with us</p>
          <h2 className="font-display text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">Prayer, Scripture &amp; stewardship</h2>
          <p className="mt-3 text-slate-600">
            Practical ways to connect with God and the church family this week.
          </p>
        </div>
        <div className="max-w-7xl w-[90%] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
            <Link href="/contact" className="relative rounded-2xl overflow-hidden group cursor-pointer block min-h-[350px] shadow-sm hover:shadow-xl transition-all">
              <Image src="https://images.unsplash.com/photo-1529070538774-1843cb3265df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Prayer Request" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-slate-900/60 flex flex-col items-center justify-center p-8 text-center group-hover:bg-slate-900/40 transition-colors">
                <FaPrayingHands className="text-white/80 text-6xl mb-6" />
                <h4 className="text-white font-bold text-4xl tracking-wide mb-4">Need Prayer?</h4>
                <p className="text-slate-200 font-medium text-lg">Submit a request to our intercessory team &rarr;</p>
              </div>
            </Link>

            {latestPodcast ? (
              <div className="bg-slate-50 rounded-2xl p-8 lg:p-10 font-sans shadow-sm border border-slate-200 hover:border-slate-300 transition-colors flex flex-col justify-center min-h-[350px]">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-teal-100 text-teal-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Bible Plan</span>
                  <p className="text-slate-500 text-sm font-semibold tracking-wider uppercase">{latestPodcast.date}</p>
                </div>
                <h4 className="text-2xl md:text-3xl text-slate-900 font-bold mb-6 leading-tight">{latestPodcast.title}</h4>
                <div
                  className="text-teal-700 font-bold text-sm tracking-wide mb-8 leading-relaxed uppercase [&>a]:text-teal-700 hover:[&>a]:text-teal-600 [&>a]:transition-colors"
                  dangerouslySetInnerHTML={{ __html: latestPodcast.readingPlanHTML }}
                />
                <div className="mt-auto">
                  <AudioPlayer audioUrl={latestPodcast.audioUrl} title={latestPodcast.title} author={latestPodcast.author} />
                </div>
              </div>
            ) : (
              <div className="bg-slate-50 rounded-2xl p-8 lg:p-10 font-sans shadow-sm border border-slate-200 flex flex-col justify-center items-center text-center min-h-[350px]">
                <FaBook className="text-slate-300 text-6xl mb-6" />
                <h4 className="text-2xl text-slate-500 font-bold">1 Year Bible Plan</h4>
                <p className="text-slate-400 mt-2">Loading today&apos;s reading...</p>
              </div>
            )}

            <div className="bg-teal-700 rounded-2xl p-8 lg:p-10 text-white relative overflow-hidden shadow-lg flex flex-col justify-center min-h-[350px]">
              <div className="relative z-10">
                <h4 className="font-display text-3xl font-bold mb-6">Tithes &amp; offerings</h4>
                <p className="text-teal-100 text-lg max-w-md leading-relaxed mb-10">
                  &ldquo;Bring the whole tithe into the storehouse, that there may be food in my house.&rdquo; <br /><br />— Malachi 3:10
                </p>
                <Link href="/give" className="inline-block px-8 py-4 bg-white text-teal-800 hover:bg-slate-50 text-base font-bold rounded-lg transition-colors shadow-md">
                  Ways to give
                </Link>
              </div>
              <FaHeartbeat className="absolute -right-8 -bottom-12 text-9xl text-teal-800/40 transform -rotate-12" aria-hidden />
            </div>

            <div className="bg-slate-900 rounded-2xl p-8 lg:p-10 text-white shadow-lg border border-slate-800 flex flex-col items-center justify-center text-center min-h-[350px]">
              <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mb-6 text-teal-400">
                <FaBook className="text-4xl" />
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-bold mb-4">Sabbath School lesson</h3>
              <p className="text-slate-400 text-lg max-w-md mb-8">
                Official Adult Bible Study Guide and daily readings.
              </p>
              <Link
                href="https://sabbath-school.adventech.io/"
                target="_blank"
                className="px-8 py-4 bg-teal-500 hover:bg-teal-400 text-slate-900 text-base font-bold rounded-lg transition-all inline-flex items-center gap-2 shadow-md"
              >
                Open today&apos;s lesson <FaQuoteRight className="text-sm opacity-70" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Bulletin & events — ticket-style layout (inspired by event / theatre UI) */}
      <section className="py-16 md:py-24 bg-stone-100">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col gap-6 rounded-xl border border-stone-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div>
              <h3 className="font-display text-xl font-semibold text-stone-900 md:text-2xl">Weekly bulletin</h3>
              <p className="mt-1 text-sm text-stone-600">Announcements and schedule (PDF).</p>
            </div>
            {bulletingPdf ? (
              <a
                href={bulletingPdf}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 shrink-0 items-center justify-center rounded-sm bg-stone-900 px-6 text-sm font-semibold text-white transition-colors hover:bg-stone-800"
              >
                Download PDF
              </a>
            ) : (
              <span className="text-sm text-stone-400">Not available</span>
            )}
          </div>

          <div className="overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm">
            <div className="border-b border-stone-200 px-6 py-8 md:px-10 md:py-9">
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-amber-900/70">Calendar</p>
              <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-stone-900 md:text-3xl">Upcoming events</h2>
              <p className="mt-2 text-sm text-stone-600 md:text-base">Services, programs, and special gatherings.</p>
            </div>

            <EventTicketList events={events || []} limit={8} ctaStyle="teaser" />

            <div className="border-t border-stone-100 bg-stone-50/80 px-6 py-5 text-center md:px-10">
              <Link
                href="/events"
                className="text-sm font-semibold text-stone-800 underline-offset-4 hover:text-stone-950 hover:underline"
              >
                View full calendar
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Ministries — bento-style (not six identical white cards) */}
      <section className="border-y border-slate-200 bg-slate-100 py-20 md:py-28">
        <div className="max-w-7xl w-[90%] mx-auto">
          <div className="mb-12 flex flex-col justify-between gap-8 lg:mb-16 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-teal-600">Ministries</p>
              <h2 className="font-display text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">Find your place to grow &amp; serve</h2>
              <p className="mt-4 text-lg leading-relaxed text-slate-600">
                Teams for every age and interest—fellowship, teaching, care, and reaching our city. Start here, then meet leaders on the ministries page.
              </p>
            </div>
            <Link
              href="/ministries"
              className="inline-flex min-h-[48px] shrink-0 items-center justify-center gap-2 rounded-full border-2 border-slate-900 px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-slate-900 transition-colors hover:bg-slate-900 hover:text-white"
            >
              All ministries <FaArrowRight className="text-xs" aria-hidden />
            </Link>
          </div>

          <div className="flex flex-col gap-4 lg:flex-row lg:items-stretch">
            <Link
              href="/ministries"
              className="group relative flex min-h-[300px] flex-col justify-end overflow-hidden rounded-2xl p-8 text-white shadow-xl transition-transform hover:-translate-y-0.5 lg:min-h-[420px] lg:w-[42%]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-teal-600 via-teal-800 to-slate-950" aria-hidden />
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=900&q=80')] bg-cover bg-center opacity-25 mix-blend-overlay transition-opacity group-hover:opacity-35" aria-hidden />
              <div className="relative">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                  <FaUsers className="text-2xl" aria-hidden />
                </div>
                <h3 className="font-display text-2xl font-bold md:text-3xl">Connect groups</h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-teal-50/95">
                  Find a smaller circle where you belong—study, meals, and real friendship.
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-amber-300">
                  Explore <FaArrowRight className="text-xs" aria-hidden />
                </span>
              </div>
            </Link>

            <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                { icon: FaChild, title: "Children", desc: "Jesus-centered programs in a safe, joyful environment.", tint: "from-amber-500/90 to-orange-700/95" },
                { icon: FaHeartbeat, title: "Health & wellness", desc: "Whole-person health that honors body and spirit.", tint: "from-emerald-600/90 to-teal-900/95" },
                { icon: FaPrayingHands, title: "Prayer", desc: "Intercession for our church family and neighbors.", tint: "from-indigo-600/90 to-slate-900/95" },
                { icon: FaBook, title: "Sabbath School", desc: "Weekly Bible study for every age group.", tint: "from-slate-600/90 to-slate-950/95" },
                { icon: FaPlay, title: "Media & tech", desc: "Sound, streaming, and creative communication.", tint: "from-cyan-600/90 to-slate-900/95" },
              ].map((m, i, arr) => (
                <Link
                  key={m.title}
                  href="/ministries"
                  className={`group relative flex min-h-[160px] flex-col justify-end overflow-hidden rounded-2xl p-6 text-white shadow-md transition-transform hover:-translate-y-0.5 sm:min-h-[180px] ${i === arr.length - 1 ? "sm:col-span-2" : ""}`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${m.tint}`} aria-hidden />
                  <div className="absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100 bg-white/10" aria-hidden />
                  <div className="relative flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white/20 backdrop-blur-sm">
                      <m.icon className="text-lg" aria-hidden />
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-display text-lg font-bold leading-tight">{m.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-white/85">{m.desc}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* THEME SECTION (Dark Blue) */}
      <section className="bg-slate-900 text-white py-20">
        <div className="max-w-7xl w-[90%] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center text-center md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <p className="text-teal-400 font-bold tracking-wider uppercase text-sm mb-4">2024 Theme</p>
            <h2 className="font-display text-4xl font-bold mb-6 tracking-tight">Anchored In Hope</h2>
            <p className="text-slate-300 mb-8 leading-relaxed text-lg italic">
              &ldquo;This hope we have as an anchor of the soul, both sure and steadfast, and which enters the Presence behind the veil.&rdquo; — Hebrews 6:19
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
              <h2 className="font-display text-3xl font-bold text-slate-900 mb-4 tracking-tight">Latest Health Tips</h2>
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

      {/* Latest news & articles — placed lower on the page */}
      {posts && posts.length > 0 && (
        <section className="border-t border-slate-200 bg-slate-50 py-16 md:py-24">
          <div className="max-w-7xl w-[90%] mx-auto">
            <div className="mb-10 flex flex-col gap-4 text-center sm:flex-row sm:items-end sm:justify-between sm:text-left">
              <div>
                <p className="text-amber-600 font-bold tracking-wider uppercase text-xs mb-2">From the church</p>
                <h2 className="font-display text-2xl font-semibold text-slate-900 md:text-3xl tracking-tight">News &amp; articles</h2>
              </div>
              <Link href="/posts" className="text-sm font-semibold text-teal-700 hover:text-teal-800 shrink-0">
                View all posts →
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
              {posts.slice(0, 3).map((post: any) => (
                <article key={post._id} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md">
                  <div className="relative h-48 w-full">
                    <Image
                      src={post.postPhoto || "https://images.unsplash.com/photo-1438283173091-5dbf5c5a3206?auto=format&fit=crop&w=600&q=80"}
                      alt={post.postTitle || "News article"}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <time className="text-xs font-medium text-slate-500">
                      {new Date(post.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                    </time>
                    <h3 className="font-display mt-2 text-lg font-semibold leading-snug text-slate-900 line-clamp-2">{post.postTitle}</h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-600">{post.postDesc}</p>
                    <Link href={`/posts/${post._id}`} className="mt-4 inline-block text-sm font-semibold text-teal-700 hover:text-teal-800">
                      Continue reading
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter */}
      <section className="border-t border-slate-200 bg-white py-16 md:py-20">
        <div className="max-w-2xl mx-auto w-[90%] px-4 text-center">
          <h2 className="font-display text-2xl md:text-3xl font-extrabold text-slate-900 uppercase tracking-tight mb-3">
            Subscribe to updates
          </h2>
          <p className="text-slate-600 mb-8 leading-relaxed">
            Get occasional news and announcements by reaching out through our contact form—we&apos;ll add you to the list our clerk maintains.
          </p>
          <Link
            href="/contact"
            className="inline-flex min-h-[48px] items-center justify-center px-10 py-4 bg-red-600 hover:bg-red-700 text-white font-bold uppercase tracking-wide text-sm rounded-sm shadow-md transition-colors sm:text-base"
          >
            Request email updates
          </Link>
        </div>
      </section>

      {/* Social — join us */}
      <section className="bg-slate-900 py-16 md:py-20 text-white">
        <div className="max-w-3xl mx-auto w-[90%] px-4 text-center">
          <h2 className="font-display text-2xl md:text-4xl font-extrabold uppercase tracking-tight mb-4">Join us online</h2>
          <p className="text-slate-400 mb-10 leading-relaxed">
            Follow worship streams, highlights, and community life on our social channels.
          </p>
          <ul className="mx-auto flex max-w-md flex-col gap-4 text-left sm:max-w-lg">
            <li>
              <a
                href="https://www.facebook.com/emmasdalesda"
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-[52px] items-center justify-between gap-4 rounded-lg border border-slate-700 bg-slate-800/50 px-5 py-3 transition-colors hover:border-teal-500/50 hover:bg-slate-800"
              >
                <span className="flex items-center gap-3 font-semibold text-slate-100">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-700 text-white">
                    <FaFacebook className="text-lg" aria-hidden />
                  </span>
                  Facebook
                </span>
                <span className="text-sm font-bold uppercase tracking-wide text-red-500">Follow</span>
              </a>
            </li>
            <li>
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-[52px] items-center justify-between gap-4 rounded-lg border border-slate-700 bg-slate-800/50 px-5 py-3 transition-colors hover:border-teal-500/50 hover:bg-slate-800"
              >
                <span className="flex items-center gap-3 font-semibold text-slate-100">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-700 text-white">
                    <FaYoutube className="text-lg" aria-hidden />
                  </span>
                  YouTube
                </span>
                <span className="text-sm font-bold uppercase tracking-wide text-red-500">Subscribe</span>
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-[52px] items-center justify-between gap-4 rounded-lg border border-slate-700 bg-slate-800/50 px-5 py-3 transition-colors hover:border-teal-500/50 hover:bg-slate-800"
              >
                <span className="flex items-center gap-3 font-semibold text-slate-100">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-700 text-white">
                    <FaInstagram className="text-lg" aria-hidden />
                  </span>
                  Instagram
                </span>
                <span className="text-sm font-bold uppercase tracking-wide text-red-500">Follow</span>
              </a>
            </li>
          </ul>
        </div>
      </section>
      </main>
  );
}
