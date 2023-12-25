const MapPlacesModel = require('../model/mapmodel');

const getMapPlaces = async (req, res) => {
    try{
        const MapPlaces = await MapPlacesModel.find();
        res.status(200).json(MapPlaces);
    }
    catch(error){
        res.status(404).json({message: error.message});
    }
}

const createMapPlaces = async (req, res) => {
    const MapPlace = req.body;
    const newMapPlace = new MapPlacesModel(MapPlace);
    try{
        await newMapPlace.save();
        res.status(201).json(newMapPlace);
    }
    catch(error){
        res.status(409).json({message: error.message});
    }
}

module.exports = {getMapPlaces, createMapPlaces};