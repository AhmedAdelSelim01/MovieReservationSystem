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

// the admin get all reservations
export const getAllReservations = catchAsync(async (req, res) => {
  const reservations = await Reservation.find()
    .populate("showtime")
    .populate("user", "name email");
  res.status(200).json({ reservations });
});

// cancel a reservation by the user who made it or by an admin, and update the available seats in the showtime accordingly
export const cancelReservation = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new AppError("Invalid reservation ID format", 400));
  }
  const reservation = await Reservation.findById(id);
  if (!reservation) {
    return next(new AppError("Reservation not found", 404));
  }
  // check if the reservation belongs to the user or the user is an admin
  if (
    reservation.user.toString() !== req.user._id.toString() &&
    req.user.role !== "admin"
  ) {
    return next(new AppError("Not authorized to cancel this reservation", 403));
  }
  // update the available seats in the showtime
  const showtimeDoc = await showtime.findById(reservation.showtime);
  if (showtimeDoc) {
    showtimeDoc.availableSeats += reservation.seatsBooked;
    await showtimeDoc.save();
  } else {
    console.warn(
      `Showtime with ID ${reservation.showtime} not found while canceling reservation ${id}`,
    );
  }
  await reservation.deleteOne();
  res.status(200).json({ message: "Reservation canceled successfully" });
});

//get a reservation by id, only the user who made the reservation or an admin can access it
export const getReservationById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new AppError("Invalid reservation ID format", 400));
  }
  const reservation = await Reservation.findById(id)
    .populate("showtime")
    .populate("user", "name email");
  if (!reservation) {
    return next(new AppError("Reservation not found", 404));
  }
  // check if the reservation belongs to the user or the user is an admin
  if (
    reservation.user._id.toString() !== req.user._id.toString() &&
    req.user.role !== "admin"
  ) {
    return next(new AppError("Not authorized to view this reservation", 403));
  }
  res.status(200).json({ reservation });
});


