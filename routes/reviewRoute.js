import express from "express";
const router = express.Router();

import {
  createReview,
  deleteReview,
  getAllReviews,
  getReview,
} from "../controllers/reviewController.js";
import Upload from "../middleware/file-upload.js";
router.route("/").post(Upload.single("ReviewPhoto"), createReview);

router.route("/").get(getAllReviews);
router.route("/:id").delete(deleteReview).get(getReview);

export default router;
