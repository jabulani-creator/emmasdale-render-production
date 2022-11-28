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

router
  .route("/")
  .post(Upload.single("eventPhoto"), authenticateUser, createEvent)
  .get(getAllEvents);
router
  .route("/:id")
  .delete(authenticateUser, deleteEvent)
  .patch(Upload.single("eventPhoto"), authenticateUser, updateEvent)
  .get(getEvent);

export default router;
