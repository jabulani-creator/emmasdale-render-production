import mongoose from "mongoose";

const eldersSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
    },
    cloudinary_id: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Elder", eldersSchema);
