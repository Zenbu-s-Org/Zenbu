import express from "express";
import Ingredient from "../models/Ingredient.js";
import { nanoid } from "nanoid";
import { authorize } from "../middlewares/authMiddleware.js";

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


router.post("/",authorize, async (req,res) => {
  try {
    
    const {name, category, qty} = req.body
    const id = `ing-${nanoid(6)}`
    const addIngredient = await Ingredient.create(
      {
        id: id,
        name: name,
        category: category,
        qty: qty,
        createdAt: new Date().toISOString()
      }
    )
  
    res.status(200).json({
      success: true,
      message: "ingredient added",
      ingredient: addIngredient
    })
  } catch (error) {
    res.status(500).json({ message: error.message });
    
  }
})
export default router;
