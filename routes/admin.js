const router = require("express").Router();
const verifyToken = require("../middleware/verifyToken");
const adminController = require("../controller/admin");

// create new admin
router.post("/register", adminController.createAdmin);

// login and get a JWT
router.post("/login", adminController.loginAdmin);

// retrieve admin details
router.get("/profile", verifyToken, adminController.adminProfile);

module.exports = router