import mongoose from "mongoose";
import Book from "../models/Book.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/customErrors.js";
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";


const uploadToCloudinary = (buffer) =>
  new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "book_images" },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    streamifier.createReadStream(buffer).pipe(uploadStream);
  });


export const createBook = async (req, res) => {
  const { title, author, type, status } = req.body;
  const { userId } = req.user;
  if (!req.file) throw new BadRequestError("Book image is required");

  const result = await uploadToCloudinary(req.file.buffer);
  const book = await Book.create({
    title,
    author,
    type,
    status,
    image: result.secure_url,
    createdBy: userId,
  });

  res.status(StatusCodes.CREATED).json({ book });
};


export const getAllBooks = async (req, res) => {
  const { search, status, type, sort, page, limit } = req.query;
  const { userId } = req.user;

  
  const pageNum = Number(page) || 1;
  const limitNum = Number(limit) || 10;
  const skip = (pageNum - 1) * limitNum;

  
  const filter = { createdBy: userId };
  if (search) {
    filter.$or = [
      { title: new RegExp(search, "i") },
      { author: new RegExp(search, "i") },
    ];
  }
  if (status && status !== "all") filter.status = status;
  if (type && type !== "all") filter.type = type;

  
  let sortBy = "-createdAt";
  if (sort === "oldest") sortBy = "createdAt";
  else if (sort === "a-z") sortBy = "title";
  else if (sort === "z-a") sortBy = "-title";


  const [books, totalBooks] = await Promise.all([
    Book.find(filter).sort(sortBy).skip(skip).limit(limitNum),
    Book.countDocuments(filter),
  ]);

  const numOfPages = Math.ceil(totalBooks / limitNum);

  res
    .status(StatusCodes.OK)
    .json({ books, totalBooks, numOfPages, currentPage: pageNum });
};


export const getBook = async (req, res) => {
  const { id: bookId } = req.params;
  const { userId } = req.user;

  const book = await Book.findOne({ _id: bookId, createdBy: userId });
  if (!book) throw new NotFoundError(`No book with id ${bookId}`);
  res.status(StatusCodes.OK).json({ book });
};


export const updateBook = async (req, res) => {
  const { id: bookId } = req.params;
  const { title, author, type, status } = req.body;
  const { userId } = req.user;

  const updateData = { title, author, type, status };
  if (req.file) {
    const result = await uploadToCloudinary(req.file.buffer);
    updateData.image = result.secure_url;
  }

  const book = await Book.findOneAndUpdate(
    { _id: bookId, createdBy: userId },
    updateData,
    { new: true, runValidators: true }
  );
  if (!book) throw new NotFoundError(`No book with id ${bookId}`);

  res.status(StatusCodes.OK).json({ book });
};


export const deleteBook = async (req, res) => {
  const { id: bookId } = req.params;
  const { userId } = req.user;

  const book = await Book.findOneAndDelete({ _id: bookId, createdBy: userId });
  if (!book) throw new NotFoundError(`No book with id ${bookId}`);

 
  if (book.image) {
    const publicId = book.image.split("/").pop().split(".")[0];
    await cloudinary.uploader.destroy(`book_images/${publicId}`);
  }

  res.status(StatusCodes.OK).json({ msg: "Book deleted" });
};


export const showStats = async (req, res) => {
  const { userId } = req.user;
  const ownerId = new mongoose.Types.ObjectId(userId);

  const rawStats = await Book.aggregate([
    { $match: { createdBy: ownerId } },
    { $group: { _id: "$status", count: { $sum: 1 } } },
  ]);

  const defaultStats = { toRead: 0, reading: 0, finished: 0 };
  rawStats.forEach((item) => {
    if (item._id === "To Read") defaultStats.toRead = item.count;
    if (item._id === "Reading") defaultStats.reading = item.count;
    if (item._id === "Finished") defaultStats.finished = item.count;
  });

  res.status(StatusCodes.OK).json({ defaultStats });
};
