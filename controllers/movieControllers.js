import mongoose from "mongoose";
import Movie from "../models/Movie.js";
import catchAsync from "../utils/catchAsync.js";

// Create a new movie
export const createMovie = catchAsync(async (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      message:
        "Request body is empty. Ensure Content-Type: application/json header is set.",
    });
  }

  const {
    title,
    description,
    releaseDate,
    genre,
    director,
    duration,
    rating,
    image,
  } = req.body;
  const movie = await Movie.create({
    title,
    description,
    releaseDate,
    genre,
    director,
    duration,
    rating,
    image,
  });
  res.status(201).json({ success: true, movie });
});

// Get all movies
export const getAllMovies = catchAsync(async (req, res) => {
  const movies = await Movie.find();
  res.status(200).json({ success: true, movies });
});

// get movie by id
export const getMovieById = catchAsync(async (req, res) => {
  // check if id is a valid MongoDB ObjectId
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid movie ID format" });
  }
  // find movie by id
  const movie = await Movie.findById(id);
  // if movie not found return 404
  if (!movie) {
    return res.status(404).json({ message: "Movie not found" });
  }
  // if movie found return movie data
  res.status(200).json({ success: true, movie });
});

// Update movie by id
export const updateMovieById = catchAsync(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid movie ID format" });
  }
  const movie = await Movie.findByIdAndUpdate(id, req.body, { new: true });
  if (!movie) {
    return res.status(404).json({ message: "Movie not found" });
  }
  res.status(200).json({ success: true, movie });
});

// Delete movie by id
export const deleteMovieById = catchAsync(async (req, res) => {
  const { id } = req.params;
  //check if id is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid movie ID format" });
  }
  const movie = await Movie.findByIdAndDelete(id);
  if (!movie) {
    return res.status(404).json({ message: "Movie not found" });
  }
  res
    .status(200)
    .json({ success: true, message: "Movie deleted successfully" });
});
