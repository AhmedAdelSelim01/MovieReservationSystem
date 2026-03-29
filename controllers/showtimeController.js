import Showtime from "../models/Showtime.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";

// Create a new showtime
export const createShowtime = catchAsync(async (req, res, next) => {
  const { movie, startTime, availableSeats, totalSeats } = req.body;
  if (availableSeats > totalSeats) {
    return next(new AppError("Available seats cannot exceed total seats", 400));
  }
  const showtime = await Showtime.create({
    movie,
    startTime,
    availableSeats,
    totalSeats,
  });
  res.status(201).json({ success: true, showtime });
});

// Get all showtimes
export const getAllShowtimes = catchAsync(async (req, res) => {
  const showtimes = await Showtime.find().populate("movie");
  res.status(200).json({ success: true, showtimes });
});
