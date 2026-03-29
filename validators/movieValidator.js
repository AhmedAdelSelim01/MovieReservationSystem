import { body } from "express-validator";

export const movieValidator = [
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isAlphanumeric("en-US", { ignore: " " })
    .withMessage("Title must be alphanumeric"),

  body("description").notEmpty().withMessage("Description is required").trim(),

  body("releaseDate")
    .isDate()
    .notEmpty()
    .withMessage("Release date is required")
    .isISO8601(),

  body("genre").notEmpty().withMessage("Genre is required"),

  body("director").notEmpty().withMessage("Director is required"),

  body("duration")
    .isNumeric()
    .notEmpty()
    .withMessage("Duration is required")
    .isInt({ min: 1 })
    .withMessage("Duration must be a positive integer"),

  body("rating")
    .notEmpty()
    .withMessage("Rating is required")
    .isFloat({ min: 0, max: 10 })
    .withMessage("Rating must be between 0 and 10"),

  body("image").optional().isURL().withMessage("Image must be a valid URL"),
];
