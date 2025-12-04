import express from "express";
import Order from "../models/Order.js";
import { validateOrder } from "../middlewares/validateOrder.js";

const router = express.Router();

// GET-anrop för att hämta alla orders /api/orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET-anrop för att hämta specifik order genom ID /api/orders/:id
router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order hittades inte" });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST anrop för att skapa ny order /api/orders
router.post("/", validateOrder, async (req, res) => {
  try {
    const order = await Order.create({
      ...req.body,
      status: "pending",
      orderNumber: crypto.randomUUID(),
    });

    res.status(201).json({
      message: "success",
      orderNumber: order.orderNumber,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
