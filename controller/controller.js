const preferencesDB = require("../model/Preferences");
const categoriesDB = require("../model/Category");
const citiesAndHobbiesDB = require("../model/CityHobbie");
const productsDB = require("../model/Products");
const CartDB = require("../model/Cart");
const SliderDB  = require("../model/Slider");
const MidInfoSectionDB = require("../model/MidSection");
const HeaderInfoDB = require("../model/Header");
const ImgSchemaDB = require("../model/ImgSection");
const incrementPopularityUtil = require("../utils/incrementPopularity")

// POST: api/preferences
exports.preferences = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ error: "Please provide category data" });
    }

    const {
      deviceId,
      userPreferredCities,
      userPreferredHobbies,
      userPreferredCategories,
    } = req.body;

    console.log(
      deviceId,
      userPreferredCities,
      userPreferredHobbies,
      userPreferredCategories
    );
    if (
      !deviceId ||
      !userPreferredCities ||
      !userPreferredHobbies ||
      !userPreferredCategories
    ) {
      return res.status(400).json({ error: "Fill in all the required fields" });
    }

    const newPreference = new preferencesDB({
      deviceId,
      preferredCities: userPreferredCities,
      preferredHobbies: userPreferredHobbies,
      preferredCategories: userPreferredCategories,
    });

    const userPreferences = await newPreference.save();

    console.log("hey", userPreferences);

    if (!userPreferences || userPreferences.length === 0) {
      return res.status(404).json({ error: "Preferences not found" });
    }

    const { preferredCities, preferredHobbies, preferredCategories } =
      userPreferences;

    if (!preferredCities || !preferredHobbies || !preferredCategories) {
      return res
        .status(404)
        .json({ error: "Invalid user preferences structure" });
    }

    const subcategoriesArray = combineSubcategories(preferredCategories);

    console.log(subcategoriesArray);
    console.log(preferredCategories);

    const products = await productsDB.find({
      subcategory: {
        $in: subcategoriesArray.map((sub) => new RegExp(sub, "i")),
      },
    });

    res.status(201).json({ products });
  } catch (error) {
    console.error(error);

    if (error.code === 11000) {
      // Duplicate key error
      return res
        .status(409)
        .json({ error: "Duplicate entry for deviceId", deviceId });
    }

    res.status(500).json({
      error: "Error while saving user preferences",
      details: error.message,
    });
  }
};

// ---------------------------------

function combineSubcategories(categories) {
  let combinedSubcategories = [];

  categories.forEach((category) => {
    combinedSubcategories = combinedSubcategories.concat(
      category.subcategories
    );
  });

  return combinedSubcategories;
}

// ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐

// GET: api/categories
exports.getCategories = async (req, res) => {
  try {
    const allCategoriesData = await categoriesDB.find();

    // Check if there are no categories found
    if (!allCategoriesData || allCategoriesData.length === 0) {
      return res.status(404).json({ message: "No categories found." });
    }

    res.status(200).send(allCategoriesData);
  } catch (error) {
    res
      .status(500)
      .json({ err: error.message || "Error while getting categories!" });
  }
};

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

// GET: api/citiesAndHobbies
exports.getCitiesAndHobbies = async (req, res) => {
  try {
    const citiesAndHobbie = await citiesAndHobbiesDB.find();

    // Check if there are no categories found
    if (!citiesAndHobbie || citiesAndHobbie.length === 0) {
      return res.status(404).json({ message: "No categories found." });
    }

    res.status(200).send(citiesAndHobbie);
  } catch (error) {
    res.status(500).json({
      err: error.message || "Error while getting cities and hobbies!",
    });
  }
};

