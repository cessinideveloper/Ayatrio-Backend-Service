const mongoose = require("mongoose");

const VESchema = mongoose.Schema({
  rooms: [
    {
      title: {
        type: String,
        required: true,
        unique: true,
      },
      img: {
        type: String,
        required: true,
      },
      id: {
        type: String,
        required: true,
      },
    },
  ],
  activities: [
    {
      title: {
        type: String,
        required: true,
        unique: true,
      },
      img: {
        type: String,
        required: true,
      },
      id: {
        type: String,
        required: true,
      },
    },
  ],
  budget: [
    {
      label: {
        type: String,
        required: true,
        unique: true,
      },
      price: {
        type: Number,
        required: true,
        min: 0,
      },
      img: {
        type: String,
        required: true,
      },
      id: {
        type: String,
        required: true,
      },
    },
  ],
  flooring: [
    {
      title: {
        type: String,
        required: true,
        unique: true,
      },
      img: {
        type: String,
        required: true,
      },
    },
  ],
  colors: [
    {
      title: {
        type: String,
        required: true,
        unique: true,
      },
      img: {
        type: String,
        required: true,
      },
    },
  ],
  widthOfFlooring: [
    {
      title: {
        type: String,
        required: true,
        unique: true,
      },
      img: {
        type: String,
        required: true,
      },
    },
  ],
});

const VirtualExperience = mongoose.model("VirtualExperience", VESchema);

module.exports = VirtualExperience;
