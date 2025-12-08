import express from "express";
import Order from "../models/Order.js";
import { validateOrder } from "../middlewares/validateOrder.js";
import { nanoid } from "nanoid";
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
    const order = await Order.findOne({ orderNumber: req.params.id });
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
      orderNumber: nanoid(7)
    });

    res.status(201).json({
      message: "success",
      orderNumber: order.orderNumber,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//PUT-anrop för att updatera en order

router.put("/:id", validateOrder, async (req,res) => {
  try {
    const {status} = req.body
  const updatedOrder = await Order.findOneAndUpdate(
    {orderNumber: req.params.id}, //söker id
    {status}, //req in body
    {new: true}
  )
    if(!updatedOrder){
    return res.status(404).json({
      success: false,
      message: "order not found"
    })
  }
  return res.status(200).json({
    success: true,
    message: "order updated",
    order: updatedOrder
  })


    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  
} )

router.delete("/:id", async (req,res) => {
  try {
    const deleteOrder = await Order.findOneAndDelete(
    {orderNumber: req.params.id}
  )
  if(!deleteOrder){
    return res.status(404).json({
      success: false,
      message: "order hittades inte"
    })
  }
  return res.status(200).json({
    success: true,
    message: "order raderad",
    order: deleteOrder
  })
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

export default router;
