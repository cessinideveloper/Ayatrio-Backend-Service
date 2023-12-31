const router = require("express").Router();
const controller = require("../controller/controller");
const homePageController = require("../controller/homePage");
const cartController = require("../controller/cart");
const productController = require("../controller/products");
const recommendationController = require("../controller/recommendation");
const trendingController = require("../controller/trending");
const orderController = require("../controller/order");
const mapController = require("../controller/mapcontroller");
const  ProfileContentController = require("../controller/profileContent");
const VirtualExperience = require("../controller/VIrtualExperiance");
const verifyToken = require("../middleware/verifyToken");


// ❌ not necessary - only for development purpose (one Time Use)
// router.post('/saveCategories',controller.saveCategories);
// router.post('/saveCitiesAndHobbies',controller.saveCitiesAndHobbies);

router.get("/categories", controller.getCategories);
router.get("/citiesAndHobbies", controller.getCitiesAndHobbies);


// recommendation engine
router
  .post("/preferences", recommendationController.preferences)
  .get("/getRecommendation", recommendationController.getRecommendation);

// ---------------------------------------

router.post("/checkout", orderController.checkout);
router.post("/order", orderController.order);

// cart
router.post("/cart", verifyToken, cartController.createCart)
      .get("/cart",verifyToken, cartController.getCart);

// home
router
  .post("/createImgCricle", homePageController.createImgCircle)
  .get("/getImgCircle", homePageController.getSliderCircle)
  .delete('/deleteSliderCircle/:circleId',homePageController.deleteSliderCircle)

router
  .post("/createMidInfoSection", homePageController.createMidInfoSection)
  .get("/getMidInfoSection", homePageController.getMidInfoSection)
  .delete("/deleteMidSection/:midInfoId",homePageController.deleteMidInfoSection)

router
  .post("/createHeaderInfoSection", homePageController.createHeaderInfoSection)
  .get("/getHeaderInfoSection", homePageController.getHeaderInfoSection)
  .delete('/deleteHeaderInfoSection/:headerId', homePageController.deleteHeaderInfoSection);

  
  router
  .post("/createImgSection", homePageController.createImgSection)
  .get("/getImgSection", homePageController.getImgSection)
  .delete('/deleteImgSection/:imgId',homePageController.deleteImgSection);



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

//------------------map endpoints
router
.post("/createMapPlaces",mapController.createMapPlaces)
.get("/mapPlaces",mapController.getMapPlaces)
.delete("/mapPlaces/:id",mapController.deleteMapPlaces);

// ----------------- profileContent
router
.post("/createProfileContent", ProfileContentController.createProfileContent)
.get("/profileContent", ProfileContentController.getProfileContent)
.delete("/profileContent/:profileId", ProfileContentController.deleteProfileById);
//------------------VE endpoints
router
.get("/getVEFilter", VirtualExperience.virtualExperianceFilterData)
.get("/getVE", VirtualExperience.getVirtualExperianceFields)

module.exports = router;
