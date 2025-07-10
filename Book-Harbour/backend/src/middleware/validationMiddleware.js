import { body, validationResult } from "express-validator";
import { BadRequestError } from "../errors/customErrors.js";

const withValidationErrors = (validators) => [
  ...validators,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // collect all error messages
      const msgs = errors.array().map((e) => e.msg);
      throw new BadRequestError(msgs);
    }
    next();
  },
];

/** Validate incoming JSON for user registration */
export const validateRegisterInput = withValidationErrors([
  body("firstName")
    .notEmpty()
    .withMessage("firstName is required")
    .isLength({ min: 2 })
    .withMessage("firstName must be at least 2 characters"),
  body("lastName")
    .notEmpty()
    .withMessage("lastName is required")
    .isLength({ min: 2 })
    .withMessage("lastName must be at least 2 characters"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format"),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 6 })
    .withMessage("password must be at least 6 characters"),
]);

/** Validate incoming JSON for user login */
export const validateLoginInput = withValidationErrors([
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format"),
  body("password").notEmpty().withMessage("password is required"),
]);
