import Ingredient from "../models/Ingredient.js";
import MenuItem from "../models/MenuItem.js";

export const deductQuantity = async (order) => {
  if (!Array.isArray(order.items)) {
    throw new Error("Invalid order items");
  }

  for (const item of order.items) {
    const menuItem = await MenuItem.findById(item.id);

    if (!menuItem) {
      throw new Error(`Menu item not found: ${item.id}`);
    }

    if (!Array.isArray(menuItem.ingredients)) continue;

    for (const ing of menuItem.ingredients) {
      console.log("Trying to deduct ingredient:", ing.id);
      await Ingredient.findOneAndUpdate(
        { id: ing.id }, // ingredients använder custom id
        { $inc: { qty: -item.qty } }
      );
    }
  }
};
