const mongoose = require("mongoose");

const PreferencesScehma = mongoose.Schema({
    deviceId: {
        type: String,
        required: true,
        unique: true,
    },
    categoryName: {
        type: [String],
        required: true,
    },
    WallpaperSubCategory: {
        type: [String],
    },
    FlooringSubCategory: {
        type: [String],
    },
    BlindsSubCategory: {
        type: [String],
    },
    CurtainsSubCategory: {
        type: [String],
    },
    SportSubCategory: {
        type: [String],
    },
});

const preferencesDB = new mongoose.model("preferences",PreferencesScehma);

module.exports = preferencesDB;
