import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    releaseDate: {
      type: Date,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: [0, "Rating must be at least 0"],
      max: [10, "Rating must be at most 10"],
    },
    image: {
      type: String,
    },
  },
  { timestamps: true },
);

const Movie = mongoose.model("Movie", movieSchema);
export default Movie;
