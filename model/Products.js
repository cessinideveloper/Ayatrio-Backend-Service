const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productId: { type: String, required: true, unique: true },
  productName: { type: String, required: true },
  category: { type: String, required: true },
  subcategory: { type: String, required: true },
  attributes: { type: mongoose.Schema.Types.Mixed }, 
  images: { type: [String] },
  price: { type: String },
  ratings: { type: Number }, 
  reviews: { type: [String] }, 
  tags: { type: [String] }
});

const Product = mongoose.model("products", productSchema);

module.exports = Product;
