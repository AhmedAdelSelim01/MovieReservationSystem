import mongoose from "mongoose";

export const reservationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    showtime: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Showtime",
      required: true,
    },
    seatsBooked: {
      type: Number,
      required: true,
      min: [1, "At least one seat must be booked"],
    },
  },
  { timestamps: true },
);

const Reservation = mongoose.model("Reservation", reservationSchema);

export default Reservation;
