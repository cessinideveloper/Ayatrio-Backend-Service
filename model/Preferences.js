const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema({
    name: { type: String, required: true },
    subcategories: { type: [String] }
});

const PreferencesScehma = mongoose.Schema({
    deviceId: { type: String,  required: true, unique: true },
    preferredCities: { type: [String], required: true },
    preferredHobbies: { type: [String] },
    preferredCategories:{type:[CategorySchema]}
});

const preferencesDB = new mongoose.model("preferences",PreferencesScehma);

module.exports = preferencesDB;
