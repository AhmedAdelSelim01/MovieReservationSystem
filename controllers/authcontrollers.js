import jwt from "jsonwebtoken";
import User from "../models/User.js";
import catchAsync from "../utils/catchAsync.js";

export const registerUser = catchAsync(async (req, res, next) => {
  const { name, email, password, role } = req.body;
  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }
  // Create new user
  const user = await User.create({ name, email, password, role });
  res
    .status(201)
    .json({
      message: "User registered successfully",
      user: { id: user._id, name: user.name, email: user.email },
    });
});

export const loginUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  // Check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "Invalid email or password" });
  }
  // Check if password is correct
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid email or password" });
  }
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    },
  );

  res.status(200).json({
    message: "User logged in successfully",
    token,
    user: { id: user._id, name: user.name, email: user.email },
  });
});
