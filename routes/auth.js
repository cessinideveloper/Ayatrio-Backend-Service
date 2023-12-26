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

// Update user account
router.put("/user/update", verifyToken, async (req, res) => {
  try {
    const { userId, updatedData } = req.body;

    // Ensure the user is updating their own account
    if (userId !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Unauthorized to update this user" });
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true });
    res.json({ success: true, user: updatedUser });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete user account
router.delete("/user/delete", verifyToken, async (req, res) => {
  try {
    const userId = req.body.userId;

    // Ensure the user is deleting their own account
    if (userId !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Unauthorized to delete this user" });
    }

    await User.findByIdAndDelete(userId);
    res.json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get("/login/sucess", async (req, res) => {

  if (req.user) {
    res.status(200).json({ message: "user Login", user: req.user })
  } else {
    res.status(400).json({ message: "Not Authorized" })
  }
})

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