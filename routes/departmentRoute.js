import express from "express";
const router = express.Router();
import {
  createPosition,
  deletePosition,
  getAllPosition,
} from "../controllers/departmentController.js";
import authenticateUser from "../middleware/auth.js";
import Upload from "../middleware/file-upload.js";

router
  .route("/")
  .post(Upload.single("photo"), authenticateUser, createPosition)
  .get(getAllPosition);
router.route("/:id").delete(deletePosition);

export default router;
