const router = require("express").Router();
const controller = require("../controller/controller");

// categories of products
router.get("/categories", controller.getCategories);
router.get("/citiesAndHobbies", controller.getCitiesAndHobbies);

// recommendation engine
router
  .post("/preferences", controller.preferences)
  .get("/getRecommendation", controller.getRecommendation);

// ✔❌ not necessary - only for development purpose (one Time Use)
// router.post('/saveCategories',controller.saveCategories);
// router.post('/saveCitiesAndHobbies',controller.saveCitiesAndHobbies);

// ---------------------------------------

router.post("/checkout", controller.checkout);
router.post("/order", controller.order);

// cart
router.post("/cart", controller.createCart).get("/cart", controller.getCart);

// home
router
  .post("/createImgCricle", controller.createImgCircle)
  .get("/getImgCircle", controller.getSliderCircle);

router
  .post("/createMidInfoSection", controller.createMidInfoSection)
  .get("/getMidInfoSection", controller.getMidInfoSection);

router
  .post("/createHeaderInfoSection", controller.createHeaderInfoSection)
  .get("/getHeaderInfoSection", controller.getHeaderInfoSection);

router
  .post("/createImgSection", controller.createImgSection)
  .get("/getImgSection", controller.getImgSection);

// trending products
router
  .post("/increment-popularity", controller.incrementPopularity) // increment the popularity of a product
  .get("/trending-products", controller.trendingProducts); // fetch trending products

// ---------------- product endpoints
router
  .post("/createProduct", controller.createProduct)
  .get("/products", controller.fetchAllProducts)
  .get("/getSingleProduct", controller.fetchProductById)
  .delete("/products", controller.deleteProductById);

module.exports = router;
