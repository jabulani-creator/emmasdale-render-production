import express from "express";
const router = express.Router();
import {
  createPosition,
  deletePosition,
  getAllPosition,
} from "../controllers/departmentController.js";
import authenticateUser from "../middleware/auth.js";
import Upload from "../middleware/file-upload.js";
import { validateBody } from "../middleware/validation/validate.js";
import { personnelSchema } from "../middleware/validation/entitySchemas.js";

router
  .route("/")
  .post(Upload.single("photo"), validateBody(personnelSchema), authenticateUser, createPosition)
  .get(getAllPosition);
router.route("/:id").delete(deletePosition);

export default router;
