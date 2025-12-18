import mongoose from "mongoose";

const menuIngredientSchema = new mongoose.Schema(
  {
    id: { type: String, required: true }, // ing-001
    name: { type: String, required: true }, // Rice
    category: {
      type: String,
      enum: ["base", "protein", "veg", "sauce", "extra", "drink"],
      required: true,
    },
  },
  { _id: false }
);

const menuItemSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    img: {
      type: String,
    },
    category: {
      type: String,
      enum: ["bowl", "drink", "extra"],
      required: true,
    },
    available: {
      type: Boolean,
      default: true,
    },
    ingredients: {
      type: [menuIngredientSchema],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("MenuItem", menuItemSchema, "menuItems");
