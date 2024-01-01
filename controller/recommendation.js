const preferencesDB = require("../model/Preferences");
const productsDB = require("../model/Products");


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
const TotalProducts = await productsDB.find();
    const products = await productsDB.find({
      subcategory: {
        $in: subcategoriesArray.map((sub) => new RegExp(sub, "i")),
      },
    });
    res.json({ products, length: products.length });
  } catch (error) {
    console.error(error);
    // Handle other errors
    res.status(500).json({ error: "Internal Server Error" });
  }
};