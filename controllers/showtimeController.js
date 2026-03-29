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

// //cancle a showtime by id, and update the available seats in the showtime accordingly
// export const cancelShowtime = catchAsync(async (req, res, next) => {
//   const { id } = req.params;
//   const showtime = await Showtime.findById(id);
//   if (!showtime) {
//     return next(new AppError("Showtime not found", 404));
//   }
//   showtime.availableSeats = showtime.totalSeats;
//   await showtime.save();
//   res.status(200).json({ message: "Showtime cancelled successfully" });
// });

// delete a showtime by id, and update the available seats in the showtime accordingly
export const deleteShowtime = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const showtime = await Showtime.findById(id);
  if (!showtime) {
    return next(new AppError("Showtime not found", 404));
  }
  await showtime.deleteOne();
  res.status(200).json({ message: "Showtime deleted successfully" });
});

// edit showtime by id, and update the available seats in the showtime accordingly
export const editShowtime = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { movie, startTime, availableSeats, totalSeats } = req.body;
  if (availableSeats > totalSeats) {
    return next(new AppError("Available seats cannot exceed total seats", 400));
  }
  const showtime = await Showtime.findById(id);
  if (!showtime) {
    return next(new AppError("Showtime not found", 404));
  }
  showtime.movie = movie || showtime.movie;
  showtime.startTime = startTime || showtime.startTime;
  showtime.availableSeats = availableSeats || showtime.availableSeats;
  showtime.totalSeats = totalSeats || showtime.totalSeats;
  await showtime.save();
  res.status(200).json({ message: "Showtime updated successfully", showtime });
});

// get a showtime by id
export const getShowtimeById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const showtime = await Showtime.findById(id).populate("movie");
  if (!showtime) {
    return next(new AppError("Showtime not found", 404));
  }
  res.status(200).json({ success: true, showtime });
});
