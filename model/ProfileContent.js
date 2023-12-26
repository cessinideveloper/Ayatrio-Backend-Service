const mongoose = require('mongoose');

const profileContentSchema = mongoose.Schema({

  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  }
});

const ProfileContent = mongoose.model('ProfileContent', profileContentSchema);
module.exports = ProfileContent;
