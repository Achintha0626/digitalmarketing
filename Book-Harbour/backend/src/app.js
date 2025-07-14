
import express from "express";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";
import bookRouter from "./routes/bookRouter.js";
import { errorHandlerMiddleware } from "./middleware/errorHandlerMiddleware.js";

dotenv.config();

const app = express();


app.use(express.json());


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});


app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/books", bookRouter);


app.use(errorHandlerMiddleware);

export default app;
