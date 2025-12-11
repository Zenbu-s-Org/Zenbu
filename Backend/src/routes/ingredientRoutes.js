import express from "express";
import Ingredient from "../models/Ingredient.js";
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


router.delete("/:id",  authorize, async (req,res) => {
  try {
   const deleted = await Ingredient.findOneAndDelete({ id: req.params.id });
  if(!deleted){
    return res.status(400).json({
      success: false,
      message: "ingredient not found"
    })
  }
  res.status(200).json({
    success: true,
    ingredient: deleted,
    message: "ingredient successfully deleted"
  })
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
 
})
export default router;
