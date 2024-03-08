const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    productName: String,
    category: String,
    quantity: Number,
    priceBeforeDiscount: Number,
    priceAfterDiscount: Number,
    description: String,
    picture: String,
    createdAt: { type: Date, default: Date.now },
  }
  // { _id: false }
);

cartItemSchema.index({ userId: 1, productName: 1 }, { unique: false });

const CartItem = mongoose.model("CartItem", cartItemSchema);

module.exports = CartItem;
