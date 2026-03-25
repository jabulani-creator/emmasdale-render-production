import mongoose from "mongoose";

const SermonSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title for the sermon/livestream"],
      maxlength: 100,
    },
    speaker: {
      type: String,
      required: [true, "Please provide the speaker name"],
      maxlength: 50,
      default: "Emmasdale SDA Church",
    },
    youtubeLink: {
      type: String,
      required: [true, "Please provide the YouTube link"],
    },
    category: {
      type: String,
      enum: ["Divine Service", "Sabbath School", "AY Program", "Special Event"],
      default: "Divine Service",
    },
    isLive: {
      type: Boolean,
      default: false,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

export default mongoose.models.Sermon || mongoose.model("Sermon", SermonSchema);
