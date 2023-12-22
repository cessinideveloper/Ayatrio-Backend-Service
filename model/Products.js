const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productId: { type: String, required: true, unique: true },
  productName: { type: String, required: true },
  category: { type: String, required: true },
  subcategory: { type: String, required: true },
  description: {type: String},
  images: { type: [String] },
  price: { type: String },
  ratings: { type: Number }, 
  reviews: { type: [String] }, 
  tags: { type: [String] },
  colors:{type:[String]},
  popularity: {
    type: Number,
    default: 0,
  },
});

const Product = mongoose.model("products", productSchema);

module.exports = Product;

