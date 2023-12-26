const ProfileContentDb = require("../model/ProfileContent");

const getProfileContent = async (req, res) => {
  try {
    const profileContent = await ProfileContentDb.find();
    res.json(profileContent);
  } catch (error) {
    res.json({ message: error });
  }
};
const createProfileContent = async (req, res) => {
    const profileData = req.body; 
  
    try {
      const savedProfileContent = await ProfileContentDb.insertMany(profileData);
      res.json(savedProfileContent);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
module.exports = { getProfileContent, createProfileContent };
