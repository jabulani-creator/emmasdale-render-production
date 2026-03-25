import express from "express";
import {
  createWorker,
  deleteWorker,
  getAllWorkers,
} from "../controllers/workerController.js";
const router = express.Router();

import authenticateUser from "../middleware/auth.js";
import Upload from "../middleware/file-upload.js";
import { validateBody } from "../middleware/validation/validate.js";
import { personnelSchema } from "../middleware/validation/entitySchemas.js";

router
  .route("/")
  .post(Upload.single("photo"), validateBody(personnelSchema), authenticateUser, createWorker)
  .get(getAllWorkers);
router.route("/:id").delete(deleteWorker);

export default router;
