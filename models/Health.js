import mongoose from "mongoose";

const HealthSchema = new mongoose.Schema(
  {
    healthTitle: {
      type: String,
      required: [true, "please provide post title"],
      maxlength: 100,
    },
    healthDesc: {
      type: String,
      required: [true, "please provide health post description"],
    },
    healthPhoto: {
      type: String,
    },
    cloudinary_id: { type: String },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Health", HealthSchema);
