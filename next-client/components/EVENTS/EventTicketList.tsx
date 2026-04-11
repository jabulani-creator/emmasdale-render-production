import Image from "next/image";
import Link from "next/link";
import { FaClock, FaCalendarAlt } from "react-icons/fa";
import { eventDateParts } from "../../lib/eventDateParts";
import { SINGLES_UNPLUGGED_LISTING } from "../../lib/featuredSinglesUnpluggedEvent";

const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1438232992991-995a7525abf1?auto=format&fit=crop&w=800&q=80";

type Props = {
  events: any[];
  /** If set, only first N events are shown */
  limit?: number;
  /** teaser: links to /events; detail: contact + plan your visit */
  ctaStyle?: "teaser" | "detail";
};

function resolvePrimaryCta(event: any, isTeaser: boolean) {
  if (event.primaryCtaHref) {
    return {
      href: event.primaryCtaHref,
      label: event.primaryCtaLabel ?? (isTeaser ? "Learn more" : "View invitation & reserve"),
    };
  }
  return {
    href: isTeaser ? "/events" : "/contact",
    label: isTeaser ? "Learn more" : "Questions? Contact us",
  };
}

function resolveSecondaryCta(event: any, isTeaser: boolean) {
  if (isTeaser && event.secondaryCtaHrefTeaser != null) {
    return {
      href: event.secondaryCtaHrefTeaser,
      label: event.secondaryCtaLabelTeaser ?? "View details",
    };
  }
  if (!isTeaser && event.secondaryCtaHrefDetail != null) {
    return {
      href: event.secondaryCtaHrefDetail,
      label: event.secondaryCtaLabelDetail ?? "Plan your visit",
    };
  }
  if (event.secondaryCtaHref != null) {
    return {
      href: event.secondaryCtaHref,
      label: event.secondaryCtaLabel ?? (isTeaser ? "View details" : "Plan your visit"),
    };
  }
  return {
    href: isTeaser ? "/events" : "/plan-your-visit",
    label: isTeaser ? "View details" : "Plan your visit",
  };
}

function mergeWithFeaturedSingles(events: any[]) {
  const raw = Array.isArray(events) ? events : [];
  const fid = SINGLES_UNPLUGGED_LISTING._id;
  if (raw.some((e) => e && (e._id === fid || e.primaryCtaHref === "/events/singles-unplugged"))) {
    return raw;
  }
  return [SINGLES_UNPLUGGED_LISTING, ...raw];
}

