const mongoose = require("mongoose");

const circleSchema = new mongoose.Schema({
  productTitle: String,
  productCategory: String,
  price: Number,
});

const SliderSchema = new mongoose.Schema({
  id: Number,
  imgSrc: { type: [String] },
  circles: { type: [circleSchema] },
});

module.exports = SliderDB = mongoose.model("Product", SliderSchema);