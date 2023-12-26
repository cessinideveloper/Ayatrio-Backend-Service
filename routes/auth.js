const passport = require("passport");
const router = require("express").Router();
const verifyToken = require("../middleware/verifyToken");
const generateToken = require("../config/jwt")

// initial google ouath login
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// login callback
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: "http://localhost:3000/login" }),
  (req, res) => {
    // Successful authentication, generate JWT token and send it as a response
    const token = generateToken(req.user);
    res.redirect(`http://localhost:3000/profile?token=${token}`);
  });


// Endpoint to check user authentication status
router.get('/user', (req, res) => {
  if (req.isAuthenticated()) {
    // User is authenticated, send user information
    res.json({ isAuthenticated: true, user: req.user });
  } else {
    // User is not authenticated
    res.json({ isAuthenticated: false, user: null });
  }
});

router.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) { return next(err) }
    res.redirect("http://localhost:3000/home");
  })
})

module.exports = router;