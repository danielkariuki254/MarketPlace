const express = require("express");
const router = express.Router();
const CartItem = require("../models/cart");

router.post("/cart", async (req, res) => {
  try {
    let cartItems = req.body;
    const userId = req.headers["user-id"];

    if (!Array.isArray(cartItems)) {
      cartItems = [cartItems];
    }

    const cartItemsWithUniqueIds = cartItems.map((item) => ({
      ...item,
      userId: userId,
    }));

    // Save each cart item to the database using Mongoose model
    const savedCartItems = await CartItem.insertMany(cartItemsWithUniqueIds);

    res.status(200).json({
      message: "Cart items saved successfully",
      cartItems: savedCartItems,
    });
  } catch (error) {
    console.error("Error saving cart items:", error);
    res.status(500).json({ error: "Failed to save cart items" });
  }
});

//FETCH CART ITEMS

router.get("/cart", async (req, res) => {
  try {
    const UserId = req.headers["user-id"];
    // Fetch cart items from the database and sort them by createdAt date in descending order
    const cartItems = await CartItem.find({ userId: UserId }).sort({
      createdAt: -1,
    });

    res.json(cartItems);
  } catch (error) {
    // Handle errors if any occur during fetching
    console.error("Error fetching cart items:", error);
    res.status(500).json({ error: "Error fetching cart items" });
  }
});

//FETCHING AND DELETING CART PRODUCTS.
router.delete("/cart/:productId", async (req, res) => {
  try {
    const { productId } = req.params;

    await CartItem.findByIdAndDelete(productId);
    res.status(200).json({ message: "Cart item deleted successfully" });
  } catch (error) {
    console.error("Error deleting cart item:", error);
    res.status(500).json({ error: "Failed to delete cart item" });
  }
});

module.exports = router;
