import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    postTitle: {
      type: String,
      required: [true, "please provide post title"],
      maxlength: 100,
    },
    postDesc: {
      type: String,
      required: [true, "please provide health post description"],
    },
    postPhoto: {
      type: String,
    },
    cloudinary_id: {
      type: String,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Post", PostSchema);
