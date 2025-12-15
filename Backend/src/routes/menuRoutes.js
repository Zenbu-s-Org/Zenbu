import express from "express";
import MenuItem from "../models/MenuItem.js";
import { nanoid } from "nanoid";
import { authorize, protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// GET-anrop för att hämta alla rätter /api/menu
router.get("/", async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET-anrop för att hämta specifik rätt genom ID /api/menu/:id
router.get("/:id", async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);
    if (!menuItem) {
      return res.status(404).json({ message: "Meny rätten hittades inte" });
    }
    res.json(menuItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//post anrop för att göra ett nytt item i menyn

router.post("/", protect, authorize("admin"), async (req, res) => {
  try {
    const { name, price, category, img, desc } = req.body;
    const id = `prod-${nanoid(5)}`;
    const newProduct = await MenuItem.create({
      name: name,
      price: price,
      category: category,
      desc: desc,
      img: img,
      id: id,
      createdAt: new Date().toISOString(),
    });

    res.status(201).json({
      success: true,
      message: "product added to menu",
      product: newProduct,
    });
  } catch (error) {
    console.error("CREATE PRODUCT ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});

//uppdatera menuproduct

router.put("/:id", protect, authorize("admin"), async (req, res) => {
  try {
    const { name, price, category, img, desc } = req.body;

    const updatedProduct = await MenuItem.findByIdAndUpdate(
      req.params.id, //söker efter id
      { name, price, category, img, desc }, //req body
      { new: true }
    );
    res.status(201).json({
      success: true,
      message: "product updated",
      product: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//delete menu product

router.delete("/:id", protect, authorize("admin"), async (req, res) => {
  try {
    const deleteProduct = await MenuItem.findOneAndDelete(req.params.id);
    res.status(201).json({
      success: true,
      product: deleteProduct,
      message: "product successfully deleted from menu",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
