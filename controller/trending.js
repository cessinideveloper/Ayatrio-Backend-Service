const productsDB = require("../model/Products");
const incrementPopularityUtil = require("../utils/incrementPopularity")


// POST 'api/increment-popularity/:productId'
exports.incrementPopularity = async (req, res) => {
  const { productId } = req.query;
  console.log(productId);
  try {
    await incrementPopularityUtil(productId);
    res.json({ message: 'Product popularity incremented successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// GET 'api/trending-products'
exports.trendingProducts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 3;
  const skip = (page - 1) * limit;
  const lastIndex = page * limit;
  try {
    const trendingProducts = await productsDB.find({ popularity: { $gt: 2 } })
      .sort({ popularity: -1 })
      .limit(5); 
    let result = trendingProducts.slice(skip, lastIndex);
    console.log(result.length);
    res.json(result);
    // res.json(trendingProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
