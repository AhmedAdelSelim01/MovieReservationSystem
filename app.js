import express from "express";
import cors from "cors";
import authRoutes from "./router/authRoutes.js";
import movieRoutes from "./router/movieRoutes.js";
import showtimeRoutes from "./router/showtimeRoutes.js";
import reservationRoutes from "./router/reservationRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API working!");
});

app.use("/api/auth", authRoutes);

app.use("/api/movies", movieRoutes);

app.use("/api/showtimes", showtimeRoutes);

app.use("/api/reservations", reservationRoutes);

// erroe handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(err.statusCode || 500)
    .json({ message: err.message || "An unexpected error occurred" });
});

export default app;
