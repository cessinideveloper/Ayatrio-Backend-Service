const MapPlacesModel = require("../model/mapmodel");

const getMapPlaces = async (req, res) => {
  try {
    const MapPlaces = await MapPlacesModel.find();
    res.status(200).json(MapPlaces);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createMapPlaces = async (req, res) => {
  const mapPlacesData = req.body;

  try {
    const insertedMapPlaces = await MapPlacesModel.insertMany(mapPlacesData);
    res.status(201).json(insertedMapPlaces);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const deleteMapPlaces = (req, res) => {
  MapPlacesModel.findByIdAndRemove(req.params.id)
    .then(() => res.json("MapPlace deleted"))
    .catch((err) => res.status(400).json("Error: " + err));
};
module.exports = { getMapPlaces, createMapPlaces, deleteMapPlaces };
