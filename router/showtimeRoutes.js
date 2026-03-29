import express from "express";
import { protect } from "../middlewares/auth.js";
import isAdmin from "../middlewares/isAdmin.js";
import { showtimeValidator } from "../validators/showtimeValidator.js";
import { validate } from "../middlewares/validate.js";
import {
  createShowtime,
  deleteShowtime,
  editShowtime,
  getAllShowtimes,
  getShowtimeById,
} from "../controllers/showtimeController.js";

const router = express.Router();

// ceate a new showtime
router.post("/", protect, isAdmin, showtimeValidator, validate, createShowtime);
// get all showtimes
router.get("/", getAllShowtimes);

//get a showtime by id
router.get("/:id", protect, getShowtimeById);

// detele ashowtime by id admin only
router.delete("/:id", protect, isAdmin, deleteShowtime);

// edit a showtime by id admin only
router.put("/:id", protect, isAdmin, showtimeValidator, validate, editShowtime);

export default router;
