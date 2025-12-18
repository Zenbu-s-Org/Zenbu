import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./src/config/db.js";
import cookieParser from "cookie-parser";

import menuRoutes from "./src/routes/menuRoutes.js";
import ingredientRoutes from "./src/routes/ingredientRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import orderRoutes from "./src/routes/orderRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";

import { apiKeyAuth } from "./src/middlewares/apiKeyAuth.js";
import { errorHandler, notFound } from "./src/middlewares/errorHandler.js";
import helmet from "helmet";

dotenv.config();

const app = express();

app.set("trust proxy", 1);

const allowedOrigins = [
  "http://localhost:5173",
  "https://zenbu-one.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        connectSrc: ["'self'", "https://zenbu-ajsi.onrender.com"],
        imgSrc: ["'self'", "data:", "https://res.cloudinary.com"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        frameAncestors: ["'none'"],
        objectSrc: ["'none'"],
        baseUri: ["'self'"],
      },
    },
  })
);

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/menu", apiKeyAuth, menuRoutes);
app.use("/api/ingredients", apiKeyAuth, ingredientRoutes);
app.use("/api/order", apiKeyAuth, orderRoutes);
app.use("/api/users", apiKeyAuth, userRoutes);
app.use("/api/auth", authRoutes);
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});
