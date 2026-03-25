import mongoose from "mongoose";

const pdfSchema = new mongoose.Schema(
  {
    name: {
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

export default mongoose.model("PDF", pdfSchema);
