const router = require("express").Router();

// import middleware
const verifyToken = require("../middleware/verifyToken");
const { uploadImage } = require("../middleware/uploadImage");

// import controllers
const controller = require("../controller/controller");
const homePageController = require("../controller/homePage");
const cartController = require("../controller/cart");
const productController = require("../controller/products");
const recommendationController = require("../controller/recommendation");
const trendingController = require("../controller/trending");
const orderController = require("../controller/order");
const mapController = require("../controller/mapcontroller");
const ProfileContentController = require("../controller/profileContent");
const VirtualExperience = require("../controller/VIrtualExperiance");


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
  .get("/cart", verifyToken, cartController.getCart);

// home
router
  .post("/createImgCricle",uploadImage.array('image',1), homePageController.createImgCircle)
  .get("/getImgCircle", homePageController.getSliderCircle)
  .delete('/deleteSliderCircle/:circleId', homePageController.deleteSliderCircle)

router
  .post("/createMidInfoSection", homePageController.createMidInfoSection)
  .get("/getMidInfoSection", homePageController.getMidInfoSection)
  .delete("/deleteMidSection/:midInfoId", homePageController.deleteMidInfoSection)

router
  .post("/createHeaderInfoSection", homePageController.createHeaderInfoSection)
  .get("/getHeaderInfoSection", homePageController.getHeaderInfoSection)
  .delete('/deleteHeaderInfoSection/:headerId', homePageController.deleteHeaderInfoSection);


router
  .post("/createImgSection",uploadImage.array('image',1), homePageController.createImgSection)
  .get("/getImgSection", homePageController.getImgSection)
  .delete('/deleteImgSection/:imgId', homePageController.deleteImgSection);

router
  .post("/gridImg", homePageController.createImgGrid)
  .get("/gridImg", homePageController.getImgGrid)
  .delete('/gridImg/:imgGridId', homePageController.deleteImgGrid);



// trending products
router
  .post("/increment-popularity", trendingController.incrementPopularity) // increment the popularity of a product
  .get("/trending-products", trendingController.trendingProducts); // fetch trending products


// ---------------- product endpoints
router
  .post("/createProduct", uploadImage.array('image', 4), productController.createProduct)
  .get("/products", productController.fetchAllProducts)
  .get("/relatedProducts", productController.fetchProductsByCategory)
  .get("/getSingleProduct", productController.fetchProductById)
  .delete("/products/:productId", productController.deleteProductById);

//------------------map endpoints
router
  .post("/createMapPlaces", uploadImage.array('image',4), mapController.createMapPlaces)
  .get("/mapPlaces", mapController.getMapPlaces)
  .delete("/mapPlaces/:mapId", mapController.deleteMapPlaces);

// ----------------- profileContent
router
  .post("/createProfileContent", ProfileContentController.createProfileContent)
  .get("/profileContent", ProfileContentController.getProfileContent)
  .delete("/profileContent/:profileId", ProfileContentController.deleteProfileById);

//------------------VE endpoints
router
  .get("/getVEFilter", VirtualExperience.virtualExperianceFilterData)
  .get("/getVE", VirtualExperience.getVirtualExperianceFields)

// // image upload to S3 
// router.post('/upload', upload.array('image', 4), (req, res, next) => {
//   const imageUrls = req.files.map(file => file.location);
//   res.json({ message: 'Images uploaded successfully', imageUrls });
// });


module.exports = router;
