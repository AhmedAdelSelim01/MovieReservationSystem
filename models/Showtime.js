import mongoose from "mongoose";

const showtimeSchema = new mongoose.Schema(
  {
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie", // link to movie
      required: true,
    },
    startTime: {
      type: Date,
      required: true,
    },
    availableSeats: {
      type: Number,
      required: true,
    },
    totalSeats: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

const Showtime = mongoose.model("Showtime", showtimeSchema);

export default Showtime;
