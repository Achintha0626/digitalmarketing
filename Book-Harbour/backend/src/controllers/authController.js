import { StatusCodes } from "http-status-codes";
import User from "../models/User.js";
import { hashPassword, comparePassword } from "../utils/passwordUtils.js";
import { createJWT } from "../utils/tokenUtils.js";
import {
  BadRequestError,
  UnauthenticatedError,
} from "../errors/customErrors.js";

export const register = async (req, res, next) => {
  try {
    
    const { firstName, lastName, email, password } = req.body;
    const normalizedEmail = email.trim().toLowerCase();

   
    if (await User.findOne({ email: normalizedEmail })) {
      throw new BadRequestError("Email already in use");
    }

    
    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS, 10) || 10;
    const hashed = await hashPassword(password, saltRounds);

    
    const user = await User.create({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: normalizedEmail,
      password: hashed,
    });

    
    const token = createJWT({ id: user._id });

   
    res.status(StatusCodes.CREATED).json({
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
      token,
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    
    const { email, password } = req.body;
    const normalizedEmail = email.trim().toLowerCase();

    
    const user = await User.findOne({ email: normalizedEmail });
    if (!user || !(await comparePassword(password, user.password))) {
      throw new UnauthenticatedError("Invalid credentials");
    }

    
    const token = createJWT({ id: user._id });

    
    res.status(StatusCodes.OK).json({
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
      token,
    });
  } catch (err) {
    next(err);
  }
};

export const logout = (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "User logged out successfully" });
};