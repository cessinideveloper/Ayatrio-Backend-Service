
const productsDB = require("../model/Products");

// controller for getting all gyms -> (for listingPage)
exports.getAllgyms = async (req, res) => {
  try {
      // const name = req.query.name;
      // const location = req.query.addr;
      const search = req.query.search;

      const displayThis = { gymName: 1, rating: 1, ratingCount: 1, thumbnailLink: 1, viewGymLink: 1, address: 1 }

      let listings;
      // if (name) {
      //     listings = await GymSchema.find({ gymName: { $regex: new RegExp(name, "i") } }, displayThis)
      // }
      // else if (location) {
      //     listings = await GymSchema.find({ "address.fullAddr": { $regex: new RegExp(location, "i") } }, displayThis)
      // }
      // else {
      //     listings = await GymSchema.find({}, displayThis);
      // }    
      if (search) {
          listings = await GymSchema.find({
              $or: [
                  { gymName: { $regex: new RegExp(search, "i") } },
                  { "address.fullAddr": { $regex: new RegExp(search, "i") } }
              ]
          }, displayThis);
      }
      else {
          listings = await GymSchema.find({}, displayThis);
      }

      //  ***** 💥 Display the Rating of each gym in their respective card  💥 ******

      const gymIds = listings.map((gym) => gym._id); // extract the gym's objectId 

      // get ratings of each gym from 'RatingSchema' collection 

      const ratings = await RatingSchema.aggregate([
          // find the document with specified gymId
          { $match: { gym: { $in: gymIds } } },
          {
              // group the document as per the gymId and calculate averageRating & ratingCount
              $group: {
                  _id: '$gym',
                  averageRating: { $avg: '$rating' },
                  ratingCount: { $sum: 1 }
              }
          }
      ])

      const gymRatings = {};
      ratings.forEach((rating) => {
          gymRatings[rating._id.toString()] = {
              averageRating: rating.averageRating,
              ratingCount: rating.ratingCount
          }
      })

      // embed the Rating from 'RatingSchema' with 'Microsite' from 'GymSchema'
      const gymsWithRating = listings.map((gym) => {
          const gymId = gym._id.toString();
          const rating = gymRatings[gymId];
          return {
              ...gym.toObject(),
              rating: rating ? rating.averageRating : 0,
              ratingCount: rating ? rating.ratingCount : 0
          }
      })

      res.status(200).send(gymsWithRating);

  } catch (error) {
      return res.status(500).json({ err: error.message || "Error while listing gym" });
  }
}


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
