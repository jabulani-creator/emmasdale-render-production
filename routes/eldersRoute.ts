import express from "express";
const router = express.Router();
import {
  createElder,
  deleteElder,
  getAllElders,
} from "../controllers/eldersController.js";
import authenticateUser from "../middleware/auth.js";
import Upload from "../middleware/file-upload.js";
import { validateBody } from "../middleware/validation/validate.js";
import { personnelSchema } from "../middleware/validation/entitySchemas.js";

router
  .route("/")
  .post(Upload.single("photo"), validateBody(personnelSchema), authenticateUser, createElder)
  .get(getAllElders);
router.route("/:id").delete(deleteElder);

export default router;
