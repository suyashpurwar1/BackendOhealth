import { Router } from "express";
import { body } from "express-validator";
import { register, login } from "./../controllers/controller.js";
import { validateRequest } from "./../middleware/middleware.js";

const router = Router();

router.post(
  "/register",
  [
    body("panNumber").notEmpty().withMessage("PAN number is required"),
    body("name").notEmpty().withMessage("Name is required"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long"),
    body("email")
      .optional()
      .isEmail()
      .withMessage("Please enter a valid email address"),
    body("mobile")
      .optional()
      .matches(/^[0-9]{10}$/)
      .withMessage("Please enter a valid mobile number"),
    body("dob").optional().isString().withMessage("Date of birth"),
  ],
  register
);

router.post(
  "/login",
  [
    body("panNumber").notEmpty().withMessage("PAN number is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  validateRequest,
  login
);

export default router;
