import { randomBytes } from "crypto";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import SinglesUnpluggedReservation from "../models/SinglesUnpluggedReservation.js";
import { BadRequestError, NotFoundError, UnauthenticatedError } from "../errors/index.ts";

const EVENT_KEY = "singles-unplugged-2026-05-02";
const CAPACITY = 100;
const HOLD_MINUTES = 15;

function generateTicketCode(): string {
  return `SU-2026-${randomBytes(3).toString("hex").toUpperCase()}`;
}

async function generateUniqueTicketCode(): Promise<string> {
  for (let i = 0; i < 8; i += 1) {
    const code = generateTicketCode();
    const exists = await SinglesUnpluggedReservation.exists({ ticketCode: code });
    if (!exists) return code;
  }
  return `SU-2026-${randomBytes(4).toString("hex").toUpperCase()}`;
}

async function countHeldSeats(): Promise<number> {
  const now = new Date();
  const result = await SinglesUnpluggedReservation.aggregate<{ total: number }>([
    {
      $match: {
        eventKey: EVENT_KEY,
        $or: [
          { paymentStatus: "paid" },
          { paymentStatus: "paid_requested" },
          {
            paymentStatus: "pending",
            pendingExpiresAt: { $gt: now },
          },
        ],
      },
    },
    { $group: { _id: null, total: { $sum: "$numberOfPeople" } } },
  ]);
  return result[0]?.total ?? 0;
}

const getSeatStats = async (_req: any, res: any) => {
  const used = await countHeldSeats();
  const remaining = Math.max(0, CAPACITY - used);
  res.status(StatusCodes.OK).json({
    total: CAPACITY,
    taken: used,
    remaining,
  });
};

const getReservationById = async (req: any, res: any) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new BadRequestError("Invalid reservation reference.");
  }
  const doc = await SinglesUnpluggedReservation.findById(id).select(
    "fullName phone numberOfPeople paymentStatus pendingExpiresAt ticketCode paymentReference proofNote createdAt eventKey"
  );
  if (!doc || doc.eventKey !== EVENT_KEY) {
    throw new NotFoundError("Reservation not found.");
  }
  res.status(StatusCodes.OK).json({
    reservation: {
      id: doc._id,
      fullName: doc.fullName,
      phone: doc.phone,
      numberOfPeople: doc.numberOfPeople,
      paymentStatus: doc.paymentStatus,
      pendingExpiresAt: doc.pendingExpiresAt,
      ticketCode: doc.ticketCode,
      paymentReference: doc.paymentReference,
      proofNote: doc.proofNote,
      createdAt: doc.createdAt,
    },
  });
};

const createReservation = async (req: any, res: any) => {
  const numberOfPeople = req.body.numberOfPeople as number;
  const used = await countHeldSeats();
  if (used + numberOfPeople > CAPACITY) {
    throw new BadRequestError("Sorry, there are not enough seats left for your group size.");
  }

  const pendingExpiresAt = new Date(Date.now() + HOLD_MINUTES * 60 * 1000);
  const ticketCode = await generateUniqueTicketCode();

  const reservation = await SinglesUnpluggedReservation.create({
    eventKey: EVENT_KEY,
    fullName: req.body.fullName,
    phone: req.body.phone,
    email: req.body.email || "",
    gender: req.body.gender,
    ageGroup: req.body.ageGroup,
    dietary: req.body.dietary || "",
    heardFrom: req.body.heardFrom,
    joinWhatsappGroup: req.body.joinWhatsappGroup,
    numberOfPeople,
    paymentStatus: "pending",
    pendingExpiresAt,
    ticketCode,
  });

  const newUsed = await countHeldSeats();
  const remaining = Math.max(0, CAPACITY - newUsed);

  res.status(StatusCodes.CREATED).json({
    reservation: {
      id: reservation._id,
      fullName: reservation.fullName,
      phone: reservation.phone,
      numberOfPeople: reservation.numberOfPeople,
      paymentStatus: reservation.paymentStatus,
      pendingExpiresAt: reservation.pendingExpiresAt,
      ticketCode: reservation.ticketCode,
    },
    seatsRemaining: remaining,
    holdMinutes: HOLD_MINUTES,
    msg: "Reservation recorded. Complete K100 payment within the hold window to confirm your seat.",
  });
};

