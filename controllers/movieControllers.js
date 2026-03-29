import mongoose from "mongoose";
import Movie from "../models/Movie.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";

const MOVIE_UPDATABLE_FIELDS = ["title", "description", "duration", "genre"];

// Create a new movie
export const createMovie = catchAsync(async (req, res, next) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return next(
      new AppError(
        "Request body is empty. Ensure Content-Type: application/json header is set.",
        400,
      ),
    );
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
export const getMovieById = catchAsync(async (req, res, next) => {
  // check if id is a valid MongoDB ObjectId
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new AppError("Invalid movie ID format", 400));
  }
  // find movie by id
  const movie = await Movie.findById(id);
  // if movie not found return 404
  if (!movie) {
    return next(new AppError("Movie not found", 404));
  }
  // if movie found return movie data
  res.status(200).json({ success: true, movie });
});

// Update movie by id
export const updateMovieById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new AppError("Invalid movie ID format", 400));
  }

  if (!req.body || Object.keys(req.body).length === 0) {
    return next(new AppError("No data provided to update", 400));
  }

  // Whitelist only fields that are allowed to be updated from this endpoint.
  const filteredBody = Object.fromEntries(
    Object.entries(req.body).filter(([field, value]) => {
      return MOVIE_UPDATABLE_FIELDS.includes(field) && value !== undefined;
    }),
  );

  if (Object.keys(filteredBody).length === 0) {
    return next(
      new AppError("No valid fields provided to update", 400, {
        allowedFields: MOVIE_UPDATABLE_FIELDS,
      }),
    );
  }

  const movie = await Movie.findByIdAndUpdate(id, filteredBody, {
    new: true,
    runValidators: true,
  });

  if (!movie) {
    return next(new AppError("Movie not found", 404));
  }

  res.status(200).json({ success: true, movie });
});

// Delete movie by id
export const deleteMovieById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  //check if id is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new AppError("Invalid movie ID format", 400));
  }
  const movie = await Movie.findByIdAndDelete(id);
  if (!movie) {
    return next(new AppError("Movie not found", 404));
  }
  res
    .status(200)
    .json({ success: true, message: "Movie deleted successfully" });
});
