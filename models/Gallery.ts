import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  image: {
    type: String,
  },
  cloudinary_id: {
    type: String,
  },
  department: {
    type: String,
    enum: ["Youth", "Women", "Music", "Amo"],
    default: "Music",
  },
});

export default mongoose.model("Images", imageSchema);
