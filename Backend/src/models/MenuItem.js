import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema(
  {
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
      required: true
    },
    category: {
      type: String,
      enum: [
        "bowl",
        "drink",
        "extra"
      ],
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
