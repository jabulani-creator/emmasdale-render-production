import express from "express";
import {
  createPastor,
  deletePastor,
  getPastor,
} from "../controllers/PastorsController.js";

const router = express.Router();

import authenticateUser from "../middleware/auth.js";
import Upload from "../middleware/file-upload.js";
import { validateBody } from "../middleware/validation/validate.js";
import { personnelSchema } from "../middleware/validation/entitySchemas.js";

router
  .route("/")
  .post(Upload.single("photo"), validateBody(personnelSchema), authenticateUser, createPastor)
  .get(getPastor);
router.route("/:id").delete(deletePastor);

export default router;
