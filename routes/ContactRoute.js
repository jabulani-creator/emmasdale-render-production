import express from "express";
const router = express.Router();
import {
  createRequest,
  deleteRequest,
  getAllRequest,
} from "../controllers/contactController.js";

router.route("/").post(createRequest).get(getAllRequest);
router.route("/:id").delete(deleteRequest);

export default router;
