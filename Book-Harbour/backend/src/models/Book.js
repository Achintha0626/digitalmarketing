import mongoose from "mongoose";

const BookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide book title"],
      trim: true,
    },
    author: {
      type: String,
      required: [true, "Please provide author"],
      trim: true,
    },
    type: {
      type: String,
      enum: [
        "Fantasy",
        "Horror",
        "Science Fiction",
        "Romance",
        "Thriller/Suspense",
        "Others",
      ],
      default: "Others",
    },
    status: {
      type: String,
      enum: ["To Read", "Reading", "Finished"],
      default: "To Read",
    },
    image: {
      type: String,
      required: [true, "Please upload a book image"],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Book", BookSchema);
