import express from "express";
const router = express.Router();
import {
  createEvent,
  deleteEvent,
  getAllEvents,
  getEvent,
  updateEvent,
} from "../controllers/eventsController.js";
import authenticateUser from "../middleware/auth.js";
import Upload from "../middleware/file-upload.js";
import { validateBody } from "../middleware/validation/validate.js";
import { eventSchema } from "../middleware/validation/entitySchemas.js";

router
  .route("/")
  .post(Upload.single("eventPhoto"), validateBody(eventSchema), authenticateUser, createEvent)
  .get(getAllEvents);
router
  .route("/:id")
  .delete(authenticateUser, deleteEvent)
  .patch(Upload.single("eventPhoto"), validateBody(eventSchema), authenticateUser, updateEvent)
  .get(getEvent);

export default router;
