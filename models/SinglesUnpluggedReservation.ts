import mongoose from "mongoose";

const SinglesUnpluggedReservationSchema = new mongoose.Schema(
  {
    eventKey: {
      type: String,
      default: "singles-unplugged-2026-05-02",
      index: true,
    },
    fullName: {
      type: String,
      required: [true, "Please provide your full name"],
      trim: true,
      maxlength: 120,
    },
    phone: {
      type: String,
      required: [true, "Please provide a phone number"],
      trim: true,
      maxlength: 30,
    },
    email: {
      type: String,
      trim: true,
      maxlength: 120,
      default: "",
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
      required: true,
    },
    ageGroup: {
      type: String,
      enum: ["18-24", "25-32", "33+"],
      required: true,
    },
    dietary: {
      type: String,
      trim: true,
      maxlength: 500,
      default: "",
    },
    heardFrom: {
      type: String,
      enum: ["Church announcement", "WhatsApp", "Friend invitation", "Poster", "Other"],
      required: true,
    },
    joinWhatsappGroup: {
      type: Boolean,
      required: true,
    },
    numberOfPeople: {
      type: Number,
      enum: [1, 2],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid_requested", "paid", "failed"],
      default: "pending",
    },
    paymentReference: {
      type: String,
      trim: true,
      default: "",
    },
    proofNote: {
      type: String,
      trim: true,
      maxlength: 500,
      default: "",
    },
    ticketCode: {
      type: String,
      trim: true,
      default: "",
      index: true,
    },
    pendingExpiresAt: {
      type: Date,
      required: true,
    },
    attended: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("SinglesUnpluggedReservation", SinglesUnpluggedReservationSchema);