export function EventTicketList({ events, limit, ctaStyle = "detail" }: Props) {
  const isTeaser = ctaStyle === "teaser";
  const merged = mergeWithFeaturedSingles(events);
  const list = limit != null ? merged.slice(0, limit) : merged;

  if (!list.length) {
    return (
      <p className="px-6 py-14 text-center text-sm text-stone-500 md:px-10">
        No upcoming events at the moment.
      </p>
    );
  }

  return (
    <ul>
      {list.map((event: any, index: number) => {
        const parts = eventDateParts(event.eventDate);
        const title = event.eventTitle || event.eventName || "Church event";
        const venue = event.venue || event.eventVenue || "Venue to be announced";
        const timeStr = event.time || event.eventTime || "Time TBC";
        const imgSrc = event.eventPhoto || FALLBACK_IMG;
        const badge = event.listBadge || "Church";
        const primary = resolvePrimaryCta(event, isTeaser);
        const secondary = resolveSecondaryCta(event, isTeaser);

        const rowKey = event?._id != null ? String(event._id) : `event-row-${index}`;
        return (
          <li key={rowKey} className="border-b border-stone-100 last:border-b-0">
            <div className="relative isolate bg-white opacity-100 md:hidden" role="article">
              <div className="relative aspect-[16/10] w-full bg-stone-200">
                <Image src={imgSrc} alt={title} fill className="object-cover" sizes="100vw" />
                <span
                  className="pointer-events-none absolute left-0 top-1/2 z-10 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-stone-100 ring-1 ring-stone-200/80"
                  aria-hidden
                />
                <span
                  className="pointer-events-none absolute right-0 top-1/2 z-10 h-5 w-5 translate-x-1/2 -translate-y-1/2 rounded-full bg-stone-100 ring-1 ring-stone-200/80"
                  aria-hidden
                />
              </div>
              <div className="px-5 pb-6 pt-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-900/80">{badge}</p>
                <h3 className="mt-1 font-serif text-2xl font-semibold leading-tight text-stone-900">{title}</h3>
                <p className="mt-1 text-sm text-stone-600">{venue}</p>
                <div className="mt-4 flex flex-wrap gap-5 text-sm text-stone-600">
                  <span className="inline-flex items-center gap-2">
                    <FaCalendarAlt className="h-4 w-4 text-stone-400" aria-hidden />
                    {parts.line}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <FaClock className="h-4 w-4 text-stone-400" aria-hidden />
                    {timeStr}
                  </span>
                </div>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Link
                    href={primary.href}
                    className="inline-flex h-11 w-full items-center justify-center rounded-sm bg-amber-900 px-6 text-sm font-semibold text-white transition-colors hover:bg-amber-950 sm:w-auto"
                  >
                    {primary.label}
                  </Link>
                  <Link
                    href={secondary.href}
                    className="text-center text-sm font-medium text-stone-700 underline decoration-stone-300 underline-offset-4 hover:text-stone-900"
                  >
                    {secondary.label}
                  </Link>
                </div>
              </div>
            </div>

            <div
              className="relative isolate hidden bg-white opacity-100 md:flex md:flex-row md:items-stretch"
              role="article"
            >
              <div className="flex w-[5.75rem] shrink-0 flex-col border-r border-stone-200">
                <div className="flex flex-1 flex-col items-center justify-center bg-white px-2 py-5">
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-stone-500">
                    {parts.month}
                  </span>
                  <span className="font-display mt-1 text-3xl font-bold tabular-nums text-stone-900">{parts.day}</span>
                </div>
                <div className="border-t border-stone-200 bg-stone-900 px-2 py-3 text-center">
                  <span className="text-[11px] font-semibold leading-snug text-white">{timeStr}</span>
                </div>
              </div>

              <div className="flex min-w-0 flex-1 flex-col justify-center px-8 py-7">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-900/80">{badge}</p>
                <h3 className="mt-2 font-serif text-2xl font-semibold leading-tight text-stone-900 lg:text-[1.65rem] lg:leading-snug">
                  {title}
                </h3>
                <p className="mt-2 text-sm text-stone-600">{venue}</p>
                <p className="mt-1 text-xs text-stone-500">{parts.line}</p>
                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <Link
                    href={primary.href}
                    className="inline-flex h-10 items-center justify-center rounded-sm bg-amber-900 px-7 text-sm font-semibold text-white transition-colors hover:bg-amber-950"
                  >
                    {primary.label}
                  </Link>
                  <Link
                    href={secondary.href}
                    className="text-sm font-medium text-stone-700 underline decoration-stone-300 underline-offset-4 hover:text-stone-900"
                  >
                    {secondary.label}
                  </Link>
                </div>
              </div>

              <div className="relative hidden w-[13.5rem] shrink-0 lg:w-[15.5rem] md:block">
                <div className="relative h-full min-h-[11rem] overflow-hidden bg-stone-200 lg:min-h-[12rem]">
                  <Image src={imgSrc} alt={title} fill className="object-cover" sizes="(min-width:768px) 250px, 100vw" />
                  <span
                    className="pointer-events-none absolute left-0 top-1/2 z-10 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white ring-1 ring-stone-100"
                    aria-hidden
                  />
                  <span
                    className="pointer-events-none absolute right-0 top-1/2 z-10 h-5 w-5 translate-x-1/2 -translate-y-1/2 rounded-full bg-stone-100 ring-1 ring-stone-200/80"
                    aria-hidden
                  />
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
