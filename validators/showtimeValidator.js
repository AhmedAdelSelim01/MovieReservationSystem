import { body } from "express-validator";

export const showtimeValidator = [
  body("movie")
    .notEmpty()
    .withMessage("Movie ID is required")
    .bail()
    .isMongoId()
    .withMessage("Invalid Movie ID"),

  body("startTime")
    .notEmpty()
    .withMessage("Start time is required")
    .bail()
    .isISO8601()
    .withMessage("Start time must be a valid ISO 8601 date"),

  body("availableSeats")
    .notEmpty()
    .withMessage("Available seats is required")
    .bail()
    .isInt({ min: 0 })
    .withMessage(
      "Available seats must be an integer greater than or equal to 0",
    ),

  body("totalSeats")
    .notEmpty()
    .withMessage("Total seats is required")
    .bail()
    .isInt({ min: 1 })
    .withMessage("Total seats must be a positive integer"),
];
