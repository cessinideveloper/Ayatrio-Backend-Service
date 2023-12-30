const SliderDB  = require("../model/Slider");
const MidInfoSectionDB = require("../model/MidSection");
const HeaderInfoDB = require("../model/Header");
const ImgSchemaDB = require("../model/ImgSection");

// -------------------------------

exports.createImgCircle = async (req,res)=>{
  try {
    const slider = await SliderDB.create(req.body);
    res.status(201).json(slider);
  } catch (error) {
    res.status(500).json(error);
  }
}

exports.getSliderCircle = async(req,res)=>{
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 3;
  const skip = (page - 1) * limit;
  const lastIndex = page * limit;
  try {
    const sliders = await SliderDB.find();
    let result = sliders.slice(skip, lastIndex);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

exports.deleteSliderCircle =  async (req, res) => {
  const circleId = req.params.circleId;

  try {
    // Assuming YourModel is your Mongoose model representing the slider circles
    const result = await SliderDB.findOneAndDelete({ _id: circleId });

    if (!result) {
      return res.status(404).json({ message: 'Circle not found' });
    }

    // Fetch updated data after deletion
    const updatedData = await SliderDB.find();

    res.json(updatedData);
  } catch (error) {
    console.error('Error deleting circle:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// --------------------

exports.createMidInfoSection = async (req,res)=>{
  try {
    const info = await MidInfoSectionDB.create(req.body);
    res.status(201).json(info);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

exports.getMidInfoSection = async(req,res)=>{
  try {
    const info = await MidInfoSectionDB.find();
    res.status(200).json(info);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

exports.deleteMidInfoSection =  async (req, res) => {
  const midInfoId = req.params.midInfoId;

  try {
    // Assuming YourModel is your Mongoose model representing the slider circles
    const result = await MidInfoSectionDB.findOneAndDelete({ _id: midInfoId });

    if (!result) {
      return res.status(404).json({ message: 'Circle not found' });
    }

    // Fetch updated data after deletion
    const updatedData = await MidInfoSectionDB.find();

    res.json(updatedData);
  } catch (error) {
    console.error('Error deleting circle:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// --------------------

exports.createHeaderInfoSection = async (req,res)=>{
  try {
    const info = await HeaderInfoDB.create(req.body);
    res.status(201).json(info);
  } catch (error) {
    res.status(500).send(error);
  }
}

exports.getHeaderInfoSection = async(req,res)=>{
  try {
    const info = await HeaderInfoDB.find();
    res.status(200).json(info);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// --------------------

exports.createImgSection = async (req,res)=>{
  try {
    const info = await ImgSchemaDB.create(req.body);
    res.status(201).json(info);
  } catch (error) {
    res.status(500).send(error);
  }
}

exports.getImgSection = async(req,res)=>{
  try {
    const info = await ImgSchemaDB.find();
    res.status(200).json(info);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