const confirmPayment = async (req: any, res: any) => {
  const { reservationId, transactionRef, amount, proofNote } = req.body as {
    reservationId: string;
    transactionRef: string;
    amount: number;
    proofNote?: string;
  };

  if (!mongoose.Types.ObjectId.isValid(reservationId)) {
    throw new BadRequestError("Invalid reservation reference.");
  }

  const doc = await SinglesUnpluggedReservation.findById(reservationId);
  if (!doc || doc.eventKey !== EVENT_KEY) {
    throw new NotFoundError("Reservation not found.");
  }

  if (doc.paymentStatus === "paid") {
    return res.status(StatusCodes.OK).json({
      msg: "This reservation is already marked as paid.",
      reservation: { id: doc._id, paymentStatus: doc.paymentStatus, ticketCode: doc.ticketCode },
    });
  }

  if (doc.paymentStatus === "paid_requested") {
    return res.status(StatusCodes.OK).json({
      msg: "We already received your payment notice. Treasury will confirm soon.",
      reservation: {
        id: doc._id,
        paymentStatus: doc.paymentStatus,
        ticketCode: doc.ticketCode,
        paymentReference: doc.paymentReference,
      },
    });
  }

  if (doc.paymentStatus !== "pending") {
    throw new BadRequestError("This reservation cannot be updated.");
  }

  const expected = doc.numberOfPeople * 100;
  if (amount !== expected) {
    throw new BadRequestError(`Expected payment amount K${expected} for ${doc.numberOfPeople} guest(s).`);
  }

  doc.paymentStatus = "paid_requested";
  doc.paymentReference = String(transactionRef).trim().slice(0, 80);
  doc.proofNote = (proofNote || "").trim().slice(0, 500);
  await doc.save();

  res.status(StatusCodes.OK).json({
    msg: "Thank you — treasury will verify your Airtel Money payment and confirm your seat.",
    reservation: {
      id: doc._id,
      paymentStatus: doc.paymentStatus,
      ticketCode: doc.ticketCode,
      paymentReference: doc.paymentReference,
    },
  });
};

const treasuryAuth = (req: any, _res: any, next: any) => {
  const key = process.env.SINGLES_UNPLUGGED_TREASURY_KEY;
  if (!key) {
    throw new BadRequestError("Treasury key is not configured on the server.");
  }
  const sent = typeof req.get === "function" ? req.get("x-treasury-key") : req.headers["x-treasury-key"];
  if (sent !== key) {
    throw new UnauthenticatedError("Invalid treasury key.");
  }
  next();
};

const markReservationPaid = async (req: any, res: any) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new BadRequestError("Invalid reservation reference.");
  }
  const doc = await SinglesUnpluggedReservation.findById(id);
  if (!doc || doc.eventKey !== EVENT_KEY) {
    throw new NotFoundError("Reservation not found.");
  }
  if (doc.paymentStatus === "paid") {
    return res.status(StatusCodes.OK).json({ msg: "Already marked paid.", reservation: { id: doc._id, paymentStatus: "paid" } });
  }
  doc.paymentStatus = "paid";
  await doc.save();
  const remaining = Math.max(0, CAPACITY - (await countHeldSeats()));
  res.status(StatusCodes.OK).json({
    msg: "Marked as paid.",
    reservation: { id: doc._id, paymentStatus: doc.paymentStatus, ticketCode: doc.ticketCode },
    seatsRemaining: remaining,
  });
};

export { getSeatStats, getReservationById, createReservation, confirmPayment, treasuryAuth, markReservationPaid };
