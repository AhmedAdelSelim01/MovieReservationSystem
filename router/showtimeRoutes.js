import express from "express";
import { protect } from "../middlewares/auth.js";
import isAdmin from "../middlewares/isAdmin.js";
import {
  createShowtime,
  getAllShowtimes,
} from "../controllers/showtimeController.js";

const router = express.Router();

// ceate a new showtime
router.post("/", protect, isAdmin, createShowtime);
// get all showtimes
router.get("/", getAllShowtimes);

export default router;
