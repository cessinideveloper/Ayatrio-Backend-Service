const mongoose = require("mongoose");

const circleSchema = new mongoose.Schema({
  productTitle: String,
  productCategory: String,
  price: Number,
  topPosition:Number,
  leftPosition:Number,
  productLink:String
});

const SliderSchema = new mongoose.Schema({
  imgSrc: { type: String },
  circles: { type: [circleSchema] },
});

module.exports = SliderDB = mongoose.model("Slider", SliderSchema);
