import Showtime from "../models/Showtime.js";
import catchAsync from "../utils/catchAsync.js";

// Create a new showtime
export const createShowtime = catchAsync(async (req, res) => {
  const { movie, startTime, availableSeats, totalSeats } = req.body;
  if (availableSeats > totalSeats) {
    return res.status(400).json({
      message: "Available seats cannot exceed total seats",
    });
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
