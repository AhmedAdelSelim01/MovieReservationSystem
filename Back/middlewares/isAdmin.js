import AppError from "../utils/AppError.js";

export default function isAdmin(req, res, next) {
  // Check if user exists and has admin role
  // Note: This middleware requires the protect middleware to run first
  if (!req.user) {
    return next(new AppError("Not authorized, please login first", 401));
  }

  if (req.user.role === "admin") {
    return next();
  }

  return next(new AppError("Access denied. Admins only.", 403));
}
