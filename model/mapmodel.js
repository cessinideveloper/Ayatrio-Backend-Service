const mongoose = require("mongoose");

const mapSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  geo_location: {
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
});

mapSchema.index({ 'geo_location.latitude': 1, 'geo_location.longitude': 1 }, { unique: true });

const Map = mongoose.model("Map", mapSchema);
module.exports = Map;
