import { body } from "express-validator";

export const createUserValidator = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3, max: 50 })
    .withMessage("Name must be between 3 and 50 characters"),

  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)
    .withMessage(
      "Password must be at least 8 chars and include uppercase, lowercase, and number",
    ),

  body("role")
    .optional()
    .isIn(["user", "admin"])
    .withMessage("Role must be user or admin"),
];

// Alias kept for compatibility with existing imports.
export const userValidator = createUserValidator;
