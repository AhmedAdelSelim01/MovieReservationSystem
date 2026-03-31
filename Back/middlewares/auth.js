import jwt from "jsonwebtoken";
import User from "../models/User.js";
import AppError from "../utils/AppError.js";

export const protect = async (req, res, next) => {
  // Prefer Bearer token; fallback to cookie token if available.
  const headerToken = req.headers.authorization?.split(" ")[1];
  const cookieToken = req.cookies?.token;
  const token = headerToken || cookieToken;

  if (!token) {
    return next(new AppError("Not authorized, no token", 401));
  }
  try {
    // verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // get the user from the token and attach it to the request object
    // the password is not included in the user object for security reasons
    // we send the object data to can use it in the next middlewares or controllers
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return next(new AppError("Not authorized, user not found", 401));
    }

    next();
  } catch (error) {
    console.error(error);
    next(new AppError("Not authorized, token failed", 401));
  }
};
