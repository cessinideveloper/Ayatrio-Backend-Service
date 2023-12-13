const dotenv = require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const OAuth2Strategy = require("passport-google-oauth2").Strategy;
const userdb = require("./model/User")


// database connection
require('./database/connection')();

// CORS policy
app.use(cors({
    origin:"http://localhost:3000",
    methods:"GET,POST,PUT,DELETE",
    credentials:true
}));

app.use(express.json());

// setup session
app.use(session({
    secret:process.env.SECRET_KEY,
    resave:false,
    saveUninitialized:true
}))

// setuppassport
app.use(passport.initialize());
app.use(passport.session());

passport.use(
    new OAuth2Strategy({
        clientID:process.env.GOOGLE_CLIENT_ID,
        clientSecret:process.env.GOOGLE_CLIENT_SECRET,
        callbackURL:"/auth/google/callback",
        scope:["profile","email"]
    },
    async(accessToken,refreshToken,profile,done)=>{
        try {
            let user = await userdb.findOne({googleId:profile.id});

            if(!user){
                user = new userdb({
                    googleId:profile.id,
                    displayName:profile.displayName,
                    email:profile.emails[0].value,
                    image:profile.photos[0].value
                });

                await user.save();
            }

            return done(null,user)
        } catch (error) {
            return done(error,null)
        }
    }
    )
)

passport.serializeUser((user,done)=>{
    done(null,user);
})

passport.deserializeUser((user,done)=>{
    done(null,user);
});

// initial google ouath login
app.get("/auth/google",passport.authenticate("google",{scope:["profile","email"]}));

app.get("/auth/google/callback",passport.authenticate("google",{
    successRedirect:"http://localhost:3000/home",
    failureRedirect:"http://localhost:3000/login"
}))

app.get("/login/sucess",async(req,res)=>{

    if(req.user){
        res.status(200).json({message:"user Login",user:req.user})
    }else{
        res.status(400).json({message:"Not Authorized"})
    }
})

app.get("/logout",(req,res,next)=>{
    req.logout(function(err){
        if(err){return next(err)}
        res.redirect("http://localhost:3001");
    })
})

app.listen(process.env.PORT,()=>{
    console.log(`server started on http://localhost:${process.env.PORT}`)
})