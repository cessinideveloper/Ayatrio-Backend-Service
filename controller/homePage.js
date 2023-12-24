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
    console.log(result.length);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

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

