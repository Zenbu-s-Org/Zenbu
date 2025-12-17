import Ingredient from "../models/Ingredient.js";
import MenuItem from "../models/MenuItem.js";

export const deductQuantity = async (order) => {
  const { items } = order;

  console.log("deduct");

  if (!items || !Array.isArray(items)) {
    throw new Error("Invalid order items");
  }

  for (const item of items) {
    // 1. Hämta menuItem från DB
    const menuItem = await MenuItem.findById(item.id);

    if (!menuItem || !menuItem.ingredients) {
      throw new Error(`Menu item not found: ${item.id}`);
    }
    console.log("menuItem:", menuItem);

    // 2. Dra av ingredienser
    for (const ing of menuItem.ingredients) {
      console.log("ingredient", ing);
      await Ingredient.findOneAndUpdate(
        { id: ing.id },
        { $inc: { qty: -item.qty } }
      );
    }
  }
};
