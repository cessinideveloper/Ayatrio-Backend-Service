const mongoose = require('mongoose');

const subcategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
});

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  subcategories: {
    type: [subcategorySchema],
    required: true,
  },
});

const productSchema = new mongoose.Schema({
  categories: {
    type: [categorySchema],
    required: true,
  },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
