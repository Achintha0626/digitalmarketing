
import mongoose from "mongoose";
import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors/customErrors.js";
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";


const uploadToCloudinary = (buffer) =>
  new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "user_avatars" },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    streamifier.createReadStream(buffer).pipe(uploadStream);
  });


export const showCurrentUser = async (req, res) => {
  const user = await User.findById(req.user.userId).select("-password");
  res.status(StatusCodes.OK).json({ user });
};


export const updateUser = async (req, res) => {
  const { firstName, lastName, email } = req.body;
  if (!firstName || !lastName || !email) {
    throw new BadRequestError("Please provide firstName, lastName and email");
  }

  const updateData = {
    firstName: firstName.trim(),
    lastName: lastName.trim(),
    email: email.trim().toLowerCase(),
  };

  
  if (req.file) {
    const result = await uploadToCloudinary(req.file.buffer);
    updateData.avatar = result.secure_url;
  }

  const user = await User.findByIdAndUpdate(req.user.userId, updateData, {
    new: true,
    runValidators: true,
  }).select("-password");

  res.status(StatusCodes.OK).json({ user });
};
