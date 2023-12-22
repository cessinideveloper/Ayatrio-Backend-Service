const router = require("express").Router();
const controller = require("../controller/controller");
const homePageController = require("../controller/homePage");
const cartController = require("../controller/cart");
const productController = require("../controller/products");
const recommendationController = require("../controller/recommendation");
const trendingController = require("../controller/trending");
const orderController = require("../controller/order");


// ❌ not necessary - only for development purpose (one Time Use)
// router.post('/saveCategories',controller.saveCategories);
// router.post('/saveCitiesAndHobbies',controller.saveCitiesAndHobbies);
// router.get("/categories", controller.getCategories);
// router.get("/citiesAndHobbies", controller.getCitiesAndHobbies);


// recommendation engine
router
  .post("/preferences", recommendationController.preferences)
  .get("/getRecommendation", recommendationController.getRecommendation);

// ---------------------------------------

router.post("/checkout", orderController.checkout);
router.post("/order", orderController.order);

// cart
router.post("/cart", cartController.createCart)
      .get("/cart", cartController.getCart);

// home
router
  .post("/createImgCricle", homePageController.createImgCircle)
  .get("/getImgCircle", homePageController.getSliderCircle);

router
  .post("/createMidInfoSection", homePageController.createMidInfoSection)
  .get("/getMidInfoSection", homePageController.getMidInfoSection);

router
  .post("/createHeaderInfoSection", homePageController.createHeaderInfoSection)
  .get("/getHeaderInfoSection", homePageController.getHeaderInfoSection);

router
  .post("/createImgSection", homePageController.createImgSection)
  .get("/getImgSection", homePageController.getImgSection);



// trending products
router
  .post("/increment-popularity", trendingController.incrementPopularity) // increment the popularity of a product
  .get("/trending-products", trendingController.trendingProducts); // fetch trending products


// ---------------- product endpoints
router
  .post("/createProduct", productController.createProduct)
  .get("/products", productController.fetchAllProducts)
  .get("/getSingleProduct", productController.fetchProductById)
  .delete("/products", productController.deleteProductById);

module.exports = router;
