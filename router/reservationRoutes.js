import { Router } from "express";
import { protect } from "../middlewares/auth.js";
import {
  createReservation,
  getUserReservations,
} from "../controllers/reservationControllers.js";

const router = Router();

router.post("/", protect, createReservation);
router.get("/", protect, getUserReservations);

export default router;
