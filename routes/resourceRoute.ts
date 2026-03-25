import express from "express";
import {
  createResource,
  getResource,
  getResources,
} from "../controllers/resourceController.js";
import Upload from "../middleware/file-upload.js";
import { validateBody } from "../middleware/validation/validate.js";
import { resourceSchema } from "../middleware/validation/entitySchemas.js";
const router = express.Router();

router.route("/").post(Upload.single("pdf"), validateBody(resourceSchema), createResource).get(getResources);
router.route("/:id").get(getResource);
export default router;
