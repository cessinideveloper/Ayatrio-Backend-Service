const preferencesDB = require('../model/Preferences');
const categoriesDB = require('../model/Category');
const citiesAndHobbiesDB = require('../model/CityHobbie');
const productsDB = require('../model/Products');

// POST: api/preferences
exports.preferences = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(406).send("Please provide category data");
    }

    const { deviceId, preferredCities,preferredHobbies,preferredCategories } = req.body;

    if (!deviceId) {
      return res.status(406).send("Fill in all the fields");
    }

    const newPreference = new preferencesDB({
      deviceId,
      preferredCities,preferredHobbies,preferredCategories
    });

    const userPreferences = await newPreference.save();

    res.status(200).json( userPreferences );
  } catch (error) {
    res.status(500).json({ err: error.message || "Error while saving user preferences!" });
  }
};

// GET: api/categories
exports.getCategories = async (req,res) =>{
  try {
    const allCategoriesData = await categoriesDB.find();

     // Check if there are no categories found
     if (!allCategoriesData || allCategoriesData.length === 0) {
      return res.status(404).json({ message: "No categories found." });
    }

    res.status(200).send(allCategoriesData);

  } catch (error) {
    res.status(500).json({ err: error.message || "Error while getting categories!" });
  }
}

// POST: api/createProduct
exports.createProduct = async (req,res)=>{
  try {
    if(!req.body){
      return res.status(406).send("Please provide product data");
    }

    const product = req.body;

    // const newProduct =  new productsDB(product);

    const productData = await productsDB.insertMany(product);

    res.status(201).send(productData)
  } catch (error) {
    res.status(500).json({ err: error.message || "Error while creating new product!" });
  }
}

// GET: api/citiesAndHobbies
exports.getCitiesAndHobbies = async (req,res)=>{
  try {
    const citiesAndHobbie = await citiesAndHobbiesDB.find();

     // Check if there are no categories found
     if (!citiesAndHobbie || citiesAndHobbie.length === 0) {
      return res.status(404).json({ message: "No categories found." });
    }

    res.status(200).send(citiesAndHobbie);
  } catch (error) {
    res.status(500).json({ err: error.message || "Error while getting cities and hobbies!" });
  }
}


// GET: api/getRecommendation
exports.getRecommendation = async (req, res) => {
  try {
    const deviceId = req.query.deviceId;

    const userPreferences = await preferencesDB.find({ deviceId });

    if (!userPreferences || userPreferences.length === 0) {
      // Handle the case where no preferences are found for the given device ID
      return res.status(404).json({ error: 'Preferences not found' });
    }

    const { preferredCities, preferredHobbies, preferredCategories } = userPreferences[0];

    function combineSubcategories(categories) {
      let combinedSubcategories = [];
    
      categories.forEach(category => {
        combinedSubcategories = combinedSubcategories.concat(category.subcategories);
      });
    
      return combinedSubcategories;
    }

    let subcategoriesArray = combineSubcategories(preferredCategories);

    console.log(subcategoriesArray);
    console.log(preferredCategories);

    const products = await productsDB.find({
      subcategory: { $in: subcategoriesArray.map(sub => new RegExp(sub, 'i')) }
    });

    res.json(products);

  } catch (error) {
    console.error(error);
    // Handle other errors
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
