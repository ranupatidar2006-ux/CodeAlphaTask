const express = require("express");
const Order = require("../models/Order");

const router = express.Router();

/* ==========================
   Create Order
========================== */
router.post("/", async (req, res) => {
  try {
    const { user, products, totalPrice, paymentMethod } = req.body;

    if (!user || !products || !totalPrice) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const order = new Order({
      user,
      products,
      totalPrice,
      paymentMethod
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* ==========================
   Get Orders By User
========================== */
router.get("/:userId", async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.userId })
      .populate("products.product");

    res.json(orders);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
