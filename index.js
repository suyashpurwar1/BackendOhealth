import dotenv from "dotenv";
dotenv.config();

import express, { json } from "express";
import cors from "cors";
import { connect } from "mongoose";
import authRoutes from "./route/routes.js";

const app = express();

// Middleware
app.use(cors());
app.use(json());

// Connect to MongoDB
connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// Routes
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