// GET: api/getRecommendation
exports.getRecommendation = async (req, res) => {
  try {
    const deviceId = req.query.deviceId;

    const userPreferences = await preferencesDB.find({ deviceId });

    if (!userPreferences || userPreferences.length === 0) {
      // Handle the case where no preferences are found for the given device ID
      return res.status(404).json({ error: "Preferences not found" });
    }

    const { preferredCities, preferredHobbies, preferredCategories } =
      userPreferences[0];

    function combineSubcategories(categories) {
      let combinedSubcategories = [];

      categories.forEach((category) => {
        combinedSubcategories = combinedSubcategories.concat(
          category.subcategories
        );
      });

      return combinedSubcategories;
    }

    let subcategoriesArray = combineSubcategories(preferredCategories);

    console.log(subcategoriesArray);
    console.log(preferredCategories);

    const products = await productsDB.find({
      subcategory: {
        $in: subcategoriesArray.map((sub) => new RegExp(sub, "i")),
      },
    });

    res.json(products);
  } catch (error) {
    console.error(error);
    // Handle other errors
    res.status(500).json({ error: "Internal Server Error" });
  }
};

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

// -------------------------------

// POST '/api/cart'
exports.createCart = async (req, res) => {
  // const owner = req.user._id;
  const deviceId = req.deviceId;

  const { productId, quantity, owner } = req.body;

  try {
    const cart = await CartDB.findOne({ owner });
    const item = await productsDB.findOne({ _id: productId });

    if (!item) {
      res.status(404).send({ message: "item not found" });
      return;
    }
    const price = item.price;
    const name = item.name;

    //If cart already exists for user,
    if (cart) {
      const itemIndex = cart.items.findIndex(
        (item) => item.productId == productId
      );

      //check if product exists or not
      if (itemIndex > -1) {
        let product = cart.items[itemIndex];
        product.quantity += quantity;

        cart.bill = cart.items.reduce((acc, curr) => {
          return acc + curr.quantity * curr.price;
        }, 0);

        cart.items[itemIndex] = product;
        await cart.save();
        res.status(200).send(cart);
      } else {
        cart.items.push({ productId, name, quantity, price });
        cart.bill = cart.items.reduce((acc, curr) => {
          return acc + curr.quantity * curr.price;
        }, 0);

        await cart.save();
        res.status(200).send(cart);
      }
    } else {
      //no cart exists, create one
      const newCart = await CartDB.create({
        owner,
        items: [{ productId, name, quantity, price }],
        bill: quantity * price,
      });
      return res.status(201).send(newCart);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("something went wrong");
  }
};

exports.getCart = async (req, res) => {
  const owner = req.body;
  try {
    const cart = await CartDB.findOne({ owner });
    if (cart && cart.items.length > 0) {
      res.status(200).send(cart);
    } else {
      res.send(null);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};


exports.createImgCircle = async (req,res)=>{
  try {
    const slider = await SliderDB.create(req.body);
    res.status(201).json(slider);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

exports.getSliderCircle = async(req,res)=>{
  try {
    const sliders = await SliderDB.find();
    res.status(200).json(sliders);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// --------------------

exports.createMidInfoSection = async (req,res)=>{
  try {
    const info = await MidInfoSectionDB.create(req.body);
    res.status(201).json(info);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

exports.getMidInfoSection = async(req,res)=>{
  try {
    const info = await MidInfoSectionDB.find();
    res.status(200).json(info);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// --------------------

exports.createHeaderInfoSection = async (req,res)=>{
  try {
    const info = await HeaderInfoDB.create(req.body);
    res.status(201).json(info);
  } catch (error) {
    res.status(500).send(error);
  }
}

exports.getHeaderInfoSection = async(req,res)=>{
  try {
    const info = await HeaderInfoDB.find();
    res.status(200).json(info);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// --------------------

exports.createImgSection = async (req,res)=>{
  try {
    const info = await ImgSchemaDB.create(req.body);
    res.status(201).json(info);
  } catch (error) {
    res.status(500).send(error);
  }
}

exports.getImgSection = async(req,res)=>{
  try {
    const info = await ImgSchemaDB.find();
    res.status(200).json(info);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}


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

// -----------------------------------------------------

exports.fetchAllProducts = async (req, res) => {
    
  let query = productsDB.find({}).sort({ createdAt: -1 });

  if (req.query.category) {
      query = query.find({ category: req.query.category });
  }
  if (req.query.label) {
      query = query.find({ label: req.query.label });
  }
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
