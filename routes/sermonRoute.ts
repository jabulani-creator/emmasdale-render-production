import express from "express";
const router = express.Router();
import authenticateUser from "../middleware/auth";
import { createSermon, getAllSermons, deleteSermon } from "../controllers/sermonController";

// Public route to get sermons
router.route("/").get(getAllSermons);

// Protected routes to create/delete sermons
router.route("/").post(authenticateUser, createSermon);
router.route("/:id").delete(authenticateUser, deleteSermon);

export default router;