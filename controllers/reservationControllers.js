import mongoose from "mongoose";
import Reservation from "../models/Reservation.js";
import showtime from "../models/Showtime.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";

// `createReservation` controller to handle reservation creation
export const createReservation = catchAsync(async (req, res, next) => {
  const { showtime: showtimeId, seatsBooked } = req.body;

  // find the showtime
  const showtimeDoc = await showtime.findById(showtimeId);
  if (!showtimeDoc) {
    return next(new AppError("Showtime not found", 404));
  }
  //check if there are enough seats available
  if (showtimeDoc.availableSeats < seatsBooked) {
    return next(new AppError("Not enough seats available", 400));
  }
  const reservation = await Reservation.create({
    user: req.user._id,
    showtime: showtimeId,
    seatsBooked,
  });

  // update the available seats in the showtime
  showtimeDoc.availableSeats -= seatsBooked;
  await showtimeDoc.save();

  res
    .status(201)
    .json({ message: "Reservation created successfully", reservation });
});

// Get all reservations for the logged-in user
export const getUserReservations = catchAsync(async (req, res) => {
  const reservations = await Reservation.find({ user: req.user._id }).populate(
    "showtime",
  );
  res.status(200).json({ reservations });
});
