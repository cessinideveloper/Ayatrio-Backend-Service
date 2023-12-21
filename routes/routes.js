const router = require("express").Router();
const controller = require("../controller/controller");

router.get('/categories',controller.getCategories);
router.get('/citiesAndHobbies',controller.getCitiesAndHobbies);

router.post('/preferences',controller.preferences);
router.post('/createProduct',controller.createProduct);

router.get('/getRecommendation',controller.getRecommendation);

// ✔❌ not necessary - only for development purpose (one Time Use)
// router.post('/saveCategories',controller.saveCategories);
// router.post('/saveCitiesAndHobbies',controller.saveCitiesAndHobbies);


// ---------------------------------------

router.post('/checkout', controller.checkout);
router.post('/order', controller.order);

router.post('/cart',controller.createCart);
router.get('/cart',controller.getCart);


module.exports = router