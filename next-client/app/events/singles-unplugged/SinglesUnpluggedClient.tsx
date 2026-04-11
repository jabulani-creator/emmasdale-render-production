"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import {
  FaChevronDown,
  FaChevronUp,
  FaMapMarkerAlt,
  FaMobileAlt,
  FaRegCalendarAlt,
  FaRegClock,
  FaTshirt,
  FaWhatsapp,
} from "react-icons/fa";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
const TOTAL_SEATS = 100;
const SEAT_POLL_MS = 15000;
const WHATSAPP_DIGITS = process.env.NEXT_PUBLIC_SINGLES_EVENT_WHATSAPP || "260972975737";
const CHURCH_PHONE_DISPLAY = "+260 972 975 737";

const EVENT_START_MS = new Date("2026-05-02T18:00:00+02:00").getTime();

const MAP_EMBED =
  "https://www.google.com/maps?q=Honeycomb+Junction+14+Miles+Great+North+Road+Lusaka+Zambia&output=embed";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1920&q=80";

/** Section labels — match site neutrals (events / slate UI) */
const sectionLabel = "font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500";

const CAL_TITLE = "Singles Unplugged — Emmasdale SDA Church";
const CAL_TAGLINE = "Prayerfully Pursuing Purpose and Partnership";
const CAL_LOCATION = "Honeycomb Junction, 14 Miles Great North Road, Lusaka, Zambia";
/** 18:00–21:00 CAT (UTC+2) on 2 May 2026 */
const CAL_GOOGLE_DATES = "20260502T160000Z/20260502T190000Z";
const CAL_OUTLOOK_START = "2026-05-02T16:00:00.000Z";
const CAL_OUTLOOK_END = "2026-05-02T19:00:00.000Z";

function escapeIcsText(text: string): string {
  return text.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/;/g, "\\;").replace(/,/g, "\\,");
}

function formatIcsTimestamp(d: Date): string {
  return d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
}

function buildGoogleCalendarUrl(pageUrl: string): string {
  const details = [CAL_TAGLINE, pageUrl ? `Details & reserve: ${pageUrl}` : "Reserve on the Emmasdale Singles Unplugged page."]
    .filter(Boolean)
    .join("\n\n");
  const p = new URLSearchParams({
    action: "TEMPLATE",
    text: CAL_TITLE,
    dates: CAL_GOOGLE_DATES,
    details,
    location: CAL_LOCATION,
  });
  return `https://calendar.google.com/calendar/render?${p.toString()}`;
}

function buildOutlookWebCalendarUrl(pageUrl: string): string {
  const body = [CAL_TAGLINE, pageUrl].filter(Boolean).join("\n\n");
  const p = new URLSearchParams({
    rru: "addevent",
    subject: CAL_TITLE,
    startdt: CAL_OUTLOOK_START,
    enddt: CAL_OUTLOOK_END,
    location: CAL_LOCATION,
    body,
  });
  return `https://outlook.live.com/calendar/0/deeplink/compose?${p.toString()}`;
}

function buildIcsDocument(pageUrl: string): string {
  const desc = escapeIcsText(`${CAL_TAGLINE}${pageUrl ? ` — ${pageUrl}` : ""}`);
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Emmasdale SDA//Singles Unplugged//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    "UID:singles-unplugged-20260502@emmasdalesda-church",
    `DTSTAMP:${formatIcsTimestamp(new Date())}`,
    "DTSTART:20260502T160000Z",
    "DTEND:20260502T190000Z",
    `SUMMARY:${escapeIcsText(CAL_TITLE)}`,
    `DESCRIPTION:${desc}`,
    `LOCATION:${escapeIcsText(CAL_LOCATION)}`,
    ...(pageUrl.startsWith("http") ? [`URL:${pageUrl.replace(/\r|\n/g, "")}`] : []),
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return lines.join("\r\n");
}

function downloadIcs(pageUrl: string): void {
  const resolved = pageUrl || (typeof window !== "undefined" ? window.location.href : "");
  const ics = buildIcsDocument(resolved);
  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const href = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = href;
  a.download = "singles-unplugged-2026-05-02.ics";
  a.rel = "noopener";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(href);
}

