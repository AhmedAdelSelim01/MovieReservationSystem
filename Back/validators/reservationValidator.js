import { body } from "express-validator";

export const reservationValidator = [
  body("user")
    .notEmpty()
    .withMessage("User ID is required")
    .isMongoId()
    .withMessage("Invalid User ID"),
  body("showtime")
    .notEmpty()
    .withMessage("Showtime ID is required")
    .isMongoId()
    .withMessage("Invalid Showtime ID"),
  body("seatsBooked")
    .notEmpty()
    .withMessage("Number of seats booked is required")
    .isInt({ min: 1 })
    .withMessage("At least one seat must be booked"),
];
