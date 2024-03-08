const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },

  productName: String,
  category: String,
  quantity: Number,
  priceBeforeDiscount: Number,
  priceAfterDiscount: Number,
  description: String,
  picture: String,
  createdAt: { type: Date, default: Date.now },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
