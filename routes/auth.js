const passport = require("passport");
const router = require("express").Router();
const verifyToken = require("../middleware/verifyToken");
const generateToken = require("../config/jwt");
const userDB = require("../model/User")

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


// to check user authentication status
router.get('/user', verifyToken, async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      // User is authenticated, send user information
      const userInfo = await userDB.find({ googleId: req.user.id });

      if (userInfo.length > 0) {
        const userObject = userInfo[0]; 
        res.json({ isAuthenticated: true, user: userObject });
      } else {
        res.json({ isAuthenticated: false, user: null });
      }
    } else {
      // User is not authenticated
      res.json({ isAuthenticated: false, user: null });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});


// Update user profile
router.put('/update-profile', verifyToken, async (req, res) => {
  try {
    const googleId = req.user.id;
    const {
      displayName,
      email,
      photoURL
    } = req.body;


    const updatedUser = await userDB.findOneAndUpdate(
      { googleId },
      { displayName,email,photoURL },
      { new: true }
    );

    res.json({ message: 'Profile updated successfully', user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) { return next(err) }
    res.redirect("http://localhost:3000/home");
  })
})

module.exports = router;