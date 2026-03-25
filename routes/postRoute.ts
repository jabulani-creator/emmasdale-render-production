import express from "express";
const router = express.Router();
import {
  createPost,
  deletePost,
  getAllPosts,
  updatePost,
  getPost,
} from "../controllers/postController.js";
import authenticateUser from "../middleware/auth.js";
import Upload from "../middleware/file-upload.js";
import { validateBody } from "../middleware/validation/validate.js";
import { postSchema } from "../middleware/validation/entitySchemas.js";

router
  .route("/")
  .post(Upload.single("postPhoto"), validateBody(postSchema), authenticateUser, createPost);

router.route("/").get(getAllPosts);
router
  .route("/:id")
  .delete(authenticateUser, deletePost)
  .patch(Upload.single("postPhoto"), validateBody(postSchema), authenticateUser, updatePost)
  .get(getPost);

export default router;
