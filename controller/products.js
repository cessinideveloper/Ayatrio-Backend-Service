
const productsDB = require("../model/Products");

// POST: api/createProduct
exports.createProduct = async (req, res) => {
    try {
      if (!req.body) {
        return res.status(406).send("Please provide product data");
      }
  
      const {title,patternNumber,room,collection,color,designStyle,category,subCategory,units,unitType,totalPricePerUnit,perUnitType,perUnitPrice,dimensions,images} = req.body;
    //   console.log(title,patternNumber,room,collection,color,designStyle,category,subCategory,units,unitType,totalPricePerUnit,perUnitType,perUnitPrice,dimensions,images);
  
      const newProduct =  new productsDB({
        productTitle:title,
        productId:patternNumber,
        patternNumber,
        roomCategory:room,
        category,
        subcategory:subCategory,
        style:designStyle,
        collectionName:collection,
        images,
        perUnitPrice,
        colors:color,
        dimensions,
        units,
        unitType,
        perUnitType,
        totalPrice:totalPricePerUnit,
      });
  
      const productData = await newProduct.save();
  
      res.status(201).send(productData);
    } catch (error) {
      res
        .status(500)
        .json({ err: error.message || "Error while creating new product!" });
    }
  };

// GET  '/api/products'
exports.fetchAllProducts = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 4;
    const skip = (page - 1) * limit;

    let query = productsDB.find({});

    // Search functionality
    const search = req.query.search;
    if (search) {
        query = query.find({
            $or: [
                { productName: { $regex: new RegExp(search, "i") } },
                { category: { $regex: new RegExp(search, "i") } },
                { roomCategory: { $regex: new RegExp(search, "i") } },
                { subcategory: { $regex: new RegExp(search, "i") } },
                { colors: { $regex: new RegExp(search, "i") } }
            ]
        });
    }

    // Filter by category (standalone)
    if (req.query.category) {
        query = query.find({ category: req.query.category });
    }

    // Filter by roomCategory (standalone)
    if (req.query.roomCategory) {
        query = query.find({ roomCategory: req.query.roomCategory });
    }

    // Filter by category and colors (combination)  -> for dropdown
    if (req.query.category && req.query.colors) {
        query = query.find({
            category: req.query.category,
            colors: { $regex: new RegExp(req.query.colors, "i") }
        });
    }

    // Filter by category and roomCategory (combination)  -> for dropdown
    if (req.query.category && req.query.roomCategory) {
        query = query.find({
            category: req.query.category,
            roomCategory: req.query.roomCategory
        });
    }

     // Filter by category and collection (combination)  -> for dropdown
     if (req.query.category && req.query.collection) {
        query = query.find({
            category: req.query.category,
            collectionName: req.query.collection
        });
    }

     // Filter by category and style (combination)  -> for dropdown
     if (req.query.category && req.query.style) {
        query = query.find({
            category: req.query.category,
            style: req.query.style
        });
    }

    // Sorting
    if (req.query._sort && req.query._order) {
        query = query.sort({ [req.query._sort]: req.query._order });
    }

    try {
        const docs = await query.skip(skip).limit(limit).exec();
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
