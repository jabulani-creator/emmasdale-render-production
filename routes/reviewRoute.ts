import express from "express";
const router = express.Router();

import {
  createReview,
  deleteReview,
  getAllReviews,
  getReview,
} from "../controllers/reviewController.js";
import Upload from "../middleware/file-upload.js";
import { validateBody } from "../middleware/validation/validate.js";
import { reviewSchema } from "../middleware/validation/entitySchemas.js";

router.route("/").post(Upload.single("ReviewPhoto"), validateBody(reviewSchema), createReview);

router.route("/").get(getAllReviews);
router.route("/:id").delete(deleteReview).get(getReview);

export default router;
