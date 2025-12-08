import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  let token;

  // Kolla efter token i Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  // Kolla efter token i cookies
  else if (req.cookies.token) {
    token = req.cookies.token;
  }

  // Om ingen token finns
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
