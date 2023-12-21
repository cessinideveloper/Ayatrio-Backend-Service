const mongoose = require("mongoose");

const SliderSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  productCategory: {
    type: String,
    required: true,
  },
  productPrice: {
    type: String,
    required: true,
  },
  productRef: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
    required: true,
  }
});

module.exports = SliderDB = mongoose.model("Slider", SliderSchema);
