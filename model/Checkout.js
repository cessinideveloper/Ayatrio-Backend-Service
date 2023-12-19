const mongoose = require("mongoose");

const CheckoutSchema = new mongoose.Schema({
    googleId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    products: [{ productId: mongoose.Schema.Types.ObjectId, quantity: Number,ref:'products' }],
});

module.exports = CheckoutDB = mongoose.model("checkout",CheckoutSchema);