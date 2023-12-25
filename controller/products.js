
const productsDB = require("../model/Products");

// POST: api/createProduct
exports.createProduct = async (req, res) => {
    try {
      if (!req.body) {
        return res.status(406).send("Please provide product data");
      }
  
      const product = req.body;
  
      // const newProduct =  new productsDB(product);
  
      const productData = await productsDB.insertMany(product);
  
      res.status(201).send(productData);
    } catch (error) {
      res
        .status(500)
        .json({ err: error.message || "Error while creating new product!" });
    }
  };

  exports.fetchAllProducts = async (req, res) => {
    let query = productsDB.find({});

    // Search functionality
    const search = req.query.search;
    if (search) {
        query = query.find({
            $or: [
                { productName: { $regex: new RegExp(search, "i") } },
                { category: { $regex: new RegExp(search, "i") } },
                { subcategory: { $regex: new RegExp(search, "i") } },
                { colors: { $regex: new RegExp(search, "i") } }
            ]
        });
    }

    // Filter by category
    if (req.query.category) {
        query = query.find({ category: req.query.category });
    }

    // Filter by label
    if (req.query.label) {
        query = query.find({ label: req.query.label });
    }

    // Sorting
    if (req.query._sort && req.query._order) {
        query = query.sort({ [req.query._sort]: req.query._order });
    }

    try {
        const docs = await query.exec();
        res.status(200).json(docs);
    } catch (err) {
        res.status(400).json(err);
    }
};


// fetch particular product
exports.fetchProductById = async (req, res) => {
  try {
      let { id } = req.query;
      const product = await productsDB.findOne({ _id: id });
      res.status(201).send(product);

  } catch (error) {
      res.status(500).send(error);
  }
}

// delete particular product by ID
exports.deleteProductById = async (req, res) => {
  try {
      const { id } = req.query;

      // Check if the provided ID is valid
      if (!id) {
          return res.status(400).json({ error: 'Product ID is missing.' });
      }

      const deletedProduct = await productsDB.findByIdAndDelete({ _id: id });

      if (!deletedProduct) {
          return res.status(404).json({ error: 'Product not found.' });
      }

      res.status(200).json({ message: 'Product deleted successfully.' });
  } catch (error) {
      console.error('Error while deleting product:', error);
      res.status(500).json({ error: 'An error occurred while deleting the product.' });
  }
};
