"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import { FaCheckCircle, FaClock, FaCopy, FaWhatsapp } from "react-icons/fa";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
const WHATSAPP_DIGITS = process.env.NEXT_PUBLIC_SINGLES_EVENT_WHATSAPP || "260972975737";
/** Shown on “pay via Airtel Money” — set NEXT_PUBLIC_SINGLES_AIRTEL_PAY_NUMBER for treasurer MSISDN */
const AIRTEL_PAY_DISPLAY =
  process.env.NEXT_PUBLIC_SINGLES_AIRTEL_PAY_NUMBER || process.env.NEXT_PUBLIC_SINGLES_EVENT_WHATSAPP || "260972975737";

type ReservationPayload = {
  id: string;
  fullName: string;
  phone: string;
  numberOfPeople: number;
  paymentStatus: string;
  pendingExpiresAt: string;
  ticketCode: string;
  paymentReference?: string;
  proofNote?: string;
};

function formatMsisdnForDisplay(raw: string): string {
  const d = raw.replace(/\D/g, "");
  if (d.length === 12 && d.startsWith("260")) return `+${d.slice(0, 3)} ${d.slice(3, 6)} ${d.slice(6, 9)} ${d.slice(9)}`;
  if (d.length === 10 && d.startsWith("0")) return `+260 ${d.slice(1, 4)} ${d.slice(4, 7)} ${d.slice(7)}`;
  return raw;
}

function buildWhatsAppProofUrl(r: ReservationPayload) {
  const people = r.numberOfPeople;
  const amount = people * 100;
  const lines = [
    "Hello — I've sent Airtel Money for Singles Unplugged.",
    "",
    `Name: ${r.fullName}`,
    `Phone: ${r.phone}`,
    `Ticket: ${r.ticketCode}`,
    `People: ${people} (K${amount})`,
    "",
    "Please confirm when received. Thank you!",
  ];
  return `https://wa.me/${WHATSAPP_DIGITS}?text=${encodeURIComponent(lines.join("\n"))}`;
}

