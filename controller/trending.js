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

// GET 'api/increment-popularity/:productId'
exports.trendingProducts = async (req, res) => {
  try {
    const trendingProducts = await productsDB.find({ popularity: { $gt: 2 } })
      .sort({ popularity: -1 })
      .limit(5); 

    res.json(trendingProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
