import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema(
  {
    ReviewName: {
      type: String,
      required: [true, "please provide your Name"],
      maxlength: 100,
    },
    ReviewDesc: {
      type: String,
      required: [true, "please provide your review"],
    },
    ReviewPhoto: {
      type: String,
    },
    cloudinary_id: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Review", ReviewSchema);
