import { validationResult } from "express-validator";
import AppError from "../utils/AppError.js";

export const validate = (req, res, next) => {
  // cheak if there a validation error
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new AppError("Validation failed", 400, errors.array()));
  }
  next();
};
