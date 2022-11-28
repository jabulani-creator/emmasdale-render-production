import express from "express";
import { getImage, uploadImage } from "../controllers/galleryController.js";
const router = express.Router();
import authenticateUser from "../middleware/auth.js";
import Upload from "../middleware/file-upload.js";

router.route("/").post(Upload.single("image"), uploadImage).get(getImage);
export default router;
