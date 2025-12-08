import mongoose from "mongoose";

const ingredientSchema = new mongoose.Schema(
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
    category: {
      type: String,
      enum: [
        "base",
        "protein",
        "veg",
        "sauce",
      ],
      required: true,
    },
    qty: {
      type: Number,
      required: true,
    },
  }
);

export default mongoose.model("Ingredient", ingredientSchema, "ingredients");