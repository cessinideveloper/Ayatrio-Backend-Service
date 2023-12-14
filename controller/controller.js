const preferencesDB = require('../model/Preferences');
const ProductDB = require('../model/Category');
const citiesAndHobbiesDB = require('../model/CityHobbie');

exports.preferences = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(406).send("Please provide category data");
    }

    const { deviceId, categoryName, WallpaperSubCategory, FlooringSubCategory, BlindsSubCategory, CurtainsSubCategory, SportSubCategory } = req.body;

    if (!deviceId || !categoryName) {
      return res.status(406).send("Fill in all the fields");
    }

    const newPreference = new preferencesDB({
      deviceId,
      categoryName,
      WallpaperSubCategory,
      FlooringSubCategory,
      BlindsSubCategory,
      CurtainsSubCategory,
      SportSubCategory,
    });

    const userPreferences = await newPreference.save();

    const recommendedProducts = await preferencesDB.find({
      categoryName: { $in: categoryName }
    }).limit(5); 

    res.status(200).json( recommendedProducts );
  } catch (error) {
    res.status(500).json({ err: error.message || "Error while saving category!" });
  }
};

exports.getCategories = async (req,res) =>{
  try {
    const allCategoriesData = await ProductDB.find();

     // Check if there are no categories found
     if (!allCategoriesData || allCategoriesData.length === 0) {
      return res.status(404).json({ message: "No categories found." });
    }

    res.status(200).send(allCategoriesData);

  } catch (error) {
    res.status(500).json({ err: error.message || "Error while getting categories!" });
  }
}

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

exports.saveCategories = async (req,res)=>{
  try {
    const { categories } = req.body;

    // Validate the request body against the schema
    const newProduct = new ProductDB({ categories });
    const savedProduct = await newProduct.save();

    res.status(201).json(savedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

exports.saveCitiesAndHobbies = async (req,res)=>{
  try {
    const data = req.body;
    console.log(data);

    // Validate the request body against the schema
    const newData = new citiesAndHobbiesDB( data );
    const savedData = await newData.save();

    res.status(201).json(savedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}