import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import authRouter from "./routes/authRouter.js";
import { errorHandlerMiddleware } from "./middleware/errorHandlerMiddleware.js";

dotenv.config();

const app = express();
app.use(express.json());


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log(" MongoDB connected"))
  .catch((err) => {
    console.error(" MongoDB connection error:", err.message);
    process.exit(1);
  });

// --- Routes ---
app.use("/api/auth", authRouter);

// --- Global Error Handler ---
app.use(errorHandlerMiddleware);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
