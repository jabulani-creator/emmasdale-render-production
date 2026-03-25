import express from "express";
const router = express.Router();
import {
  createRequest,
  deleteRequest,
  getAllRequest,
} from "../controllers/contactController.js";
import { validateBody } from "../middleware/validation/validate.js";
import { contactSchema } from "../middleware/validation/entitySchemas.js";

router.route("/").post(validateBody(contactSchema), createRequest).get(getAllRequest);
router.route("/:id").delete(deleteRequest);

export default router;
