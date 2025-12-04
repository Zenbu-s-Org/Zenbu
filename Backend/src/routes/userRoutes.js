import express from "express";
import User from "../models/User.js";
import { validateUser } from "../middlewares/validateUser.js";

const router = express.Router();

// GET-anrop för att hämta alla users /api/users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET-anrop för att hämta specifik user genom ID /api/users/:id
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Användare hittades inte" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST anrop för att skapa ny user /api/users & validera input
router.post("/", validateUser, async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