function AddToCalendarBar({
  pageUrl,
  variant,
  className = "",
}: {
  pageUrl: string;
  variant: "hero" | "venue";
  className?: string;
}) {
  const googleHref = buildGoogleCalendarUrl(pageUrl);
  const outlookHref = buildOutlookWebCalendarUrl(pageUrl);
  const linkVenue =
    "font-medium text-slate-800 underline decoration-slate-300 underline-offset-[3px] transition hover:text-teal-800 hover:decoration-teal-500/50";

  if (variant === "venue") {
    return (
      <p className={`text-sm leading-relaxed text-slate-600 ${className}`}>
        <span className="font-sans text-xs font-semibold uppercase tracking-wider text-slate-500">Add to calendar</span>
        <span className="mx-2 text-slate-300" aria-hidden>
          ·
        </span>
        <a href={googleHref} target="_blank" rel="noopener noreferrer" className={linkVenue}>
          Google
        </a>
        <span className="mx-2 text-slate-300">·</span>
        <a href={outlookHref} target="_blank" rel="noopener noreferrer" className={linkVenue}>
          Outlook
        </a>
        <span className="mx-2 text-slate-300">·</span>
        <button type="button" onClick={() => downloadIcs(pageUrl)} className={`${linkVenue} cursor-pointer bg-transparent text-left`}>
          Apple / iCal
        </button>
      </p>
    );
  }

  const outline =
    "inline-flex min-h-[40px] items-center justify-center rounded-lg border border-slate-500/50 bg-transparent px-4 py-2 text-xs font-medium tracking-wide text-slate-200 transition hover:border-teal-400/60 hover:bg-slate-800/50 sm:text-[13px]";

  return (
    <div className={className}>
      <p className="text-center font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400 lg:text-left">
        Save the date
      </p>
      <div className="mt-2.5 flex flex-wrap justify-center gap-2 sm:gap-2.5 lg:justify-start">
        <a href={googleHref} target="_blank" rel="noopener noreferrer" className={outline}>
          Google
        </a>
        <a href={outlookHref} target="_blank" rel="noopener noreferrer" className={outline}>
          Outlook
        </a>
        <button type="button" onClick={() => downloadIcs(pageUrl)} className={outline}>
          Apple / iCal
        </button>
      </div>
    </div>
  );
}

type SeatStats = { remaining: number; total: number; taken: number };

type FormValues = {
  fullName: string;
  phone: string;
  email: string;
  gender: "Male" | "Female";
  ageGroup: "18-24" | "25-32" | "33+";
  dietary: string;
  heardFrom: "Church announcement" | "WhatsApp" | "Friend invitation" | "Poster" | "Other";
  joinWhatsappGroup: "yes" | "no";
  numberOfPeople: "1" | "2";
};

const TOPICS: { title: string; blurb: string }[] = [
  {
    title: "Sexual Awareness",
    blurb: "A grounded, faith-shaped conversation about boundaries, respect, and honouring God with our bodies.",
  },
  {
    title: "Navigating Single-hood",
    blurb: "Practical encouragement for thriving—not just waiting—while you trust God with your story.",
  },
  {
    title: "Confidence and how to position yourself right",
    blurb: "Grow in godly confidence that flows from identity in Christ, not comparison or performance.",
  },
  {
    title: "How to dress and carry yourself when you're searching for a partner",
    blurb: "Modest elegance and authentic presence: representing Christ well in how we show up.",
  },
  {
    title: "When to know the right time to date",
    blurb: "Discernment, prayer, and wise counsel—recognising readiness versus mere longing.",
  },
];

