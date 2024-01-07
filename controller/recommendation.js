const preferencesDB = require("../model/Preferences");
const productsDB = require("../model/Products");

// POST: api/preferences
exports.preferences = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ error: "Please provide category data" });
    }

    const { deviceId, userPreferredCities, userPreferredHobbies, userPreferredCategories } = req.body;

    if (!deviceId || !userPreferredCities || !userPreferredHobbies || !userPreferredCategories) {
      return res.status(400).json({ error: "Fill in all the required fields" });
    }

    // Validation for userPreferredCategories
    if (!Array.isArray(userPreferredCategories) || userPreferredCategories.some(category => typeof category !== 'object' || !category.name || !category.subcategories || !Array.isArray(category.subcategories))) {
      return res.status(400).json({ error: "Invalid format for userPreferredCategories" });
    }

    // Combine all the subcategories
    const subcategoriesArray = combineSubcategories(userPreferredCategories);

    // Send recommendations
    const recommendedProducts = await productsDB.find({
      subcategory: {
        $in: subcategoriesArray.map(sub => new RegExp(sub, "i")),
      },
    });

    // Filter only product Id to store in DB
    const productIdsArray = recommendedProducts.map(product => product._id);

    const newPreference = new preferencesDB({
      deviceId,
      preferredCities: userPreferredCities,
      preferredHobbies: userPreferredHobbies,
      preferredCategories: userPreferredCategories,
      recommendedProducts: productIdsArray
    });

    // Save recommendations in DB
    const recommendation = await newPreference.save();

    res.status(201).json({ message: "Preferences stored in successfully..!" });

  } catch (error) {
    console.error(error);

    if (error.code === 11000) {
      // Duplicate key error
      return res.status(409).json({ error: "Duplicate entry for deviceId", deviceId });
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

  categories.forEach(category => {
    if (category.subcategories && Array.isArray(category.subcategories)) {
      combinedSubcategories = combinedSubcategories.concat(category.subcategories);
    }
  });

  return combinedSubcategories;
}



// GET: api/getRecommendation
exports.getRecommendation = async (req, res) => {
  try {
    const deviceId = req.query.deviceId;

    const recommendations = await preferencesDB.find({ deviceId }, { recommendedProducts: 1 })
      .populate({
        path: 'recommendedProducts',
        select: 'productId productTitle price images category subcategory perUnitPrice totalPrice', 
      }) // Populate the recommendedProducts field
      .exec();;

    if (!recommendations || recommendations.length === 0) {
      return res.status(404).json({ error: "Preferences not found" });
    }
    const noOfProducts = recommendations[0].recommendedProducts.length;

    res.json({ recommendations, length: noOfProducts });
  } catch (error) {
    console.error(error);
    // Handle other errors
    res.status(500).json({ error: "Internal Server Error" });
  }
};