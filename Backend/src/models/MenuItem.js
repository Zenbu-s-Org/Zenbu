import mongoose from "mongoose";

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
    ingredients: [String],
  },
  { timestamps: true }
);

export default mongoose.model("MenuItem", menuItemSchema, "menuItems");
