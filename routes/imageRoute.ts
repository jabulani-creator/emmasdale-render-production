import express from "express";
import { getImage, uploadImage } from "../controllers/galleryController.js";
const router = express.Router();
import authenticateUser from "../middleware/auth.js";
import Upload from "../middleware/file-upload.js";
import { validateBody } from "../middleware/validation/validate.js";
import { gallerySchema } from "../middleware/validation/entitySchemas.js";

router.route("/").post(Upload.single("image"), validateBody(gallerySchema), uploadImage).get(getImage);
export default router;
