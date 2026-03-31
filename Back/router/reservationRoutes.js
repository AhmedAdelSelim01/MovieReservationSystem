import { Router } from "express";
import { protect } from "../middlewares/auth.js";
import { reservationValidator } from "../validators/reservationValidator.js";
import { validate } from "../middlewares/validate.js";
import {
  cancelReservation,
  createReservation,
  getAllReservations,
  getReservationById,
  getUserReservations,
} from "../controllers/reservationControllers.js";
import isAdmin from "../middlewares/isAdmin.js";

const router = Router();

// Create a new reservation
router.post("/", protect, reservationValidator, validate, createReservation);

// Get all reservations for the logged-in user
router.get("/", protect, getUserReservations);

//this route is for admin to get all reservations
router.get("/all", protect, isAdmin, getAllReservations);

// delete a reservation by the user who made it or by an admin
router.delete("/:id", protect, cancelReservation);

// get a reservation by id for the user who made it or for an admin
router.get("/:id", protect, getReservationById);

export default router;
