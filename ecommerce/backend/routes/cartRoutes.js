const express = require("express");
const Cart = require("../models/Cart");
const router = express.Router();

// Add to cart
router.post("/", async (req, res) => {
  const { userId, productId } = req.body;

  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    cart = new Cart({
      user: userId,
      items: [{ product: productId, quantity: 1 }]
    });
  } else {
    const itemIndex = cart.items.findIndex(
      item => item.product.toString() === productId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += 1;
    } else {
      cart.items.push({ product: productId, quantity: 1 });
    }
  }

  await cart.save();
  res.json(cart);
});

// Get cart
router.get("/:userId", async (req, res) => {
  const cart = await Cart.findOne({ user: req.params.userId })
    .populate("items.product");

  res.json(cart);
});
router.post("/clear", async (req, res) => {
  const { userId } = req.body;

  const cart = await Cart.findOne({ user: userId });
  if (!cart) return res.json({ message: "Cart not found" });

  cart.items = [];
  await cart.save();

  res.json({ message: "Cart cleared" });
});
module.exports = router;