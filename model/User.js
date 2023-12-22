const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    deviceId:String,
    googleId:{type:String,require:true,unique:true},
    displayName:String,
    email:String,
    image:String,
},{timestamps:true});


const userdb = new mongoose.model("users",userSchema);

module.exports = userdb;