import express from "express";
import { UploadFile, getPdf } from "../controllers/pdfController.js";
import Upload from "../middleware/file-upload.js";
import { validateBody } from "../middleware/validation/validate.js";
import { pdfSchema } from "../middleware/validation/entitySchemas.js";
const router = express.Router();

router.route("/").post(Upload.single("pdf"), validateBody(pdfSchema), UploadFile).get(getPdf);

export default router;
