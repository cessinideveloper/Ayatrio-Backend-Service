const router = require("express").Router();
const controller = require("../controller/controller");

router.post('/takeRecommendations',controller.test);

module.exports = router