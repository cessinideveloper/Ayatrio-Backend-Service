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

const productCategorySchema = new mongoose.Schema({
  categories: {
    type: [categorySchema],
    required: true,
  },
});

const categoriesDB = mongoose.model('ProductCategories', productCategorySchema);

module.exports = categoriesDB;
