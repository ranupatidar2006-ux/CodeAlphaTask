const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  description: String,
  rating: Number,
  warranty: String,
  color: String
});

module.exports = mongoose.model("Product", productSchema);
