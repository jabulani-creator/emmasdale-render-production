import express from "express";
import {
  createPastor,
  deletePastor,
  getPastor,
} from "../controllers/PastorsController.js";

const router = express.Router();

import authenticateUser from "../middleware/auth.js";
import Upload from "../middleware/file-upload.js";

router
  .route("/")
  .post(Upload.single("photo"), authenticateUser, createPastor)
  .get(getPastor);
router.route("/:id").delete(deletePastor);

export default router;
