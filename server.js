require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");

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

// passport strategy for Google login
require('./config/passport')(passport);

// passport auth routes
app.use('/auth',require('./routes/auth'));

// other routes
app.use('/api',require('./routes/routes'));

// admin routes
app.use('/admin',require('./routes/admin'));

app.listen(process.env.PORT,()=>{
    console.log(`server started on http://localhost:${process.env.PORT}`)
})