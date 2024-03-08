const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");

const Product = require("../models/products");
const User = require("../models/user");

// Invoke router interface
const router = express.Router();

// Set storage engine for multer
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    ); // Define the filename format
  },
});

// Init upload
const upload = multer({
  storage: storage,
}).single("picture");

//  Middleware to serve static files (including images)
router.use("/uploads", express.static("uploads"));
router.post("/products", upload, async (req, res) => {
  try {
    // Create a new product instance based on the request body
    const userId = req.headers["user-id"];
    // console.log(userId);

    const newProduct = new Product({
      userId: userId,
      productName: req.body.productName,
      category: req.body.category,
      quantity: req.body.quantity,
      priceBeforeDiscount: req.body.priceBeforeDiscount,
      priceAfterDiscount: req.body.priceAfterDiscount,
      description: req.body.description,
      picture: req.file ? req.file.path : null,
    });

    // Save the product to the database
    await newProduct.save();
    res.status(201).json({ message: "Product added successfully" });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ error: "Error adding product" });
  }
});

//FETCHING SUPERMARKET PRODUCTS.
router.get("/products/supermarket", async (req, res) => {
  try {
    const supermarketProducts = await Product.find({
      category: "Supermarket",
    }).sort({ createdAt: -1 });
    res.json(supermarketProducts);
  } catch (error) {
    console.error("Error fetching supermarket products:", error);
    res.status(500).json({ error: "Error fetching supermarket products" });
  }
});

//FETCHING COMPUTING PRODUCTS.
router.get("/products/computing", async (req, res) => {
  try {
    const ComputingProducts = await Product.find({
      category: "Computing",
    }).sort({ createdAt: -1 });
    res.json(ComputingProducts);
  } catch (error) {
    console.error("Error fetching computing products:", error);
    res.status(500).json({ error: "Error fetching computing products" });
  }
});

//FETCHING ELECTRICALS PRODUCTS.
router.get("/products/electricals", async (req, res) => {
  try {
    const electricalsProducts = await Product.find({
      category: "Electricals",
    }).sort({ createdAt: -1 });
    res.json(electricalsProducts);
  } catch (error) {
    console.error("Error fetching electricals products:", error);
    res.status(500).json({ error: "Error fetching electricals products" });
  }
});

//FETCHING FASHION PRODUCTS.
router.get("/products/fashion", async (req, res) => {
  try {
    const fashionProducts = await Product.find({ category: "Fashion" }).sort({
      createdAt: -1,
    });
    res.json(fashionProducts);
  } catch (error) {
    console.error("Error fetching fashion products:", error);
    res.status(500).json({ error: "Error fetching fashion products" });
  }
});

//FETCHING FOOD PRODUCTS.
router.get("/products/food", async (req, res) => {
  try {
    const foodProducts = await Product.find({ category: "Food" }).sort({
      createdAt: -1,
    });
    res.json(foodProducts);
  } catch (error) {
    console.error("Error fetching food products:", error);
    res.status(500).json({ error: "Error fetching food products" });
  }
});

//FETCHING FURNITURE PRODUCTS.
router.get("/products/furniture", async (req, res) => {
  try {
    const furnitureProducts = await Product.find({
      category: "Furniture",
    }).sort({ createdAt: -1 });
    res.json(furnitureProducts);
  } catch (error) {
    console.error("Error fetching furniture products:", error);
    res.status(500).json({ error: "Error fetching furniture products" });
  }
});

//FETCHING HOME PRODUCTS.
router.get("/products/home", async (req, res) => {
  try {
    const homeProducts = await Product.find().sort({ createdAt: -1 });

    // Filter products with more than 40% discount
    const discountedProducts = homeProducts.filter((product) => {
      const discountPercentage =
        ((product.priceBeforeDiscount - product.priceAfterDiscount) /
          product.priceBeforeDiscount) *
        100;
      return discountPercentage > 40;
    });

    res.json(discountedProducts);
  } catch (error) {
    console.error("Error fetching home products:", error);
    res.status(500).json({ error: "Error fetching home products" });
  }
});

//FETCHING MOTORS PRODUCTS.
router.get("/products/motors", async (req, res) => {
  try {
    const motorsProducts = await Product.find({ category: "Motors" }).sort({
      createdAt: -1,
    });
    res.json(motorsProducts);
  } catch (error) {
    console.error("Error fetching motors products:", error);
    res.status(500).json({ error: "Error fetching motors products" });
  }
});

//FETCHING PHONES PRODUCTS.
router.get("/products/phones", async (req, res) => {
  try {
    const phonesProducts = await Product.find({ category: "Phones" }).sort({
      createdAt: -1,
    });
    res.json(phonesProducts);
  } catch (error) {
    console.error("Error fetching phones products:", error);
    res.status(500).json({ error: "Error fetching phones products" });
  }
});

router.get("/products/myproducts", async (req, res) => {
  try {
    const UserId = req.headers["user-id"];

    // Fetch products belonging to the user
    const myProducts = await Product.find({ userId: UserId }).sort({
      createdAt: -1,
    });

    res.json(myProducts);
  } catch (error) {
    console.error("Error fetching my products:", error);
    res.status(500).json({ error: "Error fetching my products" });
  }
});

//FETCHING AND DELETING MY PRODUCTS.
router.delete("/products/:productId", async (req, res) => {
  const productId = req.params.productId;
  try {
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json({ message: "Product deleted successfully", deletedProduct });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// EDIT A PRODUCT
router.get("/products/:productId", async (req, res) => {
  const productId = req.params.productId;
  try {
    // Find the product by its ID
    const product = await Product.findById(productId);

    // Check if the product exists
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Return the product in the response
    res.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ error: "Error fetching product" });
  }
});

//FIND AND UPDATE PRODUCT DATA

router.put("/products/:productId", upload, async (req, res) => {
  try {
    const productId = req.params.productId;

    // Retrieve product data from the request body
    const {
      productName,
      category,
      priceBeforeDiscount,
      priceAfterDiscount,
      description,
    } = req.body;

    // Retrieve existing product data from the database
    const existingProduct = await Product.findById(productId);

    // Create an object to store the updated product data
    const updatedProductData = {
      productName,
      category,
      priceBeforeDiscount,
      priceAfterDiscount,
      description,
    };

    // Check if a picture was not provided and if there's an existing product picture
    if (!req.file && existingProduct.picture) {
      // Use the previous picture
      updatedProductData.picture = existingProduct.picture;
    } else if (req.file) {
      // Delete the previous picture file if it exists
      if (existingProduct.picture) {
        fs.unlinkSync(existingProduct.picture);
      }

      updatedProductData.picture = req.file.path;
    }

    // Update the product in the database
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updatedProductData,
      { new: true }
    );

    res.json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Error updating product" });
  }
});

//SEARCH
router.get("/search", async (req, res) => {
  try {
    const searchQuery = req.query.query;

    const results = await Product.find(
      {
        $or: [
          // Perform search on multiple fields using $or operator
          { productName: { $regex: new RegExp(searchQuery, "i") } },
          { category: { $regex: new RegExp(searchQuery, "i") } },
        ],
      },

      {
        picture: 1,
        productName: 1,
        priceBeforeDiscount: 1,
        priceAfterDiscount: 1,
      }
    );
    res.json(results);
  } catch (error) {
    console.error("Error searching:", error);
    res.status(500).json({ error: "Error searching" });
  }
});

//FETCHING INDIVIDUAL PRODUCT

router.get("/product/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findById(productId).populate("userId");
    // console.log("+user", product);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
