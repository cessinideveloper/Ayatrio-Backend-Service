const passport = require("passport");
const router = require("express").Router();

// initial google ouath login
router.get("/google",passport.authenticate("google",{scope:["profile","email"]}));

router.get("/google/callback",passport.authenticate("google",{
    successRedirect:"http://localhost:3000/profile",
    failureRedirect:"http://localhost:3000/login"
}))

router.get("/login/sucess",async(req,res)=>{

    if(req.user){
        res.status(200).json({message:"user Login",user:req.user})
    }else{
        res.status(400).json({message:"Not Authorized"})
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

router.get("/logout",(req,res,next)=>{
    req.logout(function(err){
        if(err){return next(err)}
        res.redirect("http://localhost:3000/home");
    })
})

module.exports = router;