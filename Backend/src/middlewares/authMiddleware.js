import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  const token = req.cookies?.token; // cookie-only

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not authorized, no token",
    });
  }

  try {
    // Verifiera token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Hämta användare från databasen (utan lösenord)
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Not authorized, invalid token",
    });
  }
};

// Middleware för att kolla specifik roll
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `User with role '${req.user.role}' is not authorized to access this route`,
      });
    }
    next();
  };
};
