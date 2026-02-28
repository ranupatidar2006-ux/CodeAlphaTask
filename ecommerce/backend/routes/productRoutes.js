const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

// Get all products
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Get single product
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(400).json({ message: "Invalid product ID" });
  }
});
// Add sample product
router.post("/add", async (req, res) => {
  const product = new Product(req.body);
  const created = await product.save();
  res.json(created);
});

module.exports = router;
// Seed Products (Add Sample Data)
router.post("/seed", async (req, res) => {
  try {
    await Product.deleteMany(); // clear old products

    const products = await Product.insertMany([
      {
        name: "MacBook Pro",
        price: 150000,
        image: "/images/macbook.jpg",
        description: "Powerful laptop with M3 chip.",
        brand: "Apple",
        category: "Laptop",
        countInStock: 5,
        rating: 4.8
      },
      {
        name: "iPhone 15",
        price: 90000,
        image: "/images/iphone.jpg",
        description: "Latest Apple smartphone.",
        brand: "Apple",
        category: "Mobile",
        countInStock: 10,
        rating: 4.7
      },
      {
        name: "Sony Headphones",
        price: 20000,
        image: "/images/headphones.jpg",
        description: "Noise cancelling wireless headphones.",
        brand: "Sony",
        category: "Audio",
        countInStock: 15,
        rating: 4.5
      }
    ]);

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});