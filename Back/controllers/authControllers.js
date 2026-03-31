import jwt from "jsonwebtoken";
import User from "../models/User.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";

export const registerUser = catchAsync(async (req, res, next) => {
  const { name, email, password, role } = req.body;
  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new AppError("User already exists", 400));
  }
  // Create new user
  const user = await User.create({ name, email, password, role });
  res.status(201).json({
    message: "User registered successfully",
    user: { id: user._id, name: user.name, email: user.email },
  });
});

export const loginUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  // Check if user exists
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new AppError("Invalid email or password", 400));
  }
  // Check if password is correct
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return next(new AppError("Invalid email or password", 400));
  }
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    },
  );

  // save the token in a httpOnly cookie for security
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.status(200).json({
    message: "User logged in successfully",
    token,
    user: { id: user._id, name: user.name, email: user.email },
  });
});

export const getCurrentUser = catchAsync(async (req, res, next) => {
  if (!req.user?._id) {
    return next(new AppError("Not authorized, no token", 401));
  }

  // get the user from the database
  const user = await User.findById(req.user._id).select("-password");
  if (!user) {
    return next(new AppError("User not found", 404));
  }
  res.status(200).json({ user });
});

export const logoutUser = catchAsync(async (req, res) => {
  // Invalidate the token on the client side by setting it to null or an empty string
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.status(200).json({ message: "User logged out successfully" });
});

// update user profile
