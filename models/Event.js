import mongoose from "mongoose";

const EventSchema = new mongoose.Schema(
  {
    eventTitle: {
      type: String,
      required: [true, "please provide event title"],
      maxlength: 100,
      unique: true,
    },
    eventDate: {
      type: String,
      required: [true, "please provide event date"],
    },
    venue: {
      type: String,
      required: [true, "please provide  event venue"],
    },
    time: {
      type: String,
      required: [true, "please provide post event message"],
    },
    eventPhoto: { type: String },
    cloudinary_id: { type: String },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Event", EventSchema);
