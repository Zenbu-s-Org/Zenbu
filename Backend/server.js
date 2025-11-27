import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./src/config/db.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // så att du kan läsa JSON i req.body

// Test-route
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// Starta servern + koppla DB
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});
