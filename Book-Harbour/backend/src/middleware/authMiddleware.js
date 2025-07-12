import { verifyJWT } from "../utils/tokenUtils.js";
import { UnauthenticatedError } from "../errors/customErrors.js";

export const authenticateUser = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer "))
    throw new UnauthenticatedError("Authentication invalid");

  const token = authHeader.split(" ")[1];
  try {
    const { id } = verifyJWT(token);
    req.user = { userId: id };
    next();
  } catch {
    throw new UnauthenticatedError("Authentication invalid");
  }
};
