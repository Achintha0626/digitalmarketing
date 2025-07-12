import express from "express";
import multer from "multer";
import {
  createBook,
  getAllBooks,
  getBook,
  updateBook,
  deleteBook,
} from "../controllers/bookController.js";
import { authenticateUser } from "../middleware/authMiddleware.js";

const router = express.Router();


const storage = multer.memoryStorage();
const upload = multer({ storage });

router.use(authenticateUser);

router.route("/").post(upload.single("image"), createBook).get(getAllBooks);

router
  .route("/:id")
  .get(getBook)
  .patch(upload.single("image"), updateBook)
  .delete(deleteBook);

export default router;
