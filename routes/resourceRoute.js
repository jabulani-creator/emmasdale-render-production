import express from "express";
import {
  createResource,
  getResource,
  getResources,
} from "../controllers/resourceController.js";
import Upload from "../middleware/file-upload.js";
const router = express.Router();

router.route("/").post(Upload.single("pdf"), createResource).get(getResources);
router.route("/:id").get(getResource);
export default router;
