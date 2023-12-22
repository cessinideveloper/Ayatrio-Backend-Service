
const productsDB = require("../model/Products");


exports.checkout = async (req, res) => {
  const deviceId = req.body.deviceId;
  const productId = req.body.productId;

  // if user is logged, otherwise it's fine
  const userId = req.body.googleId;

  if (!deviceId || !productId) {
    return res.status(400).json({ error: "Invalid request" });
  }

  if (!userId) {
    return res.status(404).json({ error: "User not found" });
  }

  const selectedProducts = await productsDB.findOne({ productId });
  // const userProducts = userDeviceMap[deviceId];

  // Calculate total price
  const totalPrice = selectedProducts.price + 50; // delivery charge

  // more logic here (e.g., payment processing, order creation, etc.)

  res.json({ success: true, total: totalPrice });
};

// Helper function to calculate subtotal
function calculateSubtotal(products) {
  // Fetch product prices from database and calculate subtotal
  // For simplicity, let's assume each product has a fixed price
  const productPrices = {
    productId1: 10,
    productId2: 20,
    // Add more as needed
  };

  return products.reduce((subtotal, { productId, quantity }) => {
    return subtotal + productPrices[productId] * quantity;
  }, 0);
}

// under construction
exports.order = async (req, res) => {
  const deviceId = req.body.deviceId;
  const productIds = req.body.productIds;

  res.json({ success: true, message: "Order placed successfully" });
};


