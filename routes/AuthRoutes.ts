import express from "express";
const router = express.Router();
import {
  register,
  login,
  updateUser,
  getCurrentUser,
  logout,
  addLeader
} from "../controllers/authController.js";
import rateLimiter from "express-rate-limit";
import authenticateUser from "../middleware/auth.js";
import { validateBody } from "../middleware/validation/validate.js";
import { registerSchema, loginSchema, updateUserSchema } from "../middleware/validation/authSchemas.js";

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: "Too many requests from this IP, please try again after 15 minutes",
});

router.route("/register").post(apiLimiter, validateBody(registerSchema), register);
router.route("/login").post(apiLimiter, validateBody(loginSchema), login);
router.route("/updateUser").patch(authenticateUser, validateBody(updateUserSchema), updateUser);
router.route("/getCurrentUser").get(authenticateUser, getCurrentUser);
router.route("/logout").get(logout);

// Admin route to create new leaders
router.route("/add-leader").post(authenticateUser, addLeader);

export default router;
