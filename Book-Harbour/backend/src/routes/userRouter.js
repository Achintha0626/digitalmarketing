// src/routes/userRouter.js
import express from "express";
import multer from "multer";
import { showCurrentUser, updateUser } from "../controllers/userController.js";
import { authenticateUser } from "../middleware/authMiddleware.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });


router.use(authenticateUser);


router.get("/show-me", showCurrentUser);


router.patch("/update-user", upload.single("avatar"), updateUser);

export default router;
