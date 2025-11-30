import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      enum: [
        "signature-bowl",
        "custom-bowl",
        "base",
        "protein",
        "vegetable",
        "dressing",
        "topping",
      ],
      required: true,
    },
    available: {
      type: Boolean,
      default: true,
    },
    ingredients: [String],
    customizable: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("MenuItem", menuItemSchema);
