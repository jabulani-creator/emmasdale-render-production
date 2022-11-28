import express from "express";
const router = express.Router();
import {
  createElder,
  deleteElder,
  getAllElders,
} from "../controllers/eldersController.js";
import authenticateUser from "../middleware/auth.js";
import Upload from "../middleware/file-upload.js";

router
  .route("/")
  .post(Upload.single("photo"), authenticateUser, createElder)
  .get(getAllElders);
router.route("/:id").delete(deleteElder);

export default router;
