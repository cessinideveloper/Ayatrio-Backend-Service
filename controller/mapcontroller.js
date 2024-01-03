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
  try {
  // Extract image from req.files
  const imageUrls = req.files
    .filter((file) => file.fieldname === 'image')
    .map((file) => file.location);

  if (!req.body) {
    return res.status(406).send("Please provide product data");
  }
  const { name, address, phone, 'geo_location.latitude': latitude, 'geo_location.longitude': longitude} = req.body;

  const newMapDetail = new MapPlacesModel({
    name,
    address,
    phone,
    geo_location:{
      latitude,
      longitude
    },
    images:imageUrls
  })

    const mapData = await newMapDetail.save();

    res.status(201).json({ message: "New map created successfully!...." });

  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const deleteMapPlaces = async (req, res) => {
  const mapId = req.params.mapId;

  try {
    const result = await MapPlacesModel.findOneAndDelete({ _id: mapId });

    if (!result) {
      return res.status(404).json({ message: 'Map details not found' });
    }

    // Fetch updated data after deletion
    const updatedData = await MapPlacesModel.find();

    res.json(updatedData);
  } catch (error) {
    console.error('Error deleting map:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
module.exports = { getMapPlaces, createMapPlaces, deleteMapPlaces };
