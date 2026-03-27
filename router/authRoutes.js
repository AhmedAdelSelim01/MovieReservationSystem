import express from "express";
import { loginUser, registerUser } from "../controllers/authcontrollers.js";
import { protect } from "../middlewares/auth.js";
const router = express.Router();

// Register route
router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/protected", protect, (req, res) => {
  res.status(200).json({ message: "This is a protected route" });
});

export default router;
