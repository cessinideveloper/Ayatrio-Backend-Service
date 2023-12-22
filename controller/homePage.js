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
    res.status(500).json({ error: "Internal Server Error" });
  }
}

exports.getSliderCircle = async(req,res)=>{
  try {
    const sliders = await SliderDB.find();
    res.status(200).json(sliders);
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

