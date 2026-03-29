import { Router } from "express";
import { protect } from "../middlewares/auth.js";
import { reservationValidator } from "../validators/reservationValidator.js";
import { validate } from "../middlewares/validate.js";
import {
  createReservation,
  getUserReservations,
} from "../controllers/reservationControllers.js";

const router = Router();

router.post("/", protect, reservationValidator, validate, createReservation);
router.get("/", protect, getUserReservations);

export default router;
