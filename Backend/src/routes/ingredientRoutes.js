import express from "express";
import Ingredient from "../models/Ingredient.js";

const router = express.Router();

// GET-anrop för att hämta alla ingredienser /api/ingredients
router.get("/", async (req, res) => {
  try {
    const ingredients = await Ingredient.find();
    res.json(ingredients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