function StatsBar({ remaining, total }: { remaining: number; total: number }) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const left = EVENT_START_MS - now;
  const cells =
    left > 0
      ? (() => {
          const d = Math.floor(left / 86400000);
          const h = Math.floor((left % 86400000) / 3600000);
          const m = Math.floor((left % 3600000) / 60000);
          const s = Math.floor((left % 60000) / 1000);
          return [
            { v: d, l: "Days" },
            { v: h, l: "Hrs" },
            { v: m, l: "Min" },
            { v: s, l: "Sec" },
          ];
        })()
      : [];

  const colTitle = "font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500 sm:text-[11px]";

  return (
    <div id="live-stats" className="bg-slate-50 px-4 py-8 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm">
        <div className="grid grid-cols-1 divide-y divide-slate-200 px-4 py-8 sm:px-6 md:grid-cols-3 md:divide-x md:divide-y-0 md:px-8 md:py-10">
        <div className="pb-8 text-center md:pb-0 md:pr-8 md:text-left">
          <p className={colTitle}>Seats remaining</p>
          <p
            className="font-su-serif mt-3 text-4xl font-medium tabular-nums tracking-tight text-slate-900 sm:text-5xl"
            aria-live="polite"
            aria-atomic="true"
          >
            {remaining}
            <span className="mt-1 block font-sans text-base font-normal text-slate-500 sm:mt-0 sm:ml-2 sm:inline">
              of {total} left
            </span>
          </p>
          <p className="mt-2 font-sans text-xs text-slate-500">Updates when others reserve</p>
        </div>
        <div className="py-8 text-center md:px-8 md:py-0">
          <p className={colTitle}>Contribution</p>
          <p className="font-su-serif mt-3 text-3xl font-medium text-slate-900 sm:text-4xl">K100</p>
          <p className="mt-2 font-sans text-sm leading-relaxed text-slate-600">Per person · Airtel Money on WhatsApp</p>
        </div>
        <div className="pt-8 text-center md:pl-8 md:pt-0 md:text-left">
          <p className={colTitle}>Event begins in</p>
          {left <= 0 ? (
            <p className="mt-4 font-sans text-sm font-medium text-slate-700">We&apos;re live — see you at the venue.</p>
          ) : (
            <div className="mt-4 flex flex-wrap justify-center gap-2 md:justify-start">
              {cells.map(({ v, l }) => (
                <div
                  key={l}
                  className="flex min-w-[3.5rem] flex-col rounded-xl border border-slate-200 bg-slate-50/80 px-2 py-2.5 text-center shadow-sm ring-1 ring-slate-900/[0.04]"
                >
                  <span className="font-su-serif text-2xl font-medium tabular-nums text-slate-900">{v}</span>
                  <span className="font-sans text-[10px] font-medium uppercase tracking-wider text-slate-500">{l}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        </div>
      </div>
    </div>
  );
}

const inputClass =
  "min-h-12 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 font-sans text-[16px] text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 sm:min-h-11 sm:text-[15px]";

const labelClass = "mb-1.5 block font-sans text-sm font-medium text-slate-700";

export function SinglesUnpluggedClient() {
  const router = useRouter();
  const heroRef = useRef<HTMLElement>(null);
  const [showStickyCta, setShowStickyCta] = useState(false);
  const [moreDetailsOpen, setMoreDetailsOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const [seats, setSeats] = useState<SeatStats | null>(null);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormValues>({
    shouldUnregister: false,
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      gender: "Male",
      ageGroup: "25-32",
      dietary: "",
      heardFrom: "Church announcement",
      joinWhatsappGroup: "yes",
      numberOfPeople: "1",
    },
  });

  const numberOfPeople = watch("numberOfPeople");

  useEffect(() => {
    setShareUrl(typeof window !== "undefined" ? window.location.href : "");
  }, []);

  useEffect(() => {
    const el = heroRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([e]) => setShowStickyCta(!e.isIntersecting), {
      root: null,
      rootMargin: "-64px 0px 0px 0px",
      threshold: 0,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const refreshSeats = useCallback(async () => {
    try {
      const { data } = await axios.get<SeatStats>(`${API_BASE}/singles-unplugged/seats`);
      setSeats(data);
    } catch {
      setSeats({ remaining: TOTAL_SEATS, total: TOTAL_SEATS, taken: 0 });
    }
  }, []);

  useEffect(() => {
    void refreshSeats();
  }, [refreshSeats]);

  useEffect(() => {
    const id = setInterval(() => void refreshSeats(), SEAT_POLL_MS);
    return () => clearInterval(id);
  }, [refreshSeats]);

  useEffect(() => {
    const onVis = () => {
      if (typeof document !== "undefined" && document.visibilityState === "visible") void refreshSeats();
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [refreshSeats]);

  const onSubmit = async (values: FormValues) => {
    setSubmitting(true);
    try {
      const payload = {
        fullName: values.fullName.trim(),
        phone: values.phone.trim(),
        email: values.email.trim() || "",
        gender: values.gender,
        ageGroup: values.ageGroup,
        dietary: values.dietary.trim() || "",
        heardFrom: values.heardFrom,
        joinWhatsappGroup: values.joinWhatsappGroup === "yes",
        numberOfPeople: Number(values.numberOfPeople) as 1 | 2,
      };

      const { data } = await axios.post(`${API_BASE}/singles-unplugged/reservations`, payload);
      const rid = (data.reservation as { id?: string })?.id;
      await refreshSeats();
      toast.success("Seat held — follow the steps to pay with Airtel Money.");
      if (rid) {
        router.push(`/events/singles-unplugged/checkout/${rid}`);
      } else {
        toast.error("Reservation saved but checkout link failed. Contact the church office.");
      }
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        const msg = (e.response?.data as { msg?: string })?.msg || "Something went wrong. Please try again.";
        toast.error(msg);
      } else {
        toast.error("Network error. Check your connection and try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const remaining = seats?.remaining ?? TOTAL_SEATS;
  const totalSeats = seats?.total ?? TOTAL_SEATS;
  const calendarPageUrl =
    shareUrl ||
    (process.env.NEXT_PUBLIC_SITE_URL
      ? `${String(process.env.NEXT_PUBLIC_SITE_URL).replace(/\/$/, "")}/events/singles-unplugged`
      : "");
  const shareTitle = encodeURIComponent("Singles Unplugged — Emmasdale SDA Church");
  const waShare = shareUrl
    ? `https://wa.me/?text=${encodeURIComponent(`${shareTitle}\n${shareUrl}`)}`
    : "#";

  return (
    <main
      className={`min-h-screen bg-slate-50 font-sans text-slate-900 antialiased selection:bg-teal-200/50 selection:text-slate-900 ${showStickyCta ? "pb-[calc(4.25rem+env(safe-area-inset-bottom))]" : ""}`}
    >
      <section
        ref={heroRef}
        className="relative overflow-hidden bg-slate-950 px-4 pb-20 pt-[max(1.25rem,env(safe-area-inset-top))] sm:px-8 sm:pb-24 sm:pt-10 md:pb-28"
      >
        <div className="pointer-events-none absolute inset-0">
          <Image
            src={HERO_IMAGE}
            alt="Young adults in conversation"
            fill
            priority
            className="object-cover opacity-[0.2] mix-blend-overlay sm:opacity-[0.22]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/97 to-slate-950" />
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-slate-950 to-transparent" />
        </div>

        <div className="relative mx-auto max-w-3xl text-center lg:max-w-4xl lg:text-left">
          <div className="mx-auto inline-block rounded-full border border-teal-500/35 bg-slate-800/60 px-4 py-1.5 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-teal-100/95 lg:mx-0">
            Lusaka · 2026
          </div>

          <h1 className="font-su-serif mt-8 text-[2.35rem] font-medium leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl md:leading-[1.02]">
            Singles Unplugged
          </h1>
          <p className="font-su-serif mx-auto mt-5 max-w-xl text-lg italic leading-relaxed text-slate-300 sm:text-xl lg:mx-0">
            Prayerfully pursuing purpose and partnership
          </p>

          <ul className="mx-auto mt-10 max-w-md space-y-3 font-sans text-sm text-slate-300 sm:text-[15px] lg:mx-0">
            <li className="flex items-start justify-center gap-3 lg:justify-start">
              <FaRegCalendarAlt className="mt-0.5 shrink-0 text-teal-400" aria-hidden />
              <span>Saturday 2 May 2026</span>
            </li>
            <li className="flex items-start justify-center gap-3 lg:justify-start">
              <FaRegClock className="mt-0.5 shrink-0 text-teal-400" aria-hidden />
              <span>18:00 – 21:00 CAT</span>
            </li>
            <li className="flex items-start justify-center gap-3 lg:justify-start">
              <FaMapMarkerAlt className="mt-0.5 shrink-0 text-teal-400" aria-hidden />
              <span>Honeycomb Junction, 14 Miles Great North Road</span>
            </li>
          </ul>

          <div className="mx-auto mt-10 flex max-w-md flex-col gap-3 sm:mx-auto sm:flex-row sm:flex-wrap sm:justify-center lg:mx-0 lg:justify-start">
            <a
              href="#reserve"
              className="inline-flex h-12 min-h-[48px] w-full items-center justify-center rounded-full bg-amber-500 px-8 font-sans text-sm font-bold text-white shadow-md transition hover:bg-amber-400 sm:w-auto"
            >
              Reserve a seat — K100
            </a>
            <a
              href="#logistics"
              className="inline-flex h-12 min-h-[48px] w-full items-center justify-center rounded-full border border-teal-400/50 bg-transparent px-8 font-sans text-sm font-medium text-slate-200 transition hover:border-teal-300 hover:bg-slate-800/60 sm:w-auto"
            >
              View venue
            </a>
          </div>

          <AddToCalendarBar pageUrl={calendarPageUrl} variant="hero" className="mx-auto mt-10 max-w-lg lg:mx-0" />

          <div className="mx-auto mt-8 flex flex-wrap justify-center gap-2 border-t border-slate-700/80 pt-8 lg:mx-0 lg:justify-start lg:border-t-0 lg:pt-6">
            <Link href="/events" className="font-sans text-sm text-slate-400 transition hover:text-white">
              ← All events
            </Link>
            {shareUrl && (
              <>
                <span className="hidden text-slate-600 sm:inline" aria-hidden>
                  ·
                </span>
                <a
                  href={waShare}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-sans text-sm text-slate-400 hover:text-teal-300"
                >
                  <FaWhatsapp className="text-emerald-400" aria-hidden />
                  Share
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-sm text-slate-400 hover:text-teal-300"
                >
                  Facebook
                </a>
              </>
            )}
          </div>
        </div>
      </section>

      <StatsBar remaining={remaining} total={totalSeats} />

      <div className="bg-slate-50 px-4 py-10 sm:px-6 sm:py-12">
        <blockquote className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-slate-100 px-6 py-12 text-center font-su-serif text-xl font-normal leading-relaxed text-slate-800 shadow-sm sm:px-10 sm:py-14 sm:text-2xl sm:leading-relaxed">
          &ldquo;Commit your way to the Lord; trust in him, and he will act.&rdquo;
          <footer className="mt-5 font-sans text-sm font-medium not-italic text-teal-800/80">Psalm 37:5</footer>
        </blockquote>
      </div>

      <div className="relative z-20 mx-auto max-w-5xl space-y-16 px-4 py-16 sm:space-y-20 sm:px-8 sm:py-20">
        <section>
          <p className={sectionLabel}>Running program</p>
          <h2 className="font-su-serif mt-3 text-2xl font-medium tracking-tight text-slate-900 sm:text-3xl">Evening sessions</h2>
          <p className="mt-2 font-sans text-sm text-slate-600">Tap a topic for more</p>
          <ul className="mt-8 grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-2">
            {TOPICS.map((t, i) => {
              const open = expanded === i;
              return (
                <li key={t.title}>
                  <button
                    type="button"
                    onClick={() => setExpanded(open ? null : i)}
                    className={`flex w-full min-h-[56px] flex-col rounded-2xl border bg-white p-5 text-left transition sm:min-h-[60px] sm:p-6 ${
                      open
                        ? "border-slate-300 shadow-md ring-1 ring-slate-200/80 border-l-[3px] border-l-teal-500"
                        : "border-slate-200 hover:border-slate-300 hover:shadow-sm"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <span className="font-sans text-[11px] font-semibold tabular-nums text-slate-400">{String(i + 1).padStart(2, "0")}</span>
                        <span className="font-su-serif mt-1 block text-[1.05rem] font-medium leading-snug text-slate-900 sm:text-lg">{t.title}</span>
                      </div>
                      {open ? (
                        <FaChevronUp className="mt-1 h-4 w-4 shrink-0 text-slate-400" aria-hidden />
                      ) : (
                        <FaChevronDown className="mt-1 h-4 w-4 shrink-0 text-slate-400" aria-hidden />
                      )}
                    </div>
                    {open && <p className="mt-4 border-t border-slate-200 pt-4 font-sans text-sm leading-relaxed text-slate-600">{t.blurb}</p>}
                  </button>
                </li>
              );
            })}
          </ul>
        </section>

        <section id="logistics" className="scroll-mt-6">
          <p className={sectionLabel}>Venue</p>
          <h2 className="font-su-serif mt-3 text-2xl font-medium tracking-tight text-slate-900 sm:text-3xl">Honeycomb Junction</h2>
          <p className="mt-3 max-w-2xl font-sans text-sm leading-relaxed text-slate-600 sm:text-[15px]">
            14 Miles, Great North Road, Lusaka. Saturday 2 May 2026, 18:00–21:00 CAT.
          </p>
          <AddToCalendarBar pageUrl={calendarPageUrl} variant="venue" className="mt-5" />

          <div className="mt-8 flex flex-col gap-6 lg:grid lg:grid-cols-[1.2fr_1fr] lg:items-start lg:gap-10">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="aspect-[16/11] w-full bg-slate-200/80 sm:aspect-[16/9] lg:min-h-[300px]">
                <iframe
                  title="Map — Honeycomb Junction"
                  src={MAP_EMBED}
                  width="100%"
                  height="100%"
                  className="h-full min-h-[200px] w-full sm:min-h-[240px]"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="border-t border-slate-200 p-4 sm:p-5">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Honeycomb+Junction+14+Miles+Lusaka+Zambia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 w-full items-center justify-center rounded-full bg-slate-900 font-sans text-sm font-bold text-white shadow-md transition hover:bg-slate-800 sm:w-auto sm:min-w-[11rem]"
                >
                  Open in Google Maps
                </a>
              </div>
            </div>

            <aside className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h3 className="font-su-serif text-lg font-medium text-slate-900">Dress code</h3>
              <p className="mt-2 font-sans text-sm leading-relaxed text-slate-600">Smart casual, modest.</p>
              <div className="mt-8 border-t border-slate-200 pt-8">
                <p className="font-sans text-xs font-semibold uppercase tracking-wider text-slate-500">Contribution</p>
                <p className="font-su-serif mt-2 text-3xl font-medium text-slate-900">K100</p>
                <p className="mt-1 font-sans text-sm text-slate-600">Per person · Airtel Money via WhatsApp</p>
              </div>
              <div className="mt-8 border-t border-slate-200 pt-8">
                <p className="font-sans text-xs font-semibold uppercase tracking-wider text-slate-500">Questions</p>
                <p className="mt-2 font-sans text-sm text-slate-700">{CHURCH_PHONE_DISPLAY}</p>
                <a
                  href={`https://wa.me/${WHATSAPP_DIGITS}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-2 font-sans text-sm font-semibold text-slate-800 underline decoration-slate-300 underline-offset-2 hover:text-teal-700"
                >
                  <FaWhatsapp className="text-emerald-600" aria-hidden />
                  WhatsApp
                </a>
              </div>
            </aside>
          </div>
        </section>

        <section id="reserve" className="scroll-mt-20">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-5 py-8 sm:px-10 sm:py-10">
              <p className={sectionLabel}>Registration</p>
              <h2 className="font-su-serif mt-3 text-2xl font-medium tracking-tight text-slate-900 sm:text-3xl md:text-4xl">Secure your place</h2>
              <p className="mt-4 max-w-xl font-sans text-sm leading-relaxed text-slate-600 sm:text-[15px]">
                After you submit, you&apos;ll complete <span className="font-medium text-slate-800">K100</span> per person via{" "}
                <span className="font-medium text-slate-800">Airtel Money</span> on WhatsApp.{" "}
                <a href="#live-stats" className="font-medium text-teal-800 underline decoration-teal-500/40 underline-offset-2 hover:decoration-teal-600">
                  Live seat count
                </a>{" "}
                is above.
              </p>
              <div className="mt-6 flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                <FaMobileAlt className="mt-0.5 shrink-0 text-slate-500" aria-hidden />
                <p className="font-sans text-sm text-slate-600">Use the WhatsApp number linked to your Airtel Money.</p>
              </div>
            </div>

            <details className="group border-b border-slate-200 px-5 py-4 sm:px-10">
              <summary className="cursor-pointer list-none font-sans text-sm font-medium text-slate-800 marker:content-none [&::-webkit-details-marker]:hidden">
                <span className="inline-flex items-center gap-2">
                  After you pay
                  <FaChevronDown className="h-3.5 w-3.5 text-slate-400 transition group-open:rotate-180" aria-hidden />
                </span>
              </summary>
              <ol className="mt-3 list-decimal space-y-2 pl-4 font-sans text-sm leading-relaxed text-slate-600">
                <li>Submit the form, then pay in WhatsApp.</li>
                <li>Treasury confirms your seat.</li>
                <li>We may send reminders before the event.</li>
              </ol>
            </details>

            <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-lg space-y-5 px-5 py-8 sm:px-10 sm:py-10">
              <div>
                <label className={labelClass}>
                  Full name <span className="text-red-600">*</span>
                </label>
                <input
                  {...register("fullName", { required: "Required", minLength: 2 })}
                  className={inputClass}
                  placeholder="Full legal name"
                  autoComplete="name"
                />
                {errors.fullName && <p className="mt-1 text-xs text-red-600">{errors.fullName.message}</p>}
              </div>
              <div>
                <label className={labelClass}>
                  Phone <span className="text-red-600">*</span>
                </label>
                <input
                  {...register("phone", { required: "Required", minLength: 8 })}
                  className={inputClass}
                  placeholder="+260 …"
                  inputMode="tel"
                  autoComplete="tel"
                />
                {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>}
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>
                    Gender <span className="text-red-600">*</span>
                  </label>
                  <select {...register("gender")} className={inputClass}>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>
                    Age <span className="text-red-600">*</span>
                  </label>
                  <select {...register("ageGroup")} className={inputClass}>
                    <option value="18-24">18–24</option>
                    <option value="25-32">25–32</option>
                    <option value="33+">33+</option>
                  </select>
                </div>
              </div>
              <div>
                <label className={labelClass}>
                  Seats <span className="text-red-600">*</span>
                </label>
                <select {...register("numberOfPeople")} className={inputClass}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                </select>
                <p className="mt-1 text-xs text-slate-500">
                  K100 × {numberOfPeople} = K{Number(numberOfPeople) * 100}
                </p>
              </div>
              <div>
                <label className={labelClass}>How did you hear about this?</label>
                <select {...register("heardFrom")} className={inputClass}>
                  <option value="Church announcement">Church announcement</option>
                  <option value="WhatsApp">WhatsApp</option>
                  <option value="Friend invitation">Friend</option>
                  <option value="Poster">Poster</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Post-event WhatsApp group</label>
                <select {...register("joinWhatsappGroup")} className={inputClass}>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>

              <button
                type="button"
                onClick={() => setMoreDetailsOpen((o) => !o)}
                className="flex h-12 w-full items-center justify-between rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 text-left font-sans text-sm font-medium text-slate-700 active:bg-slate-100 sm:h-11"
              >
                Optional: email &amp; dietary
                {moreDetailsOpen ? <FaChevronUp className="h-3.5 w-3.5" aria-hidden /> : <FaChevronDown className="h-3.5 w-3.5" aria-hidden />}
              </button>
              {moreDetailsOpen && (
                <div className="space-y-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <div>
                    <label className={labelClass}>Email</label>
                    <input type="email" {...register("email")} className={inputClass} placeholder="you@email.com" autoComplete="email" />
                  </div>
                  <div>
                    <label className={labelClass}>Dietary</label>
                    <textarea {...register("dietary")} rows={2} className={inputClass + " min-h-[88px] resize-none py-3"} placeholder="Allergies, vegetarian…" />
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={submitting || remaining < Number(numberOfPeople)}
                className="flex h-14 w-full items-center justify-center gap-2 rounded-full bg-teal-600 font-sans text-sm font-bold uppercase tracking-wide text-white shadow-md transition hover:bg-teal-500 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {submitting ? "Saving…" : (
                  <>
                    Continue to payment <span aria-hidden>→</span>
                  </>
                )}
              </button>
              {remaining < Number(numberOfPeople) && (
                <p className="text-center font-sans text-xs text-red-600">Not enough seats for this group size.</p>
              )}
              <p className="text-center font-sans text-[11px] leading-relaxed text-slate-500">
                Limited seats · payment order · cancel 48h ahead if you can
              </p>
            </form>
          </div>
        </section>
      </div>

      <footer className="mt-4 border-t border-slate-200 bg-slate-900 px-4 py-12 text-center sm:py-14">
        <p className="font-sans text-sm font-medium text-white">Emmasdale Seventh-day Adventist Church</p>
        <p className="mx-auto mt-3 max-w-md font-sans text-xs leading-relaxed text-slate-400">
          We do not store mobile money PINs on this site.
        </p>
      </footer>

      {showStickyCta && (
        <div className="fixed bottom-0 left-0 right-0 z-[60] rounded-t-2xl border border-b-0 border-slate-700/80 bg-slate-900/98 px-4 py-3 shadow-[0_-8px_30px_-10px_rgba(0,0,0,0.25)] backdrop-blur-md pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
            <p className="min-w-0 truncate font-sans text-sm text-slate-400">
              <span className="font-medium text-white">Singles Unplugged</span>
              <span className="text-slate-500"> · </span>
              {remaining} seats left
            </p>
            <a
              href="#reserve"
              className="inline-flex h-11 shrink-0 items-center justify-center rounded-full bg-amber-500 px-5 font-sans text-xs font-bold text-white shadow-md transition hover:bg-amber-400 sm:text-sm"
            >
              Reserve · K100
            </a>
          </div>
        </div>
      )}
    </main>
  );
}
