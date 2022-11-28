import express from "express";
import { getPdf, UploadFile } from "../controllers/pdfController.js";
import Upload from "../middleware/file-upload.js";
const router = express.Router();

router.route("/").post(Upload.single("pdf"), UploadFile).get(getPdf);
export default router;
