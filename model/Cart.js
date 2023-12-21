const mongoose = require("mongoose");
const ObjectID = mongoose.Schema.Types.ObjectId

const cartSchema = new mongoose.Schema({
    owner: {
      type: ObjectID,
      required: true,
      ref: "users",
    },
    items: [
      {
        productId: {
          type: ObjectID,
          ref: "products",
          required: true,
        },
        name: String,  // maybe here  productName: String 🔴
        quantity: {
          type: Number,
          required: true,
          min: 1,
          default: 1,
        },
        price: Number,
      },
    ],
    bill: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = CartDB = mongoose.model("Cart",cartSchema);
