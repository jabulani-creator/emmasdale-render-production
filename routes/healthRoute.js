import express from "express";
const router = express.Router();
import {
  createHealthPost,
  deleteHealthPost,
  getAllHealthPosts,
  getHealthPost,
  updateHealthPost,
} from "../controllers/healthController.js";
import authenticateUser from "../middleware/auth.js";
import Upload from "../middleware/file-upload.js";

router
  .route("/")
  .post(Upload.single("healthPhoto"), authenticateUser, createHealthPost)
  .get(getAllHealthPosts);
router
  .route("/:id")
  .delete(authenticateUser, deleteHealthPost)
  .patch(Upload.single("healthPhoto"), authenticateUser, updateHealthPost)
  .get(getHealthPost);

export default router;
