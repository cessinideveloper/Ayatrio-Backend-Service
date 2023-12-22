
const categoriesDB = require("../model/Category");
const citiesAndHobbiesDB = require("../model/CityHobbie");


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

