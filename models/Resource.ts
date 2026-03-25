import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    pdf: {
      type: String,
    },
    cloudinary_id_pdf: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Resource", resourceSchema);
