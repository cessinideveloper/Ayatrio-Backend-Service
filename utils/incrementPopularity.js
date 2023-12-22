const productsDB = require("../model/Products");

// Increment the popularity of a product by one
const incrementPopularityUtil = async (productId) => {
  try {
    const product = await productsDB.findOne({productId:productId});
    if (product) {
      product.popularity += 1;
      await product.save();
    }
  } catch (error) {
    console.error('Error updating product popularity:', error);
    throw error;
  }
};

module.exports = incrementPopularityUtil;