export default function SinglesUnpluggedCheckoutPage() {
  const params = useParams();
  const reservationId = params?.reservationId as string | undefined;

  const [loading, setLoading] = useState(true);
  const [reservation, setReservation] = useState<ReservationPayload | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [now, setNow] = useState(() => Date.now());
  const [showPaidForm, setShowPaidForm] = useState(false);
  const [transactionRef, setTransactionRef] = useState("");
  const [proofNote, setProofNote] = useState("");
  const [submittingPaid, setSubmittingPaid] = useState(false);
  const [confirmedPaidNotice, setConfirmedPaidNotice] = useState(false);

  const payDisplay = useMemo(() => formatMsisdnForDisplay(AIRTEL_PAY_DISPLAY), []);
  const expectedAmount = reservation ? reservation.numberOfPeople * 100 : 0;

  const load = useCallback(async () => {
    if (!reservationId) return;
    setLoading(true);
    setFetchError(null);
    try {
      const { data } = await axios.get<{ reservation: ReservationPayload }>(
        `${API_BASE}/singles-unplugged/reservations/${reservationId}`
      );
      setReservation(data.reservation);
    } catch (e: unknown) {
      if (axios.isAxiosError(e) && e.response?.status === 404) {
        setFetchError("We could not find this reservation. Start again from the event page.");
      } else {
        setFetchError("Could not load your reservation. Check your connection and try again.");
      }
      setReservation(null);
    } finally {
      setLoading(false);
    }
  }, [reservationId]);

  useEffect(() => {
    void load();
  }, [load]);

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const holdDeadline = reservation?.pendingExpiresAt ? new Date(reservation.pendingExpiresAt).getTime() : 0;
  const holdSecondsLeft = holdDeadline > now ? Math.floor((holdDeadline - now) / 1000) : 0;
  const holdActive = reservation?.paymentStatus === "pending" && holdSecondsLeft > 0;
  const holdExpiredPending = reservation?.paymentStatus === "pending" && holdSecondsLeft <= 0;

  const onSubmitPaid = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reservationId || !transactionRef.trim()) {
      toast.error("Enter your transaction reference (e.g. last digits Airtel shows).");
      return;
    }
    setSubmittingPaid(true);
    try {
      await axios.post(`${API_BASE}/singles-unplugged/confirm-payment`, {
        reservationId,
        transactionRef: transactionRef.trim(),
        amount: expectedAmount,
        proofNote: proofNote.trim() || "",
      });
      setConfirmedPaidNotice(true);
      setShowPaidForm(false);
      toast.success("Thank you — treasury will verify your payment.");
      await load();
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const msg = (err.response?.data as { msg?: string })?.msg || "Could not save. Try again.";
        toast.error(msg);
      } else {
        toast.error("Network error.");
      }
    } finally {
      setSubmittingPaid(false);
    }
  };

  const copyTicket = () => {
    if (!reservation?.ticketCode) return;
    void navigator.clipboard.writeText(reservation.ticketCode);
    toast.success("Ticket code copied");
  };

  if (!reservationId) {
    return null;
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-20 text-center font-sans text-slate-600">
        Loading your reservation…
      </main>
    );
  }

  if (fetchError || !reservation) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-20">
        <div className="mx-auto max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <p className="font-sans text-slate-700">{fetchError}</p>
          <Link
            href="/events/singles-unplugged"
            className="mt-6 inline-flex rounded-full bg-teal-600 px-6 py-3 font-sans text-sm font-bold text-white hover:bg-teal-500"
          >
            Back to Singles Unplugged
          </Link>
        </div>
      </main>
    );
  }

  const waUrl = buildWhatsAppProofUrl(reservation);
  const mm = String(Math.floor(holdSecondsLeft / 60)).padStart(2, "0");
  const ss = String(holdSecondsLeft % 60).padStart(2, "0");

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 pb-24 font-sans text-slate-900 sm:px-6 sm:py-14">
      <div className="mx-auto max-w-lg space-y-6">
        <div className="flex items-center justify-between gap-4">
          <Link href="/events/singles-unplugged" className="text-sm font-medium text-teal-700 hover:text-teal-800">
            ← Event page
          </Link>
        </div>

        {reservation.paymentStatus === "paid" && (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-6 text-center shadow-sm">
            <FaCheckCircle className="mx-auto text-3xl text-emerald-600" aria-hidden />
            <p className="mt-3 text-lg font-semibold text-emerald-900">You&apos;re confirmed</p>
            <p className="mt-1 text-sm text-emerald-800">Treasury has marked this reservation as paid.</p>
            <p className="mt-4 font-mono text-xl font-bold tracking-wide text-emerald-950">{reservation.ticketCode}</p>
            <p className="mt-2 text-xs text-emerald-800">Bring this code or your name on the door.</p>
          </div>
        )}

        {reservation.paymentStatus === "paid_requested" && (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 px-5 py-6 shadow-sm">
            <p className="font-semibold text-amber-950">Payment notice received</p>
            <p className="mt-2 text-sm leading-relaxed text-amber-900">
              Treasury will verify your Airtel Money transfer and mark you as paid. You&apos;ll use ticket{" "}
              <span className="font-mono font-bold">{reservation.ticketCode}</span> once confirmed.
            </p>
          </div>
        )}

        {reservation.paymentStatus === "paid_requested" && (
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-emerald-600 font-semibold text-white shadow-md transition hover:bg-emerald-500"
          >
            <FaWhatsapp className="text-xl" aria-hidden />
            Message treasury on WhatsApp
          </a>
        )}

        {reservation.paymentStatus === "pending" && (
          <>
            <div className="rounded-2xl border border-emerald-200 bg-white px-5 py-6 shadow-sm">
              <p className="flex items-center gap-2 text-sm font-semibold text-emerald-800">
                <FaCheckCircle className="text-emerald-600" aria-hidden />
                Seat reserved
              </p>
              {holdActive && (
                <p className="mt-3 flex items-center gap-2 text-sm text-slate-600">
                  <FaClock className="text-teal-600" aria-hidden />
                  Hold refreshes for others in{" "}
                  <span className="font-mono font-semibold text-slate-900">
                    {mm}:{ss}
                  </span>{" "}
                  — you can still pay after; use &quot;I&apos;ve sent the money&quot; below.
                </p>
              )}
              {holdExpiredPending && (
                <p className="mt-3 text-sm text-amber-800">
                  The 15-minute automatic hold has passed, but you can still send payment and tap &quot;I&apos;ve sent the
                  money&quot; so treasury can match your transfer.
                </p>
              )}
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white px-5 py-6 shadow-sm">
              <h1 className="font-display text-lg font-semibold text-slate-900">Pay with Airtel Money</h1>
              <ol className="mt-4 list-decimal space-y-2 pl-4 text-sm leading-relaxed text-slate-700">
                <li>Open the Airtel Money app or dial *211#.</li>
                <li>
                  Send <strong>K{expectedAmount}</strong> (K100 × {reservation.numberOfPeople}) to{" "}
                  <strong className="whitespace-nowrap">{payDisplay}</strong>.
                </li>
                <li>
                  Reference / note: use your ticket code{" "}
                  <button
                    type="button"
                    onClick={copyTicket}
                    className="inline-flex items-center gap-1 font-mono font-bold text-teal-800 underline decoration-teal-300"
                  >
                    {reservation.ticketCode}
                    <FaCopy className="text-xs" aria-hidden />
                  </button>
                </li>
              </ol>
            </div>

            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-emerald-600 font-semibold text-white shadow-md transition hover:bg-emerald-500"
            >
              <FaWhatsapp className="text-xl" aria-hidden />
              Open WhatsApp &amp; send proof
            </a>

            {!showPaidForm && !confirmedPaidNotice && (
              <button
                type="button"
                onClick={() => setShowPaidForm(true)}
                className="w-full rounded-full border-2 border-slate-300 bg-white py-3 text-sm font-bold text-slate-800 transition hover:border-teal-400 hover:bg-slate-50"
              >
                I&apos;ve sent the money
              </button>
            )}

            {showPaidForm && (
              <form
                onSubmit={onSubmitPaid}
                className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <p className="text-sm font-semibold text-slate-900">Tell treasury how to find your payment</p>
                <p className="text-xs text-slate-600">
                  Enter the transaction ID or the last digits Airtel shows on your receipt (at least 4 characters).
                </p>
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Transaction reference
                  </label>
                  <input
                    value={transactionRef}
                    onChange={(e) => setTransactionRef(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                    placeholder="e.g. 482910"
                    autoComplete="off"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Optional note
                  </label>
                  <textarea
                    value={proofNote}
                    onChange={(e) => setProofNote(e.target.value)}
                    rows={2}
                    className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                    placeholder="Time sent, screenshot link, etc."
                  />
                </div>
                <p className="text-xs text-slate-500">
                  Amount we expect: <strong>K{expectedAmount}</strong>
                </p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowPaidForm(false)}
                    className="flex-1 rounded-full border border-slate-300 py-2.5 text-sm font-medium text-slate-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submittingPaid}
                    className="flex-1 rounded-full bg-teal-600 py-2.5 text-sm font-bold text-white disabled:opacity-50"
                  >
                    {submittingPaid ? "Saving…" : "Submit"}
                  </button>
                </div>
              </form>
            )}
          </>
        )}
      </div>
    </main>
  );
}
