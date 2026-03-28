import { Router } from "express";
import { protect } from "../middlewares/auth.js";
import isAdmin from "../middlewares/isAdmin.js";
import {
  getAllMovies,
  createMovie,
  getMovieById,
  updateMovieById,
  deleteMovieById,
} from "../controllers/movieControllers.js";

const router = Router();

// Create a new movie - Must authenticate (protect) first, then check admin (isAdmin)
router.post("/", protect, isAdmin, createMovie);
// Get all movies
router.get("/", getAllMovies);
// Get movie by id
router.get("/:id", getMovieById);
// update movie by id
router.put("/:id", protect, isAdmin, updateMovieById);
// delete movie by id
router.delete("/:id", protect, isAdmin, deleteMovieById);


export default router;
