import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./src/config/db.js";
import cookieParser from "cookie-parser";
import menuRoutes from "./src/routes/menuRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import orderRoutes from "./src/routes/orderRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";
import { errorHandler, notFound } from "./src/middlewares/errorHandler.js";

dotenv.config();

const app = express();
const allowedOrigins = [
  "http://localhost:5173",
  "http://zenbu-app.s3-website.eu-north-1.amazonaws.com",
];

// Middleware
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.use(express.json()); // för att kunna läsa JSON i request body
app.use(cookieParser()); // För att du kan läsa cookies i req.cookies

// Test-route
app.get("/", (req, res) => {
  res.send("API is running");
});

// Routes
app.use("/api/menu", menuRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

// Error handlers
app.use(notFound);
app.use(errorHandler);

// Starta servern + koppla DB
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});
