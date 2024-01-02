const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productId: { type: String, required: true, unique: true },
  patternNumber: { type: String, required: true, unique: true },
  productTitle: { type: String, required: true },
  roomCategory: { type: String, required: true },
  category: { type: String, required: true },
  subcategory: { type: String, required: true },
  style: { type: String },
  collectionName: { type: String },
  images: { type: [String] },
  perUnitPrice: { type: Number },
  ratings: [{
    userId: { type: String, required: true },
    rating: { type: Number, required: true },
    review: { type: String },
    timestamp: { type: Date, default: Date.now },
  }],
  colors: { type: [String] },
  dimensions: {
    length: {
      value: {
        type: Number,
        required: true,
      },
      unit: {
        type: String,
        enum: ['mm', 'cm', 'm', 'in', 'ft'],
        required: true,
      },
    },
    width: {
      value: {
        type: Number,
        required: true,
      },
      unit: {
        type: String,
        enum: ['mm', 'cm', 'm', 'in', 'ft'],
        required: true,
      },
    },
    thickness: {
      value: {
        type: Number,
        required: true,
      },
      unit: {
        type: String,
        enum: ['mm', 'cm', 'm', 'in', 'ft'],
        required: true,
      },
    },
  },
  units: Number,
  unitType: {
    type: String,
    enum: ['sqft', 'box', 'pcs', 'mtr'],
    required: true,
  },
  perUnitType: {
    type: String,
    enum: ['sqft', 'box', 'pcs', 'mtr'],
    required: true,
  },
  totalPrice: Number,
  popularity: {
    type: Number,
    default: 0,
  },
  purchaseMode: [String],
  productDescription: String,
  coreValues: {
    type: [{
      heading: String,
      text: String
    }]
  },
  features: { type: [String] },
  pdf: { type: String },
  maintainanceDetails: { type: String }
});

const Product = mongoose.model("products", productSchema);

module.exports = Product;

