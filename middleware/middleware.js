import jwt from "jsonwebtoken";
const { verify } = jwt;
import { validationResult } from "express-validator";

export function validateRequest(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

export function authenticateUser(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = verify(token, process.env.JWT_SECRET);
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (error) {
    res.status(401).json({ message: "Authentication failed" });
  }
}
