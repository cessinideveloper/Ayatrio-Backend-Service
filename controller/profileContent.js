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
      res.json({message:"Team Memeber saved successfully! "});
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };


  const deleteProfileById = async (req, res) => {
    const profileId = req.params.profileId;
  
    try {
      // Assuming YourModel is your Mongoose model representing the slider circles
      const result = await ProfileContentDb.findOneAndDelete({ _id: profileId });
  
      if (!result) {
        return res.status(404).json({ message: 'profile not found' });
      }
  
      // Fetch updated data after deletion
      const updatedData = await ProfileContentDb.find();
  
      res.json(updatedData);
    } catch (error) {
      console.error('Error deleting profiles section:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
module.exports = { getProfileContent, createProfileContent,deleteProfileById };
