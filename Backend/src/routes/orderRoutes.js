import express from "express";
import Order from "../models/Order.js";
import { validateOrder } from "../middlewares/validateOrder.js";
import { authorize, protect } from "../middlewares/authMiddleware.js";
import { nanoid } from "nanoid";
import { deductQuantity } from "../services/inventoryService.js";

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

// GET-anrop för att hämta stats för en specifik användare /api/orders/stats/:userId
router.get("/stats/:userId", protect, async (req, res) => {
  try {
    const userId = req.params.userId;

    // Tillåt om användaren äger datan ELLER är admin
    if (userId !== String(req.user._id) && req.user.role !== "admin") {
      return res.status(403).json({ message: "Forbidden" });
    }

    const orders = await Order.find({ userId: userId });

    const totalOrders = orders.length;
    const amountSpent = orders.reduce(
      (sum, order) => sum + order.totalPrice,
      0
    );

    res.json({
      totalOrders,
      amountSpent,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT-anrop för att cancella en order /api/orders/:id/cancel
// Både gäster och inloggade användare kan cancella sin egen order
router.put("/:id/cancel", async (req, res) => {
  try {
    const orderNumber = req.params.id;

    const order = await Order.findOne({ orderNumber });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Kan ENDAST cancella orders med status "pending"
    if (order.status !== "pending") {
      return res.status(400).json({
        success: false,
        message: `Cannot cancel order with status "${order.status}". Only pending orders can be cancelled.`,
      });
    }

    // Uppdatera status till cancelled
    order.status = "cancelled";
    await order.save();

    res.json({
      success: true,
      message: "Order cancelled successfully",
      order,
    });
  } catch (error) {
    console.error("Error cancelling order:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// GET-anrop för att hämta alla orders för en specifik användare /api/order/user/:userId
router.get("/user/:userId", protect, async (req, res) => {
  try {
    const userId = req.params.userId;

    // Tillåt om användaren äger datan ELLER är admin
    if (userId !== String(req.user._id) && req.user.role !== "admin") {
      return res.status(403).json({ message: "Forbidden" });
    }

    const orders = await Order.find({ userId: userId }).sort({
      createdAt: -1,
    });

    res.json(orders);
  } catch (error) {
    console.error("Error fetching user orders:", error);
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
      orderNumber: nanoid(7),
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
router.put(
  "/:orderNumber",
  validateOrder,
  protect,
  authorize("admin"),
  async (req, res) => {
    try {
      // ⬇️ plocka ENDAST status
      const { status } = req.body;

      // 1. Hämta order före uppdatering
      const prevOrder = await Order.findOne({
        orderNumber: req.params.orderNumber,
      });

      if (!prevOrder) {
        return res.status(404).json({ message: "Order not found" });
      }

      // 2. Uppdatera status
      const updatedOrder = await Order.findOneAndUpdate(
        { orderNumber: req.params.orderNumber },
        { status },
        { new: true }
      );

      // 3. Kör inventory-logik endast pending → preparing
      if (
        prevOrder.status === "pending" &&
        updatedOrder.status === "preparing"
      ) {
        await deductQuantity(updatedOrder);
      }

      res.json({
        success: true,
        order: updatedOrder,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  }
);

router.delete("/:id", authorize, async (req, res) => {
  try {
    const deleteOrder = await Order.findOneAndDelete({
      orderNumber: req.params.id,
    });
    if (!deleteOrder) {
      return res.status(404).json({
        success: false,
        message: "order hittades inte",
      });
    }
    return res.status(200).json({
      success: true,
      message: "order raderad",
      order: deleteOrder,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
