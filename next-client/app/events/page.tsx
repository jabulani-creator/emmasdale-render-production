import type { Metadata } from "next";
import Link from "next/link";
import { EventTicketList } from "../../components/EVENTS/EventTicketList";

export const metadata: Metadata = {
  title: "Events & calendar",
  description: "Upcoming services, programs, and gatherings at Emmasdale SDA Church.",
};

async function getEventsPageData() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
  const [eventsRes, pdfRes] = await Promise.all([
    fetch(`${baseUrl}/events`, { next: { revalidate: 3600 } }).catch(() => null),
    fetch(`${baseUrl}/pdf`, { next: { revalidate: 3600 } }).catch(() => null),
  ]);

  const eventsData = eventsRes?.ok ? await eventsRes.json() : { events: [] };
  const pdfData = pdfRes?.ok ? await pdfRes.json() : { upload: { pdf: "" } };

  return {
    events: eventsData.events || [],
    bulletingPdf: pdfData.upload?.pdf || "",
  };
}

export default async function EventsPage() {
  const { events, bulletingPdf } = await getEventsPageData();

  return (
    <main className="min-h-screen bg-stone-100 font-sans">
      <section className="relative overflow-hidden border-b border-stone-200 bg-stone-900 px-4 pb-20 pt-28 text-white sm:px-6 lg:px-8 lg:pb-28 lg:pt-32">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-4xl text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-amber-400/90">Gather with us</p>
          <h1 className="mt-4 font-serif text-4xl font-semibold tracking-tight sm:text-5xl lg:text-[3.25rem] lg:leading-tight">
            Events &amp; calendar
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-stone-300 sm:text-lg">
            Worship services, Sabbath programs, and special occasions. Save the date and plan your visit—we would love to see you.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
            <Link
              href="/plan-your-visit"
              className="inline-flex h-12 min-w-[200px] items-center justify-center rounded-sm bg-amber-500 px-8 text-sm font-bold text-stone-950 transition-colors hover:bg-amber-400"
            >
              Plan your visit
            </Link>
            <Link
              href="/contact"
              className="text-sm font-semibold text-stone-200 underline decoration-stone-500 underline-offset-4 hover:text-white"
            >
              Ask a question
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mb-10 flex flex-col gap-6 rounded-xl border border-stone-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <h2 className="font-display text-xl font-semibold text-stone-900 md:text-2xl">Weekly bulletin</h2>
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
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-amber-900/70">Full list</p>
            <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-stone-900 md:text-3xl">
              All upcoming events
            </h2>
            <p className="mt-2 text-sm text-stone-600 md:text-base">
              Every item we have on the calendar right now.
            </p>
          </div>

          <div className="border-b border-amber-200/60 bg-amber-50 px-6 py-4 md:px-10">
            <p className="text-sm text-stone-800">
              <span className="font-semibold text-amber-950">Featured:</span>{" "}
              <Link
                href="/events/singles-unplugged"
                className="font-semibold text-amber-900 underline decoration-amber-700/50 underline-offset-2 hover:text-amber-950"
              >
                Singles Unplugged — 2 May 2026
              </Link>
              <span className="text-stone-600"> · Invitation &amp; seat reservation</span>
            </p>
          </div>

          <EventTicketList events={events} ctaStyle="detail" />
        </div>

        <div className="mt-12 rounded-xl border border-stone-200 bg-stone-50 px-6 py-10 text-center md:px-12">
          <p className="font-display text-xl font-semibold text-stone-900 md:text-2xl">First time visiting?</p>
          <p className="mx-auto mt-2 max-w-xl text-sm text-stone-600 md:text-base">
            We will help you find parking, Sabbath school, and a seat. Reach out anytime.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/plan-your-visit"
              className="inline-flex h-11 items-center justify-center rounded-sm bg-amber-900 px-8 text-sm font-semibold text-white transition-colors hover:bg-amber-950"
            >
              Plan your visit
            </Link>
            <Link
              href="/"
              className="text-sm font-medium text-stone-700 underline decoration-stone-300 underline-offset-4 hover:text-stone-900"
            >
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
