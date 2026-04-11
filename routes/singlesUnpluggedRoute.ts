import express from "express";
const router = express.Router();
import { validateBody } from "../middleware/validation/validate.js";
import {
  singlesUnpluggedReservationSchema,
  singlesUnpluggedConfirmPaymentSchema,
} from "../middleware/validation/entitySchemas.js";
import {
  getSeatStats,
  getReservationById,
  createReservation,
  confirmPayment,
  treasuryAuth,
  markReservationPaid,
} from "../controllers/singlesUnpluggedController.js";

router.get("/seats", getSeatStats);
router.get("/reservations/:id", getReservationById);
router.post("/reservations", validateBody(singlesUnpluggedReservationSchema), createReservation);
router.post("/confirm-payment", validateBody(singlesUnpluggedConfirmPaymentSchema), confirmPayment);
router.post("/admin/reservations/:id/mark-paid", treasuryAuth, markReservationPaid);

export default router;
