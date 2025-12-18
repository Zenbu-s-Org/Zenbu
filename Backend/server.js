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

const allowedOrigins = ["http://localhost:5173", "https://zenbuapp.vercel.app"];

// Middleware
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],

        // API-anrop (frontend → backend)
        connectSrc: ["'self'", "https://zenbu-ajsi.onrender.com"],

        // Bilder (Cloudinary + ev data-urls)
        imgSrc: ["'self'", "data:", "https://res.cloudinary.com"],

        // CSS (React + ev inline styles)
        styleSrc: ["'self'", "'unsafe-inline'"],

        // JS
        scriptSrc: ["'self'"],

        // Fonts (om Google Fonts används)
        fontSrc: ["'self'", "https://fonts.gstatic.com"],

        // Säkerhets-härdning
        frameAncestors: ["'none'"],
        objectSrc: ["'none'"],
        baseUri: ["'self'"],
      },
    },
  })
);

app.use(express.json()); // för att kunna läsa JSON i request body
app.use(cookieParser()); // För att du kan läsa cookies i req.cookies
app.use(apiKeyAuth);
// Test-route
app.get("/", (req, res) => {
  res.send("API is running");
});

// Routes
app.use("/api/menu", menuRoutes);
app.use("/api/ingredients", ingredientRoutes);
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
